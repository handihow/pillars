var express = require("express");
var router = express.Router();
var request = require("request");
var School = require("../models/school");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    //if user is school admin then go to school page
    if(req.user.role==="sadmin") {
        //find the school
        School.findOne({"admin.username": req.user.username}, function(err, school) {
            if(err){
                req.flash("error", err.message);
                res.redirect("back"); 
            } else if(!school) {
                req.flash("error", "Account is niet actief. Neem contact op met uw schoolbestuur.");
                res.redirect("back"); 
            } else {
                res.redirect("/scholen/" + school._id);
            }
        });
    } else {
        //else go to the list of schools
        School.find(
            {"owner.username": req.user.username}, 
            null,
            {sort: {instellingsnaam: 1}},
            function(err, scholen){
            if(err || !scholen) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.render("scholen/index", {scholen: scholen});         
            }
        });
    }
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
          var school = JSON.parse(body).results[0];
          if(school){
              res.render("scholen/search", {school: school}); 
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
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
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
router.put("/:id", middleware.isLoggedIn, function(req, res){
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