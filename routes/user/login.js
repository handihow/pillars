var express = require("express");
var router = express.Router();
var passport = require("passport");

//SHOW LOGIN FORM
router.get("/login", function(req, res){
 res.locals.scripts.footer.login = true;
 res.render("login"); 
});

//HANDLE LOG-IN LOGIC
router.post("/login", passport.authenticate("local", 
{
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true
}), function(req, res){
});

//AUTH WITH GOOGLE
router.get("/auth/google", passport.authenticate('google', {
  scope: ['email']
}));

//CALLBACK ROUTE FOR GOOGLE
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    // Successful authentication, redirect home
    res.redirect('/home');
  });

//AUTH WITH OFFICE 365
router.get('/auth/azureadoauth2',
  passport.authenticate('azure_ad_oauth2'));

//CALLBACK ROUTE FOR OFFICE 365
router.get('/auth/azureadoauth2/callback', 
  passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login', failureFlash: true }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

//LOG OUT ROUTE
router.get("/logout", function(req, res){
 req.logout();
 req.flash("success", "Je bent uitgelogd!");
 res.redirect("/");
});

module.exports = router;