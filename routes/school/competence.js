var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Questionnaire = require('../../models/questionnaire');
var Survey = require('../../models/survey');
var SurveyResult = require('../../models/surveyResult');
var middleware = require("../../middleware");
var json2csv = require("json2csv");
var config = require("../../config/config");

router.use(function(req,res,next){
  res.locals.config = config.competence;
  next();
})

//SHOW ROUTE
router.get("/", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id)
  .populate("organisation")
  .exec(function(err, school){
    if(err ||!school){
      req.flash("error", "School niet gevonden.");
      res.redirect("back");
    } else {
      Survey.find({
        "organisation": school.organisation, 
        "isActiveCompetenceSurvey": true
      }, async function(err, surveys){
        var averages = [];
        var counts = [];
        var comparingAverages = [];
        var comparingCounts = [];
        await asyncForEach(surveys, async function(survey, index){
           let results = await retrieveSurveyResults(survey, school);
           averages.push(results.average);
           comparingAverages.push(results.comparingAverage);
           counts.push(results.count);
           comparingCounts.push(results.comparingCount);
           if(index==surveys.length-1){
            res.locals.scripts.header.plotly = true;
            res.locals.scripts.footer.competence = true;
            res.render("competence/show", {school: school, surveys: surveys, averages: averages, 
              comparingAverages: comparingAverages, counts: counts, comparingCounts: comparingCounts})
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

function retrieveSurveyResults(survey, school){
  return new Promise(function(resolve, reject) {
    SurveyResult.find({"survey": survey._id}, function(err, surveyResults){
        if(err){
          return resolve({
            average: 0,
            comparingAverage: 0,
            count: 0,
            comparingCount: 0
          });
        } else {
          var returnedSurveyResults = [];
          var schoolStatistics = [];
          var comparingResults = [];
          surveyResults.forEach(function(surveyResult){
            var isInArray = school.users.some(function (user) {
                return user.equals(surveyResult.user._id);
            });
            if(isInArray){
              returnedSurveyResults.push(surveyResult);
            } 
            comparingResults.push(surveyResult);
          });
          schoolStatistics = config.competence.survey.calculateStatistics(survey, returnedSurveyResults);
          organisationStatistics = config.competence.survey.calculateStatistics(survey, comparingResults);
          if(schoolStatistics[0].statistics.length>0){
             let sum = schoolStatistics[0].statistics.reduce((previous, current) => current += previous);
             let avg = Math.round(sum / schoolStatistics[0].statistics.length);
             let comparingSum = organisationStatistics[0].statistics.reduce((previous, current) => current += previous);
             let comparingAvg = Math.round(comparingSum / organisationStatistics[0].statistics.length);
             return resolve({
               average: avg,
               comparingAverage: comparingAvg,
               count: schoolStatistics[0].statistics.length,
               comparingCount: organisationStatistics[0].statistics.length
             });
          } else {
            return resolve({
              average: 0,
              comparingAverage: 0,
              count: 0,
              comparingCount: 0
            });
          }
        }
      })
  });
}

//SHOW LIST ROUTE
router.get("/list", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id)
  .populate({
    path: 'tests',
    populate: { path: 'owner' }
  })
  .exec(function(err, school){
    if(err ||!school){
      req.flash("error", "School niet gevonden.");
      res.redirect("back");
    } else {
      res.render("competence/show-list", {school: school}); 
    }
  });
});

//EDIT ROUTE
router.get("/edit", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden.");
     res.redirect("back");
   } else {
     res.render("competence/edit", {school: school});
   }
 });
});

//UPDATE ROUTE
router.put("/", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden.");
     res.redirect("back");
   } else {
     school.save();
     req.flash("success", "Deskundigheid updated");
     res.redirect("/schools/" + req.params.id + "/competence");
   }
 });
});

//DOWNLOAD ROUTE TEST OVERVIEW SCHOLEN
router.get("/download", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id)
  .populate({
      path: 'tests',
      populate: { path: 'owner' }
    })
  .exec(function(err, school){
    if(err || !school) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      var testList = [];
      school.tests.forEach(function(test){
        test.school = school.name;
        test.result = Math.ceil(test.result*100)/100;
        test.user = test.owner && test.owner.publicProfile ? test.owner.username : 'anoniem';
        test.userType = test.owner && test.owner.isTeacher ? 'onderwijzend' : 'ondersteunend/onbekend';
        testList.push(test);
      });
      var fields = ['school', 'subject', 'result', 'user', 'userType'];
      var fieldNames = ['School', 'Onderdeel', 'Resultaat', 'Gebruikersnaam', 'Personeelstype'];
      json2csv({ data: testList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
        if(err){
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.setHeader('Test-download', 'attachment; filename=tests.csv');
          res.set('Content-Type', 'text/csv');
          res.status(200).send(csv);
        }
      });
    }
  });
});

module.exports = router;