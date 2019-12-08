var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var User = require("../../models/user");
var SurveyResult = require("../../models/surveyResult");
var middleware = require("../../middleware");
var config = require("../../config/config");
var Survey = require("../../models/survey");
var _ = require("lodash");

//SHOW ROUTE - PROFILE PAGE
router.get("/", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id).populate("organisation").exec(function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      res.render("user/show", {user: user}); 
    }
  });
});


//SHOW ROUTE - READY WITH FILLING QUESTIONS PAGE
router.get("/ready", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      res.render("user/ready", {user: user});        
    }
  });
});


router.get("/surveys", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id).populate("organisation").exec(function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      SurveyResult.find({"user": user._id, "isCompetenceSurvey": true})
      .populate("survey")
      .sort("createdAt")
      .exec(function(err, surveyResults){
        if(err){
          req.flash("error", "Onbekende fout: " + err.message);
          res.redirect("back");
        } else {
          var existingSurveySurveyResults = surveyResults.filter(sr => sr.survey && sr.survey._id);
          res.locals.scripts.footer.dashboard = true;
          res.render("user/surveys", {surveyResults: existingSurveySurveyResults, user: user});
        }
      });
    }
  });
});

//SHOW ROUTE
router.get("/competence", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id)
  .exec(function(err, user){
    if(err ||!user){
      req.flash("error", "Medewerker niet gevonden.");
      res.redirect("back");
    } else {
      Survey.find({
        "organisation": user.organisation, 
        "isCompetenceSurvey": true
      }, async function(err, surveys){
        let results = [];
        let filledSurveys = [];
        await asyncForEach(surveys, async function(survey, index){
           let result = await retrieveUserSurveyResults(survey, user);
           if(result.count > 0){
             results.push(result);
             filledSurveys.push(survey);
           }
           if(index==surveys.length-1){
            res.locals.scripts.header.plotly = true;
            res.locals.scripts.footer.competence = true;
            res.render("user/competence", {
              user: user, 
              surveys: filledSurveys, 
              results: results
            })
          }
        });   
      })        
    }
  });
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function retrieveUserSurveyResults(survey, user){
  return new Promise(function(resolve, reject) {
    SurveyResult.find({"survey": survey._id}).populate('user').exec(function(err, surveyResults){
      if(err){
        return resolve({
          average: 0,
          comparingAverage: 0,
          count: 0,
          comparingCount: 0
        });
      } else {
        var organisationSurveyResults = surveyResults.filter(sr => sr.user && sr.user._id);
        var organisationStatistics = config.competence.survey.calculateStatistics(survey, organisationSurveyResults);
        var schoolSurveyResults; var schoolStatistics;
        if(user.role =='sadmin' || user.role =='suser'){
          schoolSurveyResults = organisationSurveyResults.filter(sr => sr.school && sr.school.equals(user.school[0]));
          schoolStatistics = config.competence.survey.calculateStatistics(survey, schoolSurveyResults);
        }
        var userSurveyResults = organisationSurveyResults.filter(sr => sr.user && sr.user.equals(user._id));
        var userStatistics = config.competence.survey.calculateStatistics(survey, userSurveyResults);
        return resolve({
          average: _.mean(userStatistics[0].statistics),
          comparingAverage: user.role=='sadmin' || user.role=='suser' ?
                   _.mean(schoolStatistics[0].statistics) :_.mean(organisationStatistics[0].statistics),
          count: _.size(userStatistics[0].statistics),
          comparingCount: user.role=='sadmin' || user.role=='suser' ? 
                 _.size(schoolStatistics[0].statistics) : _.size(organisationStatistics[0].statistics)
        });
       }
    })
  });
}


//EDIT ROUTE - EDIT PROFILE PAGE
router.get("/edit", middleware.isNotDemoAccount, middleware.isUser, function(req,res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", "Geen gebruiker gevonden of onbekende fout");
      res.redirect("back");
    } else {
      res.locals.scripts.header.uploadcare = true;
      res.render("user/edit", {user: user});
    }
  });
});


//UPDATE route to store edited user to database
router.put("/", middleware.isNotDemoAccount, middleware.isUser, function(req, res){
  User.findByIdAndUpdate(req.params.id, req.body.user, function(err, user){
    if(err || !user) {
      req.flash('error', "Geen gebruiker gevonden");
      res.redirect("back");
    }  else {
      req.flash("success", "Profiel updated");
      res.redirect("/user/"+user._id);
    }
  });
});


module.exports = router;