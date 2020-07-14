var express = require("express");
var router = express.Router({mergeParams: true});
var Form = require("../../models/form");
var middleware = require("../../middleware");
var mongoose = require("mongoose");

//SHOW individual hardware records
router.get("/", middleware.isPadmin, function(req, res){
 Form.findById(req.params.id).exec(function(err, form){
   if(err || !form){
     req.flash("error", "Formulier niet gevonden");
     res.redirect("back");
   } else {
     res.render("surveybuilder/index", {form: form});
   }
 });
});

router.post("/", function(req, res){
	var formText = req.body.text;
	var id = req.body.id;
	Form.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {text: formText}, function(err, doc){
		if(err){
			res.json({success: false, message: err.message});
		} else {
			res.json({success: true, message: ''});
		}
	});
});

module.exports = router;

