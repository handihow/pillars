var express = require("express");
var router = express.Router({mergeParams: true});
var Standard = require("../../models/standard");
var Organisation = require("../../models/organisation");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require('../../config/config');

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Bestuur niet gevonden");
      res.redirect("back");
    } else {
      Standard.find({organisation: req.params.id}).exec(function(err, standards){
        if(err) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("standard/index", {standards: standards, isAdmin: false, organisation: organisation});         
        }
      });
    }
  });
});

//NEW ROUTE
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Bestuur niet gevonden");
      req.redirect("back");
    } else {
      res.render("standard/new", {organisation: organisation}); 
    }
  });
});

//SHOW ROUTE
router.get("/:sid", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Bestuur niet gevonden");
      req.redirect("back");
    } else {
      Standard.findById(req.params.sid, function(err, standard){
        if(err ||!standard){
          req.flash("error", "Normering niet gevonden.");
          res.redirect("back");
        } else {
          res.render("standard/show", {standard: standard, roles: config.management.roles, organisation: organisation});   
        }
      });
    }
  });
});

//CREATE ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Probleem bij vinden van bestuur.")
      res.redirect("back");
    }
    Standard.create(req.body.standard, function(err, standard){
      if(err || !standard){
        req.flash("error", err.message);
        res.locals.error = req.flash("error");
        res.render("standard/new");
      }  else {
        standard.organisation = organisation._id;
        if(standard.isSecondarySchool){
          standard.software = config.software.standards.secondary
        }
        standard.save();
        req.flash("success", "Normering toegevoegd");
        res.redirect("/organisations/"+ organisation._id + "/standard");
      }
    }); 
  });
});

// //EDIT ROUTE
router.get("/:sid/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Bestuur niet gevonden");
      req.redirect("back");
    } else {
      Standard.findById(req.params.sid, function(err, standard){
        if(err || !standard){
          req.flash("error", "Normering niet gevonden.");
          res.redirect("/organisations/"+ organisation._id + "/standard");
        } else {
          res.render("standard/edit", {
            standard: standard, 
            allHardwareTypes: config.hardware.all, 
            roles: config.management.roles, 
            organisation: organisation
          });
        }
      });
    }
  });
});

// //UPDATE ROUTE
router.put("/:sid", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Standard.findByIdAndUpdate(req.params.sid, req.body.standard, function(err, standard){
    if(err || !standard){
      req.flash("error", "Normering niet gevonden.");
      res.redirect("/standard");
    } else {
      req.flash("success", "Normering updated");
      res.redirect("/organisations/"+ req.params.id + "/standard/" + req.params.sid);
    }
  });
});

//DELETE ROUTE
router.delete("/:sid", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Standard.findByIdAndRemove(req.params.sid, function(err){
    if(err){
      req.flash("error", "Er is iets misgegaan. Probeer normering opnieuw te verwijderen.");
      res.redirect("/organisations/"+ req.params.id + "/standard");
    } else {
      req.flash("success", "Normering verwijderd");
      res.redirect("/organisations/"+ req.params.id + "/standard");  
    }
  });
});

module.exports = router;