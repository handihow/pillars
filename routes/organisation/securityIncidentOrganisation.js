var express = require("express");
var router = express.Router();
var SecurityIncident = require("../../models/securityIncident");
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
  SecurityIncident.find({organisation: req.user.organisation}).populate("school").exec(function(err, securityIncidents){
          if(err) {
              req.flash("error", err.message);
              res.redirect("back");
          } else {
              res.render("securityIncident/index", {securityIncidents: securityIncidents, schoolLevel: false});         
          }
      });
});

//NEW ROUTE
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
    res.locals.scripts.header.surveyjs = true;
    res.locals.scripts.footer.surveyjs = true;
    res.locals.scripts.footer.surveyOptions = true;
    res.locals.scripts.footer.securityIncident = true;
    res.render("securityIncident/new", {schoolLevel: false});
});

//SHOW ROUTE
router.get("/:pid", middleware.isLoggedIn, function(req, res){
  SecurityIncident.findById(req.params.pid).exec(function(err, securityIncident){
        if(err ||!securityIncident){
            req.flash("error", "Beveiligingsincident niet gevonden.");
            res.redirect("back");
        } else {
            res.locals.scripts.header.surveyjs = true;
            res.locals.scripts.footer.surveyjs = true;
            res.locals.scripts.footer.surveyOptions = true;
            res.locals.scripts.footer.securityIncident = true;
            res.render("securityIncident/show", {securityIncident: securityIncident, schoolLevel: false});            
        }
    });
});

//CREATE ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  var securityIncident = JSON.parse(req.body.result);
  SecurityIncident.create(securityIncident, function(err, securityIncident){
            if(err || !securityIncident){
                res.contentType('json');
                res.send({ 
                    success: false, 
                    error: 'Foutmelding: beveiligingsincident niet gemaakt. Server geeft fout: ' + err.message 
                  });
            }  else {
                securityIncident.organisation = req.user.organisation;
                securityIncident.isValidForAllOrganisation = true;
                securityIncident.save();
                res.contentType('json');
                res.send({ 
                    success: true
                  });
            }
      }); 
});
    
// //EDIT ROUTE
router.get("/:pid/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    SecurityIncident.findById(req.params.pid, function(err, securityIncident){
          if(err){
              req.flash("error", err.message);
              res.redirect("back");
          } else if (!securityIncident){
              req.flash("error", "Beveiligingsincident niet gevonden");
              res.redirect("back");
          } else {
              res.locals.scripts.header.surveyjs = true;
              res.locals.scripts.footer.surveyjs = true;
              res.locals.scripts.footer.surveyOptions = true;
              res.locals.scripts.footer.securityIncident = true;
              res.render("securityIncident/edit", {securityIncident: securityIncident, 
                                                        schoolLevel: false});       
          }
          
      });
});

// //UPDATE ROUTE
router.post("/:pid", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  var securityIncident = JSON.parse(req.body.result);
  SecurityIncident.findByIdAndUpdate(req.params.pid, securityIncident, function(err, securityIncident){
    if(err){
        res.contentType('json');
        res.send({ 
            success: false, 
            error: 'Foutmelding: beveiligingsincident niet geupdated. Server geeft fout: ' + err.message 
          });
    } else if (!securityIncident){
        res.contentType('json');
        res.send({ 
            success: false, 
            error: 'Foutmelding: beveiligingsincident niet gevonden' 
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
router.delete("/:pid", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  SecurityIncident.findByIdAndRemove(req.params.pid, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer beveiligingsincident opnieuw te verwijderen.");
          res.redirect("/securityIncident/" + req.params.pid);
      } else {
          req.flash("success", "Beveiligingsincident verwijderd");
          res.redirect("/securityIncident");  
      }
  });
});

module.exports = router;