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

//HARDWARE: CHECK IF THE USER IS THE OWNER SO HE CAN EDIT, UPDATE AND DELETE
middlewareObj.isHardwareOwner = function (req, res, next) {
    if(req.isAuthenticated()){
        Hardware.findById(req.params.hardware_id, function(err, hardware){
            if(err || !hardware){
                req.flash("error", "Hardware niet gevonden");
                res.redirect("back");
            } else {
                if(hardware.owner.id.equals(req.user._id)) {
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

//SOFTWARE: CHECK IF THE USER IS THE OWNER SO HE CAN EDIT, UPDATE AND DELETE
middlewareObj.isSoftwareOwner = function (req, res, next) {
    if(req.isAuthenticated()){
        Software.findById(req.params.software_id, function(err, software){
            if(err || !software){
                req.flash("error", "Software niet gevonden");
                res.redirect("back");
            } else {
                if(software.owner.id.equals(req.user._id)) {
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

module.exports = middlewareObj;