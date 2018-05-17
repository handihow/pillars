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
    } else if(req.user.role==="buser") {
        //find all schools from bestuur admin (owner of bestuur user record)
        School.find(
            {"owner": req.user.owner}, 
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
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
   res.render("scholen/search"); 
});

//NEW HANDMATIG ROUTE
router.get("/handmatig", middleware.isAuthenticatedBadmin, function(req, res){
   res.render("scholen/handmatig"); 
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

//INDEX ROUTE FOR SCHOOL
router.get("/:id/messages", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.find({owner: school.owner}).exec(function(err, messages){
        if(err){
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("message/school", {school: school, messages: messages});
        }
      });
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

router.post("/new", middleware.isAuthenticatedBadmin, function(req, res){
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
router.post("/", middleware.isAuthenticatedBadmin, function(req, res){
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

//CREATE ROUTE HANDMATIG
router.post("/handmatig", middleware.isAuthenticatedBadmin, function(req, res){
    School.create(req.body.school, function(err, school){
      if(err || !school){
          req.flash("error", err.message);
          res.render("scholen/handmatig");
      }  else {
          //look up user id and username and add to school
          school.owner = req.user._id;
          school.save();
      }
    });
    req.flash("success", "School toegevoegd");
    res.redirect("/scholen");
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
   School.findById(req.params.id, function(err, school){
       if(err){
           res.redirect("/scholen");
       } else {
           school.remove(function(err){
              if(err){
                res.redirect("/scholen");
              } else {
                req.flash("success", "School verwijderd");
                res.redirect("/scholen"); 
              }
           });
       }
   });
});

module.exports = router;