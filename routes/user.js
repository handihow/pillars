var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var User = require("../models/user");
var middleware = require("../middleware");
var gmailNode = require("gmail-node");
var global = require("../models/global");
var Test = require("../models/test");

//INDEX - list of users of the school
router.get("/scholen/:id/user/", middleware.isSchoolOwner, function(req, res){
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
router.get("/scholen/:id/user/new", middleware.isSchoolOwner, function(req, res){
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
router.post("/scholen/:id/user/", middleware.isSchoolOwner, function(req, res){
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
            school.users.push(user);
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

//SHOW ROUTE - PROFILE PAGE
router.get("/user/:id", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
      if(err || !user){
          req.flash("error", err);
          res.redirect("back");
      } else {
            Test.find({"owner": user._id}, function(err, tests){
                if(err) {
                    req.flash("error", err);
                } else {
                    res.render("user/show", {user: user, global: global, tests: tests});        
                }
            });
      }
    });
});

//EDIT ROUTE - EDIT PROFILE PAGE
router.get("/user/:id/edit", middleware.isUser, function(req,res){
    User.findById(req.params.id, function(err, user){
        if(err || !user){
            req.flash("error", "Geen gebruiker gevonden of onbekende fout");
            res.redirect("back");
        } else {
            res.render("user/edit", {user: user});
        }
    });
});

//UPDATE route to store edited user to database
router.put("/user/:id", middleware.isUser, function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, user){
        if(err || !user) {
            req.flash('error', "Geen gebruiker gevonden");
            res.redirect("/scholen/profiel/user/"+req.params.username);
        }  else {
            req.flash("success", "Profiel updated");
            res.redirect("/user/"+user._id);
        }
    });
});

//DESTROY route to delete user from database
router.delete("/scholen/:id/user/:user_id", middleware.isSchoolOwner, function(req, res){
    User.findByIdAndRemove(req.params.user_id, function(err){
        if(err) {
            req.flash('error', err.message);
            res.redirect("/scholen");
        }  else {
            req.flash("success", "School medewerker verwijderd");
            res.redirect("/scholen/" + req.params.id + "/user");
        }
    });
});

module.exports = router;