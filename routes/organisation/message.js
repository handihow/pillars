var express = require("express");
var router = express.Router({mergeParams: true});
var Message = require("../../models/message");
var School = require("../../models/school");
var Organisation = require("../../models/organisation");
var User = require("../../models/user");
var middleware = require("../../middleware");

//INDEX ROUTE FOR MESSAGES
router.get("/", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id,function(err, organisation){
    if(err || !organisation) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.find(
        {organisation: organisation._id, school: {$exists: false}},
        null,
        {sort: {title: 1}}
      ).populate("owner").exec(function(err, messages){
        if(err) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("message/index", {messages: messages, organisation: organisation, canAdd: true});         
        }
      });        
    }
  });
});

//INDEX ROUTE FOR SCHOOL MESSAGES
router.get("/schools", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id,function(err, organisation){
    if(err || !organisation) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.find(
        {organisation: organisation._id, school: {$exists: true}},
        null,
        {sort: {school: 1, title: 1}}
      ).populate("owner").populate("school").exec(function(err, messages){
        if(err) {
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("message/index", {messages: messages, organisation: organisation, canAdd: false});         
        }
      });        
    }
  });
});

//NEW ROUTE
router.get("/new", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id,function(err, organisation){
    if(err || !organisation) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.locals.scripts.header.tinymce = true;
      res.locals.scripts.header.uploadcare = true;
      res.render("message/new", {organisation: organisation});     
    }
  });
});


//SHOW ROUTE
router.get("/:mid", middleware.isLoggedIn, function(req, res){
  Organisation.findById(req.params.id,function(err, organisation){
    if(err || !organisation) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.findById(req.params.mid).populate("owner").exec(function(err, message){
        if(err ||!message){
          req.flash("error", "Beleid niet gevonden.");
          res.redirect("back");
        } else {
          res.render("message/show", {message: message, organisation: organisation, onOrganisationPage: true});            
        }
      });   
    }
  });
});


// //EDIT ROUTE
router.get("/:mid/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id,function(err, organisation){
    if(err || !organisation) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.findById(req.params.mid, function(err, message){
        if(err || !message){
          req.flash("error", "Beleid niet gevonden.");
          res.redirect("/organisations/" + organisation._id + "/message");
        } else {
          res.locals.scripts.header.tinymce = true;
          res.locals.scripts.header.uploadcare = true;
          res.render("message/edit", {message: message, organisation: organisation});
        }
      });
    }
  });
});

// //SHOW ROUTE SCHOOLS
// router.get("/:mid/:sid", middleware.isLoggedIn, function(req, res){
//   School.findById(req.params.sid,function(err, school){
//     if(err || !school) {
//       req.flash("error", err.message);
//       res.redirect("back");
//     } else {
//       Message.findById(req.params.mid).populate("owner").exec(function(err, message){
//         if(err ||!message){
//           req.flash("error", "Beleid niet gevonden.");
//           res.redirect("back");
//         } else {
//           res.render("message/show", {message: message, school: school, onOrganisationPage: false});            
//         }
//       });   
//     }
//   });
// });

//CREATE ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id, function(err, organisation){
    if(err || !organisation){
      req.flash("error", "Probleem bij vinden van bestuur.")
      res.redirect("back");
    }
    req.body.message.body = req.sanitize(req.body.message.body);
    Message.create(req.body.message, function(err, message){
      if(err || !message){
        req.flash("error", err.message);
        res.locals.error = req.flash("error");
        res.render("message/new", {organisation: organisation});
      }  else {
        //look up user id and username and add to message
        message.owner = req.user._id;
        message.organisation = organisation._id;
        message.save();
        req.flash("success", "Beleid toegevoegd");
        res.redirect("/organisations/" + organisation._id + "/message"); 
      }
    }); 
  });
});

// //UPDATE ROUTE
router.put("/:mid", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  req.body.message.body = req.sanitize(req.body.message.body);
  Message.findByIdAndUpdate(req.params.mid, req.body.message, function(err, message){
    if(err || !message){
      req.flash("error", "Beleid niet gevonden.");
      res.redirect("/message");
    } else {
      req.flash("success", "Beleid geupdated");
      res.redirect("/organisations/" + req.params.id + "/message/" + req.params.mid);
    }
  });
});

//DELETE ROUTE
router.delete("/:mid", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Message.findByIdAndRemove(req.params.mid, function(err){
    if(err){
      req.flash("error", "Er is iets misgegaan. Probeer beleid opnieuw te verwijderen.");
      res.redirect("back");
    } else {
      req.flash("success", "Beleid verwijderd");
      res.redirect("/organisations/" + req.params.id + "/message");  
    }
  });
});

module.exports = router;