var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var middleware = require("../../middleware");
var User = require("../../models/user");
var Organisation = require("../../models/organisation");
var Standard = require("../../models/standard");

//show route
router.get("/", middleware.isPadmin, function(req, res){
    School.find().populate("owner").exec(function(err, schools){
      if(err){
          req.flash("error", err.message);
          res.redirect("back");
      } else {
          res.render("admin/index", {schools: schools});            
      }
  });
});

//get list of bestuur administrators
router.get("/badmin", middleware.isPadmin, function(req,res){
  User.find({"role": "badmin"}).populate("organisation").exec(function(err,users){
    if(err){
      req.flash("error", err.message);
      return res.redirect("back");
    }
    res.render("admin/badmin", {users: users});
  });
});


//update user (transfer school or edit role)
router.get("/transfer", middleware.isPadmin, function(req,res){
  School.find({}, function(err, schools){
      if(err){
        req.flash("error", err.message);
        return res.redirect("back");
      }
      res.render("admin/transfer", {schools: schools});
    });
})

//find user in the database
router.post("/find-user", middleware.isPadmin, function(req,res){
  User.findOne({"username": req.body.username})
    // .populate("org")
    .exec(function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.redirect("back");
    }
    if(!user){
      req.flash("error", "Geen gebruiker gevonden met dat email adres");
      return res.redirect("back");
    }
    if(user.role==="badmin" || user.role==="padmin"){
      req.flash("error", "Gebruiker is bestuur administrator or pillars administrator. Deze kun je niet aanpassen via dit formulier.");
      return res.redirect("back");
    }
    School.findById(req.body.school).populate("users").exec(function(err, school){
      if(err || ! school){
        req.flash("error", "Probleem bij het vinden van de gegevens van de school");
        return res.redirect("back");
      }
      let schoolUsernames = school.users.map(u => u.username);
      if(!schoolUsernames.includes(user.username)){
        req.flash("error", "Deze gebruiker is niet gevonden in deze school. Probeer het opnieuw.");
        return res.redirect("back");
      }
      School.find({}, function(err, schools){
        if(err){
          req.flash("error", err.message);
          return res.redirect("back");
        }
        res.render("admin/update-user", {user: user, school: school, schools: schools});
      });
    })
  })
})

router.post("/update-user", middleware.isPadmin, function(req, res){
  User.findById(req.body.userId, function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.redirect("back");
    }
    user.role = req.body.role;
    if(req.body.school){
      School.findById(req.body.previousSchool, function(err, school){
        if(err || !school){
          req.flash("error", "Probleem bij het vinden van de gegevens van de school");
          return res.redirect("back");
        }
        school.users.pull(user);
        school.save();
        School.findById(req.body.school, function(err, school){
          if(err || !school){
            req.flash("error", "Probleem bij het vinden van de gegevens van de school");
            return res.redirect("back");
          }
          school.users.push(user);
          school.save();
          user.save();
          req.flash("success", "Gegevens van de gebruiker zijn gewijzigd.");
          res.redirect("transfer");
        })
      })
    } else {
      user.save();
      req.flash("success", "Gegevens van de gebruiker zijn gewijzigd.");
      res.redirect("transfer");
    }
  });
});

//STANDARDS ROUTE
router.get("/standard", middleware.isLoggedIn, function(req, res){
    Standard.find().populate("organisation").exec(function(err, standards){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            standards.sort(function(a,b){return a.organisation.name.localeCompare(b.organisation.name);});
            res.render("standard/index", {standards: standards, isAdmin: true});         
        }
    });
});

module.exports = router;