var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var User = require("../../models/user");
var middleware = require("../../middleware");
var ejs = require("ejs");
var config = require("../../config/config");

//INDEX - list of bestuur users and admins
router.get("/", middleware.isAuthenticatedBadmin, function(req, res){
    User.find({$and: [{"organisation": req.user.organisation}, 
                      {$or:[{"role": "badmin"}, {"role": "buser"}]}]})
      .exec(function(err, users){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("org-user/index", {users: users});        
        }
    });
});

//NEW - form to create new bestuur (organisation) user
router.get("/new", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    res.render("org-user/new");
});

//NEW - form to create new social login bestuur user
router.get("/newSocial", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    res.render("org-user/newSocial");
});

//CREATE - creates new bestuur user in the database
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    User.findById(req.user._id, function(err, badmin){
      if(err || !badmin){
        req.flash("error", "Badmin niet gevonden");
        return res.redirect("back");
      }
      var newUser = new User({username: req.body.username, role: req.body.role, firstName: req.body.firstName, lastName: req.body.lastName});
      User.register(newUser, req.body.password, function(err, user){
          if(err){
                req.flash("error", err.message);
                return res.redirect("back");
          }
          user.owner = req.user._id;
          user.organisation = badmin.organisation;
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
                  res.redirect("/org-user");
                })
                .catch((err) => {
                  req.flash("error", "Fout bij verzenden van email. Controleer email adres.");
                  res.redirect("/org-user");
                });
          });
      });
    })
});


//DESTROY route to delete bestuur user from database
router.delete("/:id", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            req.flash('error', err.message);
            res.redirect("/org-user");
        }  else {
            req.flash("success", "Bestuur medewerker verwijderd");
            res.redirect("/org-user");
        }
    });
});

module.exports = router;