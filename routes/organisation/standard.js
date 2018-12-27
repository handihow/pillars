var express = require("express");
var router = express.Router();
var Standard = require("../../models/standard");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require('../../config/config');

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    Standard.find({organisation: req.user.organisation}).exec(function(err, standards){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("standard/index", {standards: standards});         
        }
    });
});

//NEW ROUTE
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
  res.render("standard/new"); 
});

//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
  Standard.findById(req.params.id, function(err, standard){
      if(err ||!standard){
          req.flash("error", "Normering niet gevonden.");
          res.redirect("back");
      } else {
          res.render("standard/show", {standard: standard, roles: config.management.roles});   
      }
  });
});

//CREATE ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  User.findById(req.user._id, function(err, user){
      if(err || !user){
        req.flash("error", "Probleem bij vinden van gebruikersgegevens.")
        res.redirect("back");
      }
      Standard.create(req.body.standard, function(err, standard){
            if(err || !standard){
                req.flash("error", err.message);
                res.locals.error = req.flash("error");
                res.render("standard/new");
            }  else {
                //look up user organisation add to standardization
                standard.organisation = user.organisation;
                if(standard.isSecondary){
                  standard.software = config.software.standards.secondary
                }
                standard.save();
                req.flash("success", "Normering toegevoegd");
                res.redirect("/standard");
            }
      }); 
  });
});

// //EDIT ROUTE
router.get("/:id/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    Standard.findById(req.params.id, function(err, standard){
      if(err || !standard){
          req.flash("error", "Normering niet gevonden.");
          res.redirect("/standard");
      } else {
          res.render("standard/edit", {standard: standard, allHardwareTypes: config.hardware.all, roles: config.management.roles});
      }
  });
});

// //UPDATE ROUTE
router.put("/:id", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    Standard.findByIdAndUpdate(req.params.id, req.body.standard, function(err, standard){
      if(err || !standard){
          req.flash("error", "Normering niet gevonden.");
          res.redirect("/standard");
      } else {
          req.flash("success", "Normering updated");
          res.redirect("/standard/" + req.params.id);
      }
    });
});

//DELETE ROUTE
router.delete("/:id", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Standard.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer normering opnieuw te verwijderen.");
          res.redirect("/standard");
      } else {
          req.flash("success", "Normering verwijderd");
          res.redirect("/standard");  
      }
  });
});

module.exports = router;