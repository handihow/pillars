var express = require("express");
var router = express.Router();
var config = require("../../config/config");

//SEND EMAILS TO SENDGRID
router.post("/", function(req, res){
	var emailArr = req.body.emailarray;
	var emailSubject = req.body.emailsubject;
	var emailBody = req.body.emailbody;
    var request = config.email.invite(emailArr, emailSubject, emailBody);
	request
	.then((result) => {
	  res.json({success: true, message: null});
	})
	.catch((err) => {
	  res.json({success: false, message: err.message});
	});
});

module.exports = router;