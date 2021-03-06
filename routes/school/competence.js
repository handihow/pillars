var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Survey = require('../../models/survey');
var SurveyResult = require('../../models/surveyResult');
var middleware = require("../../middleware");
var json2csv = require("json2csv");
var config = require("../../config/config");
var _ = require("lodash");

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
        "isCompetenceSurvey": true
      }, async function(err, surveys){
        let results = [];
        await asyncForEach(surveys, async function(survey, index){
           let result = await retrieveSurveyResults(survey, school);
           results.push(result);
           if(index==surveys.length-1){
            res.locals.scripts.header.plotly = true;
            res.locals.scripts.footer.competence = true;
            res.render("competence/show", {
              school: school, 
              surveys: surveys, 
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

function retrieveSurveyResults(survey, school){
  return new Promise(function(resolve, reject) {
    SurveyResult.find({"survey": survey._id}).populate('user').exec(function(err, surveyResults){
      if(err || surveyResults.length === 0){
        return resolve({
          average: 0,
          comparingAverage: 0,
          count: 0,
          comparingCount: 0
        });
      } else {
        var organisationSurveyResults = surveyResults.filter(sr => sr.user && sr.user._id);
        var organisationStatistics = config.competence.survey.calculateStatistics(survey, organisationSurveyResults);
        var schoolSurveyResults = organisationSurveyResults.filter(sr => sr.school && sr.school.equals(school._id));
        var schoolStatistics = config.competence.survey.calculateStatistics(survey, schoolSurveyResults);
        return resolve({
          average: _.mean(schoolStatistics[0].statistics),
          comparingAverage: _.mean(organisationStatistics[0].statistics),
          count: _.size(schoolStatistics[0].statistics),
          comparingCount: _.size(organisationStatistics[0].statistics)
        });
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