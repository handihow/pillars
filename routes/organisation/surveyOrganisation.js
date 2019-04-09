var express = require("express");
var router = express.Router();
var Survey = require("../../models/survey");
var SurveyResult = require("../../models/surveyResult");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");
var ObjectId = require('mongoose').Types.ObjectId; 
var json2csv = require("json2csv");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  Survey.find({organisation: req.user.organisation}).populate("school").exec(function(err, surveys){
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
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyResults = true;
          SurveyResult.find({survey: new ObjectId(survey._id)})
          .populate('user')
          .populate({path : 'user', populate : {path : 'organisation'}})
          .populate({path : 'user', populate : {path : 'school'}})
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
}

router.get("/:id/competence", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function (req, res){
  var index = config.competence.questionnaire.competenceCategories.findIndex((e) => e.identifier == req.params.id);
  if(index == -1){
    req.flash("error", "Geen deskundigheidstest identifier gevonden om de enquête mee te vullen.");
    return res.redirect("/survey/");
  }
  var standard = config.competence.questionnaire.competenceCategories[index];
  Survey.create({
    name: standard.title,
    survey: config.competence.questionnaire[standard.identifier],
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

//DOWNLOAD ROUTE SURVEY RESULTS FOR ORGANISATION
router.get("/:id/download", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    Survey.findById(req.params.id, function(err, survey){
        if(err ||!survey){
          req.flash("error", "Enquête niet gevonden.");
          res.redirect("back");
        } else if(!survey.isPublic) {
          SurveyResult.find({survey: new ObjectId(survey._id)})
          .populate('user')
          .populate({path : 'user', populate : {path : 'organisation'}})
          .populate({path : 'user', populate : {path : 'school'}})
          .exec(function(err, surveyResults){
            if(err){
              req.flash(err.message);
              res.redirect("back");
            } else {
              var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
              var fullUrl = protocol + '://' + req.get('host');
              var surveyResultList = [];
              var surveyAnswerKeys;
              surveyResults.forEach(function(surveyResult){
                surveyResult.date = surveyResult.createdAt.toJSON().slice(0,10).split('-').reverse().join('/');
                surveyResult.firstName = surveyResult.user.firstName;
                surveyResult.lastName = surveyResult.user.lastName;
                surveyResult.email = surveyResult.user.username;
                surveyResult.organisation = surveyResult.user.organisation.name;
                surveyResult.school = surveyResult.user.school.map(s => s.name);
                surveyResult.link = fullUrl + "/survey/" + surveyResult._id + "/result";
                if(surveyResult.result){
                  surveyAnswerKeys = Object.keys(surveyResult.result);
                  Object.keys(surveyResult.result).forEach(function(key){
                    if(surveyResult.result && surveyResult.result[key]){
                      surveyResult[key] = typeof surveyResult.result[key] == 'string' ? surveyResult.result[key] : JSON.stringify(surveyResult.result[key]);
                    }  
                  });
                } 
                surveyResultList.push(surveyResult);
              });
              var fields = ['date', 'firstName', 'lastName', 'email', 'organisation', 'school', 'link'].concat(surveyAnswerKeys);
              var fieldNames = ['Datum', 'Voornaam', 'Achternaam', 'Email', 'Organisatie', 'School', 'Link'].concat(surveyAnswerKeys);
              json2csv({ data: surveyResultList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
                if(err){
                  req.flash("error", err.message);
                  res.redirect("back");
                } else {
                  res.setHeader('Survey-download', 'attachment; filename=surveyResults.csv');
                  res.set('Content-Type', 'text/csv');
                  res.status(200).send(csv);
                }
              });
            }
          });        
        } else {
          SurveyResult.find({survey: new ObjectId(survey._id)})
          .exec(function(err, surveyResults){
            if(err){
              req.flash(err.message);
              res.redirect("back");
            } else {
              var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
              var fullUrl = protocol + '://' + req.get('host');
              var surveyResultList = [];
              var surveyAnswerKeys;
              surveyResults.forEach(function(surveyResult){
                surveyResult.date = surveyResult.createdAt.toJSON().slice(0,10).split('-').reverse().join('/');
                surveyResult.link = fullUrl + "/survey/" + surveyResult._id + "/result";
                if(surveyResult.result){
                  surveyAnswerKeys = Object.keys(surveyResult.result);
                  Object.keys(surveyResult.result).forEach(function(key){
                    if(surveyResult.result && surveyResult.result[key]){
                      surveyResult[key] = typeof surveyResult.result[key] == 'string' ? surveyResult.result[key] : JSON.stringify(surveyResult.result[key]);
                    }  
                  });
                }    
                surveyResultList.push(surveyResult);
              });
              var fields = ['date', 'link'].concat(surveyAnswerKeys);
              var fieldNames = ['Datum', 'Link'].concat(surveyAnswerKeys);
              json2csv({ data: surveyResultList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
                if(err){
                  req.flash("error", err.message);
                  res.redirect("back");
                } else {
                  res.setHeader('Survey-download', 'attachment; filename=surveyResults.csv');
                  res.set('Content-Type', 'text/csv');
                  res.status(200).send(csv);
                }
              }); 
            }
          });        
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
            res.locals.scripts.header.surveyjs = true;
            res.locals.scripts.footer.surveyjs = true;
            res.locals.scripts.footer.surveyPrivate = true;
            res.render("survey/private", {survey: survey});            
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
            console.log('error on block1');
            res.contentType('json');
            res.send({ 
                success: false, 
                error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
              });

          } else if(surveyResult.length>0) {

            console.log('error on block2');

            res.contentType('json');
            res.send({ 
                success: false, 
                error: 'Foutmelding: u heeft deze enquête al eerder ingevuld.'
              });


          } else {
            
            SurveyResult.create({
              survey: req.params.id,
              result: JSON.parse(req.body.result),
              organisation: req.user.organisation,
              user: req.user._id,
              isCompetenceSurvey: survey.isCompetenceSurvey ? true : false,
              competenceStandardKey: survey.competenceStandardKey ? survey.competenceStandardKey : '',
              competenceStandardTitle: survey.competenceStandardTitle ? survey.competenceStandardTitle : '',
            }, function(err, surveyResult){
              if (err) {
                console.log('error on block 4');
                res.contentType('json');
                res.send({ 
                    success: false, 
                    error: 'Probleem bij bewaren van de enquête resultaten. Server geeft fout: ' + err.message 
                  });
              } else {
                res.contentType('json');
                res.send({ success: true, surveyResultId:  surveyResult._id});
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



module.exports = router;