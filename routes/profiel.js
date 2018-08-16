var express = require("express");
var router = express.Router({mergeParams: true});
var Profiel = require("../models/profiel");
var middleware = require("../middleware");
var global = require("../models/global");
var User = require("../models/user");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    Profiel.find({organisation: req.user.organisation}).populate("owner").exec(function(err, profiel){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("profiel/index", {profiel: profiel});         
        }
    });
});

//NEW - form to create new profile questions
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
    res.render("profiel/new");        
});


//SHOW individual profile question records
router.get("/:id", middleware.isAuthenticatedBadmin, function(req, res){
  Profiel.findById(req.params.id, function(err, profiel){
      if(err || !profiel){
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          res.render("profiel/show", {profielVragen: profiel.profiel, profiel: profiel});
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


//CREATE - creates new profile questions in the database
router.post("/", middleware.isAuthenticatedBadmin, function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err || !user){
        req.flash("error", "Probleem bij vinden van gebruikersgegevens.")
        res.redirect("back");
      }
      Profiel.create(req.body.profiel, function(err, profiel){
         if(err){
             req.flash("error", err.message);
             res.redirect("back");
         } else {
             //add the user to profiel
             profiel.owner = req.user._id;
             profiel.organisation = req.user.organisation;
             profiel.save();
             req.flash("success", "Profiel vragen updated");
             res.redirect("/profiel");
         }
      });   
    });
});

//CREATE - creates new profile questions in the database with versnellingsvraag Questions
router.post("/versnellingsvraag", middleware.isAuthenticatedBadmin, function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err || !user){
        req.flash("error", "Probleem bij vinden van gebruikersgegevens.")
        res.redirect("back");
      }
      Profiel.create(req.body.profiel, function(err, profiel){
         if(err){
             req.flash("error", err.message);
             res.redirect("back");
         } else {
             //add the user to profiel
             profiel.owner = req.user._id;
             profiel.set({
                profiel: global.versnellingsvraagProfiel,
                isMultipleChoice: true
             });
             profiel.organisation = req.user.organisation;
             profiel.save();
             req.flash("success", "Profiel vragen updated");
             res.redirect("/profiel");
             }
      }); 
    });  
});


//EDIT displays a form to edit profile question record
router.get("/:id/edit", middleware.isAuthenticatedBadmin, function(req,res){
  Profiel.findById(req.params.id, function(err, profiel){
      if(err || !profiel){
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          res.render("profiel/edit", {profielVragen: profiel.profiel, profiel: profiel});
      }
  });
});

//UPDATE route to store edited profile questions to database
router.put("/:id", middleware.isAuthenticatedBadmin, function(req, res){
  Profiel.findByIdAndUpdate(req.params.id, req.body.profiel, function(err, profiel){
      if(err || !profiel){
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          req.flash("success", "Profielvragen updated");
          res.redirect("/profiel");
      }
  }); 
});

//MAKE THE PROFILE QUESTIONS THE ACTUAL QUESTIONS ON THE PROFILE PAGE OF EMPLOYEES
router.get("/:id/actual", middleware.isAuthenticatedBadmin, function(req, res){
   Profiel.find({"owner": req.user._id}).exec(function(err, profielen){
      if(err || !profielen) {
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          profielen.forEach(function(profiel, i){
              if(profiel._id.equals(req.params.id)){
                  profiel.isActueel = true;
              } else {
                  profiel.isActueel = false;
              }
              profiel.save();
              if(i===(profielen.length-1)){
                  req.flash("success", "Profielvragen nu actueel");
                  res.redirect("/profiel");
              }
          });
      }
   }); 
});

//DESTROY route to delete tests from database
router.delete("/:id", middleware.isAuthenticatedBadmin, function(req, res){
  Profiel.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Profielvragen niet gevonden");
          res.redirect("back");
      } else {
          req.flash("success", "Profielvragen verwijderd");
          res.redirect("/profiel");
      }
  }); 
});

module.exports = router;