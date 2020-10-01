var express = require("express");
var router = express.Router();
var config = require("../../config/config");
var Email = require("../../models/email");

//SEND EMAILS TO SENDGRID
router.post("/", function(req, res){
	var emailArr = req.body.emailarray;
	var emailsFromEmailArr = emailArr.map(e => e.username);
	var emailSubject = req.body.emailsubject;
	var emailBody = req.body.emailbody;
    var request = config.email.invite(emailsFromEmailArr, emailSubject, emailBody);
    var emails = emailArr.map(function(user){
    	return {
    		user: user,
    		school: user.school && user.school[0] ? user.school[0]: null,
    		organisation: user.organisation, 
	    	emailAddress: user.username,
	    	subject: emailSubject,
	    	emailBody: emailBody
	    }
    });
	request
	.then((result) => {
	  emails.forEach(email => email.result = 'success');
	  Email.insertMany(emails)
	  .then(emails => {
	  	res.json({success: true, message: null});
	  })
	  .catch(err => {
	  	res.json({success: true, message: 'Emails verstuurd maar fout bij opslaan van email records...' + err.message});
	  });
	})
	.catch((err) => {
	  emails.forEach(email => email.result = 'failed');
	  Email.insertMany(emails);
	  res.json({success: false, message: err.message});
	});
});

module.exports = router;