var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var User = require("../../models/user");
var Questionnaire = require("../../models/questionnaire");
var middleware = require("../../middleware");
var config = require("../../config/config");
var Test = require("../../models/test");


//SHOW ROUTE - PROFILE PAGE
router.get("/", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id).populate("organisation").exec(function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      Test.find({"owner": user._id}, function(err, tests){
        if(err) {
          req.flash("error", err);
        } else {
          Questionnaire.findOne({"organisation": req.user.organisation, "isActual": true}, function(err, questionnaire){
            if(err){
              req.flash("error", err);
              res.redirect("back");
            } else if (!questionnaire){
              res.render("user/show", {user: user, hasQuestionnaire: false, tests: tests}); 
            } else {
              res.render("user/show", {user: user, hasQuestionnaire: true, questionnaire: questionnaire, tests: tests}); 
            }
          })        
        }
      });
    }
  });
});

//SHOW ROUTE - READY WITH FILLING QUESTIONS PAGE
router.get("/ready", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      Test.find({"owner": user._id}, function(err, tests){
        if(err) {
          req.flash("error", err);
        } else {
          res.locals.scripts.footer.chartjs = true;
          res.locals.scripts.footer.pillars = true;
          res.locals.scripts.footer.tests = true;
          res.render("user/ready", {user: user, tests: tests});        
        }
      });
    }
  });
});

//API ROUTE TO SHOW TEST RESULTS OF A CERTAIN USER
router.get("/api/tests", middleware.isLoggedIn, function(req, res){
  Test.find({"owner": req.params.id}, function(err, tests){
    if(err) {
      req.flash("error", err);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(tests));        
    }
  });
});


//EDIT ROUTE - EDIT PROFILE PAGE
router.get("/edit", middleware.isNotDemoAccount, middleware.isUser, function(req,res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", "Geen gebruiker gevonden of onbekende fout");
      res.redirect("back");
    } else {
      res.render("user/edit", {user: user});
    }
  });
});

//UPDATE route to store edited user to database
router.put("/", middleware.isNotDemoAccount, middleware.isUser, function(req, res){
  User.findByIdAndUpdate(req.params.id, req.body.user, function(err, user){
    if(err || !user) {
      req.flash('error', "Geen gebruiker gevonden");
      res.redirect("back");
    }  else {
      req.flash("success", "Profiel updated");
      res.redirect("/user/"+user._id);
    }
  });
});


module.exports = router;