var express = require("express");
var router = express.Router();
var request = require("request");
var School = require("../models/school");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    //if user is school medewerker, direct to his profile page
    if(req.user.role==="suser") {
        return res.redirect("/user/"+req.user._id);
    //if user is school admin then go to school page    
    } else if(req.user.role==="sadmin") {
        //find the school
        School.findOne({"users": req.user._id}, function(err, school) {
            if(err || !school){
                req.flash("error", err.message);
                res.redirect("back"); 
            } else {
                res.redirect("/scholen/" + school._id);
            }
        });
    } else {
        //bestuur admins go to the list of schools
        School.find(
            {"owner": req.user._id}, 
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
   res.render("scholen/search"); 
});

router.post("/new", middleware.isLoggedIn, function(req, res){
    var zoekcriterium = req.body.zoekcriterium, 
        zoekveld = req.body.zoekveld, 
        url = "https://api.duo.nl/v0/datasets/03.-alle-vestigingen-basisonderwijs/search?";
    if(zoekcriterium==0){
        url = url+"brin="+zoekveld;
    } else if(zoekcriterium==1){
        url = url+"vestigingsnummer="+zoekveld;
    } else {
        url = url+"bevoegd_gezag="+zoekveld;
    }
    request(url, function (error, response, body) {
      if(!error && response.statusCode == 200){
        var scholen = JSON.parse(body).results;
        if(scholen[0]){
            req.flash("success", "Gegevens gevonden in de DUO database. Controleer de gegevens en bewaar.");
            res.locals.success = req.flash("success");
            res.render("scholen/new", {scholen: scholen});
        } else {
            req.flash("error", "Geen school gevonden in DUO database. Voer de school handmatig in of controleer gegevens en probeer opnieuw");
            res.locals.error = req.flash("error");
            res.render("scholen/new", {scholen: [{}]});
        }
      } else {
          req.flash("error", "Er is iets misgegaan met het verzoek om gegevens van DUO. Probeer opnieuw.");
          res.redirect("back");
      }
    });
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    req.body.school.forEach(function(school){
       School.create(school, function(err, school){
          if(err || !school){
              req.flash("error", err.message);
              res.render("scholen/new");
          }  else {
              //look up user id and username and add to school
              school.owner = req.user._id;
              school.save();
          }
        }); 
    });
    req.flash("success", "School toegevoegd");
    res.redirect("/scholen");
});

//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
   School.findById(req.params.id).populate("owner").exec(function(err, school){
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

//HARDWARE INSTELLINGEN EDIT ROUTE
router.get("/:id/hardware/instellingen", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("/scholen");
       } else {
           res.render("scholen/hardwareInstellingen", {school: school});
       }
   });
});

//UPDATE ROUTE HARDWARE INSTELLINGEN
router.put("/:id/hardware/instellingen", middleware.isLoggedIn, function(req, res){
    req.body.school.instellingenHardwareTypes.forEach(function(instelling){
        if(instelling.bijhouden.includes("on")){
            instelling.bijhouden = true;
        } else {
            instelling.bijhouden = false;
        }
    });
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("/scholen");
       } else {
           req.flash("success", "Hardware instellingen gewijzigd");
           res.redirect("/scholen/" + req.params.id+"/hardware"); 
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