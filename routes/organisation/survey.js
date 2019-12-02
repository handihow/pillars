var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Survey = require("../../models/survey");
var SurveyResult = require("../../models/surveyResult");
var Organisation = require("../../models/organisation");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");
var ObjectId = require('mongoose').Types.ObjectId; 
var json2csv = require("json2csv");



//INDEX ROUTE
router.get("/", middleware.isLoggedIn,middleware.findOrganisation, function(req, res){
  Survey.find({organisation: req.organisation._id})
        .populate("school")
        .sort({isActiveCompetenceSurvey:-1, isActiveSoftwareSurvey:-1})
        .exec(function(err, surveys){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("survey/index", {surveys: surveys, schoolLevel: false, organisation: req.organisation});         
        }
    });
});

//NEW ROUTE
router.get("/new", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, middleware.findOrganisation,function(req, res){
  res.locals.scripts.header.surveyjs = true;
  res.locals.scripts.footer.surveyjs = true;
  res.locals.scripts.footer.surveyBuilder = true;
  var fullUrl = req.protocol + '://' + req.get('host');
  res.render("survey/new", {schoolLevel: false});
});

//SHOW ROUTE
router.get("/:sid", middleware.isLoggedIn, middleware.findOrganisation, function(req, res){
  Survey.findById(req.params.sid, function(err, survey){
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
          .limit(50)
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
                fullUrl: fullUrl,
                limited: returnedSurveyResults.length > 49 ? true : false,
                organisation: req.organisation
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
              res.render("survey/show", {
                survey: survey, 
                surveyResults: surveyResults, 
                schoolLevel: false, 
                fullUrl: fullUrl,
                organisation: req.organisation
              }); 
            }
          });        
        } 
    });
});

//SHOW ALL ROUTE
router.get("/:sid/all", middleware.isLoggedIn, middleware.findOrganisation, function(req, res){
  Survey.findById(req.params.sid, function(err, survey){
        if(err ||!survey){
          req.flash("error", "Enquête niet gevonden.");
          res.redirect("back");
        } else {
          res.locals.scripts.header.surveyjs = true;
          res.locals.scripts.header.surveyanalytics = true;  
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
                fullUrl: fullUrl,
                limited: false,
                organisation: req.organisation
              }); 
            }
          });   
        }     
    });
});

//CREATE ROUTE
router.post("/", middleware.findOrganisation, middleware.isAuthenticatedBadmin, function(req, res){
  Survey.create({
    name: req.body.name,
    survey: JSON.parse(req.body.surveyText),
    organisation: req.organisation._id,
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
router.get("/:sid/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, middleware.findOrganisation,function(req, res){
    Survey.findById(req.params.sid, function(err, survey){
          if(err || !survey){
              req.flash("error", "Enquête niet gevonden.");
              res.redirect("/survey");
          } else {
              res.locals.scripts.header.surveyjs = true;
              res.locals.scripts.footer.surveyjs = true;
              res.locals.scripts.footer.surveyBuilder = true;
              var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
              var fullUrl = protocol + '://' + req.get('host');
              res.render("survey/edit", {survey: survey, schoolLevel: false, organisation: req.organisation});
          }
      });
});

// UPDATE ROUTE
router.post("/:sid",middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, middleware.findOrganisation, function(req, res){
  var checkActive = JSON.parse(req.body.isActive);
  Survey.findById(req.params.sid, async function(err, survey){
    if(err || !survey){
        res.contentType('json');
        res.send({ 
          success: false, 
          error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
        });
    } else {
        if(checkActive && !(survey.isActiveCompetenceSurvey || survey.isActiveSoftwareSurvey)){
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
            var fullUrl = protocol + '://' + req.get('host') + '/organisations/' + req.organisation._id + '/survey/' + survey._id;
            res.contentType('json');
            res.send({ success: true, redirect: fullUrl });
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

router.get("/:sid/competence", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, middleware.findOrganisation, function (req, res){
  var index = config.competence.survey.competenceCategories.findIndex((e) => e.identifier == req.params.sid);
  if(index == -1){
    req.flash("error", "Geen deskundigheidstest identifier gevonden om de enquête mee te vullen.");
    return res.redirect("/survey/");
  }
  var standard = config.competence.survey.competenceCategories[index];
  Survey.create({
    name: standard.title + " " + config.currentSchoolYear,
    survey: config.competence.survey[standard.identifier],
    organisation: req.organisation._id,
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
                res.redirect("/organisations/"+req.organisation._id+"/survey/");
            }  else {
                req.flash("success", "Enquête gemaakt");
                res.redirect("/organisations/"+req.organisation._id+"/survey/" + survey._id); 
            }
      });
});

router.get("/:sid/software", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, middleware.findOrganisation, function (req, res){
  var index = config.software.survey.assessmentCategories.findIndex((e) => e.identifier == req.params.sid);
  if(index == -1){
    req.flash("error", "Geen leermiddelentest identifier gevonden om de enquête mee te vullen.");
    return res.redirect("/organisations/"+req.organisation._id+"/survey/");
  }
  var assessment = config.software.survey.assessmentCategories[index];
  Survey.create({
    name: assessment.title + " " + config.currentSchoolYear,
    survey: config.software.survey[assessment.identifier],
    organisation: req.organisation._id,
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
                res.redirect("/organisations/"+req.organisation._id+"/survey/");
            }  else {
                req.flash("success", "Enquête gemaakt");
                res.redirect("/organisations/"+req.organisation._id+"/survey/" + survey._id); 
            }
      });
});

//DELETE ROUTE
router.delete("/:sid", middleware.isAuthenticatedBadmin, middleware.findOrganisation, function(req, res){
  Survey.findByIdAndRemove(req.params.sid, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer enquête opnieuw te verwijderen.");
          res.redirect("/organisations/"+req.organisation._id+"/survey/" + req.params.id);
      } else {
          req.flash("success", "Enquête verwijderd");
          res.redirect("/organisations/"+req.organisation._id+"/survey");  
      }
  });
});


module.exports = router;