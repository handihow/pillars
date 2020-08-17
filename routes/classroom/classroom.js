var express = require("express");
var router = express.Router({mergeParams: true});
var Classroom = require("../../models/classroom");
var config = require("../../config/config");
var middleware = require("../../middleware");

//SHOW individual hardware records
router.get("/", middleware.isLoggedIn, function(req, res){
 Classroom.findById(req.params.id).populate("teachers").populate("students").exec(function(err, classroom){
   if(err || !classroom){
     req.flash("error", "Klas niet gevonden");
     res.redirect("back");
   } else {
     res.render("classroom/show", {classroom: classroom});
   }
 });
});


module.exports = router;