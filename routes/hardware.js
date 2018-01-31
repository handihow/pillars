var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var Hardware = require("../models/hardware");
var global = require("../models/global");
var middleware = require("../middleware");
var csv = require("fast-csv");

//INDEX - list of hardware
router.get("/", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id).populate("hardware").exec(function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("back");
        } else {
            res.render("hardware/index", {school: school, global: global});        
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

//BULK NEW - accepts file and renders the form to create new hardware in list
router.post("/bulk", middleware.isSchoolOwner, function(req, res){
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
                    ignoreEmpty: true
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
   
   //create new hardware in DB for each hardware
   req.body.hardware.forEach(function(hardware, i, a){
       Hardware.create(hardware, function(err, hardware){
       if(err){
           req.flash("error", "Hardware niet gevonden");
           res.redirect("back");
       } else {
           //add owner (id and username) to hardware
           if(!hardware.type){hardware.type="Desktop"}
           hardware.owner = req.user._id;
           //connect new hardware to school in DB
           hardware.save();
           School.findById(req.params.id, function(err, school){
               if(err) {
                   req.flash("error", "School niet gevonden");
                   res.redirect("back");
               } else {
                   school.hardware.push(hardware);
                   school.isToegevoegdHardware = true;
                   school.save();
                   //on last loop, redirect to school hardware show page
                   if(i===a.length-1){
                    req.flash("success", "Hardware succesvol toegevoegd!");
                    res.redirect("/scholen/"+school._id+"/hardware");
                   }
               }
           });
       }
    });
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
               school.save();
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

//SHOW individual hardware records
router.get("/:hardware_id", middleware.isSchoolOwner, function(req, res){
   School.findById(req.params.id).populate("hardware").exec(function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden");
           res.redirect("back");
       } else {
           Hardware.findById(req.params.hardware_id).populate("owner").exec(function(err, hardware){
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