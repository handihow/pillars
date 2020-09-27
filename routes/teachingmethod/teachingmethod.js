var express = require("express");
var router = express.Router({mergeParams: true});
var TeachingMethod = require("../../models/teachingMethod");
var Software = require("../../models/software");
var middleware = require("../../middleware");
var config = require("../../config/config");

//SHOW individual teaching method records
router.get("/", middleware.isLoggedIn, function(req, res){
 TeachingMethod.findById(req.params.id, function(err, teachingMethod){
   if(err || !teachingMethod){
     req.flash("error", "Lesmethode niet gevonden");
     res.redirect("back");
   } else {
   	 Software.find({teachingMethod: teachingMethod._id}).populate("school").exec(function(err, software){
   	 	if(err){
   	 		req.flash("error", "Leermiddelen niet gevonden");
   	 		res.redirect("back");
   	 	} else {
   	 		res.render("teachingMethod/show", {
          teachingMethod: teachingMethod, 
          software: software,
          functionalities: config.software.functionality,
          ratings: config.software.ratings
        });
   	 	}
   	 });
   }
 });
});

module.exports = router;