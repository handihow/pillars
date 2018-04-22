var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var Normering = require("../models/normering");
var middleware = require("../middleware");
var score = require("../models/score");

//SHOW ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id)
      .populate("hardware")
      .populate("software")
      .populate("tests")
      .populate("normering")
      .exec(function(err, school){
      if(err ||!school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          //check if the school has normering set up
          if(!school.normering){
            return res.redirect("/scholen/"+school.id+"/pillars/instellingen");
          }
          var result = score.calculate(school);
          res.render("pillars/show", {school: school, result: result});            
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