var express = require("express");
var router = express.Router({mergeParams: true});
var SecurityIncident = require("../../models/securityIncident");
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
router.get("/", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      SecurityIncident.find({$or: 
        [
        {school: req.params.id}, 
        {$and: [{organisation: school.organisation}, {isValidForAllOrganisation: true}]}
        ]})
      .exec(function(err, securityIncidents){
        if(err) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("securityIncident/index", {securityIncidents: securityIncidents, school: school, schoolLevel: true});         
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
      res.locals.scripts.header.surveyjs = true;
      res.locals.scripts.footer.surveyjs = true;
      res.locals.scripts.footer.surveyOptions = true;
      res.locals.scripts.footer.securityIncident = true;
      res.render("securityIncident/new", {school: school, schoolLevel: true});          
    }
  });
});

//SHOW ROUTE
router.get("/:pid", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school){
      req.flash("error", "Probleem bij vinden van schoolgegevens.")
      res.redirect("back");
    } else {
      SecurityIncident.findById(req.params.pid).exec(function(err, securityIncident){
        if(err ||!securityIncident){
          req.flash("error", "Beveiligingsincident niet gevonden.");
          res.redirect("back");
        } else {
          res.locals.scripts.header.surveyjs = true;
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyOptions = true;
          res.locals.scripts.footer.securityIncident = true;
          res.render("securityIncident/show", {securityIncident: securityIncident, school: school, schoolLevel: true});            
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
    var securityIncident = JSON.parse(req.body.result);
    SecurityIncident.create(securityIncident, function(err, securityIncident){
      if(err || !securityIncident){
        res.contentType('json');
        res.send({ 
            success: false, 
            error: 'Foutmelding: beveiligingsincident niet gemaakt. Server geeft fout: ' + err.message 
          });
      }  else {
        securityIncident.school = req.params.id;
        securityIncident.organisation = req.user.organisation;
        securityIncident.save();
        res.contentType('json');
        res.send({ 
            success: true
          }); 
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
      SecurityIncident.findById(req.params.pid, function(err, securityIncident){
        if(err || !securityIncident){
          req.flash("error", "Beveiligingsincident niet gevonden.");
          res.redirect("/schools/"+req.params.id+"/securityIncident");
        } else {
          res.locals.scripts.header.surveyjs = true;
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyOptions = true;
          res.locals.scripts.footer.securityIncident = true;
          res.render("securityIncident/edit", {securityIncident: securityIncident, 
            school: school,
            schoolLevel: true});         
        }
      });
    }
  });
});

// //UPDATE ROUTE
router.post("/:pid", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  var securityIncident = JSON.parse(req.body.result);
  SecurityIncident.findByIdAndUpdate(req.params.pid, securityIncident, function(err, securityIncident){
    if(err || !securityIncident){
      res.contentType('json');
      res.send({ 
          success: false, 
          error: 'Foutmelding: beveiligingsincident niet gevonden. Server geeft fout: ' + err.message 
        });
    } else {
      res.contentType('json');
      res.send({ 
          success: true
        }); 
    }
  });
});

//DELETE ROUTE
router.delete("/:pid", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
  SecurityIncident.findByIdAndRemove(req.params.pid, function(err){
    if(err){
      req.flash("error", "Er is iets misgegaan. Probeer beveiligingsincident opnieuw te verwijderen.");
      res.redirect("/schools/"+req.params.id+"/securityIncident/" + req.params.pid);
    } else {
      req.flash("success", "Beveiligingsincident verwijderd");
      res.redirect("/schools/"+req.params.id+"/securityIncident");  
    }
  });
});

module.exports = router;