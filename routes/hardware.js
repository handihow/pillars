var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var Hardware = require("../models/hardware");
var global = require("../models/global");
var middleware = require("../middleware");
var csv = require("fast-csv");
var json2csv = require("json2csv");

//INDEX - list of hardware
router.get("/", middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id).populate("hardware").populate("normering").exec(function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("back");
    } else {
      school.hardware.forEach(function(hardware){
        if(school.normering){
          if(school.normering.hardwareTypesCountedAsComputer.includes(hardware.type) && hardware.werkgeheugen < school.normering.minRAM){
            hardware.isVerouderd = true;
            hardware.waarschuwing = "Te weinig werkgeheugen";
          } else if(!school.normering.hardwareTypesCountedAsComputer.includes(hardware.type) && hardware.jaarIngebruikname < school.normering.minYear) {
            hardware.isVerouderd = true;
            hardware.waarschuwing = "Apparaat is te oud";
          } else if(hardware.type==="Multipoint computer" && !hardware.aantalWerkplekkenMultipoint){
            hardware.isVerouderd = true;
            hardware.waarschuwing = "Aantal werkplekken multipoint is niet gedefinieerd";
          }
        }
      })
      res.render("hardware/index", {school: school, global: global});        
    }
  });
});

//HARDWARE INSTELLINGEN EDIT ROUTE
router.get("/instellingen", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
   if(err || !school){
     req.flash("error", "School niet gevonden.");
     res.redirect("/scholen");
   } else {
     res.render("hardware/instellingen", {school: school});
   }
 });
});

//NEW - form to create new hardware
router.get("/new/:type", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("/scholen");
    } else {
      res.render("hardware/new", {school: school, type: req.params.type});        
    }
  });
});

//BULK NEW - form to upload CSV FILE with hardware
router.get("/bulk", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("/scholen");
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

//PROTECT THE DEMO ACCOUNT
router.use(function(req, res, next){
  if(req.user && req.user.username==="demo@pillars.school"){
    req.flash("error", "Je kunt geen records aanmaken of wijzigen met het demo account.");
    return res.redirect("back");
  }
  next();
})


//BULK NEW - accepts file and renders the form to create new hardware in list
router.post("/bulk", middleware.isSchoolOwner, function(req, res){
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
        res.render("hardware/bulkupload2", {school: school, hardware: hardware, global: global});
      });
    }
  }
});
});

//CREATE - creates new hardware in the database and links it to school from the bulk upload
router.post("/bulk2", middleware.isSchoolOwner, function(req, res){
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
            school.isToegevoegdHardware = true;
            //then save the school
            school.save(function(err){
              if(err){
                req.flash("error", err.message);
                res.redirect("back");
              } else {
                req.flash("success", "Hardware succesvol toegevoegd!");
                res.redirect("/scholen/"+school._id+"/hardware");
              }
            });
          }
        });
    }
  });
 });


//CREATE - creates new hardware in the database and links it to school
router.post("/", middleware.isSchoolOwner, function(req, res){
    //lookup school by ID
    School.findById(req.params.id, function(err, school){
     if(err || !school){
       req.flash("error", "School niet gevonden");
       res.redirect("back");
     } else {
       //create new hardware in DB
       Hardware.create(req.body.hardware, function(err, hardware){
         if(err){
           req.flash("error", "Hardware niet gevonden");
           res.redirect("back");
         } else {
               //add owner (id and username) to hardware
               hardware.owner = req.user._id;
               //connect new hardware to school in DB
               hardware.save();
               school.hardware.push(hardware);
               school.isToegevoegdHardware = true;
               school.save(function(err, school){
                if(err){
                  console.log(err);
                }
                console.log(school);
              });
               //redirect to school hardware show page
               req.flash("success", "Hardware succesvol toegevoegd!");
               res.redirect("/scholen/"+school._id+"/hardware");
             }
           });
     }
   });
  });

//COPY - makes a copy of hardware in the database
router.post("/:hardware_id/copy", middleware.isSchoolOwner, function(req, res){
 Hardware.create(req.body.hardware, function(err, hardware){
   if(err){
     req.flash("error", "Hardware niet gevonden");
     res.redirect("back");
   } else {
            //add owner (id and username) to hardware
            hardware.owner = req.user._id;
            hardware.save();
            School.findById(req.params.id, function(err, school){
             if(err){
               req.flash("error", "School niet gevonden");
               res.redirect("back");
             }
             
             school.hardware.push(hardware);
             school.save();
               //redirect to school hardware show page
               req.flash("success", "Hardware succesvol toegevoegd!");
               res.redirect("/scholen/"+school._id+"/hardware");    
             });
          }
        });
});


//UPDATE ROUTE HARDWARE INSTELLINGEN
router.put("/instellingen", middleware.isSchoolOwner, function(req, res){
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

//DOWNLOAD ROUTE HARDWARE OVERVIEW SCHOLEN
router.get("/download", middleware.isAuthenticatedBadmin, function(req, res){
  School.findById(req.params.id)
  .populate("hardware")
  .exec(function(err, school){
    if(err || !school) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      var hardwareList = [];
      school.hardware.forEach(function(hardware){
        hardware.school = school.instellingsnaam;
        hardwareList.push(hardware);
      });
      var fields = ['school', 'type', 'naam', 'merk', 'model', 'serialTag', 
      'processor', 'werkgeheugen', 'jaarIngebruikname','aantalWerkplekkenMultipoint',
      'isTouchscreenDigibord', 'schermgrootteDigibord'];
      var fieldNames = ['School', 'Type', 'Naam', 'Merk', 'Model', 'Serial/Tag', 
      'Processor', 'Werkgeheugen (GB)', 'Jaar ingebruikname', 'Aantal werkplekken (Multipoint)',
      'is Touchscreen', 'Schermgrootte'];
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


//EDIT displays a form to edit hardware record
router.get("/:hardware_id/edit", middleware.isSchoolOwner, function(req,res){
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
         res.render("hardware/edit", {hardware: hardware, school: school, global: global});
       }
     });
   }
 });
});

//UPDATE route to store edited hardware to database
router.put("/:hardware_id", middleware.isSchoolOwner, function(req, res){
 Hardware.findByIdAndUpdate(req.params.hardware_id, req.body.hardware, function(err, hardware){
   if(err || !hardware){
     req.flash("error", "Hardware niet gevonden");
     res.redirect("back");
   } else {
     req.flash("success", "Hardware updated");
     res.redirect("/scholen/" + req.params.id + "/hardware/" + hardware._id);
   }
 }); 
});


//DESTROY route to delete hardware from database
router.delete("/:hardware_id", middleware.isSchoolOwner, function(req, res){
 Hardware.findByIdAndRemove(req.params.hardware_id, function(err){
   if(err){
     req.flash("error", "Hardware niet gevonden");
     res.redirect("back");
   } else {
     req.flash("success", "Hardware verwijderd");
     res.redirect("/scholen/" + req.params.id + "/hardware/");
   }
 }); 
});

module.exports = router;