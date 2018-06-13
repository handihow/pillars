var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var middleware = require("../middleware");
var User = require("../models/user");

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
  User.find({"role": "badmin"}).exec(function(err,users){
    if(err){
      req.flash("error", err.message);
      return res.redirect("back");
    }
    res.render("admin/badmin", {users: users});
  });
});


//update user (transfer school or edit role)
router.get("/transfer", middleware.isPadmin, function(req,res){
  res.render("admin/transfer");
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
    School.find({"owner": user.owner}, function(err, schools){
      if(err){
        req.flash("error", err.message);
        return res.redirect("back");
      }
      res.render("admin/update-user", {user: user, schools: schools});
    });
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
      
    }
    
  })
})

module.exports = router;