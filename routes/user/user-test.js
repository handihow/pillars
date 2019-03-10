var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var User = require("../../models/user");
var Test = require("../../models/test");
var Questionnaire = require("../../models/questionnaire");
var config = require("../../config/config");
var middleware = require("../../middleware");

//INDEX - list of test results is on the user profile!!

//SHOW individual test records
router.get("/:test_id", middleware.isLoggedIn, function(req, res){
  Test.findById(req.params.test_id, function(err, test){
    if(err || !test){
      req.flash("error", "Test niet gevonden");
      res.redirect("back");
    } else {
      res.render("test/show", {test: test, user: req.params.id});
    }
  });
});

//NEW - form to create new test
router.get("/new/:subject", middleware.isNotDemoAccount, middleware.isUser, function(req, res){
  User.findById(req.params.id, function(err, user){
   if(err || !user){
     req.flash("error", "Gebruiker niet gevonden");
     res.redirect("back");
   } else {
    Questionnaire.findOne({"organisation": req.user.organisation, "isActual": true}).exec(function(err, questionnaire){
     if(err){
      req.flash("error", err);
      res.redirect("back");
    } else if (!questionnaire){
     res.render("test/new", {user: user, subject: req.params.subject, questionnaire: config.competence.questionnaire.standard, isMultipleChoice: false});   
   } else { 
     res.render("test/new", {user: user, subject: req.params.subject, questionnaire: questionnaire, isMultipleChoice: questionnaire.isMultipleChoice});     
   }
 });
  }
});
});

//CREATE - creates new profile test in the database
router.post("/", middleware.isNotDemoAccount, middleware.isUser, function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", "Gebruiker niet gevonden");
      res.redirect("back");
    } else {
      Test.create(req.body.test, function(err, test){
       if(err){
         req.flash("err", err.message);
         res.redirect("back");
       } else {
         //add test result to user record
         user.tests.push(test);
         user.save();
           //calculate the score
           var total = 0;
           var score = 0;
           test.answers.forEach(function(answer){
            score +=answer;
            total +=1;
          })
           test.result = score/total;
           //add the user to test
           test.owner = user._id;
           if(user.publicProfile){
            test.username = user.username;
          } else {
            test.username = 'anoniem';
          }
          test.save(function(err, test){
            if(err){
              req.flash("error", "Fout bij bewaren van test");
              res.redirect("back");
            } else {
              //if user is school admin or school medewerker then add the test to school
              if(user.role === "sadmin" || user.role === "suser") {
               School.findOne({users: user._id}, function(err, school){
                 if(err || !school){
                   req.flash("error", "School niet gevonden");
                   res.redirect("back");
                 } else {
                   school.tests.push(test);
                   school.save();
                   req.flash("success", "Profiel en School Resultaten updated");
                   res.redirect("/user/"+user._id);
                 }
               });
             } else {
               req.flash("success", "Profiel updated");
               res.redirect("/user/"+user._id);
             }
           }
         });
        }
      });   
    }
  });
});

//DESTROY route to delete tests from database
router.delete("/:test_id", middleware.isNotDemoAccount, middleware.isUser, function(req, res){
  Test.findByIdAndRemove(req.params.test_id, function(err){
    if(err){
      req.flash("error", "Test niet gevonden");
      res.redirect("back");
    } else {
      req.flash("success", "Test verwijderd");
      res.redirect("/user/"+req.params.id);
    }
  }); 
});

module.exports = router;