var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var middleware = require("../../middleware");
var User = require("../../models/user");
var Organisation = require("../../models/organisation");
var Standard = require("../../models/standard");
var Form = require('../../models/form');
var TeachingMethod = require('../../models/teachingMethod');
var config = require("../../config/config");


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
          Form.countDocuments({}).exec((err, formCount) => {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            TeachingMethod.countDocuments({}).exec((err, teachingMethodCount) => {
              if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
              }
              res.render("admin/dashboard", { 
                organisationCount: organisationCount, 
                schoolCount: schoolCount, 
                userCount: userCount, 
                formCount: formCount,
                teachingMethodCount: teachingMethodCount
              });
            });
          });
        });
      });
  });   
});

//get list of forms
router.get("/forms", middleware.isPadmin, function(req,res){
  Form.find(function(err, forms){
    if(err){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.locals.scripts.header.datatables = true;
      res.locals.scripts.footer.datatables = true;
      res.render("table-view/index", {
        items: forms, 
        columns: config.forms,
        header: 'form',
        hasWarningRow: false,
        allowNewEntries: true
      });     
    }
  })
});

//get list of teaching methods
router.get("/teachingmethods", middleware.isPadmin, function(req,res){
  TeachingMethod.find(function(err, teachingMethods){
    if(err){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.locals.scripts.header.datatables = true;
      res.locals.scripts.footer.datatables = true;
      res.render("table-view/index", {
        items: teachingMethods, 
        columns: config.teachingMethods,
        header: 'teachingMethod',
        hasWarningRow: false,
        allowNewEntries: true
      });     
    }
  })
});

module.exports = router;