var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Questionnaire = require('../../models/questionnaire');
var middleware = require("../../middleware");
var json2csv = require("json2csv");
var config = require("../../config/config");

router.use(function(req,res,next){
  res.locals.config = config.competence;
  next();
})

//SHOW ROUTE
router.get("/", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id).populate("tests")
  .exec(function(err, school){
    if(err ||!school){
      req.flash("error", "School niet gevonden.");
      res.redirect("back");
    } else {
      //check if the school has an active questionnaire, it will be used for the headings of the tiles on the show page
      Questionnaire.findOne({"organisation": school.organisation, "isActual": true}, function(err, questionnaire){
        if(err){
          req.flash("error", err);
          res.redirect("back");
        } else if (!questionnaire){
          res.render("competence/show", {school: school, questionnaire: config.competence.questionnaire.standard}); 
        } else {
          res.render("competence/show", {school: school, questionnaire: questionnaire.questionnaire}); 
        }
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
        test.user = test.owner.publicProfile ? test.owner.username : 'anoniem';
        test.userType = test.owner.isTeacher ? 'onderwijzend' : 'ondersteunend/onbekend';
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