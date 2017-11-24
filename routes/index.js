var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var asyncr = require("async");
var crypto = require("crypto");
var mailjet = require ('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

//LANDING PAGE route
router.get("/", function(req, res){
    res.render("landing");
});

//SHOW REGISTER FORM
router.get("/register", function(req,res){
   res.render("register"); 
});

//HANDLE SIGN-UP LOGIC
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username, role: req.body.role, firstName: req.body.firstName, lastName: req.body.lastName, org: req.body.organisatie});
    User.register(newUser, req.body.password, function(err, user){
          if(err){
              req.flash("error", err.message);
              return res.redirect("back");
          }
          passport.authenticate("local")(req, res, function(){
              crypto.randomBytes(20, function(err, buf) {
                if(err){
                  req.flash("error", err.message);
                } else {
                  var token = buf.toString('hex');
                  user.emailAuthenticationToken = token;
                  user.save();
                  //create email message
                  var htmlMessage = 
                  '<p>Beste ' + user.firstName + ' ' + user.lastName + '</p>' +
                  '<p>Je bent aangemeld met het email adres: </p>' +
                  user.username +
                  '<p>Je kunt nu 60 dagen Pillars gratis uitproberen.</p>' +
                  '<p>Zodra de periode is verlopen, nemen wij per email contact met je op om te kijken of je Pillars wilt blijven gebruiken.</p>' +
                  '<h3>Email verificatie</h3>' +
                  '<p>Voordat je Pillars kunt gebruiken, vragen wij je om het email adres te verifieren.</p>' +
                  '<p>Click aub op de onderstaande link om jouw email adres te verifieren: </p>' +
                  'https://app.pillars.school/verify/' + token +
                  '<p>We wensen je veel plezier met het gebruik van Pillars.</p>'
                  ;
                  
                  var request = mailjet
                      .post("send", {'version': 'v3.1'})
                      .request({
                        "Messages":[
                            {
                                "From": {
                                    "Email": "notifications@pillars.school",
                                    "Name": "Pillars"
                                },
                                "To": [
                                    {
                                        "Email": user.username,
                                        "Name": user.firstName + " " + user.lastName
                                    }
                                ],
                                "Cc": [
                                    {
                                      "Email": "info@pillars.school",
                                      "Name": "Pillars admin"
                                    }
                                ],
                                "Subject": "Welkom bij Pillars",
                                "HTMLPart": htmlMessage,
                            }
                        ]
                      });
                    request
                      .then((result) => {
                        req.flash("success", "Welkom bij Pillars!");
                        res.redirect("/scholen");
                      })
                      .catch((err) => {
                        req.flash('error', err.message);
                        res.redirect("/");
                      });
                }
              });
          });
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
        req.flash('error', 'No account with that email address exists.');
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
      
      var htmlMessage = 
      '<p>Je hebt een nieuw wachtwoord aangevraagd bij Pillars</p>' +
      '<p>Click aub op de onderstaande link om een nieuw wachtwoord aan te maken:</p>' +
      'https://app.pillars.school/reset/' + token +
      '<p>Als je geen nieuw wachtwoord hebt aangevraagd, dan hoef je niets te doen. Je wachtwoord bij Pillars blijft dan hetzelfde.</p>'
      ;
      
      var request = mailjet
          .post("send", {'version': 'v3.1'})
          .request({
            "Messages":[
                {
                    "From": {
                        "Email": "notifications@pillars.school",
                        "Name": "Pillars"
                    },
                    "To": [
                        {
                            "Email": user.username,
                            "Name": user.firstName + " " + user.lastName
                        }
                    ],
                    "Subject": "Pillars Wachtwoord Reset",
                    "HTMLPart": htmlMessage,
                }
            ]
          });
        request
          .then((result) => {
            req.flash('success', 'Er is een email gestuurd naar ' + user.username + ' met verdere instructies.');
            res.redirect('/forgot');
          })
          .catch((err) => {
            req.flash('error', err.message);
            res.redirect("/forgot");
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