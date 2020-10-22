var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Survey = require('../../models/survey');
var SurveyResult = require('../../models/surveyResult');
var middleware = require("../../middleware");
var config = require("../../config/config");
var moment = require("moment");
var transformResults = require("../../config/competence/transformSurveyResultsToTable");

router.get('/', middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id).populate('classroom').exec(function(err, school){
    if(err || !school){
      req.flash("error", "School niet gevonden.");
      res.redirect("back");
    } else {
      var classrooms = school.classroom.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      res.render('classroom/index', {school: school, classrooms: classrooms});
    }
  })
});

router.get("/score-table", middleware.isSchoolOwner, function(req, res){
   processDdlResults(req, res, 'score-table');
});

router.get("/survey-analytics", middleware.isSchoolOwner, function(req, res){
   processDdlResults(req, res, 'survey-analytics');
});

router.get("/boxplot-analysis", middleware.isSchoolOwner, function(req, res){
   processDdlResults(req, res, 'boxplot-analysis');
});

const processDdlResults = (req, res, path) => {
  School.findById(req.params.id)
   .populate("students")
   .exec(function(err, school){
    if(err ||!school){
      req.flash("error", "School niet gevonden.");
      res.redirect("back");
    } else {
        Survey.findOne({
            "organisation": school.organisation, 
            "isActiveCompetenceSurvey": true,
            "competenceStandardKey": "ddl"
          }, function(err, survey){
            var index = config.competence.survey.competenceCategories.findIndex((e) => e.identifier == 'ddl');
            if(index == -1){
              req.flash("error", "Geen definitie gevonden van deze vragenlijst");
              return res.redirect("back");
            }
            survey.survey = config.competence.survey.ddl;
            var standard = config.competence.survey.competenceCategories[index];
            if(err || !survey){
              req.flash("error", "Digitale Deskundigheid Leerlingen niet gevonden voor dit bestuur.");
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
                      //filter out surveyResults that have no user
                      var returnedSurveyResults = [];
                      surveyResults.forEach(function(surveyResult){
                        if(surveyResult.user && surveyResult.user._id){
                          returnedSurveyResults.push(surveyResult);
                        }
                      });
                        if(path === 'score-table'){
                          res.locals.scripts.header.datatables = true;
                          res.locals.scripts.footer.surveyjs = true;
                          res.locals.scripts.footer.datatables = true;
                          var results = transformResults(returnedSurveyResults);
                          res.render("competence/score-table", {
                            school: school,
                            users: school.students, 
                            survey: survey,
                            surveyResults: results
                          })
                        } else if(path === 'survey-analytics'){
                          res.locals.scripts.footer.surveyjs = true;
                          res.locals.scripts.header.surveyanalytics = true; 
                          res.render("competence/survey-analytics", {
                            school: school,
                            survey: survey,
                            surveyResults: returnedSurveyResults
                          })
                        } else if(path === 'boxplot-analysis'){
                          res.locals.scripts.header.plotly = true;
                          var statistics = config.competence.survey.calculateStatistics(survey, returnedSurveyResults);
                          res.render("competence/boxplot-analysis", {
                            school: school,
                            survey: survey,
                            surveyResults: returnedSurveyResults,
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