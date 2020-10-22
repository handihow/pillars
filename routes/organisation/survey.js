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
var transformResults = require("../../config/competence/transformSurveyResultsToTable");

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

//SHOW ROUTE
router.get("/:sid", middleware.isLoggedIn, middleware.findOrganisation, function(req, res){
  handleShowRoute(req, res, 50);
});

//SHOW ALL ROUTE
router.get("/:sid/all", middleware.isLoggedIn, middleware.findOrganisation, function(req, res){
  handleShowRoute(req, res, 2000);
});

function handleShowRoute(req, res, limit){
  Survey.findById(req.params.sid, function(err, survey){
        if(err ||!survey){
          req.flash("error", "Enquête niet gevonden.");
          return res.redirect("back");
        }
        var surveyDefinition;
        if(survey.competenceStandardKey){
          surveyDefinition = config.competence.survey[survey.competenceStandardKey]; 
        } else {
          surveyDefinition = config.software.survey[survey.softwareStandardKey];
        }
        if(!surveyDefinition){
          req.flash("error", "Geen definitie gevonden van deze vragenlijst");
          return res.redirect("back");
        }
        survey.survey = surveyDefinition;
        SurveyResult.find({survey: new ObjectId(survey._id)})
        .limit(limit)
        .populate('user')
        .populate({path : 'user', populate : {path : 'organisation'}})
        .populate({path : 'user', populate : {path : 'school'}})
        .exec(function(err, surveyResults){
          if(err){
            req.flash(err.message);
            return res.redirect("back");
          }
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
          res.locals.scripts.header.surveyjs = true;
          res.locals.scripts.header.surveyanalytics = true;  
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyResults = true;
          res.locals.scripts.header.datatables = true;
          res.locals.scripts.footer.datatables = true;
          var results;
          if(survey.competenceStandardKey === 'podd' || survey.competenceStandardKey === 'ddl'){
            results = transformResults(returnedSurveyResults);
          } else {
            results = returnedSurveyResults;
          }
          res.render("survey/show", {
            survey: survey,
            surveyResults: results,
            statistics: statistics,
            bubbles: bubbles,
            schoolLevel: false, 
            fullUrl: fullUrl,
            limited: returnedSurveyResults.length > 49 ? true : false,
            organisation: req.organisation
          }); 
        }); 
    });
}

//CREATE ROUTE
router.get("/:sid/competence", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, middleware.findOrganisation, function (req, res){
  var index = config.competence.survey.competenceCategories.findIndex((e) => e.identifier == req.params.sid);
  if(index == -1){
    req.flash("error", "Geen definitie gevonden van deze vragenlijst");
    return res.redirect("/survey/");
  }
  var standard = config.competence.survey.competenceCategories[index];
  Survey.create({
    name: standard.title + " " + config.currentSchoolYear,
    organisation: req.organisation._id,
    isValidForAllOrganisation: true,
    owner: req.user._id,
    isPublic: false,
    isCompetenceSurvey: true,
    competenceStandardKey: standard.identifier,
    competenceStandardTitle: standard.title,
    surveyOption: standard.surveyOption,
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
    req.flash("error", "Geen definitie gevonden van deze vragenlijst");
    return res.redirect("/organisations/"+req.organisation._id+"/survey/");
  }
  var assessment = config.software.survey.assessmentCategories[index];
  Survey.create({
    name: assessment.title + " " + config.currentSchoolYear,
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
    
// //EDIT ROUTE
router.get("/:sid/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, middleware.findOrganisation,function(req, res){
    Survey.findById(req.params.sid, function(err, survey){
          if(err || !survey){
              req.flash("error", "Enquête niet gevonden.");
              res.redirect("/survey");
          } else {
              res.render("survey/edit", {survey: survey, schoolLevel: false, organisation: req.organisation});
          }
      });
});

// UPDATE ROUTE
router.put("/:sid",middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, middleware.findOrganisation, function(req, res){
  console.log(req.body.isActive);
  var checkActive = false;
  if(req.body.isActive && req.body.isActive !=="false" && req.body.isActive.length > 1 ){
    checkActive = true;
  }
  console.log(checkActive);
  Survey.findById(req.params.sid, async function(err, survey){
    if(err || !survey){
      req.flash("error", 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message);
      res.redirect("back");
    } else {
        if(checkActive && !(survey.isActiveCompetenceSurvey || survey.isActiveSoftwareSurvey)){
          //check if there is not already an active survey, thow error it needed
          var hasActiveSurvey = await checkActiveSurvey(req, res, survey);
          if(hasActiveSurvey){
            req.flash("error", 'Foutmelding: er is een actieve enquête gevonden op dit onderdeel. Deactiveer deze enquête eerst.')
            return res.redirect("back");
          }
        }
        survey.name = req.body.name;
        if(survey.isCompetenceSurvey){
          survey.isActiveCompetenceSurvey = checkActive;
          survey.minimumLevel = req.body.minimumLevel;
          survey.highLevel = req.body.highLevel;
        } else if(survey.isSoftwareSurvey){
          survey.isActiveSoftwareSurvey = checkActive;
        }
        survey.save(function(err, survey){
          if(err){
             req.flash("error", 'Fout bij bewaren enquête. Server geeft fout: ' + err.message);
             res.redirect("back");
          } else {
            res.redirect("/organisations/"+req.organisation._id+"/survey/" + survey._id);
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