var express = require("express");
var router = express.Router();
var Normering = require("../models/normering");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    Normering.find({owner: req.user._id}).populate("owner").exec(function(err, normeringen){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("normering/index", {normeringen: normeringen});         
        }
    });
});

//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
  Normering.findById(req.params.id, function(err, normering){
      if(err ||!normering){
          req.flash("error", "Normering niet gevonden.");
          res.redirect("back");
      } else {
          res.render("normering/show", {normering: normering});            
      }
  });
});


//PROTECT THE DEMO ACCOUNT
router.use(function(req, res, next){
  if(req.user && req.user.username==="demo@pillars.school"){
    req.flash("error", "Je kunt geen records aanmaken of wijzigen met het demo account.");
    return res.redirect("back");
  }
  next();
});


//NEW ROUTE
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
  res.render("normering/new"); 
});

//CREATE ROUTE
router.post("/", middleware.isAuthenticatedBadmin, function(req, res){
    Normering.create(req.body.normering, function(err, normering){
          if(err || !normering){
              req.flash("error", err.message);
              res.locals.error = req.flash("error");
              res.render("normering/new");
          }  else {
              //look up user id and username and add to school
              normering.owner = req.user._id;
              normering.save();
              req.flash("success", "Normering toegevoegd");
              res.redirect("/normering");
          }
    }); 
});
    

// //EDIT ROUTE
router.get("/:id/edit", middleware.isNormeringOwner, function(req, res){
    Normering.findById(req.params.id, function(err, normering){
      if(err || !normering){
          req.flash("error", "Normering niet gevonden.");
          res.redirect("/normering");
      } else {
          res.render("normering/edit", {normering: normering});
      }
  });
});

// //UPDATE ROUTE
router.put("/:id", middleware.isNormeringOwner, function(req, res){
    Normering.findByIdAndUpdate(req.params.id, req.body.normering, function(err, normering){
      if(err || !normering){
          req.flash("error", "Normering niet gevonden.");
          res.redirect("/normering");
      } else {
          req.flash("success", "Normering updated");
          res.redirect("/normering/" + req.params.id);
      }
    });
});

//DELETE ROUTE
router.delete("/:id", middleware.isNormeringOwner, function(req, res){
  Normering.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer normering opnieuw te verwijderen.");
          res.redirect("/normering");
      } else {
          req.flash("success", "Normering verwijderd");
          res.redirect("/normering");  
      }
  });
});

module.exports = router;