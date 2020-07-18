var express = require("express");
var router = express.Router({mergeParams: true});
var Organisation = require("../../models/organisation");
var middleware = require("../../middleware");
var config = require("../../config/config");
var User = require("../../models/user");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id,function(err, organisation){
    if(err) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("organisationSettings/index", {organisation: organisation, labels: config.organisationSettingTopics});         
    }
  });
});

//UPDATE route to store edited profile questions to database
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      var updatedSettings = {};
      Object.keys(config.organisationSettingTopics).forEach(function(setting){
        if(req.body[setting].includes("on")){
          updatedSettings[setting] = true;
        } else {
          updatedSettings[setting] = false;
        }
      });
      organisation.update({settings: updatedSettings}, function(err){
        if(err){
          req.flash("error", err.message);
        } else {
          req.flash("success", "Module instellingen updated");
        }
        res.redirect("/organisations/"+ organisation._id + "/organisationSettings");
      });
    }
  }); 
});


module.exports = router;