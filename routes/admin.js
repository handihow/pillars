var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var middleware = require("../middleware");

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


module.exports = router;