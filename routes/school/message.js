var express = require("express");
var router = express.Router({mergeParams: true});
var Message = require("../../models/message");
var School = require("../../models/school");
var Organisation = require("../../models/organisation");
var User = require("../../models/user");
var middleware = require("../../middleware");

//INDEX ROUTE FOR MESSAGES
router.get("/", middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id,function(err, school){
    if(err || !school) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.find(
        {school: school._id},
        null,
        {sort: {title: 1}}
      ).populate("owner").exec(function(err, messages){
        if(err) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("message/school", {messages: messages, school: school, canAdd: true});         
        }
      });        
    }
  });
});

//NEW ROUTE
router.get("/new", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id,function(err, school){
    if(err || !school) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.locals.scripts.header.tinymce = true;
      res.locals.scripts.header.uploadcare = true;
      res.render("message/new", {school: school});     
    }
  });
});


//SHOW ROUTE
router.get("/:mid", middleware.isLoggedIn, function(req, res){
  School.findById(req.params.id,function(err, school){
    if(err || !school) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.findById(req.params.mid).populate("owner").exec(function(err, message){
        if(err ||!message){
          req.flash("error", "Beleid niet gevonden.");
          res.redirect("back");
        } else {
          res.render("message/show", {message: message, school: school, onOrganisationPage: false});            
        }
      });   
    }
  });
});


// //EDIT ROUTE
router.get("/:mid/edit", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id,function(err, school){
    if(err || !school) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.findById(req.params.mid, function(err, message){
        if(err || !message){
          req.flash("error", "Beleid niet gevonden.");
          res.redirect("/schools/" + school._id + "/message");
        } else {
          res.locals.scripts.header.tinymce = true;
          res.locals.scripts.header.uploadcare = true;
          res.render("message/edit", {message: message, school: school});
        }
      });
    }
  });
});


//CREATE ROUTE
router.post("/", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school){
      req.flash("error", "Probleem bij vinden van school.")
      res.redirect("back");
    } else {
      let newMessage = req.body.message;
      newMessage.message = req.sanitize(req.body.message.message);
      newMessage.organisation = school.organisation;
      newMessage.school = school._id;
      newMessage.owner = req.user._id;
      newMessage.isSchoolLevel = true;
      Message.create(newMessage, function(err, message){
        if(err || !message){
          req.flash("error", err.message);
          res.locals.error = req.flash("error");
          res.render("message/new", {school: school});
        }  else {
          req.flash("success", "Beleid toegevoegd");
          res.redirect("/schools/" + school._id + "/message"); 
        }
      }); 
    }
  });
});

// //UPDATE ROUTE
router.put("/:mid", middleware.isSchoolOwner, function(req, res){
  req.body.message.body = req.sanitize(req.body.message.body);
  Message.findByIdAndUpdate(req.params.mid, req.body.message, function(err, message){
    if(err || !message){
      req.flash("error", "Beleid niet gevonden.");
      res.redirect("/message");
    } else {
      req.flash("success", "Beleid geupdated");
      res.redirect("/schools/" + req.params.id + "/message/" + req.params.mid);
    }
  });
});

//DELETE ROUTE
router.delete("/:mid", middleware.isSchoolOwner, function(req, res){
  Message.findByIdAndRemove(req.params.mid, function(err){
    if(err){
      req.flash("error", "Er is iets misgegaan. Probeer beleid opnieuw te verwijderen.");
      res.redirect("back");
    } else {
      req.flash("success", "Beleid verwijderd");
      res.redirect("/schools/" + req.params.id + "/message");  
    }
  });
});

module.exports = router;