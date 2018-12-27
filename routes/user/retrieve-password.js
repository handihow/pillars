var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../../models/user");
var asyncr = require("async");
var crypto = require("crypto");
var ejs = require("ejs");
var config = require("../../config/config");

//RETRIEVE PASSWORD FORM
router.get("/forgot", function(req, res){
  res.locals.scripts.footer.forgot = true;
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
        var request = config.email.nocc(user.username, user.firstName + " " + user.lastName, "Pillars Wachtwoord Reset", html);
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

//HANDLE THE RESET PASSWORD ROUTE
router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (err || !user) {
      req.flash('error', 'Password reset token is niet geldig of niet meer actief.');
      return res.redirect('/forgot');
    }
    res.locals.scripts.footer.reset = true;
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