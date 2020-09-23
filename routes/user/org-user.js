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
        User.find({"organisation": req.params.id})
          .sort({'lastName': 'asc'})
          .populate('school')
          .exec(function(err, users){
            if(err) {
              req.flash("error", err.message);
              res.redirect("back");
            } else {
              res.locals.scripts.header.datatables = true;
              res.locals.scripts.footer.datatables = true;
              res.locals.scripts.footer.tinymce = true;
              let supplementedUsers = [];
              users.forEach(user => {
                var schoolName = user.school && user.school[0] ? user.school[0].name : '-';
                var firstName = user.firstName ? user.firstName : '-';
                var lastName = user.lastName ? user.lastName : '-';
                supplementedUsers.push({
                  schoolName: schoolName,
                  ...user._doc,
                  firstName: firstName,
                  lastName: lastName
                })
              });
              res.render("table-view/index", {
                organisation: organisation, 
                items: supplementedUsers, 
                columns: config.user.columns(false, false),
                header: 'user',
                hasWarningRow: false,
                email: true,
                allowNewEntries: false
              });    
              // res.render("user/index", {users: users, organisation: organisation, userview: 'organisation'});        
            }
        });
      }
    });
});

//INDEX - list of bestuur users and admins
router.get("/cards", middleware.isLoggedIn, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
      if(err || !organisation){
        res.flash('error', 'Probleem bij vinden van bestuur');
        res.redirect('back')
      } else {
         User.find({"organisation": req.params.id})
          .sort({'lastName': 'asc'})
          .populate('school')
          .exec(function(err, users){
            if(err) {
              req.flash("error", err.message);
              res.redirect("back");
            } else {
              res.render("user/cards", {users: users, organisation: organisation, userview: 'organisation'});        
            }
        });
      }
    });
});

//CHARTS OF USERS
router.get("/charts", middleware.isLoggedIn, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
      if(err || !organisation){
        res.flash('error', 'Probleem bij vinden van bestuur');
        res.redirect('back')
      } else {
        User.find({"organisation": req.params.id})
          .sort({'lastName': 'asc'})
          .populate('school')
          .exec(function(err, users){
            if(err) {
              req.flash("error", err.message);
              res.redirect("back");
            } else {
              res.locals.scripts.header.surveyanalytics = true;
              res.locals.scripts.footer.useranalytics = true;
              res.render("user/charts", {users: users, organisation: organisation, userview: 'organisation'});        
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

//BULK NEW - form to upload CSV FILE with user info
router.get("/csv-import", middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation) {
      req.flash("error", "Bestuur niet gevonden");
      res.redirect("back");
    } else {
      res.render("csv-import/main", {
        organisation: organisation, 
        columns: config.user.columns(false, true), 
        header: 'user',
        title: 'medewerkers',
        link: 'https://pillars.school/wp-content/uploads/2020/07/Pillars-csv-import-model-voor-medewerkers.xlsx'
      });        
    }
  });
});

//CREATE - creates new hardware in the database and links it to organisation from the bulk upload
router.post("/csv-import", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
   Organisation.findById(req.params.id, function(err, organisation){ 
     if(err || !organisation){
       return res.json({success: false, message: 'Bestuur niet gevonden'});
     }
     var newUserItems = JSON.parse(req.body.items);
     config.user.helpers.asyncForEach(newUserItems, async function(user, i){
        var email = user.username.replace(/<\/?[^>]+(>|$)/g, "");
        //create new school user in DB
        if(!config.user.helpers.validateEmail(email)){
          return res.json({success: false, message: 'Email adres ' + email + ' is ongeldig'});
        }
        var role = 'buser';
        if(user.role === 'Admin'){
          role = 'badmin';
        }
        var password = user.password && user.password.length > 7 ? user.password : null;
        var hasError = await config.user.helpers.registerUser(email, null, organisation, role, password, user.firstName, user.lastName);
        if(hasError){
          return res.json({success: false, message: 'Probleem bij importeren van ' + email + '. Mogelijk is dit email adres van een reeds bestaand account.'});
        }
        if(i==newUserItems.length-1){
          return res.json({success: true, message: 'Medewerkers succesvol toegevoegd!'})
        }
      })
   });
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