var express = require("express");
var router = express.Router();
var Message = require("../models/message");
var School = require("../models/school");
var middleware = require("../middleware");

//INDEX ROUTE FOR BESTUUR
router.get("/message", middleware.isLoggedIn, function(req, res){
    Message.find({owner: req.user._id}).populate("owner").exec(function(err, messages){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("message/index", {messages: messages});         
        }
    });
});

//INDEX ROUTE FOR SCHOOL
router.get("/scholen/:id/messages", middleware.isSchoolOwner, function(req, res){
  School.findById(req.params.id, function(err, school){
    if(err || !school){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Message.find({owner: school.owner}).exec(function(err, messages){
        if(err){
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("message/school", {school: school, messages: messages});
        }
      });
    }
  });
    
});

//NEW ROUTE
router.get("/message/new", middleware.isAuthenticatedBadmin, function(req, res){
  res.render("message/new"); 
});


//SHOW ROUTE
router.get("/message/:id", middleware.isLoggedIn, function(req, res){
  Message.findById(req.params.id, function(err, message){
      if(err ||!message){
          req.flash("error", "Bericht niet gevonden.");
          res.redirect("back");
      } else {
          res.render("message/show", {message: message});            
      }
  });
});

//PROTECT THE DEMO ACCOUNT
router.use(function(req, res, next){
  if(req.user && req.user.username==="demo@pillars.school"){
    req.flash("error", "Je kunt geen records aanmaken of wijzigen met het demo account.");
    return res.redirect("back");
  }
  next();
})

//CREATE ROUTE
router.post("/message", middleware.isAuthenticatedBadmin, function(req, res){
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
    

// //EDIT ROUTE
router.get("/message/:id/edit", middleware.isMessageOwner, function(req, res){
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
router.put("/message/:id", middleware.isMessageOwner, function(req, res){
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
router.delete("/message/:id", middleware.isMessageOwner, function(req, res){
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