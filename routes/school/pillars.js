var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Standard = require("../../models/standard");
var middleware = require("../../middleware");
var score = require("../../config/score");

//SHOW ROUTE
router.get("/", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id)
      .populate("hardware")
      .populate("software")
      .populate("tests")
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
          var result = score.calculate(school);
          res.locals.scripts.footer.chartjs = true;
          res.locals.scripts.footer.pillars = true;
          res.render("pillars/show", {school: school, result: result});            
      }
  });
});

//EDIT PILLARS INSTELLINGEN ROUTE
router.get("/settings", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
      if(err || !school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          Standard.find({organisation: school.organisation}, function(err, standards){
            if(err || !standards || !standards[0]){
              req.flash("error", "Geen normering gevonden. Vraag het bestuur om normering toe te voegen aan Pillars.");
              res.redirect("back");
            } else {
              res.render("pillars/settings", {school: school, standards: standards});
            }
          });
      }
  });
});

//UPDATE ROUTE
router.put("/settings", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    School.findByIdAndUpdate(req.params.id, req.body.school, function(err, school){
      if(err || !school){
          req.flash("error", "School niet gevonden.");
          res.redirect("back");
      } else {
          req.flash("success", "Pillars Normering Ingesteld");
          res.redirect("/schools/" + school._id + "/pillars");
      }
    });
});

module.exports = router;