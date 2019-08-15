var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Hardware = require("../../models/hardware");
var config = require("../../config/config");
var middleware = require("../../middleware");
var csv = require("fast-csv");
var json2csv = require("json2csv");
var score = require("../../config/score");
var mongoose = require("mongoose");

router.use(function(req,res,next){
  res.locals.config = config.hardware;
  next();
})

//INDEX - main page hardware
router.get("/", middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id).populate("hardware").populate("standard").exec(function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("back");
    } else {
      let trackedHardware = calculateHardwareStatus(school);
      res.render("hardware/index", {school: school, trackedHardware: trackedHardware});        
    }
  });
});

//INDEX - list of hardware
router.get("/list", middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id).populate("hardware").populate("standard").exec(function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("back");
    } else {
      calculateHardwareStatus(school);
      res.locals.scripts.header.surveyjs = true;
      res.locals.scripts.footer.surveyjs = true;
      res.locals.scripts.footer.surveyOptions = true;
      res.locals.scripts.footer.hardware = true;
      res.render("hardware/index-list", {school: school, mode: 'inline'});        
    }
  });
});

function calculateHardwareStatus(school){
  let trackedHardware = school.settings.hardware.filter(h => h.track);
  trackedHardware.forEach(type => {
    type.count = 0;
    type.countLowSpecifications = 0;
    type.countDepreciated = 0;
    type.countDepreciatedNextYear = 0;
  });
  school.hardware.forEach(function(hardware){
    let index = trackedHardware.findIndex(h => h.singular === hardware.type);
    if(hardware.type==="Multipoint computer" && !isNaN(hardware.numberWorkPlacesMultipoint)){
      trackedHardware[index].count += hardware.numberWorkPlacesMultipoint;
    } else {
      trackedHardware[index].count += 1;
    }
    //set warnings and calculate the number of devices out of spec
    if(school.standard){
      if(school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
              hardware.memory < school.standard.hardware.computersPerStudent.minRAM){
          hardware.isDepreciated = true;
          hardware.warning = "Te weinig werkgeheugen";
          trackedHardware[index].countLowSpecifications += 1;
      } else if(!school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
              hardware.deploymentYear < (new Date()).getFullYear() - school.standard.hardware.computersPerStudent.maxYear) {
          hardware.isDepreciated = true;
          hardware.warning = "Apparaat is te oud";
          trackedHardware[index].countDepreciated += 1;
      } else if(!school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
              hardware.deploymentYear < (new Date()).getFullYear() - school.standard.hardware.computersPerStudent.maxYear - 1) {
          hardware.isDepreciated = true;
          hardware.warning = "Apparaat is volgend jaar afgeschreven";
          trackedHardware[index].countDepreciatedNextYear += 1;
      } else if(hardware.type==="Multipoint computer" && !hardware.numberWorkPlacesMultipoint){
        hardware.isDepreciated = true;
        hardware.warning = "Aantal werkplekken multipoint is niet gedefinieerd";
      }
    }
  });
  return trackedHardware;
}

//BUDGET - shows how much budget needs to be spent to get hardware in order
router.get("/budget", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id)
      .populate("hardware")
      .populate("standard")
      .exec(function(err, school){
      if(err ||!school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          //check if the school has standard set up
          if(!school.standard){
            return res.redirect("/schools/"+school.id+"/pillars/settings");
          }
          school.hardware.forEach(function(hardware){
              if(hardware.deploymentYear && hardware.depreciationPeriod 
                    && (hardware.deploymentYear + hardware.depreciationPeriod < new Date().getFullYear() )){
                  hardware.isDepreciated = true;
              }
          })
          var result = score.calculate(school, [], true);
          res.render("hardware/budget", {school: school, result: result});            
      }
  });
});

//CHARTS - charts of hardware
router.get("/charts", middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id).populate("hardware").populate("standard").exec(function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("back");
    } else {
      calculateHardwareStatus(school);
      res.locals.scripts.header.surveyanalytics = true;
      res.locals.scripts.footer.hardwareanalytics = true;
      res.render("hardware/charts", {school: school});        
    }
  });
});

//HARDWARE SETTINGS EDIT ROUTE
router.get("/settings", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden.");
     res.redirect("/schools");
   } else {
     res.render("hardware/settings", {school: school});
   }
 });
});

