var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var asyncr = require("async");
var crypto = require("crypto");
var ejs = require("ejs");
var email = require("../settings/email");
var Organisation = require("../models/organisation");

//LANDING PAGE route
router.get("/", function(req, res){
    res.render("landing");
});

//SHOW REGISTER FORM
router.get("/register", function(req,res){
  Organisation.find({}, function(err, organisations){
    if(err || !organisations){
      req.flash("error", err.message);
      return res.redirect("/register")
    }
    res.render("register", {organisations: organisations});
  });
});

//HANDLE SIGN-UP LOGIC
router.post("/register", function(req,res){
    Organisation.findById(req.body.organisation, function(err, organisation){
      if(err){
        req.flash("error", err.message);
        res.redirect("/register");
      } else if(!organisation){
        req.flash("error", "Organisatie niet gevonden");
        res.redirect("/register");
      } else if(organisation.activated){
        req.flash("error", "Activatie code is al gebruikt of niet correct");
        res.redirect("/register");
      } else if(organisation.activationCode !== req.body.activationCode){
        req.flash("error", "Activatie code is niet correct");
        res.redirect("/register");
      } else {
        //first, set the organisation to activated
        organisation.activated = true;
        organisation.save();
        var newUser = new User({username: req.body.username, role: req.body.role, firstName: req.body.firstName, lastName: req.body.lastName});
        User.register(newUser, req.body.password, function(err, user){
              if(err){
                  req.flash("error", err.message);
                  return res.redirect("back");
              }
              user.organisation = req.body.organisation;
              user.save();
              passport.authenticate("local")(req, res, function(){
                  crypto.randomBytes(20, function(err, buf) {
                    if(err){
                      req.flash("error", err.message);
                    } else {
                      var token = buf.toString('hex');
                      user.emailAuthenticationToken = token;
                      user.save();
                      //create email message
                      var template = "./emails/welkom.ejs";
                      ejs.renderFile(template, user, function(err, html){
                        if(err){
                              req.flash("error", err.message);
                              return res.redirect("/register");
                          }
                        //send the email
                          var request = email.cc(user.username, user.firstName + " " + user.lastName, "Welkom bij Pillars", html);
                          request
                          .then((result) => {
                            req.flash("success", "Welkom bij Pillars!");
                            res.redirect("/scholen");
                          })
                          .catch((err) => {
                            req.flash('error', err.message);
                            res.redirect("/");
                          });
                      });
                    }
                  });
              });
          });
      }
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
   res.render("login"); 
});

//HANDLE LOG-IN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/scholen",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res){
});


//LOG OUT ROUTE
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Je bent uitgelogd!");
   res.redirect("/");
});

//RETRIEVE PASSWORD FORM
router.get("/forgot", function(req, res){
   res.render("forgot"); 
});

//ABOUT PILLARS
router.get("/about", function(req, res){
   res.render("about"); 
});

//PRICES PILLARS
router.get("/prices", function(req, res){
   res.render("prices"); 
});

//REQUEST NEW PASSWORD BY EMAIL WITH POST REQUEST
router.post('/forgot', function(req, res, next) {
  asyncr.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ username: req.body.username }, function(err, user) {
        if (err || !user) {
        req.flash('error', 'Geen account met dat email adres gevonden.');
          return res.redirect('/forgot');
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var template = "./emails/forgot.ejs";
      ejs.renderFile(template, user, function(err, html){
        if(err){
              req.flash("error", err.message);
              return res.redirect("/forgot");
          }
        //send the email
        var request = email.nocc(user.username, user.firstName + " " + user.lastName, "Pillars Wachtwoord Reset", html);
        request
          .then((result) => {
            req.flash('success', 'Er is een email gestuurd naar ' + user.username + ' met verdere instructies.');
            res.redirect('/forgot');
          })
          .catch((err) => {
            req.flash('error', err.message);
            res.redirect("/forgot");
          });
      });
}
  ], function(err) {
    req.flash("error", err.message);
    res.redirect('/');
  });
});

router.get("/terms", function(req, res){
  res.render("terms");
});

//HANDLE THE RESET PASSWORD ROUTE
router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (err || !user) {
      req.flash('error', 'Password reset token is niet geldig of niet meer actief.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});

//HANDLE THE EMAIL VERIFICATION ROUTE
router.get('/verify/:token', function(req, res) {
  User.findOne({ emailAuthenticationToken: req.params.token }, function(err, user) {
    if (err || !user) {
      req.flash('error', 'Email authentication token is niet geldig.');
      return res.redirect('/register');
    }
    user.emailIsAuthenticated = true;
    user.save();
    req.flash("success", "Email geverifieerd. Klik op Nu Beginnen! om verder te gaan.");
    res.redirect("/");
  });
});

router.post("/reset/:token", function(req, res){
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (err || !user) {
          req.flash("error", "Geen account gevonden");
          return res.redirect('/forgot');
        } else {
            
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            user.setPassword(req.body.password, function(err){
                if(err) {
                    req.flash("error", err.message);
                } else {
                   user.save(function(err) {
                        if(err) {
                            req.flash("error", err.message);
                        } else {
                            req.flash("success", "Nieuw wachtwoord opgeslagen voor " + user.username + ". Probeer opnieuw in te loggen.");
                            res.redirect("/login");
                        }
                    }); 
                }
            });
        }
      });
});

module.exports = router;