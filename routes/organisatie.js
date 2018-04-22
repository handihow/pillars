var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var middleware = require("../middleware");

//SHOW ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id).populate("owner").exec(function(err, school){
      if(err ||!school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          res.render("organisatie/show", {school: school});            
      }
  });
});

//PROTECT THE DEMO ACCOUNT
router.use(function(req, res, next){
  if(req.user.username==="demo@pillars.school"){
    req.flash("error", "Je kunt geen records aanmaken of wijzigen met het demo account.");
    return res.redirect("back");
  }
  next();
})


//EDIT ROUTE
router.get("/edit", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           res.render("organisatie/edit", {school: school});
       }
   });
});

//UPDATE ROUTE
router.put("/", middleware.isLoggedIn, function(req, res){
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
       if(err || !school){
           req.flash("error", "School niet gevonden.");
           res.redirect("back");
       } else {
           school.isIngevuldOrganisatie = true;
           school.save();
           req.flash("success", "Organisatie updated");
           res.redirect("/scholen/" + req.params.id + "/organisatie");
       }
    });
});

module.exports = router;