//DOWNLOAD ROUTE HARDWARE OVERVIEW SCHOLEN
router.get("/download", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id)
  .populate("hardware")
  .exec(function(err, school){
    if(err || !school) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      var hardwareList = [];
      school.hardware.forEach(function(hardware){
        hardware.school = school.name;
        hardwareList.push(hardware);
      });
      var fields = ['school', 'type', 'name', 'brand', 'model', 'serialTag', 
      'processor', 'memory', 'deploymentYear','numberWorkPlacesMultipoint',
      'isTouchscreenDigibord', 'screensizeDigibord', 'supplier', 'warranty'];
      var fieldNames = ['School', 'Type', 'Naam', 'Merk', 'Model', 'Serial/Tag', 
      'Processor', 'Werkgeheugen (GB)', 'Jaar ingebruikname', 'Aantal werkplekken (Multipoint)',
      'is Touchscreen', 'Schermgrootte', 'Leverancier', 'Garantievorm'];
      json2csv({ data: hardwareList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
        if(err){
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.setHeader('Hardware-download', 'attachment; filename=hardware.csv');
          res.set('Content-Type', 'text/csv');
          res.status(200).send(csv);
        }
      });
    }
  });
});

//NEW - form to create new hardware
router.get("/new/:mode", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("/schools");
    } else {
      res.locals.scripts.header.surveyjs = true;
      res.locals.scripts.footer.surveyjs = true;
      res.locals.scripts.footer.surveyOptions = true;
      res.locals.scripts.footer.hardware = true;
      res.render("hardware/new", {school: school, mode: req.params.mode});        
    }
  });
});

//BULK NEW - form to upload CSV FILE with hardware
router.get("/bulk", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("/schools");
    } else {
      res.render("hardware/bulkupload", {school: school});        
    }
  });
});

//SHOW individual hardware records
router.get("/:hardware_id", middleware.isSchoolOwner, function(req, res){
 School.findById(req.params.id).populate("hardware").exec(function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden");
     res.redirect("back");
   } else {
     Hardware.findById(req.params.hardware_id).exec(function(err, hardware){
       if(err || !hardware){
         req.flash("error", "Hardware niet gevonden");
         res.redirect("back");
       } else {
         res.render("hardware/show", {hardware: hardware, school: school});
       }
     });
   }
 });
});

//BULK NEW - accepts file and renders the form to create new hardware in list
router.post("/bulk", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  let delimiter = req.body.separation;
  School.findById(req.params.id, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden");
     res.redirect("back");
   } else {
    if (!req.files) {
      req.flash("error", "Geen file geupload");
      return res.redirect("back");
    } else {
      var hardwareFile = req.files.file;
      var hardware = [];
      csv
      .fromString(hardwareFile.data.toString(), {
        headers: true,
        ignoreEmpty: true,
        delimiter: delimiter
      })
      .on("data", function(data){
        hardware.push(data);
      })
      .on("end", function(){
        res.render("hardware/bulkupload2", {school: school, hardware: hardware});
      });
    }
  }
});
});

//CREATE - creates new hardware in the database and links it to school from the bulk upload
router.post("/bulk2", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
 var newHardware = []
   //store all hardware from csv in the newHardware array
   req.body.hardware.forEach(function(hardware, i, a){
    if(!hardware.type){hardware.type="Desktop"}
      hardware.owner = req.user._id;
    newHardware.push(hardware);
  });
   //store the newHardware array to the database
   Hardware.collection.insert(newHardware, function(err, result){
    if(err){
      req.flash("error", err.message)
    } else {
      //find the school
      School.findById(req.params.id, function(err, school){
       if(err) {
         req.flash("error", "School niet gevonden");
         res.redirect("back");
       } else {
            //store the ids of the hardware in an array
            var hardwareIds = result.ops.map(function(o){return String(o._id)});
            //add the id of each hardware to the school hardware
            hardwareIds.forEach(function(hardwareId){
              school.hardware.push(hardwareId);
            });
            //then save the school
            school.save(function(err){
              if(err){
                req.flash("error", err.message);
                res.redirect("back");
              } else {
                req.flash("success", "Hardware succesvol toegevoegd!");
                res.redirect("/schools/"+school._id+"/hardware");
              }
            });
          }
        });
    }
  });
 });


