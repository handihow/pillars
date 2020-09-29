var express = require("express");
var router = express.Router({mergeParams: true});
var Message = require("../../models/message");
var School = require("../../models/school");
var middleware = require("../../middleware");

//INFO MESSAGES INDEX ROUTE FOR SCHOOL
router.get("/", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.find(
        {organisation: school.organisation, school: {$exists: false}},
        null,
        {sort: {title: 1}}
      ).populate("owner").exec(function(err, messages){
        if(err){
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("message/school", {school: school, messages: messages, canAdd: false});
        }
      });
    }
  });
});

module.exports = router;