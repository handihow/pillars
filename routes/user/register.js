var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../../models/user");
var asyncr = require("async");
var crypto = require("crypto");
var ejs = require("ejs");
var config = require("../../config/config");
var Organisation = require("../../models/organisation");

//SHOW REGISTER FORM FOR ORGANISATION ADMINS (BADMIN)
router.get("/register", function(req,res){
  Organisation.find({}, function(err, organisations){
    if(err || !organisations){
      req.flash("error", err.message);
      return res.redirect("/register")
    }
    res.locals.scripts.footer.register = true;
    res.render("register", {organisations: organisations});
  });
});

//HANDLE SIGN-UP LOGIC FOR ORGANISATION ADMINS (BADMIN)
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
                        var request = config.email.cc(user.username, user.firstName + " " + user.lastName, "Welkom bij Pillars", html);
                        request
                        .then((result) => {
                          req.flash("success", "Welkom bij Pillars!");
                          res.redirect("/schools");
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

module.exports = router;