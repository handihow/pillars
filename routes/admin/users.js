var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var middleware = require("../../middleware");
var User = require("../../models/user");
var Organisation = require("../../models/organisation");
var csv = require("fast-csv");

//get list of users
router.get("/", middleware.isPadmin, function(req,res){
  User.find({}, null, {sort: {organisation: 1, username: 1}}).populate("organisation").populate("school").exec(function(err,users){
    if(err){
      req.flash("error", err.message);
      return res.redirect("back");
    }
    res.locals.scripts.header.datatables = true;
    res.locals.scripts.footer.datatables = true;
    res.render("admin/users/index", {users: users});
  });
});

router.get("/new", middleware.isPadmin, function(req,res){
  res.render("admin/users/bulk-upload-form-step-1");
})

router.post("/bulk-import-step-1", middleware.isPadmin, function(req,res){
  //BULK NEW - accepts file and renders the form to create new users in list
  let delimiter = req.body.separation;
  if (!req.files) {
    req.flash("error", "Geen file geupload");
    return res.redirect("back");
  } else {
    Organisation.find({}, null, {sort: {name: 1}}).exec(function(err, organisations){
      if(err){return res.redirect("back")}
      School.find({}, null, {sort: {name: 1}}).exec(function(err, schools){
        if(err){return res.redirect("back")}
        var userFile = req.files.file;
        var users = [];
        csv
        .fromString(userFile.data.toString(), {
          headers: true,
          ignoreEmpty: true,
          delimiter: delimiter
        })
        .on("data", function(data){
          users.push(data);
        })
        .on("end", function(){
          res.render("admin/users/bulk-upload-form-step-2", {users: users, organisations: organisations, schools: schools});
        });
      });
    });
  }
});

router.post("/bulk-import-step-2", middleware.isPadmin, function(req,res){
  let organisationId = req.body.organisation;
  let schoolId = req.body.school;
  if(!organisationId || !schoolId){
    req.flash("error", "Geen bestuur ID of school ID gevonden");
    return res.redirect("/admin/users/new");
  }
  School.findById(schoolId, async function(err, school){
    if(err || !school){
      req.flash("error", "School niet gevonden");
      return res.redirect("/admin/users/new");
    }
    let users = req.body.users;
    for(i=0; i<users.length; i++){
        //create new school user in DB
        var hasError = await registerBulkUser(users[i].username, school, users[i].role, null, users[i].firstName, users[i].lastName);
        if(hasError){
          req.flash("error", "Fout bij bewaren van medewerkers.");
          return res.redirect("/admin/users/new");
        }
        if(i==users.length-1){
          req.flash("success", "Nieuwe medewerkers geregistreerd! Er is geen email verstuurd naar deze medewerkers.");
          res.redirect("/admin/users");
        }
    }
  })
});

function registerBulkUser(username, school, role, password, firstName, lastName){
  return new Promise(resolve => {
      var newUser = new User({username: username, role: role ? role : 'suser', firstName: firstName ? firstName : null, lastName: lastName ? lastName : null});
      var generatedPassword = Math.random().toString(36).substr(2, 8);
      User.register(newUser, password ? password : generatedPassword, function(err, user){
        if(err){
          return resolve(true);
        }
        user.school = school._id;
        user.organisation = school.organisation;
        user.save();
        //add user to school users
        school.users.push(user);
        school.save(function(_){
          resolve(false);
        });
      });  
  });
}

module.exports = router;