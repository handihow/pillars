var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var User = require("../../models/user");
var SurveyResult = require("../../models/surveyResult");
var middleware = require("../../middleware");
var config = require("../../config/config");
var Survey = require("../../models/survey");
var Email = require("../../models/email");
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


router.get("/surveys", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id).populate("organisation").exec(function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      SurveyResult.find({"user": user._id, "isCompetenceSurvey": true})
      .populate("survey")
      .sort({"createdAt" : -1})
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

router.get("/emails", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id).sort({"createdAt" : -1}).exec(function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      Email.find({user: user}, function(err, emails){
        if(err){
          req.flash("error", err);
          res.redirect("back");
        } else {
          res.render("email/index", {user: user, emails: emails});  
        }
      });
    }
  });
});

//SHOW ROUTE - READY WITH FILLING QUESTIONS PAGE
router.get("/ready", middleware.isLoggedIn, function(req, res){
  getUserReport(req, res, 'ready');
});

router.get("/pdf", middleware.isLoggedIn, function(req, res){
  getUserReport(req, res, 'pdf');
});

function getUserReport(req, res, type){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", "Medewerker niet gevonden.");
      res.redirect("back");
    } else {
      Survey.find({
            "organisation": user.organisation, 
            "isCompetenceSurvey": true
      }).sort({ name: 1 }).exec(async function(err, surveys){
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
            res.locals.scripts.footer.pdf = true;
            res.render("user/" + type, {
              user: user, 
              surveys: filledSurveys, 
              results: results
            })
          }
        });   
      })        
    }
  });
}


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function retrieveUserSurveyResults(survey, user){
  return new Promise(function(resolve, reject) {
    SurveyResult.find({"survey": survey._id}).populate('user').exec(function(err, surveyResults){
      if(err || surveyResults.length === 0){
        return resolve({
          average: 0,
          comparingAverage: 0,
          count: 0,
          comparingCount: 0,
          id: null
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
        let userAverage = _.mean(userStatistics[0].statistics);
        let comparingAverage = user.role=='sadmin' || user.role=='suser' ?
                   _.mean(schoolStatistics[0].statistics) :_.mean(organisationStatistics[0].statistics);
        let count = _.size(userStatistics[0].statistics);
        let comparingCount = user.role=='sadmin' || user.role=='suser' ? 
                 _.size(schoolStatistics[0].statistics) : _.size(organisationStatistics[0].statistics);
        let difference = Math.round(Math.abs(userAverage - comparingAverage))
        let differenceStr = userAverage<comparingAverage ? 'lager' : 'hoger'
        let autoAdvice = userAverage < survey.minimumLevel ? 
                            'Je scoort lager dan het minimum streefniveau van ' + survey.minimumLevel + ' %' :
                            userAverage > survey.highLevel ? 
                            'Je scoort hoger dan ' + survey.highLevel + 
                            ' % op dit onderdeel. Je kunt wellicht je kennis op dit gebied delen met het team.' + 
                            ' Bespreek dit aub met de schoolleiding.' :
                            'Jouw score op dit onderdeel is conform de richtlijnen van het bestuur (tussen ' +
                            survey.minimumLevel + ' en ' + survey.highLevel + ' %)';
        let autoColor = userAverage < survey.minimumLevel ? 'red' : userAverage > survey.highLevel ? 'green' : '';
        return resolve({
          average: userAverage,
          comparingAverage: comparingAverage,
          count: count,
          comparingCount: comparingCount,
          difference: difference,
          differenceStr: differenceStr,
          autoAdvice: autoAdvice,
          autoColor: autoColor,
          id: userSurveyResults && userSurveyResults[0] ? userSurveyResults[0]._id : null
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