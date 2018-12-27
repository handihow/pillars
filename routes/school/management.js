var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var middleware = require("../../middleware");

//SHOW ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id).exec(function(err, school){
      if(err ||!school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          res.render("management/show", {school: school});            
      }
  });
});


//EDIT ROUTE
router.get("/edit", middleware.isNotDemoAccount, middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           res.render("management/edit", {school: school});
       }
   });
});

//UPDATE ROUTE
router.put("/", middleware.isNotDemoAccount, middleware.isLoggedIn, function(req, res){
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           req.flash("success", "Organisatie updated");
           res.redirect("/schools/" + req.params.id + "/management");
       }
    });
});

module.exports = router;