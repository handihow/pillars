var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var User = require("../../models/user");
var Organisation = require("../../models/organisation");
var middleware = require("../../middleware");
var config = require("../../config/config");
// var Survey = require("../../models/survey");
// var _ = require("lodash");

//SHOW ROUTE - PROFILE PAGE
router.get("/", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id).populate("organisation").exec(function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      res.render("user/account", {user: user}); 
    }
  });
});


module.exports = router;