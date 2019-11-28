var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Organisation = require("../../models/organisation");
var User = require("../../models/user");
var middleware = require("../../middleware");
var ejs = require("ejs");
var config = require("../../config/config");

//INDEX - list of bestuur users and admins
router.get("/", middleware.isLoggedIn, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
      if(err || !organisation){
        res.flash('error', 'Probleem bij vinden van bestuur');
        res.redirect('back')
      } else {
        User.find({$and: [{"organisation": req.params.id}, 
                      {$or:[{"role": "padmin"}, {"role": "badmin"}, {"role": "buser"}]}]})
          .exec(function(err, users){
            if(err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.render("org-user/index", {users: users, organisation: organisation});        
            }
        });
      }
    });
});

//NEW - form to create new bestuur (organisation) user
router.get("/new", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
      if(err || !organisation){
        res.flash('error', 'Probleem bij vinden van bestuur');
        res.redirect('back')
      } else {
        res.render("org-user/new", {organisation: organisation});
      }
    });
});

//NEW - form to create new social login bestuur user
router.get("/newSocial", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
      if(err || !organisation){
        res.flash('error', 'Probleem bij vinden van bestuur');
        res.redirect('back')
      } else {
        res.render("org-user/newSocial", {organisation: organisation});
      }
    });
});

//CREATE - creates new bestuur user in the database
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
      if(err || !organisation){
        req.flash("error", "Bestuur niet gevonden");
        return res.redirect("back");
      }
      var newUser = new User({username: req.body.username, role: req.body.role, firstName: req.body.firstName, lastName: req.body.lastName});
      User.register(newUser, req.body.password, function(err, user){
          if(err){
                req.flash("error", err.message);
                return res.redirect("back");
          }
          user.owner = req.user._id;
          user.organisation = organisation._id;
          user.save();          
          //send email notification to bestuur user
          var template = "./emails/welkom-bestuur-medewerker.ejs";
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
                  res.redirect("/organisations/" + organisation._id + "/org-user");
                })
                .catch((err) => {
                  req.flash("error", "Fout bij verzenden van email. Controleer email adres.");
                  res.redirect("/organisations/" + organisation._id + "/org-user");
                });
          });
      });
    })
});


//DESTROY route to delete bestuur user from database
router.delete("/:uid", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    User.findByIdAndRemove(req.params.uid, function(err){
        if(err) {
            req.flash('error', err.message);
            res.redirect("/organisations/" + req.params.id + "/org-user");
        }  else {
            req.flash("success", "Bestuur medewerker verwijderd");
            res.redirect("/organisations/" + req.params.id + "/org-user");
        }
    });
});

module.exports = router;