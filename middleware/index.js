var School = require("../models/school");
var Hardware = require("../models/hardware");
var Software = require("../models/software");
var User = require("../models/user");
var Normering = require("../models/normering");
var Message = require("../models/message");

var middlewareObj = {};

//GENERIC USE: CHECK IF THE USER IS LOGGED IN
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

//USER: CHECK IF THE USER IS THE CURRENT USER SO HE CAN EDIT HIS PROFILE
middlewareObj.isUser = function(req,res,next) {
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, user){
             if(err || !user){
                  req.flash("error", err);
                  res.redirect("/scholen");
              } else {
                  if(user._id.equals(req.user._id)){
                      next();
                  } else {
                    req.flash("error", "Je bent niet geautoriseerd om het profiel aan te passen");
                    res.redirect("back");
                  }
              }
        });
    }
};

//SCHOLEN: CHECK IF THE USER IS THE OWNER SO HE CAN EDIT, UPDATE AND DELETE
middlewareObj.isSchoolOwner = function (req, res, next) {
    if(req.isAuthenticated()){
        School.findById(req.params.id, function(err, school){
            if(err || !school){
                req.flash("error", "School niet gevonden");
                res.redirect("/scholen");
            } else {
                //check if user is bestuur admin for this school
                if(school.owner.equals(req.user._id)) {
                    next();
                } else {
                    //check if user is school admin for this school
                    var isSchoolAdmin = false;
                    school.users.forEach(function(user){
                        if(user.equals(req.user._id) && req.user.role==="sadmin"){
                          isSchoolAdmin = true;  
                        }
                    });
                    if(isSchoolAdmin){
                        next();
                    } else {
                    req.flash("error", "Je bent niet de school of schoolbestuur administrator van deze school.");
                    res.redirect("back");
                    }
                }
            }
        });
    } else {
        req.flash("error", "Inloggen a.u.b.!");
        res.redirect("/login");  
    }
};

//HARDWARE: CHECK IF THE USER IS THE OWNER SO HE CAN EDIT, UPDATE AND DELETE
middlewareObj.isHardwareOwner = function (req, res, next) {
    //check if user is logged in
    if(req.isAuthenticated()){
        //check if user is the owner of the hardware
        //find hardware
        Hardware.findById(req.params.hardware_id, function(err, hardware){
            if(err || !hardware){
                req.flash("error", "Hardware niet gevonden");
                res.redirect("back");
            } else {
            //if the hardware is found, check if the user is the owner of the record
                if(hardware.owner.equals(req.user._id)) {
                    next();
                } else {
                    //if the user is not the owner of record, check if he is owner of the school record
                    School.findById(req.params.id, function(err, school){
                        if(err || !school) {
                           req.flash("error", "School niet gevonden");
                           res.redirect("back"); 
                        } else {
                            if(school.owner.equals(req.user._id)) {
                                next();
                            } else {
                                req.flash("error", "Je bent niet de eigenaar van dit record.");
                                res.redirect("back");
                            }
                        }
                    });
                }
            }
        });
    //if not logged in, redirect to login page
    } else {
        req.flash("error", "Inloggen a.u.b.!");
        res.redirect("/login");  
    }
};

//SOFTWARE: CHECK IF THE USER IS THE OWNER OR USER IS SCHOOL OWNER SO HE CAN EDIT, UPDATE AND DELETE
middlewareObj.isSoftwareOwner = function (req, res, next) {
    //check if user is logged in
    if(req.isAuthenticated()){
        //check if user is the owner of the software
        //find software
        Software.findById(req.params.software_id, function(err, software){
            if(err || !software){
                req.flash("error", "Software niet gevonden");
                res.redirect("back");
            } else {
            //if the software is found, check if the user is the owner of the record
                if(software.owner.id.equals(req.user._id)) {
                    next();
                } else {
                    //if the user is not the owner of record, check if he is owner of the school record
                    School.findById(req.params.id, function(err, school){
                        if(err || !school) {
                           req.flash("error", "School niet gevonden");
                           res.redirect("back"); 
                        } else {
                            if(school.owner.id.equals(req.user._id)) {
                                next();
                            } else {
                                req.flash("error", "Je bent niet de eigenaar van dit record.");
                                res.redirect("back");
                            }
                        }
                    });
                }
            }
        });
    //if not logged in, redirect to login page
    } else {
        req.flash("error", "Inloggen a.u.b.!");
        res.redirect("/login");  
    }
};

middlewareObj.isNormeringOwner = function(req, res, next){
    //check if user is logged in
    if(req.isAuthenticated()){
        //find Normering
        Normering.findById(req.params.id, function(err, normering){
            if(err){
                req.flash("error", "Normering niet gevonden");
                res.redirect("back"); 
            } else {
                //check if user is the owner of the record
                if(normering.owner.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Je bent niet de eigenaar van dit record.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Inloggen a.u.b.!");
        res.redirect("/login");  
    }
};

middlewareObj.isMessageOwner = function(req, res, next){
    //check if user is logged in
    if(req.isAuthenticated()){
        //find Message
        Message.findById(req.params.id, function(err, message){
            if(err ||!message){
                req.flash("error", "Bericht niet gevonden");
                res.redirect("back"); 
            } else {
                //check if user is the owner of the record
                if(message.owner.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Je bent niet de eigenaar van dit record.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Inloggen a.u.b.!");
        res.redirect("/login");  
    }
};

middlewareObj.isAuthenticatedBadmin = function(req, res, next){
    //check if user is logged in
    if(req.isAuthenticated()){
        //find User
        User.findById(req.user._id, function(err, user){
            if(err ||!user){
                req.flash("error", "Account niet gevonden");
                res.redirect("back"); 
            } else {
                //check if user is badmin and has authenticated email record
                if(user.role === "badmin" && user.emailIsAuthenticated) {
                    next();
                } else {
                    req.flash("error", "Je hebt niet voldoende rechten of email is niet geverifieerd. Controleer je email op een bericht van Pillars met de link om email te verifieren.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Inloggen a.u.b.!");
        res.redirect("/login");  
    }
};


module.exports = middlewareObj;