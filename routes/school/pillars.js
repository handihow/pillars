var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Standard = require("../../models/standard");
var SurveyResult = require("../../models/surveyResult");
var middleware = require("../../middleware");
var score = require("../../config/score");
var calcs = require("../../config/competence/survey")

//SHOW ROUTE
router.get("/", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id)
      .populate("hardware")
      .populate("software")
      .populate("standard")
      .populate("users")
      .exec(async function(err, school){
      if(err ||!school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else if(!school.standard){
            //check if the school has standard set up
            return res.redirect("/schools/"+school.id+"/pillars/settings");
      } else {
          //filter hardware
          school.hardware = filterHardwareForPillarsScore(school);
          school.software = filterSoftwareForPillarsScore(school);
          SurveyResult.find({isCompetenceSurvey: true}).populate("survey").exec(function(err, surveyResults){
            if(err){
              req.flash("error", "Probleem bij het vinden van testresultaten");
              return res.redirect("back");
            }
            let schoolSurveyResults = [];
            school.users.forEach(function(user){
              if(user && user._id){
                var filteredResults = surveyResults.filter(sr => sr.user._id.equals(user._id) );
                schoolSurveyResults = schoolSurveyResults.concat(filteredResults);  
              }
            });
            let calculatedSurveyResults = [];
            schoolSurveyResults.forEach(function(result){
              if(result.score){
                calculatedSurveyResults.push(result);  
              } else {
                var resultToBeAnalyzed = [];
                resultToBeAnalyzed.push(result);
                var statistics = calcs.calculateStatistics(result.survey, resultToBeAnalyzed);
                result.score = statistics[0].statistics[0] / 100;
                calculatedSurveyResults.push(result);
              }
            });
            var filteredSurveyResults = [];
            if(school.timeRange=="20172018"){
              filteredSurveyResults = calculatedSurveyResults.filter(r => r.createdAt >= new Date(2017, 8, 1) && r.createdAt <= new Date(2018, 7, 31))
            } else if(school.timeRange=="20182019"){
              filteredSurveyResults = calculatedSurveyResults.filter(r => r.createdAt >= new Date(2018, 8, 1) && r.createdAt <= new Date(2019, 7, 31))
            } else if(school.timeRange=="20192020"){
              filteredSurveyResults = calculatedSurveyResults.filter(r => r.createdAt >= new Date(2019, 8, 1) && r.createdAt <= new Date(2020, 7, 31))
            } else {
              filteredSurveyResults = calculatedSurveyResults;
            }
            var result = score.calculate(school, filteredSurveyResults);
            res.locals.scripts.footer.chartjs = true;
            res.locals.scripts.footer.pillars = true;
            res.render("pillars/show", {school: school, result: result}); 
          });                  
      }
  });
});

function filterHardwareForPillarsScore(school){
  if(school.timeRange == '20172018'){
    return school.hardware.filter(h => h.created < new Date(2018, 9, 1));
  } else {
    return school.hardware;
  }
}

function filterSoftwareForPillarsScore(school){
  if(school.timeRange == '20172018'){
    console.log(school.software.filter(h => h.created < new Date(2018, 9, 1)).length);
    return school.software.filter(h => h.created < new Date(2018, 9, 1));
  } else {
    console.log(school.software.length);
    return school.software;
  }
}

//EDIT PILLARS INSTELLINGEN ROUTE
router.get("/settings", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
      if(err || !school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          Standard.find({organisation: school.organisation}, function(err, standards){
            if(err || !standards || !standards[0]){
              req.flash("error", "Geen normering gevonden. Vraag het bestuur om normering toe te voegen aan Pillars.");
              res.redirect("back");
            } else {
              res.render("pillars/settings", {school: school, standards: standards});
            }
          });
      }
  });
});

//UPDATE ROUTE
router.put("/settings", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
      if(err || !school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          req.flash("success", "Pillars Normering Ingesteld");
          res.redirect("/schools/" + school._id + "/pillars");
      }
    });
});

module.exports = router;