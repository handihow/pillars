var express = require("express");
var router = express.Router({mergeParams: true});
var Evaluation = require("../../models/evaluation");
var User = require("../../models/user");
var middleware = require("../../middleware");

//INDEX USER EVALUATION ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id).populate("evaluations").exec(function(err, user){
    if(err || !user){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("userEvaluation/index", {user: user});
    }
  });
});

//NEW USER EVALUATION ROUTE 
router.get("/new", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.locals.scripts.header.tinymce = true;
      res.render("userEvaluation/new", {user: user});
    }
  });
});

//SHOW ROUTE
router.get("/:eval_id", middleware.isLoggedIn, function(req, res){
  Evaluation.findById(req.params.eval_id).populate("user").exec(function(err, evaluation){
      if(err ||!evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          res.render("userEvaluation/show", {evaluation: evaluation, user: evaluation.user});            
      }
  });
});

//CREATE NEW USER EVALUATION ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isLoggedIn, function(req, res){
    req.body.evaluation.body = req.sanitize(req.body.evaluation.body);
    Evaluation.create(req.body.evaluation, function(err, evaluation){
          if(err || !evaluation){
              req.flash("error", err.message);
              res.locals.error = req.flash("error");
              res.render("userEvaluation/new");
          }  else {
              //look up user id and add to evaluation
              evaluation.user = req.user._id;
              User.findById(req.params.id, function(err, user){
                if(err || !user){
                  req.flash("error", "User niet gevonden");
                  res.redirect("back");
                } else {
                  user.evaluations.push(evaluation);
                  user.save();
                  evaluation.owner = user.owner;
                  evaluation.save();
                  res.locals.scripts.header.tinymce = false;
                  req.flash("success", "Evaluatie toegevoegd");
                  res.redirect("/user/" + req.params.id + "/evaluation/");
                }
              });
          }
    }); 
});


//EDIT ROUTE
router.get("/:eval_id/edit", middleware.isNotDemoAccount, middleware.isLoggedIn, function(req, res){
    Evaluation.findById(req.params.eval_id).populate("user").exec(function(err, evaluation){
      if(err || !evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          res.locals.scripts.header.tinymce = true;
          res.render("userEvaluation/edit", {evaluation: evaluation, user: evaluation.user});
      }
  });
});

//UPDATE ROUTE
router.put("/:eval_id", middleware.isNotDemoAccount, middleware.isLoggedIn, function(req, res){
    req.body.evaluation.body = req.sanitize(req.body.evaluation.body);
    Evaluation.findByIdAndUpdate(req.params.eval_id, req.body.evaluation, function(err, evaluation){
      if(err || !evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          res.locals.scripts.header.tinymce = false;
          req.flash("success", "Evaluatie updated");
          res.redirect("/user/" + req.params.id + "/evaluation/" + req.params.eval_id);
      }
    });
});

//DELETE ROUTE
router.delete("/:eval_id", middleware.isNotDemoAccount, middleware.isLoggedIn, function(req, res){
  Evaluation.findByIdAndRemove(req.params.eval_id, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer evaluatie opnieuw te verwijderen.");
          res.redirect("back");
      } else {
          req.flash("success", "Evaluatie verwijderd");
          res.redirect("/user/" + req.params.id + "/evaluation/");  
      }
  });
});

module.exports = router;