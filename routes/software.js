var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var Software = require("../models/software");
var global = require("../models/global");
var middleware = require("../middleware");
var json2csv = require("json2csv");

//INDEX - list of software
router.get("/", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id).populate("software").exec(function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden.");
            res.redirect("back");
        } else {
            res.render("software/index", {school: school, global: global});        
        }
    });
});

//SHOW individual software records
router.get("/:software_id", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
      if(err || !school){
          req.flash("error", "School niet gevonden");
          res.redirect("back");
      } else {
          Software.findById(req.params.software_id, function(err, software) {
              if(err || !software){
                  req.flash("error", "Software niet gevonden");
                  res.redirect("back");
              } else {
                  res.render("software/show", {software: software, school: school, global: global});
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

//NEW - form to create new hardware
router.get("/new/:vak", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id).populate("software").exec(function(err, school){
        if(err) {
            req.flash("error", "School niet gevonden.");
            res.redirect("back");
        } else {
            res.render("software/new", {school: school, vak: req.params.vak, global: global});        
        }
    });
});

//CREATE - creates new software in the database and links it to school
router.post("/", middleware.isSchoolOwner, function(req, res){
    //lookup school by ID
    School.findById(req.params.id, function(err, school){
      if(err || !school){
          req.flash("error", "Software niet gevonden");
          res.redirect("scholen/"+req.params.id+"/software");
      } else {
      //create new software in DB
      Software.create(req.body.software, function(err, software){
          if(err){
              req.flash("error", err.message);
              res.redirect("back");
          } else {
              //add owner (id and username) to software
              software.owner.id = req.user._id;
              software.owner.username = req.user.username;
              //connect new software to school in DB
              software.save();
              school.software.push(software);
              school.isToegevoegdSoftware = true;
              school.save();
              req.flash("Digitaal Leermiddel toegevoegd");
              //redirect to school software show page
              res.redirect("/scholen/"+school._id+"/software");
          }
        });
      }
    });
});

//DOWNLOAD ROUTE SOFTWARE OVERVIEW SCHOLEN
router.get("/download", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id)
          .populate("software")
          .exec(function(err, school){
              if(err || !school) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                var softwareList = [];
                school.software.forEach(function(software){
                    var newSoftware = {};
                    newSoftware.school = school.instellingsnaam;
                    newSoftware.vak = software.vak;
                    newSoftware.naam = software.naam;
                    software.functie.forEach(function(functie){
                        newSoftware[functie] = "Ja";
                    });
                    software.groep.forEach(function(groep){
                        newSoftware[groep] = "Ja"; 
                    });
                    software.kwaliteit.forEach(function(kwaliteit){
                        newSoftware[kwaliteit] = "Ja";
                    });
                    newSoftware.effectiviteit = software.effectiviteit;
                    softwareList.push(newSoftware);
                });
                var fields = ['school', 'vak', 'naam'];
                var fieldNames = ['School', 'Vak', 'Naam'];
                global.softwareFuncties.forEach(function(functie){
                   fields.push(functie);
                   fieldNames.push(functie);
                });
                for (var i=1; i<=8; i++) {
                    var groep = "Groep " + i;
                    fields.push(groep);
                    fieldNames.push(groep);
                }
                global.softwareKwaliteiten.forEach(function(kwaliteit){
                   fields.push(kwaliteit);
                   fieldNames.push(kwaliteit);
                });
                fields.push('effectiviteit');
                fieldNames.push('Effectiviteit');
                json2csv({ data: softwareList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
                    if(err){
                        req.flash("error", err.message);
                        res.redirect("back");
                    } else {
                        res.setHeader('Software-download', 'attachment; filename=software.csv');
                        res.set('Content-Type', 'text/csv');
                        res.status(200).send(csv);
                    }
                });
            }
          });
});

//EDIT displays a form to edit software record
router.get("/:software_id/edit", middleware.isSchoolOwner, function(req,res){
  School.findById(req.params.id, function(err, school){
      if(err || !school){
          req.flash("error", "School niet gevonden");
          res.redirect("back");
      } else {
          Software.findById(req.params.software_id, function(err, software){
              if(err || !software){
                  req.flash("error", "Software niet gevonden");
                  res.redirect("back");
              } else {
                  res.render("software/edit", {software: software, school: school, global: global});
              }
          });
      }
  });
});

//UPDATE route to store edited software to database
router.put("/:software_id", middleware.isSchoolOwner, function(req, res){
  Software.findByIdAndUpdate(req.params.software_id, req.body.software, function(err, software){
      if(err || !software){
          req.flash("error", "Software niet gevonden");
          res.redirect("back");
      } else {
          req.flash("success", "Digitaal leermiddel updated");
          res.redirect("/scholen/" + req.params.id + "/software/" + software._id);
      }
  }); 
});

//DESTROY route to delete software from database
router.delete("/:software_id", middleware.isSchoolOwner, function(req, res){
  Software.findByIdAndRemove(req.params.software_id, function(err){
      if(err){
          req.flash("error", err.message);
          res.redirect("back");
      } else {
          req.flash("success", "Digitaal leermiddel verwijderd");
          res.redirect("/scholen/" + req.params.id + "/software/");
      }
  }); 
});

module.exports = router;