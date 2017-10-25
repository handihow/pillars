var School = require("../models/school");
var Hardware = require("../models/hardware");
var Software = require("../models/software");

var middlewareObj = {};

//GENERIC USE: CHECK IF THE USER IS LOGGED IN
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

//SCHOLEN: CHECK IF THE USER IS THE OWNER SO HE CAN EDIT, UPDATE AND DELETE
middlewareObj.isSchoolOwner = function (req, res, next) {
    if(req.isAuthenticated()){
        School.findById(req.params.id, function(err, school){
            if(err || !school){
                req.flash("error", "School niet gevonden");
                res.redirect("/scholen");
            } else {
                if(school.owner.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Je bent niet de schoolbestuur administrator van deze school.");
                    res.redirect("back");
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
                if(hardware.owner.id.equals(req.user._id)) {
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

module.exports = middlewareObj;