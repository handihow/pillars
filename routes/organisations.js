var express = require("express");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware");
var Organisation = require("../models/organisation");

//get list of organisations
router.get("/", middleware.isPadmin, function(req,res){
  Organisation.find(function(err, organisations){
    if(err){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("organisations/index", {organisations: organisations}); 
    }
  })
});

//show form to add organisation
router.get("/new", middleware.isPadmin, function(req, res){
	res.render("organisations/new");
});

//CREATE ROUTE
router.post("/", middleware.isPadmin, function(req, res){
    Organisation.create(req.body.organisation, function(err, organisation){
      if(err || !organisation){
        req.flash("error", err.message);
        res.redirect("/organisations");
      }  else {
        req.flash("success", "Organisatie toegevoegd");
    	  res.redirect("/organisations");
      }
    }); 
});


//EDIT ROUTE
router.get("/:id/edit", middleware.isPadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
       if(err || !organisation){
           req.flash("error", "Organisatie niet gevonden.");
           res.redirect("/organisations");
       } else {
           res.render("organisations/edit", {organisation: organisation});
       }
   });
});

//UPDATE ROUTE
router.put("/:id", middleware.isPadmin, function(req, res){
    Organisation.findByIdAndUpdate(req.params.id, req.body.organisation, function(err, organisation){
       if(err || !organisation){
           req.flash("error", "Organisatie niet gevonden.");
       } else {
           req.flash("success", "Organisatie updated");
       }
       res.redirect("/organisations");
    });
});

//DELETE ROUTE
router.delete("/:id", middleware.isPadmin, function(req, res){
   Organisation.findById(req.params.id, function(err, organisation){
       if(err){
           res.redirect("/organisations");
       } else {
           organisation.remove(function(err){
              if(err){
                res.redirect("/organisations");
              } else {
                req.flash("success", "Organisatie verwijderd");
                res.redirect("/organisations"); 
              }
           });
       }
   });
});
module.exports = router;