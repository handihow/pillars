var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var User = require("../models/user");
var middleware = require("../middleware");
var gmailNode = require("gmail-node");
var passport = require("passport");

//INDEX - list of users of the school
router.get("/", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id).populate("users").exec(function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("back");
        } else {
            res.render("user/index", {school: school});        
        }
    });
});

//NEW - form to create new school user
router.get("/new", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("/scholen");
        } else {
            res.render("user/new", {school: school});        
        }
    });
});

//CREATE - creates new school user in the database and links it to school
router.post("/", middleware.isSchoolOwner, function(req, res){
    //lookup school by ID
    School.findById(req.params.id, function(err, school){
    if(err || !school){
        req.flash("error", "School niet gevonden");
        res.redirect("back");
    } else {
        //create new school user in DB      
        var newUser = new User({username: req.body.username, role: req.body.role, firstName: req.body.firstName, lastName: req.body.lastName});
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                  req.flash("error", err.message);
                  return res.redirect("back");
            }
            //add user to school users
            school.users.push({id: user._id, username: user.username, role: user.role, firstName: user.firstName, lastName: user.lastName});
            school.isToegevoegdMedewerker = true;
            school.save();
            //send email to schoolbestuur administrator
            var emailMessage = {
                to: req.user.username,
                cc: user.username,
                from: 'Pillars',
                subject: 'Pillars School Medewerker Geregistreerd',
                message: 'Je hebt ' + user.firstName + ' ' + user.lastName + ' als school medewerker geregistreerd bij Pillars.\n\n' +
                  'Gebruikersnaam: ' + user.username + '\n\n' +
                  'Wachtwoord: ' + req.body.password + '\n\n' +
                  'Je kunt deze inloggegevens naar de medewerker doorsturen.' + '\n\n' +
                  'Hij/zij kan hiermee inloggen bij Pillars.\n'
              };
        
              gmailNode.send(emailMessage, function(err) {
                  if(err){
                      console.log(err);
                      req.flash('error', err.message);
                      res.redirect("back");
                      
                  } else {
                      req.flash("success", "Nieuwe medewerker geregistreerd! Je hebt een email ontvangen met login gegevens. Stuur deze door naar de desbetreffende persoon.");
                      res.redirect("/scholen/" + school._id + "/user");
                  }
                });

            });
        }
    });
});

//DESTROY route to delete school user from database
router.delete("/:username", middleware.isSchoolOwner, function(req, res){
  //find the school and remove the user from the school users
  School.findById(req.params.id, function(err, school){
      if(err || !school) {
          req.flash("error", err);
          res.redirect("back");
      } else {
          var userIndexInArray = school.users.findIndex(x => x.username==req.params.username);
          school.users.splice(userIndexInArray, 1);
          school.save();
          //find the user and delete him from the database
          User.findOne({ username: req.params.username }, function(err, user){
              if(err || !user){
                  req.flash("error", err);
                  res.redirect("back");
              } else {
                    user.remove();
                    req.flash("success", "Medewerker verwijderd");
                    res.redirect("/scholen/" + req.params.id + "/user");
              }
          });
      }
  });
});

module.exports = router;