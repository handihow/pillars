var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var asyncr = require("async");
var nodemailer = require('nodemailer');
var crypto = require("crypto");

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
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welkom bij Pillars!");
            res.redirect("/scholen");
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
        //   console.log('error', 'No account with that email address exists.');
        req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }
        console.log('step 1');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      console.log('step 2');
      
      var smtpTrans = nodemailer.createTransport({
         service: 'Gmail', 
         auth: {
          user: 'roelandverbakel@gmail.com',
          pass: 'Ro!!erdam3054'
        }
      });
      var mailOptions = {
        to: user.username,
        from: 'roelandverbakel@gmail.com',
        subject: 'Pillars Wachtwoord Reset',
        text: 'Je hebt een nieuw wachtwoord aangevraagd bij Pillars.\n\n' +
          'Click aub op de onderstaande link om een nieuw wachtwoord aan te maken:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'Als je geen nieuw wachtwoord hebt aangevraagd, dan hoef je niets te doen. Je wachtwoord bij Pillars blijft dan hetzelfde.\n'
      };
      console.log('step 3');

      smtpTrans.sendMail(mailOptions, function(err) {
          if(err){
              console.log(err);
              req.flash('error', err.message);
              res.redirect("/forgot");
              
          } else {
              req.flash('success', 'Er is een email gestuurd naar ' + user.username + ' met verdere instructies.');
              console.log('sent');
              res.redirect('/forgot');
          }
    });
}
  ], function(err) {
    req.flash("error", err.message);
    res.redirect('/');
  });
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