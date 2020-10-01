var express = require("express");
var router = express.Router({mergeParams: true});
var Email = require("../../models/email");
var School = require("../../models/school");
var middleware = require("../../middleware");

//INDEX ROUTE FOR EMAILS
router.get("/", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id,function(err, school){
    if(err || !school) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Email.find(
        {school: school._id},
        null,
        {sort: {"createdAt" : -1}}
      ).exec(function(err, emails){
        if(err) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("email/index", {emails: emails, school: school});         
        }
      });        
    }
  });
});

module.exports = router;