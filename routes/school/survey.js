var express = require("express");
var router = express.Router({mergeParams: true});
var Survey = require("../../models/survey");
var School = require("../../models/school");
var SurveyResult = require("../../models/surveyResult");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");
var ObjectId = require('mongoose').Types.ObjectId; 
var json2csv = require("json2csv");

//INDEX ROUTE
router.get("/", middleware.isSchoolOwner, function(req, res){
    //find the school
    School.findById(req.params.id, function(err, school){
      if(err || !school) {
          req.flash("error", err.message);
          res.redirect("back");
      } else {
        Survey.find({$or: 
                        [
                          {school: req.params.id}, 
                          {$and: [
                            {organisation: school.organisation}, 
                            {isValidForAllOrganisation: true},
                            {isPublic: false},
                           ]},
                        ]})
                .sort({isActiveCompetenceSurvey:-1, isActiveSoftwareSurvey:-1})
                .exec(function(err, surveys){
                    if(err) {
                        req.flash("error", err.message);
                        res.redirect("back");
                    } else {
                        res.render("survey/index", {surveys: surveys, schoolLevel: true, school: school});         
                    }
                });
      }
    });
});

//NEW ROUTE
router.get("/new", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
      if(err || !school) {
          req.flash("error", err.message);
          res.redirect("back");
      } else {
        res.locals.scripts.header.surveyjs = true;
        res.locals.scripts.footer.surveyjs = true;
        res.locals.scripts.footer.surveyBuilder = true;
        var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
        var fullUrl = protocol + '://' + req.get('host');
        res.render("survey/new", {schoolLevel: true, school: school});
        
      }
  });
});

//SHOW ROUTE
router.get("/:sid", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
      if(err || !school){
        req.flash("error", "Probleem bij vinden van schoolgegevens.")
        res.redirect("back");
      } else {
        Survey.findById(req.params.sid, function(err, survey){
            if(err ||!survey){
              req.flash("error", "Enquête niet gevonden.");
              res.redirect("back");
            } else if(!survey.isPublic) {
              res.locals.scripts.header.surveyjs = true;
              res.locals.scripts.footer.surveyjs = true;
              res.locals.scripts.footer.surveyResults = true;
              res.locals.scripts.header.datatables = true;
              res.locals.scripts.footer.datatables = true;
              if(survey.isCompetenceSurvey || survey.isSoftwareSurvey){
                // res.locals.scripts.header.plotly = true;
                res.locals.scripts.header.surveyanalytics = true;   
              }
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
                    var isInArray = school.users.some(function (user) {
                        return user.equals(surveyResult.user && surveyResult.user._id ? surveyResult.user._id : 'nonesense');
                    });
                    if(isInArray){
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
                    school: school, 
                    survey: survey,
                    statistics: statistics,
                    bubbles: bubbles,
                    surveyResults: returnedSurveyResults, 
                    schoolLevel: true, 
                    fullUrl: fullUrl
                  }); 
                }
              });        
            } else {
              res.locals.scripts.header.surveyjs = true;
              res.locals.scripts.footer.surveyjs = true;
              res.locals.scripts.footer.surveyResults = true;
              SurveyResult.find({survey: new ObjectId(survey._id)})
              .populate('survey')
              .exec(function(err, surveyResults){
                if(err){
                  req.flash(err.message);
                  res.redirect("back");
                } else {
                  var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
                  var fullUrl = protocol + '://' + req.get('host');
                  res.render("survey/show", {school: school, survey: survey, surveyResults: surveyResults, schoolLevel: true, fullUrl: fullUrl}); 
                }
              });        
            } 
        });
      }
  });
});

//CREATE ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
      if(err || !school){
        req.flash("error", "Probleem bij vinden van schoolgegevens.")
        return res.redirect("back");
      }
     Survey.create({
        name: req.body.name,
        surveyId: req.body.surveyId,
        survey: JSON.parse(req.body.surveyText),
        organisation: req.user.organisation,
        school: school,
        isValidForAllOrganisation: false,
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
                    res.locals.scripts.header.surveyjs = false;
                    res.locals.scripts.footer.surveyjs = false;
                    res.locals.scripts.footer.surveyBuilder = false;
                    var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
                    var fullUrl = protocol + '://' + req.get('host');
                    res.contentType('json');
                    res.send({ success: true, redirect: fullUrl + '/schools/' + req.params.id + '/survey/' + survey._id });
                }
          }); 
  });
});
   
// //EDIT ROUTE
router.get("/:sid/edit", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
      if(err || !school){
        req.flash("error", "Probleem bij vinden van schoolgegevens.")
        res.redirect("back");
      } else {
        Survey.findById(req.params.sid, function(err, survey){
            if(err || !survey){
                req.flash("error", "Enquête niet gevonden.");
                res.redirect("/survey");
            } else {
                res.locals.scripts.header.surveyjs = true;
                res.locals.scripts.footer.surveyjs = true;
                res.locals.scripts.footer.surveyBuilder = true;
                var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
                var fullUrl = protocol + '://' + req.get('host');
                res.render("survey/edit", {survey: survey, schoolLevel: true, school: school});
            }
        });
     }
  });
});

// //UPDATE ROUTE
router.post("/:sid", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  var updatedSurvey = {
    name: req.body.name,
    survey: JSON.parse(req.body.surveyText),
    isPublic: req.body.isPublic
  }
  Survey.findByIdAndUpdate(req.params.sid, updatedSurvey, function(err, survey){
    if(err || !survey){
        res.contentType('json');
        res.send({ 
          success: false, 
          error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
        });
    } else {
        res.locals.scripts.header.surveyjs = false;
        res.locals.scripts.footer.surveyjs = false;
        res.locals.scripts.footer.surveyBuilder = false;
        var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        var fullUrl = protocol + '://' + req.get('host');
        res.contentType('json');
        res.send({ success: true, redirect: fullUrl + '/schools/' + req.params.id + '/survey/' + survey._id });
    }
  });
});

//DELETE ROUTE
router.delete("/:sid", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  Survey.findByIdAndRemove(req.params.sid, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer enquête opnieuw te verwijderen.");
          res.redirect("/schools/"+req.params.id+"/survey/" + req.params.sid);
      } else {
          req.flash("success", "Enquête verwijderd");
          res.redirect("/schools/"+req.params.id+"/survey");  
      }
  });
});

//DOWNLOAD ROUTE SURVEY RESULTS FOR ORGANISATION
router.get("/:sid/download", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    Survey.findById(req.params.sid, function(err, survey){
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

module.exports = router;