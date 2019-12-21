var express = require("express");
var router = express.Router();
var request = require("request");
var School = require("../../models/school");
var Organisation = require("../../models/organisation");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");


//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
 School.findById(req.params.id).populate("users").exec(function(err, school){
   if(err ||!school){
     req.flash("error", "School niet gevonden.");
     res.redirect("back");
   } else {
     if(school.users){
      var schoolAdmins = school.users.filter(user => user.role =="sadmin");
     }
     res.render("schools/show", {school: school, schoolAdmins: schoolAdmins}); 
   }
 });
});


//EDIT ROUTE
router.get("/:id/edit", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden.");
     res.redirect("/schools");
   } else {
     res.locals.scripts.header.uploadcare = true;
     var inspectionResults = config.inspectionResults;
     res.render("schools/edit", {school: school, inspectionResults: inspectionResults});
   }
 });
});

//UPDATE ROUTE
router.put("/:id", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
   if(err || !school){
     req.flash("error", err.message);
     res.redirect("/schools");
   } else {
     res.locals.scripts.header.uploadcare = false;
     req.flash("success", "School updated");
     res.redirect("/schools/" + req.params.id);
   }
 });
});

module.exports = router;