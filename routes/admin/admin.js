var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var middleware = require("../../middleware");
var User = require("../../models/user");
var Organisation = require("../../models/organisation");
var Standard = require("../../models/standard");

//show route
router.get("/", middleware.isPadmin, function(req, res){
  Organisation.countDocuments({}).exec((err, organisationCount) => {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      School.countDocuments({}).exec((err, schoolCount) => {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("back");
        }
        User.countDocuments({}).exec((err, userCount) => {
          if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
          }
          res.render("admin/dashboard", { organisationCount: organisationCount, schoolCount: schoolCount, userCount: userCount });
        });
      });
  });   
});

module.exports = router;