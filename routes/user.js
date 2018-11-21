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

//INDEX - list of bestuur users and admins
router.get("/buser", middleware.isAuthenticatedBadmin, function(req, res){
    User.find({$and: [{"organisation": req.user.organisation}, 
                      {$or:[{"role": "badmin"}, {"role": "buser"}]}]})
      .exec(function(err, users){
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

//NEW - form to create new social login school user
router.get("/scholen/:id/user/newSocial", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("/scholen");
        } else {
            res.render("user/newSocial", {school: school});        
        }
    });
});

//NEW - form to create bulk new school user
router.get("/scholen/:id/user/newBulk", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("/scholen");
        } else {
            res.render("user/newBulk", {school: school});        
        }
    });
});

//NEW - form to create new bestuur user
router.get("/buser/new", middleware.isAuthenticatedBadmin, function(req, res){
    res.render("buser/new");
});

//NEW - form to create new social login bestuur user
router.get("/buser/newSocial", middleware.isAuthenticatedBadmin, function(req, res){
    res.render("buser/newSocial");
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
                user.organisation = school.organisation;
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

//CREATE - STEP 1 creates new bulk school user in the database and links it to school
router.post("/scholen/:id/userBulk/", middleware.isSchoolOwner, function(req, res){
    req.body.usernames = req.sanitize(req.body.usernames);
    //lookup school by ID
    School.findById(req.params.id, function(err, school){
        if(err || !school){
            req.flash("error", "School niet gevonden");
            res.redirect("back");
        } else {          
          var newUsers = req.body.usernames.replace(/<\/?[^>]+(>|$)/g, "").split(/[ ,]+/);
          function validateEmail(email) {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(String(email).toLowerCase());
          }
          var newUsersClean = [];
          var newUsersUnclean = [];
          newUsers.forEach(function(email){
            if(validateEmail(email)){
              newUsersClean.push(email);
            } else {
              newUsersUnclean.push(email);
            }
          })
          res.render('user/newBulk2', {school: school, newUsers: newUsers, newUsersClean: newUsersClean, newUsersUnclean: newUsersUnclean})
        }
    });
});

//CREATE - STEP 2 creates new school user in the database and links it to school
router.post("/scholen/:id/userBulk2/", middleware.isSchoolOwner, function(req, res){
    //lookup school by ID
    School.findById(req.params.id, function(err, school){
        if(err || !school){
            req.flash("error", "School niet gevonden");
            res.redirect("back");
        } else {
            asyncForEach(req.body.usernames, async function(username, i){
              //create new school user in DB
              var hasError = await registerUser(username, school, null, null, null);
              if(hasError){
                req.flash("error", hasError.errorMessage);
                return res.redirect("/scholen/" + school._id + "/user");
              }
              if(i==req.body.usernames.length-1){
                req.flash("success", "Nieuwe medewerkers geregistreerd! Er is geen email verstuurd naar deze medewerkers.");
                res.redirect("/scholen/" + school._id + "/user");
              }
            })
        }
    });
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function registerUser(username, school, role, password, firstName, lastName){
  return new Promise(resolve => {
      var newUser = new User({username: username, role: role ? role : 'suser', firstName: firstName ? firstName : null, lastName: lastName ? lastName : null});
      var generatedPassword = Math.random().toString(36).substr(2, 8);
      User.register(newUser, password ? password : generatedPassword, function(err, user){
        if(err){
          
          return resolve(true);
        }
        user.owner = school.owner;
        user.organisation = school.organisation;
        user.save();
        //add user to school users
        school.users.push(user);
        school.isToegevoegdMedewerker = true;
        school.save(function(_){
          resolve(false);
        });
      });  
  });
}

//CREATE - creates new bestuur user in the database
router.post("/buser/", middleware.isAuthenticatedBadmin, function(req, res){
    User.findById(req.user._id, function(err, badmin){
      if(err || !badmin){
        req.flash("error", "Badmin niet gevonden");
        return res.redirect("back");
      }
      var newUser = new User({username: req.body.username, role: req.body.role, firstName: req.body.firstName, lastName: req.body.lastName});
      User.register(newUser, req.body.password, function(err, user){
          if(err){
                req.flash("error", err.message);
                return res.redirect("back");
          }
          user.owner = req.user._id;
          user.organisation = badmin.organisation;
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
    })
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
    User.findByIdAndRemove(req.params.user_id, function(err, user){
        if(err) {
            req.flash('error', err.message);
            res.redirect("/scholen");
        }  else {
            user.remove();
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