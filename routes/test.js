var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var User = require("../models/user");
var Test = require("../models/test");
var global = require("../models/global");
var middleware = require("../middleware");
var Profiel = require("../models/profiel");


//INDEX - list of test results is on the user profile!!

//NEW - form to create new test
router.get("/new/:onderdeel", middleware.isUser, function(req, res){
    User.findById(req.params.id, function(err, user){
       if(err || !user){
           req.flash("error", "Gebruiker niet gevonden");
           res.redirect("back");
       } else {
           var owner = user.owner;
           if(user.role==="badmin"){
               owner = req.user._id;
           }
           Profiel.find({"owner": owner}).exec(function(err,profielen){
               if(err || profielen.length === 0){
                   res.render("test/new", {user: user, onderdeel: req.params.onderdeel, global: global});   
               } else {
                   var profielVragen = global;
                   profielen.forEach(function(profiel, i){
                      if(profiel.isActueel){
                          profielVragen = profiel;
                      }
                      if(i === (profielen.length - 1) ) {
                         res.render("test/new", {user: user, onderdeel: req.params.onderdeel, global: profielVragen});    
                      }
                   });     
               }
           });
       }
    });
});

//CREATE - creates new profile test in the database
router.post("/", middleware.isUser, function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err || !user){
            req.flash("error", "Gebruiker niet gevonden");
            res.redirect("back");
        } else {
            Test.create(req.body.test, function(err, test){
               if(err){
                   req.flash("err", err.message);
                   res.redirect("back");
               } else {
                   //add the user to test
                   test.owner = user._id;
                   test.username = user.username;
                   test.save();
                   //if user is school admin or school medewerker then add the test to school
                   if(user.role === "sadmin" || user.role === "suser") {
                       School.findOne({users: user._id}, function(err, school){
                           if(err || !school){
                               req.flash("error", "School niet gevonden");
                               res.redirect("back");
                           } else {
                               school.tests.push(test);
                               school.save();
                               req.flash("success", "Profiel en School Resultaten updated");
                               res.redirect("/user/"+user._id);
                           }
                       });
                   } else {
                   req.flash("success", "Profiel updated");
                   res.redirect("/user/"+user._id);
                   }
               }
            });   
        }
    });
});

//SHOW individual test records
router.get("/:test_id", middleware.isLoggedIn, function(req, res){
  Test.findById(req.params.test_id, function(err, test){
      if(err || !test){
          req.flash("error", "Test niet gevonden");
          res.redirect("back");
      } else {
          res.render("test/show", {test: test, user: req.params.id});
      }
  });
});


// //EDIT displays a form to edit hardware record
// router.get("/:hardware_id/edit", middleware.isHardwareOwner, function(req,res){
//   School.findById(req.params.id, function(err, school){
//       if(err || !school){
//           req.flash("error", "School niet gevonden");
//           res.redirect("back");
//       } else {
//           Hardware.findById(req.params.hardware_id, function(err, hardware){
//               if(err || !hardware){
//                   req.flash("error", "Hardware niet gevonden");
//                   res.redirect("back");
//               } else {
//                   res.render("hardware/edit", {hardware: hardware, school: school});
//               }
//           });
//       }
//   });
// });

// //UPDATE route to store edited hardware to database
// router.put("/:hardware_id", middleware.isHardwareOwner, function(req, res){
//   Hardware.findByIdAndUpdate(req.params.hardware_id, req.body.hardware, function(err, hardware){
//       if(err || !hardware){
//           req.flash("error", "Hardware niet gevonden");
//           res.redirect("back");
//       } else {
//           req.flash("success", "Hardware updated");
//           res.redirect("/scholen/" + req.params.id + "/hardware/" + hardware._id);
//       }
//   }); 
// });

//DESTROY route to delete tests from database
router.delete("/:test_id", middleware.isUser, function(req, res){
  Test.findByIdAndRemove(req.params.test_id, function(err){
      if(err){
          req.flash("error", "Test niet gevonden");
          res.redirect("back");
      } else {
          req.flash("success", "Test verwijderd");
          res.redirect("/user/"+req.params.id);
      }
  }); 
});

module.exports = router;