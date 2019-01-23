var express = require("express");
var router = express.Router();
var User = require("../../models/user");
var middleware = require("../../middleware");
var crypto = require("crypto");
var ejs = require("ejs");
var config = require("../../config/config");

//VERIFY USER EMAIL ACCOUNT
router.get("/user/:id", middleware.isLoggedIn, function(req, res){
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
                var request = config.email.nocc(user.username, user.firstName + " " + user.lastName, "Email verificatie Pillars", html);
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

//HANDLE THE EMAIL VERIFICATION ROUTE
router.get('/:token', function(req, res) {
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


module.exports = router;