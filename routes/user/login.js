var express = require("express");
var router = express.Router();
var passport = require("passport");
var speakeasy = require("speakeasy");
var User = require("../../models/user");
var Organisation = require("../../models/organisation");

var successHandler = function(req, res){
  if(req.user){
    Organisation.findById(req.user.organisation, function(err, organisation){
      if(err || !organisation){
        return res.redirect("/logout");
      } else if(organisation.isDisabled){
        return res.redirect("/account-disabled");
      } else if(req.user.twoFactorEnabled) {
        res.redirect("/twofactorauth/login");
      } else {
        res.redirect("/home");
      }
    });
  } else {
    res.redirect("/login");
  }
}

//SHOW LOGIN FORM
router.get("/login", function(req, res){
 res.locals.scripts.footer.login = true;
 res.render("login"); 
});

//HANDLE LOG-IN LOGIC
router.post("/login", passport.authenticate("local", 
{
  failureRedirect: "/login",
  failureFlash: true
}), function(req, res){
   successHandler(req, res);
});

//AUTH WITH GOOGLE
router.get("/auth/google", passport.authenticate('google', {
  scope: ['email']
}));

//CALLBACK ROUTE FOR GOOGLE
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    // Successful authentication, redirect home
    successHandler(req, res);
  });

//AUTH WITH OFFICE 365
router.get('/auth/azureadoauth2',
  passport.authenticate('azure_ad_oauth2'));

//CALLBACK ROUTE FOR OFFICE 365
router.get('/auth/azureadoauth2/callback', 
  passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login', failureFlash: true }),
  function (req, res) {
    // Successful authentication, redirect home.
    successHandler(req, res);
  });

router.get("/twofactorauth/login", function(req, res){
  User.findById(req.user, function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      res.render("user/2fa/login", {user: user});
    }
  });
});

router.post("/twofactorauth/login", function(req, res){
  User.findById(req.user, function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      const code = req.body.code;
      const verified = speakeasy.totp.verify({ secret: user.twoFactorSecret,
                                       encoding: 'base32',
                                       token: code });
      if(verified){
        res.redirect("/home");  
      } else {
        req.flash("error", "Controle code is onjuist. Probeer het opnieuw.")
        res.redirect("back");  
      }
    }
  });
})

//DISABLED ACCOUNT ROUTE
router.get("/account-disabled", function(req, res){
 req.logout();
 req.flash("error", "Account is niet actief. Neem contact op met de beheerder.");
 res.redirect("/");
});

//LOG OUT ROUTE
router.get("/logout", function(req, res){
 req.logout();
 req.flash("success", "Je bent uitgelogd!");
 res.redirect("/");
});

module.exports = router;