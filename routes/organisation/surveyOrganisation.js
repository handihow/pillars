var express = require("express");
var router = express.Router();
var School = require("../../models/school");
var Survey = require("../../models/survey");
var SurveyResult = require("../../models/surveyResult");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");
var ObjectId = require('mongoose').Types.ObjectId; 
var json2csv = require("json2csv");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  Survey.find({organisation: req.user.organisation})
        .populate("school")
        .sort({isActiveCompetenceSurvey:-1, isActiveSoftwareSurvey:-1})
        .exec(function(err, surveys){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("survey/index", {surveys: surveys, schoolLevel: false});         
        }
    });
});

//NEW ROUTE
router.get("/new", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  res.locals.scripts.header.surveyjs = true;
  res.locals.scripts.footer.surveyjs = true;
  res.locals.scripts.footer.surveyBuilder = true;
  var fullUrl = req.protocol + '://' + req.get('host');
  res.render("survey/new", {schoolLevel: false});
});

//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
  Survey.findById(req.params.id, function(err, survey){
        if(err ||!survey){
          req.flash("error", "Enquête niet gevonden.");
          res.redirect("back");
        } else if(!survey.isPublic) {
          res.locals.scripts.header.surveyjs = true;
          if(survey.isCompetenceSurvey || survey.isSoftwareSurvey){
            // res.locals.scripts.header.plotly = true; 
            res.locals.scripts.header.surveyanalytics = true;  
          }
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyResults = true;
          res.locals.scripts.header.datatables = true;
          res.locals.scripts.footer.datatables = true;
          SurveyResult.find({survey: new ObjectId(survey._id)})
          .populate('user')
          .populate({path : 'user', populate : {path : 'organisation'}})
          .populate({path : 'user', populate : {path : 'school'}})
          .exec(function(err, surveyResults){
            if(err){
              req.flash(err.message);
              res.redirect("back");
            } else {
              var returnedSurveyResults = [];
                surveyResults.forEach(function(surveyResult){
                  if(surveyResult.user && surveyResult.user._id){
                    returnedSurveyResults.push(surveyResult);
                  }
                });
              var statistics; var bubbles;
              if(survey.isCompetenceSurvey){
                statistics = config.competence.survey.calculateStatistics(survey, returnedSurveyResults);
              } else if(survey.isSoftwareSurvey){
                bubbles = config.software.survey.calculateBubbles(survey, returnedSurveyResults);
              }
              var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
              var fullUrl = protocol + '://' + req.get('host');
              res.render("survey/show", {
                survey: survey, 
                surveyResults: returnedSurveyResults,
                statistics: statistics,
                bubbles: bubbles,
                schoolLevel: false, 
                fullUrl: fullUrl
              }); 
            }
          });        
        } else {
          res.locals.scripts.header.surveyjs = true;
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyResults = true;
          SurveyResult.find({survey: new ObjectId(survey._id)})
          .exec(function(err, surveyResults){
            if(err){
              req.flash(err.message);
              res.redirect("back");
            } else {
              var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
              var fullUrl = protocol + '://' + req.get('host');
              res.render("survey/show", {survey: survey, surveyResults: surveyResults, schoolLevel: false, fullUrl: fullUrl}); 
            }
          });        
        } 
    });
});

//CREATE ROUTE
router.post("/", function(req, res){
  Survey.create({
    name: req.body.name,
    survey: JSON.parse(req.body.surveyText),
    organisation: req.user.organisation,
    isValidForAllOrganisation: true,
    owner: req.user._id,
    isPublic: req.body.isPublic
  }, function(err, survey){
            if(err || !survey){
                res.contentType('json');
                res.send({ 
                  success: false, 
                  error: 'Foutmelding: controleer of je de enquete een naam hebt gegeven. Server geeft fout: ' + err.message 
                });
            }  else {
                var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
                var fullUrl = protocol + '://' + req.get('host');
                res.contentType('json');
                res.send({ success: true, redirect: fullUrl + '/survey/' + survey._id });
            }
      }); 
});
    
