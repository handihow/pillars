var express = require("express");
var router = express.Router();
var ProcessingActivity = require("../../models/processingActivity");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");

router.use(function(req,res,next){
  res.locals.config = config.processingActivity;
  next();
})


//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  ProcessingActivity.find({organisation: req.user.organisation}).populate("school").exec(function(err, processingActivities){
          if(err) {
              req.flash("error", err.message);
              res.redirect("back");
          } else {
              res.render("processingActivity/index", {processingActivities: processingActivities, schoolLevel: false});         
          }
      });
});

//NEW ROUTE
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
  res.render("processingActivity/new", {schoolLevel: false});
});

//SHOW ROUTE
router.get("/:pid", middleware.isLoggedIn, function(req, res){
  ProcessingActivity.findById(req.params.pid, function(err, processingActivity){
        if(err ||!processingActivity){
            req.flash("error", "Verwerkingsactiviteit niet gevonden.");
            res.redirect("back");
        } else {
            res.render("processingActivity/show", {processingActivity: processingActivity, schoolLevel: false});            
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
router.post("/", middleware.isAuthenticatedBadmin, function(req, res){
  req.body.processingActivity.body = req.sanitize(req.body.processingActivity.body);
  ProcessingActivity.create(req.body.processingActivity, function(err, processingActivity){
            if(err || !processingActivity){
                req.flash("error", err.message);
                res.locals.error = req.flash("error");
                res.render("processingActivity/new", {  schoolLevel: false});
            }  else {
                if(processingActivity.attachment.includes('~')){
                  processingActivity.hasMultipleAttachments = true;
                }
                processingActivity.organisation = req.user.organisation;
                processingActivity.isValidForAllOrganisation = true;
                processingActivity.save();
                req.flash("success", "Verwerkingsactiviteit toegevoegd");
                res.redirect("/processingActivity");
            }
      }); 
});
    
// //EDIT ROUTE
router.get("/:pid/edit", middleware.isAuthenticatedBadmin, function(req, res){
    ProcessingActivity.findById(req.params.pid, function(err, processingActivity){
          if(err || !processingActivity){
              req.flash("error", "Verwerkingsactiviteit niet gevonden.");
              res.redirect("/scholen/"+req.params.id+"/processingActivity");
          } else {
              res.render("processingActivity/edit", {   processingActivity: processingActivity, 
                                                        schoolLevel: false});
          }
      });
});

// //UPDATE ROUTE
router.put("/:pid", middleware.isAuthenticatedBadmin, function(req, res){
  req.body.processingActivity.body = req.sanitize(req.body.processingActivity.body);
  ProcessingActivity.findByIdAndUpdate(req.params.pid, req.body.processingActivity, function(err, processingActivity){
    if(err || !processingActivity){
        req.flash("error", "Verwerkingsactiviteit niet gevonden.");
        res.redirect("/processingActivity");
    } else {
        req.flash("success", "Verwerkingsactiviteit updated");
        res.redirect("/processingActivity/" + req.params.pid);
    }
  });
});

//DELETE ROUTE
router.delete("/:pid", middleware.isAuthenticatedBadmin, function(req, res){
  ProcessingActivity.findByIdAndRemove(req.params.pid, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer verwerkingsactiviteit opnieuw te verwijderen.");
          res.redirect("/processingActivity/" + req.params.pid);
      } else {
          req.flash("success", "Verwerkingsactiviteit verwijderd");
          res.redirect("/processingActivity");  
      }
  });
});

module.exports = router;