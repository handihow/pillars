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
          let surveyResults = await retrieveSurveyResultsForPillarsScore(school);
          var result = score.calculate(school, surveyResults);
          res.locals.scripts.footer.chartjs = true;
          res.locals.scripts.footer.pillars = true;
          res.render("pillars/show", {school: school, result: result});            
      }
  });
});

function retrieveSurveyResultsForPillarsScore(school){
  return new Promise(function(resolve, reject) {
    if(!school.users){
      return reject(null);
    }
    var surveyResults = [];
    var filter = {isCompetenceSurvey: true};
    school.users.forEach(function(user, index, users){
      filter.user = user;
      SurveyResult
        .find(filter)
        .populate("survey")
        .exec(function(err, userSurveyResults){
            if(err){
              return reject(null);
            }
            userSurveyResults.forEach(function(result){
              if(result.score){
                surveyResults.push(result);  
              } else {
                var resultToBeAnalyzed = [];
                resultToBeAnalyzed.push(result);
                var statistics = calcs.calculateStatistics(result.survey, resultToBeAnalyzed);
                result.score = statistics[0].statistics[0] / 100;
                surveyResults.push(result);
              }
            });
            if(index == users.length - 1){
              if(school.timeRange == '20172018'){
                return resolve(surveyResults.filter(r => r.createdAt >= new Date(2017, 8, 1) && r.createdAt <= new Date(2018, 7, 31)));
              } else if(school.timeRange == '20182019'){
                return resolve(surveyResults.filter(r => r.createdAt >= new Date(2018, 8, 1) && r.createdAt <= new Date(2019, 7, 31)));
              }
              return resolve(surveyResults);
            }
      });
    });
  });
}

function filterHardwareForPillarsScore(school){
  if(school.timeRange == '20172018'){
    return school.hardware.filter(h => h.created < new Date(2018, 9, 1));
  } else {
    return school.hardware;
  }
}

function filterSoftwareForPillarsScore(school){
  if(school.timeRange == '20172018'){
    return school.software.filter(h => h.created < new Date(2018, 9, 1));
  } else {
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