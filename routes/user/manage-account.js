var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var User = require("../../models/user");
var Organisation = require("../../models/organisation");
var middleware = require("../../middleware");
var mongoose = require('mongoose');

//SHOW ROUTE - ACCOUNT PAGE
router.get("/", middleware.isAuthenticatedBadmin, function(req, res){
  User.findById(req.params.id).populate("organisation").populate("school").exec(function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      res.render("user/account", {user: user}); 
    }
  });
});

//EDIT ROUTE - ACCOUNT PAGE
router.get("/edit", middleware.isAuthenticatedBadmin, function(req, res){
	User.findById(req.params.id, function(err, user){
		if(err || !user){
			req.flash("error", err);
			res.redirect("back");
		} else {
			Organisation.findById(user.organisation, function(err, organisation){
				if(err || !organisation){
					req.flash("error", err);
					res.redirect("back");
				} else {
					School.find(
						{"organisation": organisation._id}, 
						null,
						{sort: {name: 1}},
						function(err, schools){
							if(err || !schools){
								req.flash("error", err);
								res.redirect("back");
							} else {
								res.render("user/account-edit", {user: user, organisation: organisation, schools: schools}); 
							}
						});
				}
			});
		}
	});
});

//EDIT ROUTE - ACCOUNT PAGE
router.put("/", middleware.isAuthenticatedBadmin, function(req, res){
	User.findById(req.params.id, function(err, user){
		if(err || !user){
			req.flash("error", err);
			res.redirect("back");
		} else {
			if(req.body.user.school && typeof req.body.user.school !== 'object'){
				req.body.user.school = [req.body.user.school];
			}
			let updatedUser = req.body.user;
			user.email = updatedUser.email;
			user.firstName = updatedUser.firstName;
			user.lastName = updatedUser.lastName;
			if((user.role == 'suser' || user.role == 'sadmin') && (updatedUser.role == 'buser' || updatedUser.role == 'badmin')){
				//user is migrating from school level to organisation level
				if(updatedUser.school && updatedUser.school.length>0){
					req.flash("error", "Bij rol op bestuur niveau kunnen geen scholen worden gekoppeld aan de medewerker.");
					return res.redirect("back");
				}
				School.find({"users": user._id}, function(err, schools) {
					if(err){
						req.flash("error", err);
						res.redirect("back");
					} else {
						schools.forEach(function(school){
							let index = school.users.indexOf(user._id);
							if(index > -1){
								school.users.splice(index, 1);
								school.save();
							}
						});
						user.role = updatedUser.role;
						user.school = [];
						user.save(function(err){
							if(err){
								req.flash("error", err);
								res.redirect("back");
							} else {
								return res.redirect("/user/"+user._id+"/account");
							}
						});
					}
				})
			} else if((user.role == 'buser' || user.role == 'badmin') && (updatedUser.role == 'suser' || updatedUser.role == 'sadmin')){
				//user is migrating from organisation level to school level
				//check if schools are defined
				if(!updatedUser.school || updatedUser.school.length===0){
					req.flash("error", "Rol op schoolniveau vereist dat tenminste 1 school in het account is geselecteerd");
					return res.redirect("back");
				}
				//convert the school ids to mongoose objects
				let schoolObjects = [];
				updatedUser.school.forEach(function(s){
					schoolObjects.push(mongoose.Types.ObjectId(s));
				});
				School.find({
				    '_id': { $in: schoolObjects }
				}, function(err, schools){
				     if(err){
				     	req.flash("error", err);
				     	res.redirect("back");
				     } else {
				     	schools.forEach(function(s){
				     		s.users.push(user._id);
				     		s.save();
				     	});
				     	user.role = updatedUser.role;
						user.school = schoolObjects;
						user.save(function(err){
							if(err){
								req.flash("error", err);
								res.redirect("back");
							} else {
								return res.redirect("/user/"+user._id+"/account");
							}
						});
				     }
				});
			} else if(updatedUser.role == 'suser' || updatedUser.role =='sadmin') {
				//user is keeping the school level, check if a school is defined
				let schoolObjects = [];
				let previousSchoolObjects = [];
				let newSchoolObjects = [];
				user.school.forEach(function(ps){
					schoolObjects.push(mongoose.Types.ObjectId(ps));
					previousSchoolObjects.push(mongoose.Types.ObjectId(ps));
				});
				updatedUser.school.forEach(function(ns){
					schoolObjects.push(mongoose.Types.ObjectId(ns));
					newSchoolObjects.push(mongoose.Types.ObjectId(ns));
				});
				School.find({
				    '_id': { $in: schoolObjects }
				}, function(err, schools){
				     if(err){
				     	req.flash("error", err);
				     	res.redirect("back");
				     } else {
				     	schools.forEach(function(s){
				     		let psIndex = previousSchoolObjects.findIndex(ps => ps.equals(s._id));
				     		if(psIndex > -1){
								let index = s.users.indexOf(user._id);
								if(index > -1){
									s.users.splice(index, 1);
								}
				     		}
				     		let nsIndex = newSchoolObjects.findIndex(ns => ns.equals(s._id));
				     		if(nsIndex > -1){
				     			s.users.push(user._id);
				     		}
				     		s.save();
				     	});
				     	user.role = updatedUser.role;
						user.school = newSchoolObjects;
						user.save(function(err){
							if(err){
								req.flash("error", err);
								res.redirect("back");
							} else {
								return res.redirect("/user/"+user._id+"/account");
							}
						});
				     }
				});

			} else {
				//user is keeping organisation level, check that no schools are defined
				if(updatedUser.school && updatedUser.school.length>0){
					req.flash("error", "Bij rol op bestuur niveau kunnen geen scholen worden gekoppeld aan de medewerker.");
					return res.redirect("back");
				}
				user.role = updatedUser.role;
				user.school = [];
				user.save(function(err){
					if(err){
						req.flash("error", err);
						res.redirect("back");
					} else {
						return res.redirect("/user/"+user._id+"/account");
					}
				});
			}
		}
	});
});



module.exports = router;