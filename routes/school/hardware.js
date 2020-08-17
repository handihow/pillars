var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Hardware = require("../../models/hardware");
var config = require("../../config/config");
var middleware = require("../../middleware");
var Papa = require('papaparse')
var score = require("../../config/score");
var hardwareScore = require("../../config/hardware/score");
var mongoose = require("mongoose");
var path = require('path');

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
      let trackedHardware = hardwareScore.calculateHardwareStatus(school);
      var result = score.calculate(school, [], true);
      res.locals.scripts.footer.chartjs = true;
      res.render("hardware/index", {school: school, trackedHardware: trackedHardware, result: result});        
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
      hardwareScore.calculateHardwareStatus(school);
      res.locals.scripts.header.datatables = true;
      res.locals.scripts.footer.datatables = true;
      res.render("table-view/index", {
        school: school, 
        items: school.hardware, 
        columns: config.hardware.columns,
        header: 'hardware',
        hasWarningRow: true
      });        
    }
  });
});

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
          var result = score.calculate(school, [], true);
          let trackedHardware = hardwareScore.calculateHardwareStatus(school);
          res.locals.scripts.header.datatables = true;
          res.locals.scripts.footer.datatables = true;
          res.render("hardware/budget", {school: school, result: result, trackedHardware: trackedHardware});            
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
      hardwareScore.calculateHardwareStatus(school);
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
     res.render("hardware/settings", {school: school, settings: config.hardware.types});
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
      res.render("hardware/new", {school: school, mode: req.params.mode, formsCSS: config.formsCSS});        
    }
  });
});

//BULK NEW - form to upload CSV FILE with hardware
router.get("/csv-import", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("/schools");
    } else {
      res.render("csv-import/main", {
        school: school, 
        columns: config.hardware.columns, 
        header: 'hardware',
        link: 'https://pillars.school/wp-content/uploads/2020/07/Pillars-csv-import-model-voor-hardware.xlsx'
      });        
    }
  });
});

//CREATE - creates new hardware in the database and links it to school from the bulk upload
router.post("/csv-import", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
   var newHardwareItems = JSON.parse(req.body.items);
   var newHardware = [];
   //store all hardware from csv in the newHardware array
   newHardwareItems.forEach(function(hardware, i, a){
    if(!hardware.type){hardware.type="Desktop"}
    hardware.owner = req.user._id;
    hardware.school = mongoose.Types.ObjectId(req.params.id);
    newHardware.push(hardware);
  });
   //store the newHardware array to the database
   Hardware.collection.insert(newHardware, function(err, result){
    if(err){
      res.json({success: false, message: err.message});
    } else {
      //find the school
      School.findById(req.params.id, function(err, school){
       if(err) {
         res.json({success: false, message: "School niet gevonden"});
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
                res.json({success: false, message: err.message});
              } else {
                res.json({success: true, message: "Hardware succesvol toegevoegd!"});                
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


module.exports = router;