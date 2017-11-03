var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var middleware = require("../middleware");
var global = require("../models/global");

//SHOW ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id).populate("owner").populate("tests").exec(function(err, school){
      if(err ||!school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          res.render("deskundigheid/show", {school: school, global:global});            
      }
  });
});

//EDIT ROUTE
router.get("/edit", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           res.render("deskundigheid/edit", {school: school});
       }
   });
});

//UPDATE ROUTE
router.put("/", middleware.isLoggedIn, function(req, res){
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           school.isIngevuldDeskundigheid = true;
           school.save();
           req.flash("success", "Deskundigheid updated");
           res.redirect("/scholen/" + req.params.id + "/deskundigheid");
       }
    });
});

module.exports = router;