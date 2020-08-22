var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Classroom = require("../../models/classroom");
var config = require("../../config/config");
var middleware = require("../../middleware");
var mongoose = require("mongoose");

//INDEX - list of hardware
router.get("/", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id).exec(function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("back");
    } else {
      Classroom.find({
        school: school._id
      }, function(err, classrooms){
        if(err){
          req.flash("error", "Probleem bij het inladen van klassen");
          res.redirect("back");
        } else {
          res.locals.scripts.header.datatables = true;
          res.locals.scripts.footer.datatables = true;
          res.render("table-view/index", {
            school: school, 
            items: classrooms, 
            columns: config.classroom.columns,
            header: 'classroom',
            title: 'Klas',
            hasWarningRow: false,
            allowNewEntries: true
          });  
        }
      })  
    }
  });
});

//BULK NEW - form to upload CSV FILE with classroom info
router.get("/csv-import", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school) {
      req.flash("error", "School niet gevonden");
      res.redirect("back");
    } else {
      res.render("csv-import/main", {
        school: school, 
        columns: config.classroom.columns, 
        header: 'classroom',
        title: 'klassen',
        link: 'https://pillars.school/wp-content/uploads/2020/08/Pillars-csv-import-model-voor-klassen.xlsx'
      });        
    }
  });
});

//CREATE - creates new hardware in the database and links it to school from the bulk upload
router.post("/csv-import", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
   var newClassroomItems = JSON.parse(req.body.items);
   var newClassrooms = [];
   //store all hardware from csv in the newHardware array
   newClassroomItems.forEach(function(classroom, i, a){
    classroom.school = mongoose.Types.ObjectId(req.params.id);
    newClassrooms.push(classroom);
  });
   //store the newHardware array to the database
   Classroom.collection.insert(newClassrooms, function(err, result){
    if(err){
      res.json({success: false, message: err.message});
    } else {
      //find the school
      School.findById(req.params.id, function(err, school){
       if(err) {
         res.json({success: false, message: "School niet gevonden"});
       } else {
            //store the ids of the hardware in an array
            var classroomIds = result.ops.map(function(o){return String(o._id)});
            //add the id of each hardware to the school hardware
            classroomIds.forEach(function(classroomId){
              school.classroom.push(classroomId);
            });
            //then save the school
            school.save(function(err){
              if(err){
                res.json({success: false, message: err.message});
              } else {
                res.json({success: true, message: "Klassen succesvol toegevoegd!"});                
              }
            });
          }
        });
    }
  });
 });



module.exports = router;