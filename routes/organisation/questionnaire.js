var express = require("express");
var router = express.Router({mergeParams: true});
var Questionnaire = require("../../models/questionnaire");
var middleware = require("../../middleware");
var config = require("../../config/config");
var User = require("../../models/user");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    Questionnaire.find({organisation: req.user.organisation}).populate("owner").exec(function(err, questionnaire){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("questionnaire/index", {questionnaire: questionnaire});         
        }
    });
});

//NEW - form to create new profile questions
router.get("/new", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    res.render("questionnaire/new");        
});


//SHOW individual profile question records
router.get("/:id", middleware.isAuthenticatedBadmin, function(req, res){
  Questionnaire.findById(req.params.id, function(err, questionnaire){
      if(err || !questionnaire){
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          res.render("questionnaire/show", {questionnaire: questionnaire});
      }
  });
});

//CREATE - creates new profile questions in the database
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err || !user){
        req.flash("error", "Probleem bij vinden van gebruikersgegevens.")
        res.redirect("back");
      }
      Questionnaire.create(req.body.questionnaire, function(err, questionnaire){
         if(err){
             req.flash("error", err.message);
             res.redirect("back");
         } else {
             //add the user to questionnaire
             questionnaire.organisation = req.user.organisation;
             questionnaire.save();
             req.flash("success", "Questionnaire vragen updated");
             res.redirect("/questionnaire");
         }
      });   
    });
});

//CREATE - creates new profile questions in the database with alternative Questions
router.post("/alternative", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err || !user){
        req.flash("error", "Probleem bij vinden van gebruikersgegevens.")
        res.redirect("back");
      }
      Questionnaire.create(req.body.questionnaire, function(err, questionnaire){
         if(err){
             req.flash("error", err.message);
             res.redirect("back");
         } else {
             //set the alternative questionnaire
             questionnaire.set({
                questionnaire: config.competence.questionnaire.alternative,
                isMultipleChoice: true
             });
             questionnaire.organisation = req.user.organisation;
             questionnaire.save();
             req.flash("success", "Questionnaire vragen updated");
             res.redirect("/questionnaire");
             }
      }); 
    });  
});


//EDIT displays a form to edit profile question record
router.get("/:id/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req,res){
  Questionnaire.findById(req.params.id, function(err, questionnaire){
      if(err || !questionnaire){
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          res.render("questionnaire/edit", {questionnaire: questionnaire});
      }
  });
});

//UPDATE route to store edited profile questions to database
router.put("/:id", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Questionnaire.findByIdAndUpdate(req.params.id, req.body.questionnaire, function(err, questionnaire){
      if(err || !questionnaire){
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          req.flash("success", "Profielvragen updated");
          res.redirect("/questionnaire");
      }
  }); 
});

//MAKE THE PROFILE QUESTIONS THE ACTUAL QUESTIONS ON THE PROFILE PAGE OF EMPLOYEES
router.get("/:id/actual", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
   Questionnaire.find({"organisation": req.user.organisation}).exec(function(err, questionnaires){
      if(err || !questionnaires) {
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          questionnaires.forEach(function(questionnaire, i){
              if(questionnaire._id.equals(req.params.id)){
                  questionnaire.isActual = true;
              } else {
                  questionnaire.isActual = false;
              }
              questionnaire.save();
              if(i===(questionnaires.length-1)){
                  req.flash("success", "Profielvragen nu actueel");
                  res.redirect("/questionnaire");
              }
          });
      }
   }); 
});

//DESTROY route to delete tests from database
router.delete("/:id", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Questionnaire.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          req.flash("success", "Profielvragen verwijderd");
          res.redirect("/questionnaire");
      }
  }); 
});

module.exports = router;