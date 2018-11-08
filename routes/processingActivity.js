var express = require("express");
var router = express.Router({mergeParams: true});
var ProcessingActivity = require("../models/processingActivity");
var School = require("../models/school");
var middleware = require("../middleware");
var User = require("../models/user");
var global = require("../models/global");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    School.findById(req.params.id, function(err, school){
      if(err || !school) {
          req.flash("error", err.message);
          res.redirect("back");
      } else {
        ProcessingActivity.find({$or: 
                                      [
                                        {school: req.params.id}, 
                                        {$and: [{organisation: req.user.organisation}, {isValidForAllOrganisation: true}]}
                                      ]})
                          .exec(function(err, processingActivities){
            if(err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.render("processingActivity/index", {processingActivities: processingActivities, school: school, schoolLevel: true});         
            }
        });
      }
    });
});

//NEW ROUTE
router.get("/new", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
      if(err || !school) {
          req.flash("error", err.message);
          res.redirect("back");
      } else {
        res.render("processingActivity/new", {  school: school, 
                                                data: global,
                                                schoolLevel: true}); 
      }
  });
});

//SHOW ROUTE
router.get("/:pid", middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id, function(err, school){
      if(err || !school){
        req.flash("error", "Probleem bij vinden van schoolgegevens.")
        res.redirect("back");
      } else {
        ProcessingActivity.findById(req.params.pid, function(err, processingActivity){
            if(err ||!processingActivity){
                req.flash("error", "Verwerkingsactiviteit niet gevonden.");
                res.redirect("back");
            } else {
                res.render("processingActivity/show", {processingActivity: processingActivity, school: school, schoolLevel: true});            
            }
        });
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

//CREATE ROUTE
router.post("/", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
      if(err || !school){
        req.flash("error", "Probleem bij vinden van schoolgegevens.")
        return res.redirect("back");
      }
      req.body.processingActivity.body = req.sanitize(req.body.processingActivity.body);
      ProcessingActivity.create(req.body.processingActivity, function(err, processingActivity){
            if(err || !processingActivity){
                req.flash("error", err.message);
                res.locals.error = req.flash("error");
                res.render("processingActivity/new", {  school: school, 
                                                        data: global,
                                                        schoolLevel: true});
            }  else {
                if(processingActivity.attachment.includes('~')){
                  processingActivity.hasMultipleAttachments = true;
                }
                processingActivity.school = req.params.id;
                processingActivity.organisation = req.user.organisation;
                processingActivity.save();
                req.flash("success", "Verwerkingsactiviteit toegevoegd");
                res.redirect("/scholen/"+req.params.id+"/processingActivity");
            }
      }); 
  });
});
    
// //EDIT ROUTE
router.get("/:pid/edit", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
      if(err || !school){
        req.flash("error", "Probleem bij vinden van schoolgegevens.")
        res.redirect("back");
      } else {
        ProcessingActivity.findById(req.params.pid, function(err, processingActivity){
          if(err || !processingActivity){
              req.flash("error", "Verwerkingsactiviteit niet gevonden.");
              res.redirect("/scholen/"+req.params.id+"/processingActivity");
          } else {
              console.log(processingActivity.attachment);
              res.render("processingActivity/edit", {   processingActivity: processingActivity, 
                                                        school: school, 
                                                        data: global,
                                                        schoolLevel: true});
          }
      });
     }
  });
});

// //UPDATE ROUTE
router.put("/:pid", middleware.isSchoolOwner, function(req, res){
  req.body.processingActivity.body = req.sanitize(req.body.processingActivity.body);
  ProcessingActivity.findByIdAndUpdate(req.params.pid, req.body.processingActivity, function(err, processingActivity){
    if(err || !processingActivity){
        req.flash("error", "Verwerkingsactiviteit niet gevonden.");
        res.redirect("/scholen/"+req.params.id+"/processingActivity");
    } else {
        req.flash("success", "Verwerkingsactiviteit updated");
        res.redirect("/scholen/"+req.params.id+"/processingActivity/" + req.params.pid);
    }
  });
});

//DELETE ROUTE
router.delete("/:pid", middleware.isSchoolOwner, function(req, res){
  ProcessingActivity.findByIdAndRemove(req.params.pid, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer verwerkingsactiviteit opnieuw te verwijderen.");
          res.redirect("/scholen/"+req.params.id+"/processingActivity/" + req.params.pid);
      } else {
          req.flash("success", "Verwerkingsactiviteit verwijderd");
          res.redirect("/scholen/"+req.params.id+"/processingActivity");  
      }
  });
});

module.exports = router;