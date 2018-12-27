var express = require("express");
var router = express.Router();
var Message = require("../../models/message");
var School = require("../../models/school");
var User = require("../../models/user");
var middleware = require("../../middleware");

//INDEX ROUTE FOR MESSAGES
router.get("/", middleware.isLoggedIn, function(req, res){
    Message.find({organisation: req.user.organisation}).populate("owner").exec(function(err, messages){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("message/index", {messages: messages});         
        }
    });
});

//NEW ROUTE
router.get("/new", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  res.locals.scripts.header.tinymce = true;
  res.render("message/new"); 
});


//SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
  Message.findById(req.params.id, function(err, message){
      if(err ||!message){
          req.flash("error", "Bericht niet gevonden.");
          res.redirect("back");
      } else {
          res.render("message/show", {message: message});            
      }
  });
});

// //EDIT ROUTE
router.get("/:id/edit", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    Message.findById(req.params.id, function(err, message){
      if(err || !message){
          req.flash("error", "Bericht niet gevonden.");
          res.redirect("/message");
      } else {
          res.locals.scripts.header.tinymce = true;
          res.render("message/edit", {message: message});
      }
  });
});

//CREATE ROUTE
router.post("/", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err || !user){
        req.flash("error", "Probleem bij vinden van gebruikersgegevens.")
        res.redirect("back");
      }
      req.body.message.body = req.sanitize(req.body.message.body);
      Message.create(req.body.message, function(err, message){
            if(err || !message){
                req.flash("error", err.message);
                res.locals.error = req.flash("error");
                res.render("message/new");
            }  else {
              //look up user id and username and add to message
              message.owner = req.user._id;
              message.organisation = user.organisation;
              message.save();
              res.locals.scripts.header.tinymce = false;
              req.flash("success", "Bericht toegevoegd");
              res.redirect("/message"); 
            }
      }); 
    });
});
    

// //UPDATE ROUTE
router.put("/:id", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
    req.body.message.body = req.sanitize(req.body.message.body);
    Message.findByIdAndUpdate(req.params.id, req.body.message, function(err, message){
      if(err || !message){
          req.flash("error", "Bericht niet gevonden.");
          res.redirect("/message");
      } else {
          res.locals.scripts.header.tinymce = false;
          req.flash("success", "Bericht updated");
          res.redirect("/message/" + req.params.id);
      }
    });
});

//DELETE ROUTE
router.delete("/:id", middleware.isNotDemoAccount, middleware.isAuthenticatedBadmin, function(req, res){
  Message.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Er is iets misgegaan. Probeer bericht opnieuw te verwijderen.");
          res.redirect("/message");
      } else {
          req.flash("success", "Bericht verwijderd");
          res.redirect("/message");  
      }
  });
});

module.exports = router;