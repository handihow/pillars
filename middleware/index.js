var User = require("../models/user");
var School = require("../models/school");
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

//CHECKS IF THE USER IS USING THE DEMO ACCOUNT, PROTECT SOME ROUTES TO PREVENT UPDATING & DELETING DEMO RECORDS
middlewareObj.isNotDemoAccount = function(req, res, next){
  if(req.user && req.user.username==="demo@pillars.school"){
    req.flash("error", "Je kunt geen records aanmaken of wijzigen met het demo account.");
    res.redirect("back");
  } else {
    next();
  }
}

//CHECK IF THE USER IS SCHOOL ADMINISTRATOR (LEVEL I)
middlewareObj.isSchoolOwner = function (req, res, next) {
    if(req.isAuthenticated()){
        School.findById(req.params.id, function(err, school){
            if(err || !school){
                req.flash("error", "School niet gevonden");
                res.redirect("/scholen");
            } else {
                //check if user is bestuur admin for this school
                if((req.user.role==="badmin" || req.user.role==="buser") 
                        && school.organisation.equals(req.user.organisation)) {
                    next();
                } else if (req.user.role==="padmin") {
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

//CHECK IF THE USER IS ORGANISATION ADMINISTRATOR (LEVEL II)
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
                } else if (user.role==="padmin") {
                    next();
                } else {
                    req.flash("error", "Voor deze actie zijn rechten vereist als bestuur admin. Je hebt niet voldoende rechten. Als je wel bestuur admin bent, controleer dan of je email is geverifieerd. Controleer je email op een bericht van Pillars met de link om email te verifieren. Als je geen email hebt ontvangen, ga dan naar je profielpagina, en druk daar op de knop Email verifieren. Er wordt dan een nieuwe email verzonden.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Inloggen a.u.b.!");
        res.redirect("/login");  
    }
};

//CHECK IF THE USER IS PILLARS ADMINISTRATOR (LEVEL III)
middlewareObj.isPadmin = function(req, res, next) {
    //check if user is logged in
    if(req.isAuthenticated()){
        //find User
        User.findById(req.user._id, function(err, user){
            if(err ||!user){
                req.flash("error", "Account niet gevonden");
                res.redirect("back"); 
            } else {
                //check if user is padmin and has authenticated email record
                if(user.role === "padmin") {
                    next();
                } else {
                    req.flash("error", "Je hebt niet voldoende rechten om deze pagina te bekijken.");
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