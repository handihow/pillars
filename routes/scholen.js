var express = require("express");
var router = express.Router();
var request = require("request");
var School = require("../models/school");
var Message = require("../models/message");
var middleware = require("../middleware");
var User = require("../models/user");
var global = require("../models/global");

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
        //bestuur admins & users and pillars admins go to the list of schools
        School.find(
            {"organisation": req.user.organisation}, 
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
   School.findById(req.params.id).exec(function(err, school){
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
      Message.find({organisation: school.organisation}).exec(function(err, messages){
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
    let zoekcriterium = parseInt(req.body.zoekcriterium); 
    let zoekveld = req.body.zoekveld; 
    var url;
    var secondarySchool = Boolean(zoekcriterium);
    if(zoekcriterium==0){
      console.log("PO schools");
      url = "https://onderwijsdata.duo.nl/api/3/action/datastore_search?resource_id=584b8e26-4130-418b-bf2d-f8475f488a82&q=" +
                zoekveld;
    } else {
      console.log("VO schools");
      url = "https://onderwijsdata.duo.nl/api/3/action/datastore_search?resource_id=747f18de-4f46-4689-a1bd-d4292ecbf418&q=" +
                zoekveld;
    }
    request(url, function (error, response, body) {
      if(!error && response.statusCode == 200){
        var scholen = JSON.parse(body).result.records;
        if(scholen.length>0){
            req.flash("success", "Gegevens gevonden in de DUO database. Controleer de gegevens en bewaar.");
            res.locals.success = req.flash("success");
            res.render("scholen/new", {scholen: scholen, secondarySchool: secondarySchool});
        } else {
            req.flash("error", "Geen school gevonden in DUO database.");
            res.locals.error = req.flash("error");
            res.render("scholen/handmatig"); 
        }
      } else {
          req.flash("error", "Er is iets misgegaan met het verzoek om gegevens van DUO. Probeer opnieuw.");
          res.redirect("back");
      }
    });
});

//CREATE ROUTE
router.post("/", middleware.isAuthenticatedBadmin, function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err || !user){
        req.flash("error", "Fout bij ophalen gebruikersgegevens");
        return req.redirect("back");
      }
      req.body.school.forEach(function(school){
         School.create(school, function(err, school){
            if(err || !school){
                req.flash("error", err.message);
                res.render("scholen/new");
            }  else {
                //look up user id and username and add to school
                school.owner = req.user._id;
                school.organisation = user.organisation;
                if(school.isSecondarySchool){
                  school.instellingenSoftware = global.subjectsSecondary;
                }
                school.save();
            }
          }); 
      });
      req.flash("success", "School toegevoegd");
      res.redirect("/scholen");
    });
});

//CREATE ROUTE HANDMATIG
router.post("/handmatig", middleware.isAuthenticatedBadmin, function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err || !user){
        req.flash("error", "Fout bij ophalen gebruikersgegevens");
        return req.redirect("back");
      }
      School.create(req.body.school, function(err, school){
        if(err || !school){
            req.flash("error", err.message);
            res.render("scholen/handmatig");
        }  else {
            //look up user id and username and add to school
            school.owner = req.user._id;
            school.organisation = user.organisation;
            if(school.isSecondarySchool){
              school.instellingenSoftware = global.subjectsSecondary;
            }
            school.save();
        }
      });
      req.flash("success", "School toegevoegd");
      res.redirect("/scholen");
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