var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var User = require("../models/user");
var Test = require("../models/test");
var Profiel = require("../models/profiel");
var global = require("../models/global");
var middleware = require("../middleware");
var Profiel = require("../models/profiel");


//INDEX - list of test results is on the user profile!!


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

//PROTECT THE DEMO ACCOUNT
router.use(function(req, res, next){
  if(req.user && req.user.username==="demo@pillars.school"){
    req.flash("error", "Je kunt geen records aanmaken of wijzigen met het demo account.");
    return res.redirect("back");
  }
  next();
});

//NEW - form to create new test
router.get("/new/:onderdeel", middleware.isUser, function(req, res){
    User.findById(req.params.id, function(err, user){
       if(err || !user){
           req.flash("error", "Gebruiker niet gevonden");
           res.redirect("back");
       } else {
          var profielOwner = user.owner ? user.owner : user._id;
          Profiel.findOne({"owner": profielOwner, "isActueel": true}).exec(function(err, profiel){
               if(err){
                      req.flash("error", err);
                      res.redirect("back");
               } else if (!profiel){
                   res.render("test/new", {user: user, onderdeel: req.params.onderdeel, global: global, isMultipleChoice: false});   
               } else { 
                   res.render("test/new", {user: user, onderdeel: req.params.onderdeel, global: profiel, isMultipleChoice: profiel.isMultipleChoice});     
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
                   //calculate the score
                   var total = 0;
                   var score = 0;
                   test.answers.forEach(function(answer){
                      score +=answer;
                      total +=1;
                   })
                   test.result = score/total;
                   //add the user to test
                   test.owner = user._id;
                   if(user.publicProfile){
                      test.username = user.username;
                   } else {
                      test.username = 'anoniem';
                   }
                   test.save(function(err, test){
                    if(err){
                      req.flash("error", "Fout bij bewaren van test");
                      res.redirect("back");
                    } else {
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