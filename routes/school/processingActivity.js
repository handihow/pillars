var express = require("express");
var router = express.Router({mergeParams: true});
var ProcessingActivity = require("../../models/processingActivity");
var School = require("../../models/school");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");

router.use(function(req,res,next){
  res.locals.config = config.processingActivity;
  next();
})

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
                                        {$and: [{organisation: school.organisation}, {isValidForAllOrganisation: true}]}
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
        res.locals.scripts.header.tinymce = true;
        res.locals.scripts.header.uploadcare = true;
        res.render("processingActivity/new", {  school: school, 
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

//CREATE ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
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
                                                        schoolLevel: true});
            }  else {
                if(processingActivity.attachment.includes('~')){
                  processingActivity.hasMultipleAttachments = true;
                }
                processingActivity.school = req.params.id;
                processingActivity.organisation = req.user.organisation;
                processingActivity.save();
                res.locals.scripts.header.tinymce = false;
                res.locals.scripts.header.uploadcare = false;
                req.flash("success", "Verwerkingsactiviteit toegevoegd");
                res.redirect("/schools/"+req.params.id+"/processingActivity");
            }
      }); 
  });
});
    
// //EDIT ROUTE
router.get("/:pid/edit", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
      if(err || !school){
        req.flash("error", "Probleem bij vinden van schoolgegevens.")
        res.redirect("back");
      } else {
        ProcessingActivity.findById(req.params.pid, function(err, processingActivity){
          if(err || !processingActivity){
              req.flash("error", "Verwerkingsactiviteit niet gevonden.");
              res.redirect("/schools/"+req.params.id+"/processingActivity");
          } else {
              res.locals.scripts.header.tinymce = true;
              res.locals.scripts.header.uploadcare = true;
              res.render("processingActivity/edit", {   processingActivity: processingActivity, 
                                                        school: school,
                                                        schoolLevel: true});
          }
      });
     }
  });
});

// //UPDATE ROUTE
router.put("/:pid", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  req.body.processingActivity.body = req.sanitize(req.body.processingActivity.body);
  ProcessingActivity.findByIdAndUpdate(req.params.pid, req.body.processingActivity, function(err, processingActivity){
    if(err || !processingActivity){
        req.flash("error", "Verwerkingsactiviteit niet gevonden.");
        res.redirect("/schools/"+req.params.id+"/processingActivity");
    } else {
        res.locals.scripts.header.tinymce = false;
        res.locals.scripts.header.uploadcare = false;
        req.flash("success", "Verwerkingsactiviteit updated");
        res.redirect("/schools/"+req.params.id+"/processingActivity/" + req.params.pid);
    }
  });
});

//DELETE ROUTE
router.delete("/:pid", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  ProcessingActivity.findByIdAndRemove(req.params.pid, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer verwerkingsactiviteit opnieuw te verwijderen.");
          res.redirect("/schools/"+req.params.id+"/processingActivity/" + req.params.pid);
      } else {
          req.flash("success", "Verwerkingsactiviteit verwijderd");
          res.redirect("/schools/"+req.params.id+"/processingActivity");  
      }
  });
});

module.exports = router;