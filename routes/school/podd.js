var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Survey = require('../../models/survey');
var SurveyResult = require('../../models/surveyResult');
var middleware = require("../../middleware");
var config = require("../../config/config");
var moment = require("moment");

router.get("/", middleware.isSchoolOwner, function(req, res){
   processResults(req, res, 'general');
});

router.get("/score-table", middleware.isSchoolOwner, function(req, res){
   processResults(req, res, 'score-table');
});

router.get("/survey-analytics", middleware.isSchoolOwner, function(req, res){
   processResults(req, res, 'survey-analytics');
});

router.get("/boxplot-analysis", middleware.isSchoolOwner, function(req, res){
   processResults(req, res, 'boxplot-analysis');
});


const processResults = (req, res, path) => {
  School.findById(req.params.id)
   .populate("users")
   .exec(function(err, school){
    if(err ||!school){
      req.flash("error", "School niet gevonden.");
      res.redirect("back");
    } else {
        Survey.findOne({
            "organisation": school.organisation, 
            "isActiveCompetenceSurvey": true,
            "competenceStandardKey": "podd"
          }, function(err, survey){
            if(err || ! survey){
              req.flash("error", "Geen vragenlijst gevonden");
              return res.redirect("back");
            }
            var index = config.competence.survey.competenceCategories.findIndex((e) => e.identifier == 'podd');
            if(index == -1){
              req.flash("error", "Geen definitie gevonden van deze vragenlijst");
              return res.redirect("back");
            }
            survey.survey = config.competence.survey.podd;
            var standard = config.competence.survey.competenceCategories[index];
            if(err || !survey){
              req.flash("error", "Pillars Overzicht Digitale Deskundigheid niet gevonden voor dit bestuur.");
              res.redirect("back");
            } else {
                SurveyResult.find({
                    "survey": survey._id,
                    "school": school._id
                })
                .populate({path : 'user', populate : {path : 'organisation'}})
                .populate({path : 'user', populate : {path : 'school'}})
                .exec(function(err, surveyResults){
                    if(err){
                        req.flash("error", "Probleem bij inladen van resultaten ... " + err.message);
                        res.redirect("back");
                    } else {
                        if(path === 'general'){
                          var countPerDay = {};
                          surveyResults.forEach(function (elem) {
                              var date = moment(elem.createdAt).format("YYYY-MM-DD");
                              if (countPerDay[date]) {
                                  countPerDay[date] += 1;
                              } else {
                                  countPerDay[date] = 1;
                              }
                          });                                
                          res.locals.scripts.footer.chartjs = true;
                          res.render("competence/podd", {
                              school: school,
                              users: school.users, 
                              survey: survey,
                              standard: standard,
                              surveyResults: surveyResults,
                              countPerDay: countPerDay
                          });
                        } else if(path === 'score-table'){
                          res.locals.scripts.header.datatables = true;
                          res.locals.scripts.footer.surveyjs = true;
                          res.locals.scripts.footer.datatables = true;
                          res.render("competence/score-table", {
                            school: school,
                            users: school.users, 
                            survey: survey,
                            surveyResults: surveyResults
                          })
                        } else if(path === 'survey-analytics'){
                          res.locals.scripts.footer.surveyjs = true;
                          res.locals.scripts.header.surveyanalytics = true; 
                          res.render("competence/survey-analytics", {
                            school: school,
                            survey: survey,
                            surveyResults: surveyResults
                          })
                        } else if(path === 'boxplot-analysis'){
                          res.locals.scripts.header.plotly = true;
                          var statistics = config.competence.survey.calculateStatistics(survey, surveyResults);
                          res.render("competence/boxplot-analysis", {
                            school: school,
                            survey: survey,
                            surveyResults: surveyResults,
                            statistics: statistics
                          })
                        }
                    }
                })
            }
         });
    }
  });
}

module.exports = router;