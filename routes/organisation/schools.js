var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Organisation = require("../../models/organisation");
var User = require("../../models/user");
var middleware = require("../../middleware");
var config = require("../../config/config");

//INDEX - list of schools
router.get("/", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      res.flash('error', 'Probleem bij vinden van bestuur');
      res.redirect('back')
    } else {
      School.find({
        "organisation": organisation._id}, 
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

//INDEX - list of schools
router.get("/list", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      res.flash('error', 'Probleem bij vinden van bestuur');
      res.redirect('back')
    } else {
      School.find({
        "organisation": organisation._id}, 
        null,
        {sort: {name: 1}
      })
      .exec(function(err, schools){
        if(err) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.locals.scripts.header.datatables = true;
          res.locals.scripts.footer.datatables = true;
          res.render("table-view/index", {
              schools: schools, 
              organisation: organisation,
              items: schools, 
              columns: config.school.columns,
              header: 'school',
              hasWarningRow: false,
              allowNewEntries: true
          });             
        }
      });
    }
  });
});


module.exports = router;
