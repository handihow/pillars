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
      }, function(err, surveys){
        var averages = [];
        surveys.forEach(function(survey, index){
          SurveyResult.find({"survey": survey._id}, function(err, surveyResults){
            if(err){
              req.flash("error", err.message)
            } else {
              var returnedSurveyResults = [];
              var schoolStatistics = [];
              surveyResults.forEach(function(surveyResult){
                var isInArray = school.users.some(function (user) {
                    return user.equals(surveyResult.user._id);
                });
                if(isInArray){
                  returnedSurveyResults.push(surveyResult);
                }
              });
              schoolStatistics = config.competence.survey.calculateStatistics(survey, returnedSurveyResults);
              console.log(schoolStatistics);
              if(schoolStatistics[0].statistics.length>0){
                 let sum = schoolStatistics[0].statistics.reduce((previous, current) => current += previous);
                 let avg = sum / schoolStatistics[0].statistics.length;
                 averages.push(avg);
              } else {
                averages.push(0);
              }
              if(index==surveys.length-1){
                res.render("competence/show", {school: school, surveys: surveys, averages: averages})
              }
            }
          })
        });
        
      })        
    }
  });
});

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