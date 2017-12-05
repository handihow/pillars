var express = require("express");
var router = express.Router({mergeParams: true});
var Evaluation = require("../models/evaluation");
var User = require("../models/user");
var middleware = require("../middleware");

//INDEX USER EVALUATION ROUTE
router.get("/", middleware.isUser, function(req, res){
  User.findById(req.params.id).populate("evaluations").exec(function(err, user){
    if(err || !user){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("user_eval/index", {user: user});
    }
  });
});

//NEW USER EVALUATION ROUTE 
router.get("/new", middleware.isUser, function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("user_eval/new", {user: user});
    }
  });
});

//CREATE NEW USER EVALUATION ROUTE
router.post("/", middleware.isUser, function(req, res){
    req.body.evaluation.body = req.sanitize(req.body.evaluation.body);
    Evaluation.create(req.body.evaluation, function(err, evaluation){
          if(err || !evaluation){
              req.flash("error", err.message);
              res.locals.error = req.flash("error");
              res.render("user_eval/new");
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
                  req.flash("success", "Evaluatie toegevoegd");
                  res.redirect("/user/" + req.params.id + "/evaluation/");
                }
              });
          }
    }); 
});
    
//SHOW ROUTE
router.get("/:eval_id", middleware.isUser, function(req, res){
  Evaluation.findById(req.params.eval_id).populate("user").exec(function(err, evaluation){
      if(err ||!evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          res.render("user_eval/show", {evaluation: evaluation, user: evaluation.user});            
      }
  });
});

//EDIT ROUTE
router.get("/:eval_id/edit", middleware.isUser, function(req, res){
    Evaluation.findById(req.params.eval_id).populate("user").exec(function(err, evaluation){
      if(err || !evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          res.render("user_eval/edit", {evaluation: evaluation, user: evaluation.user});
      }
  });
});

//UPDATE ROUTE
router.put("/:eval_id", middleware.isUser, function(req, res){
    req.body.evaluation.body = req.sanitize(req.body.evaluation.body);
    Evaluation.findByIdAndUpdate(req.params.eval_id, req.body.evaluation, function(err, evaluation){
      if(err || !evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          req.flash("success", "Evaluatie updated");
          res.redirect("/user/" + req.params.id + "/evaluation/" + req.params.eval_id);
      }
    });
});

//DELETE ROUTE
router.delete("/:eval_id", middleware.isUser, function(req, res){
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