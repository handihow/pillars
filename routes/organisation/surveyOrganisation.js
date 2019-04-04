var express = require("express");
var router = express.Router();
var Survey = require("../../models/survey");
var SurveyResult = require("../../models/surveyResult");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");
var ObjectId = require('mongoose').Types.ObjectId; 

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  //reset all scripts if possible
  res.locals.scripts.header.surveyjs = false;
  res.locals.scripts.footer.surveyjs = false;
  res.locals.scripts.footer.surveyBuilder = false;
  res.locals.scripts.footer.surveyPrivate = false;
  res.locals.scripts.footer.surveyPublic = false;
  res.locals.scripts.footer.surveyResult= false;
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
          SurveyResult.find({survey: new ObjectId(survey._id)})
          .populate('user')
          .populate({path : 'user', populate : {path : 'organisation'}})
          .populate({path : 'user', populate : {path : 'school'}})
          .exec(function(err, surveyResults){
            if(err){
              req.flash(err.message);
              res.redirect("back");
            } else {
              var fullUrl = req.protocol + '://' + req.get('host');
              res.render("survey/show", {survey: survey, surveyResults: surveyResults, schoolLevel: false, fullUrl: fullUrl}); 
            }
          });        
        } else {
          SurveyResult.find({survey: new ObjectId(survey._id)})
          .exec(function(err, surveyResults){
            if(err){
              req.flash(err.message);
              res.redirect("back");
            } else {
              var fullUrl = req.protocol + '://' + req.get('host');
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
    surveyId: req.body.surveyId,
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
                res.locals.scripts.header.surveyjs = false;
                res.locals.scripts.footer.surveyjs = false;
                res.locals.scripts.footer.surveyBuilder = false;
                var fullUrl = req.protocol + '://' + req.get('host');
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
              var fullUrl = req.protocol + '://' + req.get('host');
              res.render("survey/edit", {survey: survey, schoolLevel: false});
          }
      });
});

// UPDATE ROUTE
router.post("/:id",middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  var updatedSurvey = {
    name: req.body.name,
    survey: JSON.parse(req.body.surveyText),
    isPublic: req.body.isPublic
  }
  Survey.findByIdAndUpdate(req.params.id, updatedSurvey, function(err, survey){
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
        var fullUrl = req.protocol + '://' + req.get('host');
        res.contentType('json');
        res.send({ success: true, redirect: fullUrl + '/survey' });
    }
  });
});

//DELETE ROUTE
router.delete("/:id", middleware.isAuthenticatedBadmin, function(req, res){
  Survey.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer enquête opnieuw te verwijderen.");
          res.redirect("/survey/" + req.params.pid);
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

            res.contentType('json');
            res.send({ 
                success: false, 
                error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
              });

          } else if(surveyResult.length>0) {


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
            }, function(err, surveyResult){
              if (err) {
                res.contentType('json');
                res.send({ 
                    success: false, 
                    error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
                  });
              } else {
                res.locals.scripts.header.surveyjs = false;
                res.locals.scripts.footer.surveyjs = false;
                res.locals.scripts.footer.surveyPrivate = false;
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
            res.locals.scripts.header.surveyjs = false;
            res.locals.scripts.footer.surveyjs = false;
            res.locals.scripts.footer.surveyPublic = false;
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