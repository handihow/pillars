var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Organisation = require("../../models/organisation");
var User = require("../../models/user");
var middleware = require("../../middleware");

//INDEX - list of schools
router.get("/", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      res.flash('error', 'Probleem bij vinden van bestuur');
      res.redirect('back')
    } else {
      School.find({
        "organisation": req.user.organisation}, 
        null,
        {sort: {name: 1}
      })
      .exec(function(err, schools){
        if(err) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("schools/index", {schools: schools, organisation: organisation, canAdd: false, organisationLevel: true});        
        }
      });
    }
  });
});

module.exports = router;