// //EDIT ROUTE
router.get("/:id/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    Survey.findById(req.params.id, function(err, survey){
          if(err || !survey){
              req.flash("error", "Enquête niet gevonden.");
              res.redirect("/survey");
          } else {
              res.locals.scripts.header.surveyjs = true;
              res.locals.scripts.footer.surveyjs = true;
              res.locals.scripts.footer.surveyBuilder = true;
              var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
              var fullUrl = protocol + '://' + req.get('host');
              res.render("survey/edit", {survey: survey, schoolLevel: false});
          }
      });
});

// UPDATE ROUTE
router.post("/:id",middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  var checkActive = JSON.parse(req.body.isActive);
  Survey.findById(req.params.id, async function(err, survey){
    if(err || !survey){
        res.contentType('json');
        res.send({ 
          success: false, 
          error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
        });
    } else {
        if(checkActive){
          //check if there is not already an active survey, thow error it needed
          var hasActiveSurvey = await checkActiveSurvey(req, res, survey);
          if(hasActiveSurvey){
            res.contentType('json');
            return res.send({ 
              success: false, 
              error: 'Foutmelding: er is een actieve enquête gevonden op dit onderdeel. Deactiveer deze enquête eerst.' 
            });
          }
        }
        survey.name = req.body.name;
        survey.survey = JSON.parse(req.body.surveyText);
        if(survey.isCompetenceSurvey){
          survey.isActiveCompetenceSurvey = checkActive;
        } else if(survey.isSoftwareSurvey){
          survey.isActiveSoftwareSurvey = checkActive;
        } else {
          survey.isPublic = req.body.isPublic;
        }
        survey.save(function(err, survey){
          if(err){
             res.contentType('json');
             res.send({ 
                success: false, 
                error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
              });
          } else {
            var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
            var fullUrl = protocol + '://' + req.get('host');
            res.contentType('json');
            res.send({ success: true, redirect: fullUrl + '/survey/' + survey._id });
          }
        });
    }
  });
});

function checkActiveSurvey(req, res, survey){
  if(survey.isCompetenceSurvey){
    return new Promise(function(resolve, reject){
      Survey.findOne({
          "organisation": survey.organisation, 
          "isActiveCompetenceSurvey": true,
          "competenceStandardKey": survey.competenceStandardKey
        }, function(err, survey){
           if(err || survey){
             resolve(true);
           } else {
             resolve(false);
           }
        });
    });
  } else if(survey.isSoftwareSurvey){
    return new Promise(function(resolve, reject){
      Survey.findOne({
          "organisation": survey.organisation, 
          "isActiveSoftwareSurvey": true,
          "softwareStandardKey": survey.softwareStandardKey
        }, function(err, survey){
           if(err || survey){
             resolve(true);
           } else {
             resolve(false);
           }
        });
    });
  } else {
    return false;
  }
}

router.get("/:id/competence", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function (req, res){
  var index = config.competence.survey.competenceCategories.findIndex((e) => e.identifier == req.params.id);
  if(index == -1){
    req.flash("error", "Geen deskundigheidstest identifier gevonden om de enquête mee te vullen.");
    return res.redirect("/survey/");
  }
  var standard = config.competence.survey.competenceCategories[index];
  Survey.create({
    name: standard.title + " " + config.currentSchoolYear,
    survey: config.competence.survey[standard.identifier],
    organisation: req.user.organisation,
    isValidForAllOrganisation: true,
    owner: req.user._id,
    isPublic: false,
    isCompetenceSurvey: true,
    competenceStandardKey: standard.identifier,
    competenceStandardTitle: standard.title,
    surveyOption: standard.surveyOption
  }, function(err, survey){
            if(err || !survey){
                req.flash("error", "Er is iets misgegaan. Probeer enquête opnieuw te maken. Error: " + err.message);
                res.redirect("/survey/");
            }  else {
                req.flash("success", "Enquête gemaakt");
                res.redirect("/survey/" + survey._id); 
            }
      });
});

