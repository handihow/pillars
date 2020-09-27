var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Hardware = require("../../models/hardware");
var config = require("../../config/config");
var middleware = require("../../middleware");

router.use(function(req,res,next){
  res.locals.config = config.hardware;
  next();
})

//SHOW individual hardware records
router.get("/", middleware.isLoggedIn, function(req, res){
	Hardware.findById(req.params.id).exec(function(err, hardware){
	   if(err || !hardware){
	     req.flash("error", "Hardware niet gevonden");
	     res.redirect("back");
	   } else {
	   	// res.redirect('/schools/' + hardware.school + '/hardware/' + hardware._id);
	     res.render("hardware/show", {hardware: hardware});
	   }
	});
});


module.exports = router;