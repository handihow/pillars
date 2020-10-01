var express = require("express");
var router = express.Router({mergeParams: true});
var Email = require("../../models/email");
var middleware = require("../../middleware");

//SHOW individual email record
router.get("/", middleware.isLoggedIn, function(req, res){
	Email.findById(req.params.id,function(err, email){
	   if(err || !email){
	     req.flash("error", "Email niet gevonden");
	     res.redirect("back");
	   } else {
	     res.render("email/show", {email: email});
	   }
	});
});


module.exports = router;