router.get("/:id/software", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function (req, res){
  var index = config.software.survey.assessmentCategories.findIndex((e) => e.identifier == req.params.id);
  if(index == -1){
    req.flash("error", "Geen leermiddelentest identifier gevonden om de enquête mee te vullen.");
    return res.redirect("/survey/");
  }
  var assessment = config.software.survey.assessmentCategories[index];
  Survey.create({
    name: assessment.title + " " + config.currentSchoolYear,
    survey: config.software.survey[assessment.identifier],
    organisation: req.user.organisation,
    isValidForAllOrganisation: true,
    owner: req.user._id,
    isPublic: false,
    isSoftwareSurvey: true,
    softwareStandardKey: assessment.identifier,
    softwareStandardTitle: assessment.title,
    surveyOption: assessment.surveyOption
  }, function(err, survey){
            if(err || !survey){
                req.flash("error", "Er is iets misgegaan. Probeer enquête opnieuw te maken. Error: " + err.message);
                res.redirect("/survey/");
            }  else {
                req.flash("success", "Enquête gemaakt");
                res.redirect("/survey/" + survey._id); 
            }
      });
});

//DELETE ROUTE
router.delete("/:id", middleware.isAuthenticatedBadmin, function(req, res){
  Survey.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer enquête opnieuw te verwijderen.");
          res.redirect("/survey/" + req.params.id);
      } else {
          req.flash("success", "Enquête verwijderd");
          res.redirect("/survey");  
      }
  });
});

//SHOWING A PRIVATE SURVEY
router.get("/:id/private", middleware.isLoggedIn, function(req, res){
  Survey.findById(req.params.id, function(err, survey){
        if(err ||!survey){
            req.flash("error", "Enquête niet gevonden.");
            res.redirect("back");
        } else if(survey.isPublic){
            req.flash("error", "Deze enquête is niet prive.");
            res.redirect("back");

        } else {
            var software = {};
            software.hasInfo = false;
            if(survey.isActiveSoftwareSurvey){
              software.hasInfo = true;
              software.course = req.query.course;
              software.name = req.query.name;
              software.supplier = req.query.supplier;
              software.gradeLevels = req.query.gradeLevels;
              software.type = req.query.type;
              software.school = req.query.school;
              software.id = req.query.softwareId;
            }
            res.locals.scripts.header.surveyjs = true;
            res.locals.scripts.footer.surveyjs = true;
            res.locals.scripts.footer.surveyOptions = true;
            res.locals.scripts.footer.surveyPrivate = true;
            res.render("survey/private", {survey: survey, software: software});            
        }
    });
});

//COMPLETED A PRIVATE SURVEY
router.post("/:id/private", middleware.isLoggedIn, function(req, res){
  Survey.findById(req.params.id, function(err, survey){
    if(err || !survey){
        res.contentType('json');
        res.send({ 
          success: false, 
          error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
        });
    } else {
        SurveyResult.find({user: new ObjectId(req.user._id), survey: survey}, function(err, surveyResult){
          if(err) {
            res.contentType('json');
            res.send({ 
                success: false, 
                error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
              });

          } else if(surveyResult.length>0 && survey.isActiveCompetenceSurvey) {

            res.contentType('json');
            res.send({ 
                success: false, 
                error: 'Foutmelding: u heeft deze enquête al eerder ingevuld.'
              });


          } else {
            User.findById(req.user._id, function(err, user){
              if(err || !user){
                res.contentType('json')
                res.send({
                  success: false,
                  error: "Foutmelding: gebruiker niet gevonden."
                })
              } else {
                let surveyResult = SurveyResult({
                  survey: req.params.id,
                  result: JSON.parse(req.body.result),
                  organisation: user.organisation,
                  user: user._id,
                  isCompetenceSurvey: survey.isCompetenceSurvey ? true : false,
                  competenceStandardKey: survey.competenceStandardKey ? survey.competenceStandardKey : '',
                  competenceStandardTitle: survey.competenceStandardTitle ? survey.competenceStandardTitle : '',
                  isSoftwareSurvey: survey.isSoftwareSurvey ? true : false,
                  softwareStandardKey: survey.softwareStandardKey ? survey.softwareStandardKey : '',
                  softwareStandardTitle: survey.softwareStandardTitle ? survey.softwareStandardTitle : '',
                });
                if(user.school && user.school.length>0){
                  surveyResult.school = user.school[0]
                }
                SurveyResult.create(surveyResult, function(err, surveyResult){
                  if (err) {
                    res.contentType('json');
                    res.send({ 
                        success: false, 
                        error: 'Probleem bij bewaren van de enquête resultaten. Server geeft fout: ' + err.message 
                      });
                  } else {
                    user.numberOfSurveyResults = user.numberOfSurveyResults ? user.numberOfSurveyResults + 1 : 1;
                    user.save()
                    res.contentType('json');
                    res.send({ success: true, surveyResultId:  surveyResult._id});
                  }

                });
              }
            });
          }
        });
    }
  });
});

