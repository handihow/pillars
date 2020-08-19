var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../../models/user");
var Classroom = require("../../models/classroom");
var Survey = require("../../models/survey");
var School = require("../../models/school");
//DDL form
router.get("/", function(req, res){
  res.render("ddl"); 
});

//DDL post route
router.post("/", function(req,res){
	Classroom.findById(req.body.classroom, function(err, classroom){
		if(err || !classroom){
			req.flash('error', 'Klascode is onjuist. Controleer de code en probeer het opnieuw.');
          	return res.redirect('back');
		} else if(classroom.numberOfSurveys > classroom.numberStudents){
			req.flash('error', 'Klascode is te vaak gebruikt. Voer een andere klascode in.');
          	return res.redirect('back');
		} else {
			//find the school 
			School.findById(classroom.school, function(err, school){
				if(err || !school){
					req.flash('error', 'School is niet gevonden. Neem contact op met de beheerder.');
          			return res.redirect('back');
				} else {
					//find the DDL survey
					Survey.findOne({
			            "organisation": school.organisation, 
			            "isActiveCompetenceSurvey": true,
			            "competenceStandardKey": "ddl"
			        }, function(err, survey){
			        	if(err || !survey){
			        		req.flash('error', 'Enquete is niet gevonden. Neem contact op met de beheerder.');
			        		return res.redirect('back');
			        	} else {
			        		var randomNumber = Math.floor(Math.random() * 1000000);
			        		var username = randomNumber.toString();
			        		//create student user record
							var newUser = new User({
								username: username, 
								role: 'student', 
								classroom: [classroom._id],
								school: [school._id],
								organisation: school.organisation
							});
							User.register(newUser, req.body.classroom, function(err, user){
								if(err || !user){
									req.flash('error', 'Fout bij het aanmaken van leerlingen account.');
			        				return res.redirect('back');
								} else {
									classroom.numberOfSurveys ++
									classroom.students.push(user._id);
									classroom.save();
									school.students.push(user._id);
									school.save();
									//authenticate the user and redirect to the survey
									req.login(user, function(err) {
								        if (err) {
								          req.flash('error', 'Fout bij het inloggen.');
			        					  return res.redirect('back');
								        } else {
								          return res.redirect("/survey/" + survey._id + "/private");	
								        }
								    });
								}
							})
			        	}
			        })					
				}
			})		
		}
	});
})


module.exports = router;