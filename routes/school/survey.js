var express = require("express");
var router = express.Router({mergeParams: true});
var Survey = require("../../models/survey");
var School = require("../../models/school");
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
    //find the school
    School.findById(req.params.id, function(err, school){
      if(err || !school) {
          req.flash("error", err.message);
          res.redirect("back");
      } else {
        Survey.find({$or: 
                        [
                          {school: req.params.id}, 
                          {$and: [{organisation: school.organisation}, {isValidForAllOrganisation: true}]}
                        ]})
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
        var fullUrl = req.protocol + '://' + req.get('host');
        res.render("survey/new", {schoolLevel: true, school: school});
        
      }
  });
});

//SHOW ROUTE
router.get("/:sid", middleware.isLoggedIn, function(req, res){
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
                  res.render("survey/show", {school: school, survey: survey, surveyResults: surveyResults, schoolLevel: true, fullUrl: fullUrl}); 
                }
              });        
            } else {
              SurveyResult.find({survey: new ObjectId(survey._id)})
              .populate('survey')
              .exec(function(err, surveyResults){
                if(err){
                  req.flash(err.message);
                  res.redirect("back");
                } else {
                  var fullUrl = req.protocol + '://' + req.get('host');
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
                    var fullUrl = req.protocol + '://' + req.get('host');
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
                var fullUrl = req.protocol + '://' + req.get('host');
                res.render("survey/edit", {survey: survey, schoolLevel: true});
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
        var fullUrl = req.protocol + '://' + req.get('host');
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

module.exports = router;