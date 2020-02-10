var express = require("express");
var router = express.Router({mergeParams: true});
var Evaluation = require("../../models/evaluation");
var School = require("../../models/school");
var middleware = require("../../middleware");
var config = require('../../config/config');

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

//NEW SCHOOL EVALUATION ROUTE 
router.get("/new", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.locals.scripts.header.surveyjs = true;
      res.locals.scripts.footer.surveyjs = true;
      res.locals.scripts.footer.surveyOptions = true;
      res.locals.scripts.footer.evaluation = true;
      res.render("evaluation/new", {school: school, formsCSS: config.formsCSS});
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
          res.locals.scripts.header.surveyjs = true;
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyOptions = true;
          res.locals.scripts.footer.evaluation = true;
          evaluation.created = evaluation.created.toDateString();
          res.render("evaluation/show", {evaluation: evaluation, school: evaluation.school, formsCSS: config.formsCSS});            
      }
  });
});


//CREATE NEW SCHOOL EVALUATION ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    var evaluation = JSON.parse(req.body.result);
    Evaluation.create(evaluation, function(err, evaluation){
          if(err || !evaluation){
              res.contentType('json');
              res.send({ 
                  success: false, 
                  error: 'Foutmelding: evaluatie niet gemaakt. Server geeft fout: ' + err.message 
                });
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
                  res.contentType('json');
                  res.send({ 
                      success: true
                    }); 
                }
              });
          }
    }); 
});

//EDIT ROUTE
router.get("/:eval_id/edit", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    Evaluation.findById(req.params.eval_id).populate("school").exec(function(err, evaluation){
      if(err || !evaluation){
          req.flash("error", "Evaluatie niet gevonden.");
          res.redirect("back");
      } else {
          res.locals.scripts.header.surveyjs = true;
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyOptions = true;
          res.locals.scripts.footer.evaluation = true;
          res.render("evaluation/edit", {evaluation: evaluation, school: evaluation.school});
      }
  });
});

//UPDATE ROUTE
router.post("/:eval_id", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    var evaluation = JSON.parse(req.body.result);
    Evaluation.findByIdAndUpdate(req.params.eval_id, evaluation, function(err, evaluation){
      if(err || !evaluation){
          res.contentType('json');
          res.send({ 
              success: false, 
              error: 'Foutmelding: evaluatie niet gemaakt. Server geeft fout: ' + err.message 
            });
      } else {
          res.contentType('json');
          res.send({ 
              success: true
            }); 
      }
    });
});

//DELETE ROUTE
router.delete("/:eval_id", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  Evaluation.findByIdAndRemove(req.params.eval_id, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer evaluatie opnieuw te verwijderen.");
          res.redirect("back");
      } else {
          req.flash("success", "Evaluatie verwijderd");
          res.redirect("/schools/" + req.params.id + "/evaluation/");  
      }
  });
});

module.exports = router;