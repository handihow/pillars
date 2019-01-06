var express = require("express");
var router = express.Router();
var SecurityIncident = require("../../models/securityIncident");
var ProcessingActivity = require("../../models/processingActivity");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");

router.use(function(req,res,next){
  res.locals.config = config.processingActivity;
  next();
})

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  SecurityIncident.find({organisation: req.user.organisation}).populate("school").exec(function(err, securityIncidents){
          if(err) {
              req.flash("error", err.message);
              res.redirect("back");
          } else {
              res.render("securityIncident/index", {securityIncidents: securityIncidents, schoolLevel: false});         
          }
      });
});

//NEW ROUTE
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
  ProcessingActivity.find({organisation: req.user.organisation}).exec(function(err, processingActivities){
      if(err) {
          req.flash("error", err.message);
          res.redirect("back");
      } else {
          res.locals.scripts.header.tinymce = true;
          res.render("securityIncident/new", {schoolLevel: false, processingActivities: processingActivities});        
      }
  });
});

//SHOW ROUTE
router.get("/:pid", middleware.isLoggedIn, function(req, res){
  SecurityIncident.findById(req.params.pid).populate("processingActivity").exec(function(err, securityIncident){
        if(err ||!securityIncident){
            req.flash("error", "Beveiligingsincident niet gevonden.");
            res.redirect("back");
        } else {
            res.render("securityIncident/show", {securityIncident: securityIncident, schoolLevel: false});            
        }
    });

});

//CREATE ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  req.body.securityIncident.body = req.sanitize(req.body.securityIncident.body);
  SecurityIncident.create(req.body.securityIncident, function(err, securityIncident){
            if(err || !securityIncident){
                req.flash("error", err.message);
                res.locals.error = req.flash("error");
                res.render("securityIncident/new", {  schoolLevel: false});
            }  else {
                res.locals.scripts.header.tinymce = false;
                securityIncident.organisation = req.user.organisation;
                securityIncident.isValidForAllOrganisation = true;
                securityIncident.save();
                req.flash("success", "Beveiligingsincident toegevoegd");
                res.redirect("/securityIncident");
            }
      }); 
});
    
// //EDIT ROUTE
router.get("/:pid/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    SecurityIncident.findById(req.params.pid, function(err, securityIncident){
          if(err){
              req.flash("error", err.message);
              res.redirect("back");
          } else if (!securityIncident){
              req.flash("error", "Beveiligingsincident niet gevonden");
              res.redirect("back");
          } else {
            ProcessingActivity.find({organisation: req.user.organisation}).exec(function(err, processingActivities){
                if(err) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    res.locals.scripts.header.tinymce = true;
                    res.render("securityIncident/edit", {securityIncident: securityIncident, 
                                                        schoolLevel: false,
                                                        processingActivities: processingActivities});       
                }
            });  
          }
      });
});

// //UPDATE ROUTE
router.put("/:pid", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  req.body.securityIncident.body = req.sanitize(req.body.securityIncident.body);
  SecurityIncident.findByIdAndUpdate(req.params.pid, req.body.securityIncident, function(err, securityIncident){
    if(err){
        req.flash("error", err.message);
        res.redirect("/securityIncident");
    } else if (!securityIncident){
        req.flash("error", "Beveiligingsincident niet gevonden");
        res.redirect("/securityIncident");
    } else {
        res.locals.scripts.header.tinymce = false;
        req.flash("success", "Beveiligingsincident updated");
        res.redirect("/securityIncident/" + req.params.pid);
    }
  });
});

//DELETE ROUTE
router.delete("/:pid", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  SecurityIncident.findByIdAndRemove(req.params.pid, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer beveiligingsincident opnieuw te verwijderen.");
          res.redirect("/securityIncident/" + req.params.pid);
      } else {
          req.flash("success", "Beveiligingsincident verwijderd");
          res.redirect("/securityIncident");  
      }
  });
});

module.exports = router;