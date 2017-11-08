var express = require("express");
var router = express.Router();
var Normering = require("../models/normering");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    Normering.find({owner: req.user._id}).populate("owner").exec(function(err, normeringen){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("normering/index", {normeringen: normeringen});         
        }
    });
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("normering/new"); 
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    Normering.create(req.body.normering, function(err, normering){
          if(err || !normering){
              req.flash("error", err.message);
              res.locals.error = req.flash("error");
              res.render("normering/new");
          }  else {
              //look up user id and username and add to school
              normering.owner = req.user._id;
              normering.save();
              console.log(normering);
              req.flash("success", "Normering toegevoegd");
              res.redirect("/normering");
          }
    }); 
});
    
//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
  Normering.findById(req.params.id, function(err, normering){
      if(err ||!normering){
          req.flash("error", "Normering niet gevonden.");
          res.redirect("back");
      } else {
          res.render("normering/show", {normering: normering});            
      }
  });
});

// //EDIT ROUTE
// router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
//     School.findById(req.params.id, function(err, school){
//       if(err || !school){
//           req.flash("error", "School niet gevonden.");
//           res.redirect("/scholen");
//       } else {
//           res.render("scholen/edit", {school: school});
//       }
//   });
// });

// //UPDATE ROUTE
// router.put("/:id", middleware.isLoggedIn, function(req, res){
//     School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
//       if(err || !school){
//           req.flash("error", "School niet gevonden.");
//           res.redirect("/scholen");
//       } else {
//           req.flash("success", "School updated");
//           res.redirect("/scholen/" + req.params.id);
//       }
//     });
// });

// //DELETE ROUTE
// router.delete("/:id", middleware.isSchoolOwner, function(req, res){
//   School.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/scholen");
//       } else {
//           req.flash("success", "School verwijderd");
//           res.redirect("/scholen");  
//       }
//   });
// });

module.exports = router;