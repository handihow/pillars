var express = require("express");
var router = express.Router({mergeParams: true});
var Software = require("../../models/software");
var School = require("../../models/school");
var config = require("../../config/config");
var middleware = require("../../middleware");

//SHOW individual hardware records
router.get("/", middleware.isLoggedIn, function(req, res){
 Software.findById(req.params.id, function(err, software){
   if(err || !software){
     req.flash("error", "Leermiddel niet gevonden");
     res.redirect("back");
   } else {
   	 School.findOne({software: {$in: software._id}}, function(err, school){
   	 	if(err || !school){
   	 		req.flash("error", "School niet gevonden");
   	 		res.redirect("back");
   	 	} else {
   	 		res.redirect('/schools/' + school._id + '/software/' + software._id);
   	 	}
   	 });
   }
 });
});

module.exports = router;