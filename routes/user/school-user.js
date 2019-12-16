var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var User = require("../../models/user");
var SurveyResult = require("../../models/surveyResult");
var middleware = require("../../middleware");
var ejs = require("ejs");
var config = require("../../config/config");
var Test = require("../../models/test");

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
router.get("/new", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("/schools");
        } else {
            res.render("user/new", {school: school});        
        }
    });
});

//NEW - form to create new social login school user
router.get("/newSocial", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("/schools");
        } else {
            res.render("user/newSocial", {school: school});        
        }
    });
});

//NEW - form to create bulk new school user
router.get("/newBulk", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("/schools");
        } else {
            res.locals.scripts.header.tinymce = true;
            res.render("user/newBulk", {school: school});        
        }
    });
});

//CREATE - creates new school user in the database and links it to school
router.post("/", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
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
                user.school = school._id;
                user.organisation = school.organisation;
                user.save();
                //add user to school users
                school.users.push(user);
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
                      var request = config.email.nocc(user.username, user.firstName + " " + user.lastName, "Welkom bij Pillars", html);
                      request
                      .then((result) => {
                        req.flash("success", "Nieuwe medewerker geregistreerd! Er is een email verstuurd met inlog gegevens en verdere instructies.");
                        res.redirect("/schools/" + school._id + "/user");
                      })
                      .catch((err) => {
                        req.flash("error", "Fout bij verzenden van email. Foutmelding: " + err);
                        res.redirect("/schools/" + school._id + "/user");
                      });
                });
                
                    
            });
        }
    });
});

//CREATE - STEP 1 creates new bulk school user in the database and links it to school
router.post("/userBulk", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
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
router.post("/userBulk2", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
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
                return res.redirect("/schools/" + school._id + "/user");
              }
              if(i==req.body.usernames.length-1){
                req.flash("success", "Nieuwe medewerkers geregistreerd! Er is geen email verstuurd naar deze medewerkers.");
                res.redirect("/schools/" + school._id + "/user");
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
        user.school = school._id;
        user.organisation = school.organisation;
        user.save();
        //add user to school users
        school.users.push(user);
        school.save(function(_){
          resolve(false);
        });
      });  
  });
}


//DESTROY route to delete school user from database
router.delete("/:user_id", middleware.isNotDemoAccount, middleware.isSchoolOwner, function(req, res){
    User.findById(req.params.user_id, function(err, user){
        if(err) {
          req.flash('error', err.message);
          res.redirect("/schools");
        }  else {
          user.remove();
          req.flash("success", "School medewerker is verwijderd.");
          res.redirect("/schools/" + req.params.id + "/user");
        }
    });
});

module.exports = router;