var express = require("express");
var router = express.Router();
var request = require("request");
var School = require("../models/school");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    School.find({"owner.username": req.user.username}, function(err, scholen){
        if(err) {
            req.flash("error", err.message);
        } else {
            res.render("scholen/index", {scholen: scholen});         
        }
    });
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("scholen/new"); 
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    School.create(req.body.school, function(err, school){
      if(err){
          req.flash("error", err.message);
          res.render("scholen/new");
      }  else {
          //look up user id and username and add to school
          school.owner.id = req.user._id;
          school.owner.username = req.user.username;
          school.save();
          req.flash("success", "School toegevoegd");
          res.redirect("/scholen");
      }
    });
});

//SEARCH DUO DATA ROUTE
router.post("/search", middleware.isLoggedIn, function(req, res){
    var url = "https://api.duo.nl/v0/datasets/01.-hoofdvestigingen-basisonderwijs/search?brin=" + req.body.brin;
    request(url, function (error, response, body) {
      if(!error && response.statusCode == 200){
          var scholen = JSON.parse(body).results;
          if(scholen[0]){
              res.render("scholen/search", {scholen: scholen}); 
          } else {
              req.flash("error", "Geen school gevonden in DUO database. Controleer het BRIN nummer.");
              res.redirect("back");
          }
      } else {
          req.flash("error", "Er is iets misgegaan met het verzoek om gegevens van DUO. Probeer opnieuw.");
          res.redirect("back");
      }
    });
});

//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
   School.findById(req.params.id, function(err, school){
       if(err ||!school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           res.render("scholen/show", {school: school});            
       }
   });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("/scholen");
       } else {
           res.render("scholen/edit", {school: school});
       }
   });
});

//UPDATE ROUTE
router.put("/:id", middleware.isSchoolOwner, function(req, res){
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("/scholen");
       } else {
           req.flash("success", "School updated");
           res.redirect("/scholen/" + req.params.id);
       }
    });
});

//DELETE ROUTE
router.delete("/:id", middleware.isSchoolOwner, function(req, res){
   School.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/scholen");
       } else {
           req.flash("success", "School verwijderd");
           res.redirect("/scholen");  
       }
   });
});

module.exports = router;