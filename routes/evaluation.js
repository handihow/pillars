var express = require("express");
var router = express.Router({mergeParams: true});
var Evaluation = require("../models/evaluation");
var School = require("../models/school");
var middleware = require("../middleware");

//INDEX SCHOOL EVALUATION ROUTE
router.get("/", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id).populate("evaluations").exec(function(err, school){
    if(err || !school){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("evaluation/index", {school: school});
    }
  });
});

//SHOW ROUTE
router.get("/:eval_id", middleware.isSchoolOwner, function(req, res){
  Evaluation.findById(req.params.eval_id).populate("school").exec(function(err, evaluation){
      if(err ||!evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          res.render("evaluation/show", {evaluation: evaluation, school: evaluation.school});            
      }
  });
});

//PROTECT THE DEMO ACCOUNT
router.use(function(req, res, next){
  if(req.user && req.user.username==="demo@pillars.school"){
    req.flash("error", "Je kunt geen records aanmaken of wijzigen met het demo account.");
    return res.redirect("back");
  }
  next();
})


//NEW SCHOOL EVALUATION ROUTE 
router.get("/new", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("evaluation/new", {school: school});
    }
  });
});

//CREATE NEW SCHOOL EVALUATION ROUTE
router.post("/", middleware.isSchoolOwner, function(req, res){
    req.body.evaluation.body = req.sanitize(req.body.evaluation.body);
    Evaluation.create(req.body.evaluation, function(err, evaluation){
          if(err || !evaluation){
              req.flash("error", err.message);
              res.locals.error = req.flash("error");
              res.render("evaluation/new");
          }  else {
              //look up user id and add to evaluation
              evaluation.owner = req.user._id;
              evaluation.school = req.params.id;
              evaluation.save();
              School.findById(req.params.id, function(err, school){
                if(err || !school){
                  req.flash("error", "School niet gevonden");
                  res.redirect("back");
                } else {
                  school.evaluations.push(evaluation);
                  school.save();
                  req.flash("success", "Evaluatie toegevoegd");
                  res.redirect("/scholen/" + req.params.id + "/evaluation/");
                }
              });
          }
    }); 
});

//EDIT ROUTE
router.get("/:eval_id/edit", middleware.isSchoolOwner, function(req, res){
    Evaluation.findById(req.params.eval_id).populate("school").exec(function(err, evaluation){
      if(err || !evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          res.render("evaluation/edit", {evaluation: evaluation, school: evaluation.school});
      }
  });
});

//UPDATE ROUTE
router.put("/:eval_id", middleware.isSchoolOwner, function(req, res){
    req.body.evaluation.body = req.sanitize(req.body.evaluation.body);
    Evaluation.findByIdAndUpdate(req.params.eval_id, req.body.evaluation, function(err, evaluation){
      if(err || !evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          req.flash("success", "Evaluatie updated");
          res.redirect("/scholen/" + req.params.id + "/evaluation/" + req.params.eval_id);
      }
    });
});

//DELETE ROUTE
router.delete("/:eval_id", middleware.isSchoolOwner, function(req, res){
  Evaluation.findByIdAndRemove(req.params.eval_id, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer evaluatie opnieuw te verwijderen.");
          res.redirect("back");
      } else {
          req.flash("success", "Evaluatie verwijderd");
          res.redirect("/scholen/" + req.params.id + "/evaluation/");  
      }
  });
});

module.exports = router;