//CREATE - creates new hardware in the database and links it to school
router.post("/", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  var hardware = JSON.parse(req.body.result);
    //lookup school by ID
  School.findById(req.params.id, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden");
     res.redirect("back");
   } else if(req.body.mode == "long") {
     //detailed form was used, create single new hardware in DB
     Hardware.create(hardware, function(err, hardware){
       if(err){
         res.contentType('json');
          res.send({ 
              success: false, 
              error: 'Foutmelding: hardware niet toegevoegd. Server geeft fout: ' + err.message 
            });
       } else {
             //add owner (id and username) to hardware
             hardware.owner = req.user._id;
             //connect new hardware to school in DB
             hardware.save();
             school.hardware.push(hardware);
             school.save();
             //redirect to school hardware show page
             req.flash("success", "Hardware succesvol toegevoegd!");
             res.contentType('json');
             res.send({ 
                  success: true
                }); 
        }
       });
     } else {
       var newHardware = []
       //add hardware from the list of hardware
       hardware.hardware.forEach(function(hardware){
         var count = 0;
         while (count < parseInt(hardware.numberDevices)) {
           var newHW = JSON.parse(JSON.stringify(hardware));
           newHW.owner = req.user._id;
           newHW._id = mongoose.mongo.ObjectId();
           delete newHW.numberDevices;
           newHardware.push(newHW);
           count ++;
         }
       });
      Hardware.collection.insertMany(newHardware, function(err, result){
        if(err){
          res.contentType('json');
          res.send({ 
            success: false, 
            error: 'Hardware werd niet toegevoegd. Foutmelding: ' + err.message
          });
        } else {
            //store the ids of the hardware in an array
            var hardwareIds = result.ops.map(function(o){return String(o._id)});
            //add the id of each hardware to the school hardware
            hardwareIds.forEach(function(hardwareId){
              school.hardware.push(hardwareId);
            });
            //then save the school
            school.save(function(err, school){
              if(err){
                res.contentType('json');
                res.send({ 
                  success: false, 
                  error: 'Er ging iets mis. Foutmelding: ' + err.message
                });
              } else {
                res.contentType('json');
                res.send({ 
                  success: true
                });
              }
            });
        }
      });
     }
   });
  });

//COPY - makes a copy of hardware in the database
router.post("/:hardware_id/copy", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
 console.log("hit the hardware copy route");
 console.log(req.body.hardware);
 Hardware.create(req.body.hardware, function(err, hardware){
   if(err){
     req.flash("error", err.message);
     res.redirect("back");
   } else {
      School.findById(req.params.id, function(err, school){
       if(err){
         req.flash("error", "School niet gevonden");
         res.redirect("back");
       }
       school.hardware.push(hardware);
       school.save();
         //redirect to school hardware show page
         req.flash("success", "Hardware succesvol toegevoegd!");
         res.redirect("/schools/"+school._id+"/hardware");    
       });
    }
  });
});


//UPDATE ROUTE HARDWARE SETTINGS
router.put("/settings", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  req.body.school.settings.hardware.forEach(function(setting){
    if(setting.track.includes("on")){
      setting.track = true;
    } else {
      setting.track = false;
    }
  });
  School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden.");
     res.redirect("/schools");
   } else {
     req.flash("success", "Hardware instellingen gewijzigd");
     res.redirect("/schools/" + req.params.id+"/hardware"); 
   }
 });
});

//EDIT displays a form to edit hardware record
router.get("/:hardware_id/edit", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req,res){
 School.findById(req.params.id, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden");
     res.redirect("back");
   } else {
     Hardware.findById(req.params.hardware_id, function(err, hardware){
       if(err || !hardware){
         req.flash("error", "Hardware niet gevonden");
         res.redirect("back");
       } else {
         res.render("hardware/edit", {hardware: hardware, school: school});
       }
     });
   }
 });
});

//UPDATE route to store edited hardware to database
router.put("/:hardware_id", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
 Hardware.findByIdAndUpdate(req.params.hardware_id, req.body.hardware, function(err, hardware){
   if(err || !hardware){
     req.flash("error", err.message);
     res.redirect("back");
   } else if(!hardware){
     req.flash("error", "Hardware niet gevonden");
     res.redirect("back");
   } else {
     req.flash("success", "Hardware updated");
     res.redirect("/schools/" + req.params.id + "/hardware/" + hardware._id);
   }
 }); 
});


//DESTROY route to delete hardware from database
router.delete("/:hardware_id", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
 Hardware.findByIdAndRemove(req.params.hardware_id, function(err){
   if(err){
     req.flash("error", "Hardware niet gevonden");
     res.redirect("back");
   } else {
     req.flash("success", "Hardware verwijderd");
     res.redirect("/schools/" + req.params.id + "/hardware/");
   }
 }); 
});

module.exports = router;