//SHOWING A PUBLIC SURVEY
router.get("/:id/public", function(req, res){
  Survey.findById(req.params.id, function(err, survey){
        if(err ||!survey){
            req.flash("error", "Enquête niet gevonden.");
            res.redirect("back");
        } else if(!survey.isPublic){
            req.flash("error", "Deze enquête is prive.");
            res.redirect("back");
        } else {
            res.locals.scripts.header.surveyjs = true;
            res.locals.scripts.footer.surveyjs = true;
            res.locals.scripts.footer.surveyOptions = true;
            res.locals.scripts.footer.surveyPublic = true;
            res.render("survey/public", {survey: survey});            
        }
    });
});

//COMPLETED A PUBLIC SURVEY
router.post("/:id/public", function(req, res){
  Survey.findById(req.params.id, function(err, survey){
    if(err || !survey){
        res.contentType('json');
        res.send({ 
          success: false, 
          error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
        });
    } else {
        SurveyResult.create({
          survey: req.params.id,
          result: JSON.parse(req.body.result)
        }, function(err, surveyResult){
          if (err) {
            res.contentType('json');
            res.send({ 
                success: false, 
                error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
              });
          } else {
            res.contentType('json');
            res.send({ success: true, surveyResultId:  surveyResult._id });
          }

        });
    }
  });
});


//VIEW COMPLETED SURVEY

//SHOWING A PUBLIC SURVEY
router.get("/:id/result", function(req, res){
  SurveyResult.findById(req.params.id).populate("survey").exec(function(err, surveyResult){
        if(err ||!surveyResult){
            req.flash("error", "Inzending niet gevonden.");
            res.redirect("back");
        } else {
            res.locals.scripts.header.surveyjs = true;
            res.locals.scripts.footer.surveyjs = true;
            res.locals.scripts.footer.surveyResult= true;
            res.render("survey/result", {surveyResult: surveyResult});            
        }
    });
});

//SHOW INDIVIDUAL RESULTS ROUTE
router.get("/:id/:uid", middleware.isLoggedIn, function(req, res){
  School.findOne({"users": req.params.uid}, function(err, school){
      if(err){
        req.flash("error", err.message)
        res.redirect("back");
      } else {
        Survey.findById(req.params.id, function(err, survey){
            if(err){
              req.flash("error", "Foutmelding: " + err.message);
              res.redirect("back");
            } else if(!survey){
              req.flash("error", "Enquête niet gevonden.");
              res.redirect("back");
            } else {
              res.locals.scripts.footer.individualResults = true;
              res.locals.scripts.header.plotly = true;  
              SurveyResult.find({survey: survey._id})
              .exec(function(err, surveyResults){
                if(err){
                  req.flash(err.message);
                  res.redirect("back");
                } else {
                  var totalOrganisationSurveyResults = surveyResults.length;
                  var organisationStatistics = config.competence.survey.calculateStatistics(survey, surveyResults);
                  var returnedSurveyResults = [];
                  var schoolStatistics = [];
                  if(school){
                    surveyResults.forEach(function(surveyResult){
                      var isInArray = school.users.some(function (user) {
                          return user.equals(surveyResult.user);
                      });
                      if(isInArray){
                        returnedSurveyResults.push(surveyResult);
                      }
                    });
                    schoolStatistics = config.competence.survey.calculateStatistics(survey, returnedSurveyResults);

                  }
                  var totalSchoolSurveyResults = returnedSurveyResults.length;
                  var individualResult = surveyResults.find(result => result.user.equals(req.params.uid));
                  var individualStatistics = config.competence.survey.calculateStatistics(survey, [individualResult]);
                  res.render("survey/individual", {
                    school: school, 
                    survey: survey,
                    schoolStatistics: schoolStatistics,
                    organisationStatistics: organisationStatistics,
                    individualStatistics: individualStatistics,
                    totalOrganisationSurveyResults: totalOrganisationSurveyResults,
                    totalSchoolSurveyResults: totalSchoolSurveyResults
                  }); 
                }
              });        
            }
        });
      }
  });
});



module.exports = router;