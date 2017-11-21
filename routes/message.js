var express = require("express");
var router = express.Router();
var Message = require("../models/message");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    Message.find({owner: req.user._id}).populate("owner").exec(function(err, messages){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("message/index", {messages: messages});         
        }
    });
});

//NEW ROUTE
router.get("/new", middleware.isAuthenticatedBadmin, function(req, res){
  res.render("message/new"); 
});

//CREATE ROUTE
router.post("/", middleware.isAuthenticatedBadmin, function(req, res){
    req.body.message.body = req.sanitize(req.body.message.body);
    Message.create(req.body.message, function(err, message){
          if(err || !message){
              req.flash("error", err.message);
              res.locals.error = req.flash("error");
              res.render("message/new");
          }  else {
              //look up user id and username and add to message
              message.owner = req.user._id;
              message.save();
              req.flash("success", "Bericht toegevoegd");
              res.redirect("/message");
          }
    }); 
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
router.get("/:id/edit", middleware.isMessageOwner, function(req, res){
    Message.findById(req.params.id, function(err, message){
      if(err || !message){
          req.flash("error", "Bericht niet gevonden.");
          res.redirect("/message");
      } else {
          res.render("message/edit", {message: message});
      }
  });
});

// //UPDATE ROUTE
router.put("/:id", middleware.isMessageOwner, function(req, res){
    req.body.message.body = req.sanitize(req.body.message.body);
    Message.findByIdAndUpdate(req.params.id, req.body.message, function(err, message){
      if(err || !message){
          req.flash("error", "Bericht niet gevonden.");
          res.redirect("/message");
      } else {
          req.flash("success", "Bericht updated");
          res.redirect("/message/" + req.params.id);
      }
    });
});

//DELETE ROUTE
router.delete("/:id", middleware.isMessageOwner, function(req, res){
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