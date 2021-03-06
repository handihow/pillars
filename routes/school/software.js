var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Software = require("../../models/software");
var Survey = require("../../models/survey");
var TeachingMethod = require("../../models/teachingMethod");
var middleware = require("../../middleware");
var json2csv = require("json2csv");
var config = require("../../config/config");

router.use(function(req,res,next){
  res.locals.config = config.software;
  next();
})

//INDEX - list of software in tile view
router.get("/", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id).populate("software").exec(function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden.");
            res.redirect("back");
        } else {
            res.render("software/index", {school: school});        
        }
    });
});

//INDEX - list of software in list view
router.get("/list", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id).populate("software").exec(function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden.");
            res.redirect("back");
        } else {
             Survey.findOne({
               organisation: school.organisation,
               isActiveSoftwareSurvey: true
             })
            .exec(function(err, survey){
                if(err){
                  req.flash("error", err.message);
                  res.redirect("back");
                } else {
                  res.locals.scripts.header.datatables = true;
                  res.locals.scripts.footer.datatables = true;
                  res.render("table-view/index", {
                    school: school, 
                    items: school.software, 
                    columns: config.software.columns(school.isSecondarySchool),
                    header: 'software',
                    hasWarningRow: false,
                    surveyId: survey ? survey._id : undefined
                  });
                }
            })
        }
    });
});

//INDEX - list of software in tile view
router.get("/charts", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id).populate("software").exec(function(err, school){
        if(err || !school) {
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
        } else {
          res.locals.scripts.header.surveyanalytics = true;
          res.locals.scripts.footer.softwareanalytics = true;
          res.render("software/charts", {school: school});        
        }
    });
});

//settings of software
router.get("/settings", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id).populate("software").exec(function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden.");
            res.redirect("back");
        } else {
            res.render("software/settings", {school: school});        
        }
    });
});

//ADD automatically software
router.get("/import", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id).populate("software").exec(function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden.");
            res.redirect("back");
        } else {
            res.locals.scripts.footer.edurep = true;
            res.render("software/import", {school: school});        
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
                    newSoftware.school = school.name;
                    newSoftware.subject = software.subject;
                    newSoftware.name = software.name;
                    newSoftware.typeOfSoftware = software.typeOfSoftware;
                    software.functionalities.forEach(function(functionality){
                        newSoftware[functionality] = "Ja";
                    });
                    software.gradeLevels.forEach(function(gradeLevel){
                        newSoftware[gradeLevel] = "Ja"; 
                    });
                    software.ratings.forEach(function(rating){
                        newSoftware[rating] = "Ja";
                    });
                    newSoftware.effectiveness = software.effectiveness;
                    softwareList.push(newSoftware);
                });
                var fields = ['school', 'subject', 'name', 'typeOfSoftware'];
                var fieldNames = ['School', 'Vak', 'Naam', 'Type'];
                config.software.functionality.forEach(function(functionality){
                   fields.push(functionality);
                   fieldNames.push(functionality);
                });
                for (var i=1; i<=8; i++) {
                    var gradeLevel = "Groep " + i;
                    fields.push(gradeLevel);
                    fieldNames.push(gradeLevel);
                }
                config.software.ratings.forEach(function(rating){
                   fields.push(rating);
                   fieldNames.push(rating);
                });
                fields.push('effectiveness');
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
                  res.render("software/show", {software: software, school: school});
              }
          });
      }
  });
});


//NEW - form to create new hardware
router.get("/new/:subject", middleware.isNotDemoAccount , middleware.isSchoolOwner, function(req, res){
    let subject = req.params.subject;
    School.findById(req.params.id).populate("software").exec(function(err, school){
        if(err) {
            req.flash("error", "School niet gevonden.");
            res.redirect("back");
        } else {
          let queryParams = {};
          if(subject === 'Overige'){
            queryParams = {
              subject: {$in: config.software.subjects.primary.filter(s => !s.isCore).map(s => s.subject)}
            };
          } else if(subject === 'ICT Geletterdheid'){
             queryParams = {
              subject: {$in: config.software.subjects.primary.filter(s => s.isICT).map(s => s.subject)}
            };
          } else {
            queryParams = {
              subject: subject
            };
          }
          if(school.isSecondarySchool){
            queryParams.isSecondarySchool = true;
          }
          TeachingMethod.find(
            queryParams, 
            null, 
            {sort : { name : 1 }}, 
            function(err, teachingMethods){
            if(err){
              req.flash("error", "Probleem bij vinden van lesmethodes.");
              res.redirect("back");
            } else {
              res.locals.scripts.footer.edurep = true;
              res.render("software/new", {
                school: school, 
                subject: subject,
                teachingMethods: teachingMethods
              });  
            }
          });     
        } 
    });
});

//CREATE - creates new software in the database and links it to school
router.post("/", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    //lookup school by ID
    School.findById(req.params.id, function(err, school){
      if(err || !school){
          req.flash("error", "Software niet gevonden");
          res.redirect("scholen/"+req.params.id+"/software");
      } else {
      let newSoftware = req.body.software;
      console.log(newSoftware);
      if(newSoftware.teachingMethod.length === 0){
        delete newSoftware.teachingMethod;
      }
      //create new software in DB
      Software.create(newSoftware, function(err, software){
          if(err){
              req.flash("error", err.message);
              res.redirect("back");
          } else {
              software.school = school._id;
              software.save();
              school.software.push(software);
              school.save();
              req.flash("success","Digitaal Leermiddel toegevoegd");
              //redirect to school software show page
              res.redirect("/schools/"+school._id+"/software");
          }
        });
      }
    });
});

//EDIT displays a form to edit software record
router.get("/:software_id/edit", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req,res){
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
                  res.render("software/edit", {software: software, school: school});
              }
          });
      }
  });
});

//UPDATE ROUTE SOFTWARE SETTINGS
router.put("/settings", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden.");
     res.redirect("/schools");
   } else {
     if(req.body.extrafunction){
       if(school.settings.software.functionalities[3]){
         school.settings.software.functionalities.pop();
       }
       school.settings.software.functionalities.push(req.body.extrafunction);  
     }
     if(!req.body.ratings0 || !req.body.ratings1 || !req.body.ratings2 || !req.body.ratings3 || !req.body.ratings4){
       req.flash("error", "Alle 5 kwaliteitseisen moeten zijn ingevuld. Wijzigingen zijn niet opgeslagen.")
       return res.redirect("back");
     }
     school.settings.software.ratings = [req.body.ratings0, req.body.ratings1, req.body.ratings2, req.body.ratings3, req.body.ratings4];
     school.save();
     req.flash("success", "Instellingen voor digitale leermiddelen gewijzigd");
     res.redirect("/schools/" + req.params.id+"/software"); 
   }
 });
});

//UPDATE route to store edited software to database
router.put("/:software_id", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  Software.findByIdAndUpdate(req.params.software_id, req.body.software, function(err, software){
      if(err || !software){
          req.flash("error", "Software niet gevonden");
          res.redirect("back");
      } else {
          req.flash("success", "Digitaal leermiddel updated");
          res.redirect("/schools/" + req.params.id + "/software/" + software._id);
      }
  }); 
});

//DESTROY route to delete software from database
router.delete("/:software_id", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  Software.findByIdAndRemove(req.params.software_id, function(err){
      if(err){
          req.flash("error", err.message);
          res.redirect("back");
      } else {
          req.flash("success", "Digitaal leermiddel verwijderd");
          res.redirect("/schools/" + req.params.id + "/software/");
      }
  }); 
});

module.exports = router;