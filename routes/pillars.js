var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var Normering = require("../models/normering");
var middleware = require("../middleware");

//SHOW ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id).populate("hardware").populate("normering").exec(function(err, school){
      if(err ||!school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          //check if the school has normering set up
          if(!school.normering){
            return res.redirect("/scholen/"+school.id+"/pillars/instellingen");
          }
          //check computers per student criteria
          var countGoodComputers = 0;
          school.hardware.forEach(function(hardware){
            if(school.normering.hardwareTypesCountedAsComputer.includes(hardware.type) && 
              ( hardware.werkgeheugen >= school.normering.minRAM || hardware.jaarIngebruikname >= school.normering.minYear)) {
                if(hardware.type=="Multipoint computer") {
                  countGoodComputers = countGoodComputers + hardware.aantalWerkplekkenMultipoint; 
                } else {
                  countGoodComputers++;
                }
              }
          });
          var normComputers = school.aantalLeerlingen * school.normering.computersPerLeerling;
          var scoreComputersPerLeerling = 0; 
          if(countGoodComputers >= normComputers) {scoreComputersPerLeerling = school.normering.maxScoreComputersPerLeerling} else {scoreComputersPerLeerling = school.normering.maxScoreComputersPerLeerling * countGoodComputers / normComputers};
          //end check computers per student
          //check digitale borden per lokaal
          var countGoodDigibord = 0;
          school.hardware.forEach(function(hardware){
            if(hardware.type==="Digitaal schoolbord" && ((hardware.isTouchscreenDigibord || 0) >= (school.normering.isTouchscreenDigibord || 0))) {
                countGoodDigibord ++;
              }
          });
          var normDigibord = school.aantalKlaslokalen * school.normering.digibordenPerKlaslokaal;
          var scoreDigibordenPerKlaslokaal = school.normering.maxScoreDigibordenPerKlaslokaal * countGoodDigibord / normDigibord;
          //end check digitale borden per lokaal
          //check network criteria
          var scoreNetwerk = 0;
          if(school.heeftGoedBedraadNetwerk && school.heeftGoedWirelessNetwerk){
            scoreNetwerk = school.normering.maxScoreNetwerk;
          }
          //end network criteria
          //check portable computers per school criteria
          var countGoodPortableComputers = 0;
          school.hardware.forEach(function(hardware){
            if(school.normering.hardwareTypesCountedAsPortableComputer.includes(hardware.type) && 
              ( hardware.werkgeheugen >= school.normering.minRAM || hardware.jaarIngebruikname >= school.normering.minYear)) {
                  countGoodPortableComputers++;
              }
          });
          var normPortableComputers = school.normering.portableComputersPerSchool;
          var scorePortableComputersPerLeerling = school.normering.maxScorePortableComputersPerSchool * countGoodPortableComputers / normPortableComputers;
          //end portable computers per school criteria
          res.render("pillars/show", {school: school, scoreComputersPerLeerling: scoreComputersPerLeerling, scoreDigibordenPerKlaslokaal: scoreDigibordenPerKlaslokaal, scoreNetwerk: scoreNetwerk, scorePortableComputersPerLeerling: scorePortableComputersPerLeerling});            
      }
  });
});

//EDIT PILLARS INSTELLINGEN ROUTE
router.get("/instellingen", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
      if(err || !school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          Normering.find({owner: school.owner}, function(err, normeringen){
            if(err ||!normeringen){
              req.flash("error", "Geen normering gevonden. Vraag het bestuur om normering toe te voegen aan Pillars.");
              res.redirect("back");
            } else {
              res.render("pillars/instellingen", {school: school, normeringen: normeringen});
            }
          });
      }
  });
});

//UPDATE ROUTE
router.put("/instellingen", middleware.isSchoolOwner, function(req, res){
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
      if(err || !school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          req.flash("success", "Pillars Normering Ingesteld");
          res.redirect("/scholen/" + school._id + "/pillars");
      }
    });
});

module.exports = router;