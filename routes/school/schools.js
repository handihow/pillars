var express = require("express");
var router = express.Router();
var request = require("request");
var School = require("../../models/school");
var Organisation = require("../../models/organisation");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  //if user is school employee, direct to school page
  if(req.user.role==="suser" || req.user.role==="sadmin") {
  //   return res.redirect("/user/"+req.user._id);
  // //if user is school admin then go to school page    
  // } else if(req.user.role==="sadmin") {
      //find the school
      School.findOne({"users": req.user._id}, function(err, school) {
        if(err || !school){
          req.flash("error", err.message);
          res.redirect("back"); 
        } else {
          res.redirect("/schools/" + school._id);
        }
      });
  } else {
    //organisation admins & users and pillars admins go to their list of schools
    School.find(
      {"organisation": req.user.organisation}, 
      null,
      {sort: {name: 1}},
      function(err, schools){
        if(err || !schools) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          Organisation.findById(req.user.organisation, function(err, organisation){
            res.render("schools/index", {schools: schools, organisation: organisation}); 
          })    
        }
      });
  }
});

//NEW (AUTOMATIC) ROUTE
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
  res.render("schools/search"); 
});

//NEW MANUAL ROUTE
router.get("/manual", middleware.isAuthenticatedBadmin, function(req, res){
  res.render("schools/manual"); 
});

//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
 School.findById(req.params.id).populate("users").exec(function(err, school){
   if(err ||!school){
     req.flash("error", "School niet gevonden.");
     res.redirect("back");
   } else {
     if(school.users){
      var schoolAdmins = school.users.filter(user => user.role =="sadmin");
     }
     res.render("schools/show", {school: school, schoolAdmins: schoolAdmins}); 
   }
 });
});

//POST ROUTES FOR CREATING SCHOOLS AUTOMATICALLY
router.post("/new", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  let zoekcriterium = parseInt(req.body.zoekcriterium); 
  let zoekveld = req.body.zoekveld; 
  var url;
  var secondarySchool;
  if(zoekcriterium==0){
    url = "https://onderwijsdata.duo.nl/api/3/action/datastore_search?resource_id=616793a8-10df-4ea9-9905-13d48e126b45&q=" +
    zoekveld;
    secondarySchool = false;
  } else if(zoekcriterium==1) {
    url = "https://onderwijsdata.duo.nl/api/3/action/datastore_search?resource_id=3c3fd20f-6bff-4266-bd3e-5360b17dae5e&q=" +
    zoekveld;
    secondarySchool = true;
  } else {
    url = "https://onderwijsdata.duo.nl/api/3/action/datastore_search?resource_id=93c9f726-6b93-439a-9e3e-2136c158ac47&q=" +
    zoekveld;
    secondarySchool = false;
  }
  request(url, function (error, response, body) {
    if(!error && response.statusCode == 200){
      var schools = JSON.parse(body).result.records;
      if(schools.length>0){
        req.flash("success", "Gegevens gevonden in de DUO database. Controleer de gegevens en bewaar.");
        res.locals.success = req.flash("success");
        res.render("schools/new", {schools: schools, secondarySchool: secondarySchool});
      } else {
        req.flash("error", "Geen school gevonden in DUO database.");
        res.locals.error = req.flash("error");
        res.render("schools/manual"); 
      }
    } else {
      req.flash("error", "Er is iets misgegaan met het verzoek om gegevens van DUO. Probeer opnieuw.");
      res.redirect("back");
    }
  });
});

//CREATE ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  User.findById(req.user._id, function(err, user){
    if(err || !user){
      req.flash("error", "Fout bij ophalen gebruikersgegevens");
      return req.redirect("back");
    }
    var schools = req.body.school;
    if(!schools || schools.length==0){
      req.flash("error", "Geen scholen ingevoerd");
      return req.redirect("back");
    }
    schools.forEach(function(school, index){
     School.create(school, function(err, school){
      if(err || !school){
        req.flash("error", err.message);
        res.render("schools/new");
      }  else {
        //look up user id and username and add to school
        school.owner = req.user._id;
        school.organisation = user.organisation;
        if(school.isSecondarySchool){
          school.settings.software.subjects = config.software.subjects.secondary.schoolConfig();
        }
        school.save();
        if(index==schools.length-1){
          req.flash("success", "Scholen toegevoegd");
          res.redirect("/schools");
        }
      }
    }); 
   });
  });
});

//CREATE ROUTE MANUAL
router.post("/manual", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  User.findById(req.user._id, function(err, user){
    if(err || !user){
      req.flash("error", "Fout bij ophalen gebruikersgegevens");
      return req.redirect("back");
    }
    School.create(req.body.school, function(err, school){
      if(err || !school){
        req.flash("error", err.message);
        res.redirect("back");
      }  else {
        //look up user id and username and add to school
        school.owner = req.user._id;
        school.organisation = user.organisation;
        if(school.isSecondarySchool){
          school.settings.software.subjects = config.software.subjects.secondary.schoolConfig();
        }
        school.save();
        req.flash("success", "School toegevoegd");
        res.redirect("/schools");
      }
    });
  });
});


//EDIT ROUTE
router.get("/:id/edit", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden.");
     res.redirect("/schools");
   } else {
     res.locals.scripts.header.uploadcare = true;
     var inspectionResults = config.inspectionResults;
     res.render("schools/edit", {school: school, inspectionResults: inspectionResults});
   }
 });
});

//UPDATE ROUTE
router.put("/:id", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
   if(err || !school){
     req.flash("error", err.message);
     res.redirect("/schools");
   } else {
     res.locals.scripts.header.uploadcare = false;
     req.flash("success", "School updated");
     res.redirect("/schools/" + req.params.id);
   }
 });
});

//DELETE ROUTE
router.delete("/:id", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
 School.findById(req.params.id, function(err, school){
   if(err){
     res.redirect("/schools");
   } else {
     school.remove(function(err){
      if(err){
        res.redirect("/schools");
      } else {
        req.flash("success", "School verwijderd");
        res.redirect("/schools"); 
      }
    });
   }
 });
});

module.exports = router;