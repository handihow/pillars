var express = require("express");
var router = express.Router();
var School = require("../models/school");
var middleware = require("../middleware");

//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
   School.findById(req.params.id, function(err, school){
       if(err ||!school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           res.render("deskundigheid/show", {school: school});            
       }
   });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.isSchoolOwner, function(req, res){
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
router.put("/:id", middleware.isSchoolOwner, function(req, res){
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           req.flash("success", "Deskundigheid updated");
           res.redirect("/scholen/deskundigheid/" + req.params.id);
       }
    });
});

module.exports = router;