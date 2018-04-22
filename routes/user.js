var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var User = require("../models/user");
var Profiel = require("../models/profiel");
var middleware = require("../middleware");
var global = require("../models/global");
var Test = require("../models/test");
var crypto = require("crypto");
var ejs = require("ejs");
var email = require("../settings/email");


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

//INDEX - list of bestuur users
router.get("/buser", middleware.isAuthenticatedBadmin, function(req, res){
    User.find({"owner": req.user._id, "role": "buser"}).exec(function(err, users){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("buser/index", {users: users});        
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
                  var profielOwner = user.owner ? user.owner : user._id;
                  Profiel.findOne({"owner": profielOwner, "isActueel": true}, function(err, profiel){
                    if(err){
                      req.flash("error", err);
                      res.redirect("back");
                    } else if (!profiel){
                      res.render("user/show", {user: user, profiel: global, tests: tests}); 
                    } else {
                      res.render("user/show", {user: user, profiel: profiel, tests: tests}); 
                    }
                  })        
                }
            });
      }
    });
});

//SHOW ROUTE - READY WITH FILLING QUESTIONS PAGE
router.get("/user/:id/ready", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
      if(err || !user){
          req.flash("error", err);
          res.redirect("back");
      } else {
            Test.find({"owner": user._id}, function(err, tests){
                if(err) {
                    req.flash("error", err);
                } else {
                    res.render("user/ready", {user: user, global: global, tests: tests});        
                }
            });
      }
    });
});

//API ROUTE TO SHOW TEST RESULTS OF A CERTAIN USER
router.get("/user/:id/api/tests", middleware.isLoggedIn, function(req, res){
  Test.find({"owner": req.params.id}, function(err, tests){
      if(err) {
          req.flash("error", err);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(tests));        
      }
  });
});


//PROTECT THE DEMO ACCOUNT
router.use(function(req, res, next){
  if(req.user && req.user.username==="demo@pillars.school"){
    req.flash("error", "Je kunt geen records aanmaken of wijzigen met het demo account.");
    return res.redirect("back");
  }
  next();
})

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

//NEW - form to create new bestuur user
router.get("/buser/new", middleware.isAuthenticatedBadmin, function(req, res){
    res.render("buser/new");
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
                user.owner = school.owner;
                user.save();
                //add user to school users
                school.users.push(user);
                school.isToegevoegdMedewerker = true;
                school.save();
                //send email notification to user
                var template = "./emails/welkom-medewerker.ejs";
                var data = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: req.body.password
                };
                ejs.renderFile(template, data, function(err, html){
                    if(err){
                          req.flash("error", err.message);
                          return res.redirect("back");
                      }
                    //send the email
                      var request = email.nocc(user.username, user.firstName + " " + user.lastName, "Welkom bij Pillars", html);
                      request
                      .then((result) => {
                        req.flash("success", "Nieuwe medewerker geregistreerd! Er is een email verstuurd met inlog gegevens en verdere instructies.");
                        res.redirect("/scholen/" + school._id + "/user");
                      })
                      .catch((err) => {
                        req.flash("error", "Fout bij verzenden van email. Controleer email adres.");
                        res.redirect("/scholen/" + school._id + "/user");
                      });
                });
                
                    
            });
        }
    });
});

//CREATE - creates new bestuur user in the database
router.post("/buser/", middleware.isAuthenticatedBadmin, function(req, res){
    var newUser = new User({username: req.body.username, role: req.body.role, firstName: req.body.firstName, lastName: req.body.lastName});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
              req.flash("error", err.message);
              return res.redirect("back");
        }
        user.owner = req.user._id;
        user.save();
        //send email notification to bestuur user
        var template = "./emails/welkom-bestuur-medewerker.ejs";
        var data = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: req.body.password
        };
        ejs.renderFile(template, data, function(err, html){
            if(err){
                  req.flash("error", err.message);
                  return res.redirect("back");
              }
            //send the email
            var request = email.nocc(user.username, user.firstName + " " + user.lastName, "Welkom bij Pillars", html);
            request
              .then((result) => {
                req.flash("success", "Nieuwe medewerker geregistreerd! Er is een email verstuurd met inlog gegevens en verdere instructies.");
                res.redirect("/buser");
              })
              .catch((err) => {
                req.flash("error", "Fout bij verzenden van email. Controleer email adres.");
                res.redirect("/buser");
              });
        });
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

//VERIFY USER EMAIL ACCOUNT
router.get("/user/:id/verify", middleware.isLoggedIn, function(req, res){
   User.findById(req.params.id, function(err, user){
       if(err || !user){
           req.flash('error', "Geen gebruiker gevonden");
           res.redirect("/scholen/profiel/user/"+req.params.username);
       } else {
           crypto.randomBytes(20, function(err, buf) {
            if(err){
              req.flash("error", err.message);
            } else {
              var token = buf.toString('hex');
              user.emailAuthenticationToken = token;
              user.save();
              var template = "./emails/verify.ejs";
              ejs.renderFile(template, user, function(err, html){
                if(err){
                      req.flash("error", err.message);
                      return res.redirect("back");
                  }
                //send the email
                var request = email.nocc(user.username, user.firstName + " " + user.lastName, "Email verificatie Pillars", html);
                request
                  .then((result) => {
                    req.flash("success", "Email met verificatie link gestuurd!");
                    res.redirect("back");
                  })
                  .catch((err) => {
                    req.flash("error", err.statusCode);
                    res.redirect("back");
                  });
              });
            }
        });
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

//DESTROY route to delete bestuur user from database
router.delete("/buser/:id", middleware.isAuthenticatedBadmin, function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            req.flash('error', err.message);
            res.redirect("/buser");
        }  else {
            req.flash("success", "Bestuur medewerker verwijderd");
            res.redirect("/buser");
        }
    });
});

module.exports = router;