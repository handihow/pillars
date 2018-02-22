var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var middleware = require("../middleware");
var User = require("../models/user");

//show route
router.get("/", middleware.isPadmin, function(req, res){
    School.find().populate("owner").exec(function(err, schools){
      if(err){
          req.flash("error", err.message);
          res.redirect("back");
      } else {
          res.render("admin/index", {schools: schools});            
      }
  });
});

router.get("/badmin", middleware.isPadmin, function(req,res){
  User.find({"role": "badmin"}).exec(function(err,users){
    if(err){
      req.flash("error", err.message);
      return res.redirect("back");
    }
    res.render("admin/badmin", {users: users});
  });
});


module.exports = router;