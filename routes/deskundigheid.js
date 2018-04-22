var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var middleware = require("../middleware");
var Profiel = require("../models/profiel");
var global = require("../models/global");
var json2csv = require("json2csv");

//SHOW ROUTE
router.get("/", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id).populate("owner").populate("tests").exec(function(err, school){
      if(err ||!school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
        Profiel.findOne({"owner": school.owner, "isActueel": true}, function(err, profiel){
          if(err){
            req.flash("error", err);
            res.redirect("back");
          } else if (!profiel){
            res.render("deskundigheid/show", {school: school, global:global}); 
          } else {
            res.render("deskundigheid/show", {school: school, global:profiel}); 
          }
        })         
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
})


//EDIT ROUTE
router.get("/edit", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           res.render("deskundigheid/edit", {school: school});
       }
   });
});

//UPDATE ROUTE
router.put("/", middleware.isSchoolOwner, function(req, res){
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           school.isIngevuldDeskundigheid = true;
           school.save();
           req.flash("success", "Deskundigheid updated");
           res.redirect("/scholen/" + req.params.id + "/deskundigheid");
       }
    });
});

//DOWNLOAD ROUTE TEST OVERVIEW SCHOLEN
router.get("/download", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id)
          .populate("tests")
          .exec(function(err, school){
              if(err || !school) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                var testList = [];
                school.tests.forEach(function(test){
                    test.school = school.instellingsnaam;
                    testList.push(test);
                });
                var fields = ['school', 'subject', 'result','username'];
                var fieldNames = ['School', 'Onderdeel', 'Resultaat', 'Gebruiker'];
                json2csv({ data: testList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
                    if(err){
                        req.flash("error", err.message);
                        res.redirect("back");
                    } else {
                        res.setHeader('Test-download', 'attachment; filename=tests.csv');
                        res.set('Content-Type', 'text/csv');
                        res.status(200).send(csv);
                    }
                });
            }
          });
});

module.exports = router;