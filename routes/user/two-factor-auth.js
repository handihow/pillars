var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var middleware = require("../../middleware");
var User = require("../../models/user");
var speakeasy = require("speakeasy");
var qrcode = require("qrcode");

router.get("/", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      res.render("user/2fa/settings", {user: user});
    }
  });
});

router.get("/stepone", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, async function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      const secret = speakeasy.generateSecret({
      	name: "Pillars.school"
      });
      user.twoFactorTempSecret = secret.base32;
      await user.save();
      qrcode.toDataURL(secret.otpauth_url, function(err, data_url) {
		  if(err){
		  	req.flash("error", err);
		  	res.redirect("back");
		  } else {
		  	res.render("user/2fa/stepone", {user: user, data_url: data_url});
		  }
		});
    }
  });
});

router.get("/steptwo", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      res.render("user/2fa/steptwo", {user: user});
    }
  });
});


router.post("/activate", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, async function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      const code = req.body.code;
      const verified = speakeasy.totp.verify({ secret: user.twoFactorTempSecret,
                                       encoding: 'base32',
                                       token: code });
      if(verified){
      	user.twoFactorSecret = user.twoFactorTempSecret;
		user.twoFactorEnabled = true
		await user.save();
      	req.flash("success", "Twee-staps-verificatie is geactiveerd!")
      	res.redirect("/user/" + user._id + "/twofactorauth");	
      } else {
      	req.flash("error", "Controle code is onjuist. Probeer het opnieuw.")
      	res.redirect("/user/" + user._id + "/twofactorauth/steptwo");	
      }
      
    }
  });
});

router.get("/login", function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err || !user){
      req.flash("error", err);
      res.redirect("back");
    } else {
      res.render("user/2fa/login", {user: user});
    }
  });
});

router.post("/login", function(req, res){
  User.findById(req.params.id, function(err, user){
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


module.exports = router;