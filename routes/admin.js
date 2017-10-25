var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var User = require("../models/user");
var middleware = require("../middleware");
var gmailNode = require("gmail-node");

//INDEX - list of admin users of the school
router.get("/", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id).populate("admin").exec(function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("back");
        } else {
            res.render("admin/index", {school: school});        
        }
    });
});

//NEW - form to create new school administrator
router.get("/new", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("/scholen");
        } else {
            res.render("admin/new", {school: school});        
        }
    });
});

//CREATE - creates new school administrator in the database and links it to school
router.post("/", middleware.isSchoolOwner, function(req, res){
    //lookup school by ID
    School.findById(req.params.id, function(err, school){
    if(err || !school){
        req.flash("error", "School niet gevonden");
        res.redirect("back");
    } else {
        //create new school administrator in DB      
        var newUser = new User({username: req.body.username, role: req.body.role, firstName: req.body.firstName, lastName: req.body.lastName});
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                  req.flash("error", err.message);
                  return res.redirect("back");
            }
            //add user to school administrators
            school.admin.push({id: user._id, username: user.username, role: user.role, firstName: user.firstName, lastName: user.lastName});
            school.save();
            //send email to schoolbestuur administrator
            var emailMessage = {
                to: req.user.username,
                from: 'Pillars',
                subject: 'Pillars School Administrator Geregistreerd',
                message: 'Je hebt ' + user.firstName + ' ' + user.lastName + ' als school administrator geregistreerd bij Pillars.\n\n' +
                  'Gebruikersnaam: ' + user.username + '\n\n' +
                  'Wachtwoord: ' + req.body.password + '\n\n' +
                  'Je kunt deze inloggegevens naar de school administrator doorsturen. Hij kan hiermee inloggen bij Pillars.\n'
              };
        
              gmailNode.send(emailMessage, function(err) {
                  if(err){
                      console.log(err);
                      req.flash('error', err.message);
                      res.redirect("back");
                      
                  } else {
                      req.flash("success", "Nieuwe school administrator geregistreerd! Je hebt een email ontvangen met login gegevens. Stuur deze door naar de desbetreffende persoon.");
                      res.redirect("/scholen/" + school._id + "/admin");
                  }
                });

            });
        }
    });
});

//DESTROY route to delete school administrator from database
router.delete("/:username", middleware.isSchoolOwner, function(req, res){
  
  //find the school and remove the user from the school administrators
  School.findById(req.params.id, function(err, school){
      if(err || !school) {
          req.flash("error", err);
          res.redirect("back");
      } else {
          var userIndexInArray = school.admin.findIndex(x => x.username==req.params.username);
          school.admin.splice(userIndexInArray, 1);
          school.save();
          req.flash("success", "School Administrator verwijderd");
          res.redirect("/scholen/" + school._id + "/admin");
      }
  });
});

module.exports = router;