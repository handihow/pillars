var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Survey = require('../../models/survey');
var SurveyResult = require('../../models/surveyResult');
var middleware = require("../../middleware");
var config = require("../../config/config");
var moment = require("moment");

router.get("/", middleware.isSchoolOwner, function(req, res){
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
            var index = config.competence.survey.competenceCategories.findIndex((e) => e.identifier == 'podd');
            if(index == -1){
              req.flash("error", "Geen definitie gevonden van deze vragenlijst");
              return res.redirect("back");
            }
            var standard = config.competence.survey.competenceCategories[index];
            if(err || !survey){
              req.flash("error", "Pillars Overzicht Digitale Deskundigheid niet gevonden voor dit bestuur.");
              res.redirect("back");
            } else {
                SurveyResult.find({
                    "survey": survey._id,
                    "school": school._id
                }, function(err, surveyResults){
                    if(err){
                        req.flash("error", "Probleem bij inladen van resultaten ... " + err.message);
                        res.redirect("back");
                    } else {
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
                        res.render("competence/index", {
                            school: school,
                            users: school.users, 
                            survey: survey,
                            standard: standard,
                            surveyResults: surveyResults,
                            countPerDay: countPerDay
                        });
                    }
                })
            }
         });

    }
  });
});


module.exports = router;