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
    School.find({}, null, {sort: {organisation: 1, name: 1}}).populate('organisation').exec(
      function(err, schools){
        if(err || !schools) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.locals.scripts.header.datatables = true;
          res.locals.scripts.footer.datatables = true;
          res.render("admin/schools/index", {schools: schools}); 
        }
      });
});

//NEW (AUTOMATIC) ROUTE
router.get("/new", middleware.isPadmin, function(req, res){
  res.render("admin/schools/search"); 
});

//NEW MANUAL ROUTE
router.get("/manual", middleware.isPadmin, function(req, res){
  res.render("admin/schools/manual"); 
});


//POST ROUTES FOR CREATING SCHOOLS AUTOMATICALLY
router.post("/new", middleware.isPadmin, function(req, res){
  let zoekcriterium = parseInt(req.body.zoekcriterium); 
  let zoekveld = req.body.zoekveld; 
  var url;
  var secondarySchool;
  var packageId;
  var packageIndex;
  request('https://onderwijsdata.duo.nl/api/3/action/package_list', function(error, response, body){
    if(!error && response.statusCode == 200){
      var responseBody = JSON.parse(body);
      if(zoekcriterium==0){
        packageIndex = responseBody.result.findIndex(r => r.toLowerCase().includes('adres') && r.toLowerCase().includes('bo'));
        secondarySchool = false;
      } else if(zoekcriterium==1) {
        packageIndex = responseBody.result.findIndex(r => r.toLowerCase().includes('adres') && r.toLowerCase().includes('vo'));
        secondarySchool = true;
      } else {
        packageIndex = responseBody.result.findIndex(r => r.toLowerCase().includes('adres') && r.toLowerCase().includes('so'));
        secondarySchool = false;
      }
      if(packageIndex > -1){
         request('https://onderwijsdata.duo.nl/api/3/action/package_show?id='+ responseBody.result[packageIndex], function(error, response, body){
          if(!error && response.statusCode == 200){
            var packageResponseBody = JSON.parse(body);
            if(packageResponseBody.result && packageResponseBody.result.resources && Array.isArray(packageResponseBody.result.resources)){
              var resourceIndex = packageResponseBody.result.resources.findIndex(resource => resource.name.toLowerCase().includes('vestigingen'));
              if(resourceIndex > -1){
                url = "https://onderwijsdata.duo.nl/api/3/action/datastore_search?resource_id=" + packageResponseBody.result.resources[resourceIndex].id + "&q=" +
                zoekveld;
                console.log(url);
                findSchoolInformation(url, secondarySchool, req, res);
              } else {
                req.flash("error", "Geen resource gevonden met de zoekterm 'vestigingen' gevonden");
                res.redirect("back");
              }
            }
          } else {
            req.flash("error", "Probleem bij het aanroepen van package met id " + responseBody.result[packageIndex] + '. Error is ' + error);
            res.redirect("back");
          }
        })
      } else {
        req.flash("error", "Geen package gevonden op de DUO API");
        res.redirect("back");
      }
    } else {
      req.flash("error", "Probleem bij het aanroepen van DUO API om package ids te zoeken. Error is " + error);
      res.redirect("back");
    }
  });
});

function findSchoolInformation(url, secondarySchool, req, res){
  request(url, function (error, response, body) {
    if(!error && response.statusCode == 200){
      var schools = JSON.parse(body).result.records;
      if(schools.length>0){
        Organisation.find({}, null, {sort: {name: 1}}).exec(function(err,organisations) {
          if(err || !organisations){
            req.flash("error", "Geen besturen gevonden");
            res.redirect("back");
          } else {
            res.render("admin/schools/new", {schools: schools, secondarySchool: secondarySchool, organisations: organisations});
          }
        });
      } else {
        req.flash("error", "Geen school gevonden in DUO database.");
        res.locals.error = req.flash("error");
        res.render("admin/schools/manual"); 
      }
    } else {
      req.flash("error", "Er is iets misgegaan met het verzoek om gegevens van DUO. Probeer opnieuw.");
      res.redirect("back");
    }
  });
}

//CREATE ROUTE
router.post("/", middleware.isPadmin, function(req, res){
    var organisationId = req.body.organisation;
    var schools = req.body.school;
    if(!schools || schools.length==0){
      req.flash("error", "Geen scholen ingevoerd");
      return req.redirect("back");
    }
    schools.forEach(function(school, index){
     School.create(school, function(err, school){
      if(err || !school){
        req.flash("error", err.message);
        res.render("admin/schools/new");
      }  else {
        //look up user id and username and add to school
        school.organisation = organisationId;
        if(school.isSecondarySchool){
          school.settings.software.subjects = config.software.subjects.secondary.schoolConfig();
        }
        school.save();
        if(index==schools.length-1){
          req.flash("success", "Scholen toegevoegd");
          res.redirect("/admin/schools");
        }
      }
    }); 
   });
 });

//CREATE ROUTE MANUAL
router.post("/manual", middleware.isPadmin, function(req, res){
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
        res.redirect("/admin/schools");
      }
    });
  });
});

//DELETE ROUTE
router.delete("/:id", middleware.isPadmin, function(req, res){
 School.findById(req.params.id, function(err, school){
   if(err){
     res.redirect("/schools");
   } else {
     school.remove(function(err){
      if(err){
        res.redirect("/admin/schools");
      } else {
        req.flash("success", "School verwijderd");
        res.redirect("/admin/schools"); 
      }
    });
   }
 });
});


module.exports = router;