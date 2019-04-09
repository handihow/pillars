var express = require("express");
var router = express.Router();
var School = require("../models/school");
var Organisation = require("../models/organisation");
var Survey = require("../models/survey");
var SurveyResult = require("../models/surveyResult");
var middleware = require("../middleware");
var ObjectId = require('mongoose').Types.ObjectId; 

//HOME PAGE BEFORE LOGGING IN
router.get("/", function(req, res){
  res.render("home");
});

//HOME PAGE AFTER LOGGING IN
router.get("/home", middleware.isLoggedIn, function(req, res){
  //if user is school employee, direct to school page
  if(req.user.role==="suser" || req.user.role==="sadmin") {
      //find the school
      School.find({"users": req.user._id}, function(err, schools) {
        if(err) {return callbackErrorFunction(err)};
        if(!schools){return noDataErrorFunction('School')};
        renderHomePageContent(req, res, schools);
      });
  } else {
    //organisation admins & users and pillars admins go to their list of schools
    School.find(
      {"organisation": req.user.organisation}, 
      null,
      {sort: {name: 1}},
      function(err, schools){
        if(err || !schools) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          renderHomePageContent(req, res, schools);  
        }
      });
  }
});

function renderHomePageContent(req, res, schools){
  Organisation.findById(req.user.organisation, function(err, organisation){
    if(err) {return callbackErrorFunction(err)};
    if(!organisation){return noDataErrorFunction('Organisatie')};
      Survey.find({
        "organisation": new ObjectId(req.user.organisation), 
        "isActiveCompetenceSurvey": true,
        "surveyOption": organisation.surveyOption
      }, function(err, surveys){
        if(err) {return callbackErrorFunction(err)};
        SurveyResult.find({"user": new ObjectId(req.user._id)}, function(err, surveyResults){
          if(err) {return callbackErrorFunction(err)};
            res.render("dashboard/index", {schools: schools, organisation: organisation, surveys, surveyResults}); 
        })
      });
    });  
}

function callbackErrorFunction(err){
  req.flash("error", err.message);
  return res.redirect("back");
}

function noDataErrorFunction(doc){
  req.flash("error", doc + "niet gevonden");
  return res.redirect("back");
}

module.exports = router;