var express = require("express");
var router = express.Router({mergeParams: true});
var ProcessingActivity = require("../../models/processingActivity");
var Organisation = require("../../models/organisation");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");

router.use(function(req,res,next){
  res.locals.config = config.processingActivity;
  next();
})

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Probleem bij het vinden van het bestuur");
      res.redirect("back");
    } else {
      ProcessingActivity.find({organisation: organisation._id}).populate("school").exec(function(err, processingActivities){
          if(err) {
              req.flash("error", err.message);
              res.redirect("back");
          } else {
              res.render("processingActivity/index", {
                processingActivities: processingActivities,
                organisation: organisation, 
                schoolLevel: false
              });         
          }
      });
    }
  });
});

//NEW ROUTE
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Probleem bij het vinden van het bestuur");
      res.redirect("back");
    } else {
      res.locals.scripts.header.tinymce = true;
      res.locals.scripts.header.uploadcare = true;
      res.render("processingActivity/new", {schoolLevel: false, organisation: organisation});
    }
  });
});

//SHOW ROUTE
router.get("/:pid", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Probleem bij het vinden van het bestuur");
      res.redirect("back");
    } else {
      ProcessingActivity.findById(req.params.pid).populate("processingActivity").exec(function(err, processingActivity){
        if(err ||!processingActivity){
          req.flash("error", "Verwerkingsactiviteit niet gevonden.");
          res.redirect("back");
        } else {
          res.render("processingActivity/show", {
            processingActivity: processingActivity, 
            schoolLevel: false, 
            organisation: organisation
          });            
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
router.post("/", middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Probleem bij het vinden van het bestuur");
      res.redirect("back");
    } else {
      req.body.processingActivity.body = req.sanitize(req.body.processingActivity.body);
      ProcessingActivity.create(req.body.processingActivity, function(err, processingActivity){
        if(err || !processingActivity){
          req.flash("error", err.message);
          res.locals.error = req.flash("error");
          res.render("processingActivity/new", {  schoolLevel: false , organisation: organisation});
        }  else {
          res.locals.scripts.header.tinymce = false;
          res.locals.scripts.header.uploadcare = false;
          if(processingActivity.attachment.includes('~')){
            processingActivity.hasMultipleAttachments = true;
          }
          processingActivity.organisation = organisation._id;
          processingActivity.isValidForAllOrganisation = true;
          processingActivity.save();
          req.flash("success", "Verwerkingsactiviteit toegevoegd");
          res.redirect("/organisations/"+ organisation._id + "/processingActivity");
        }
      }); 
    }
  })
});
    
// //EDIT ROUTE
router.get("/:pid/edit", middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Probleem bij het vinden van het bestuur");
      res.redirect("back");
    } else {
      ProcessingActivity.findById(req.params.pid, function(err, processingActivity){
        if(err || !processingActivity){
          req.flash("error", "Verwerkingsactiviteit niet gevonden.");
          res.redirect("/scholen/"+req.params.id+"/processingActivity");
        } else {
          res.locals.scripts.header.tinymce = true;
          res.locals.scripts.header.uploadcare = true;
          res.render("processingActivity/edit", {   processingActivity: processingActivity, 
            schoolLevel: false, organisation: organisation});
        }
      });
    }   
  })
});

// //UPDATE ROUTE
router.put("/:pid", middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Probleem bij het vinden van het bestuur");
      res.redirect("back");
    } else {   
      req.body.processingActivity.body = req.sanitize(req.body.processingActivity.body);
      ProcessingActivity.findByIdAndUpdate(req.params.pid, req.body.processingActivity, function(err, processingActivity){
        if(err){
          req.flash("error", "Fout bij bewaren van record: " + err.message);
          res.redirect("/organisations/"+ organisation._id +"/processingActivity");
        } else if(!processingActivity){
          req.flash("error", "Verwerkingsactiviteit niet gevonden");
          res.redirect("/organisations/"+ organisation._id +"/processingActivity");
        } else {
          res.locals.scripts.header.tinymce = false;
          res.locals.scripts.header.uploadcare = false;
          req.flash("success", "Verwerkingsactiviteit updated");
          res.redirect("/organisations/"+ organisation._id +"/processingActivity/" + req.params.pid);
        }
      });
    }
  });
});

//DELETE ROUTE
router.delete("/:pid", middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Probleem bij het vinden van het bestuur");
      res.redirect("back");
    } else {   
      ProcessingActivity.findByIdAndRemove(req.params.pid, function(err){
        if(err){
          req.flash("error", "Er is iets misgegaan. Probeer verwerkingsactiviteit opnieuw te verwijderen.");
          res.redirect("/organisations/"+ organisation._id +"/processingActivity/" + req.params.pid);
        } else {
          req.flash("success", "Verwerkingsactiviteit verwijderd");
          res.redirect("/organisations/"+ organisation._id +"/processingActivity");  
        }
      });
    }
  });
});

module.exports = router;