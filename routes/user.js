var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var User = require("../models/user");
var middleware = require("../middleware");
var global = require("../models/global");
var Test = require("../models/test");
var crypto = require("crypto");

var mailjet = require ('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

//INDEX - list of users of the school
router.get("/scholen/:id/user/", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id).populate("users").exec(function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("back");
        } else {
            res.render("user/index", {school: school});        
        }
    });
});

//NEW - form to create new school user
router.get("/scholen/:id/user/new", middleware.isSchoolOwner, function(req, res){
    School.findById(req.params.id, function(err, school){
        if(err || !school) {
            req.flash("error", "School niet gevonden");
            res.redirect("/scholen");
        } else {
            res.render("user/new", {school: school});        
        }
    });
});

//CREATE - creates new school user in the database and links it to school
router.post("/scholen/:id/user/", middleware.isSchoolOwner, function(req, res){
    //lookup school by ID
    School.findById(req.params.id, function(err, school){
    if(err || !school){
        req.flash("error", "School niet gevonden");
        res.redirect("back");
    } else {
        //create new school user in DB      
        var newUser = new User({username: req.body.username, role: req.body.role, firstName: req.body.firstName, lastName: req.body.lastName});
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                  req.flash("error", err.message);
                  return res.redirect("back");
            }
            //add user to school users
            school.users.push(user);
            school.isToegevoegdMedewerker = true;
            school.save();
            //send email notification to user
            var htmlMessage = 
                '<h2>Welkom bij Pillars</h2>'+
                '<p>De directie van jouw school heeft je uitgenodigd om deel te nemen aan Pillars.</p>' +
                '<p>Je kunt inloggen op de <a href="https://pillars.school">Pillars website</a> met:' + 
                '<p>Gebruikersnaam: </p>' + 
                user.username +
                '<p>Wachtwoord</p>' + 
                req.body.password +
                '<p>Pillars helpt jouw school met het complexe vraagstuk rondom ICT en onderwijs. ' +
                'Jouw school profiteert graag optimaal van ICT middelen die zijn aangeschaft. ' +
                'Met Pillars steek je de peilstok in je hardware, software, deskundigheid en jouw ICT organisatie. ' +
                ' Dit zijn de pilaren waarmee de effectiviteit van jouw ICT middelen zichtbaar worden.</p>' +
                '<p>We vragen je om in te loggen op de web applicatie. ' +
                'Deze is te bereiken door de volgende link aan te klikken:</p>' +
                '<a href="https://app.pillars.school/login">Inloggen bij Pillars</a>' +
                '<h3>Deskundigheid van medewerkers</h3>' +
                '<p>'+
                    'Een zeer belangrijke pijler van ICT is de deskundigheid van medewerkers op de school. ' +
                    'Pillars brengt dit in kaart door medewerkers korte zelfbeoordelingen te laten uitvoeren op vier deelgebieden:' +
                '</p>' +
                '<ul>' +
                    '<li>ICT geletterdheid</li>' +
                    '<li>Pedagogisch Didactisch Handelen</li>' +
                    '<li>Werken in de schoolcontext</li>' +
                    '<li>Persoonlijke ontwikkeling</li>' +
                '</ul>' +
                '<p>' +
                    'Als je een inlog hebt gekregen als school medewerker, dan kom je direct op de Pillars profielpagina. ' +
                    'Heeft de directie je aangemeld als Pillars administrator, dan kom je op de Pillars pagina van jouw school. ' +
                    'Je kunt vervolgens naar je profielpagina gaan aan de rechterkant van het menu.' +
                '</p>' +
                '<p>' +
                    'Op deze profielpagina kun je alle 4 zelfbeoordelingen doen. ' +
                    'De beoordelingen bestaan uit ongeveer 20 ja/nee vragen en je kunt iedere beoordeling in ongeveer 15 minuten voltooien. ' +
                    'Probeer jezelf zo eerlijk mogelijk te beoordelen.' +
                '</p>' +
                '<h3>Wat wordt er vervolgens met de gegevens gedaan?</h3>' +
                '<p>Prima vraag! Deskundigheid is 1 van de 4 onderdelen die gemeten worden op jouw school met behulp van Pillars. ' + 
                    'Voor ieder onderdeel kan de school in totaal 5 punten scoren. ' + 
                    'Wil je meer weten over Pillars in het algemeen, ga dan naar:' +
                '</p>' +
                '<a href="http://pillars.school/introductie-pillars/">YouTube introductiefilmje</a>' +
                '<p></p>' +
                '<a href="https://pillars.school/informatie-over-pillars/">Informatie op website</a>' +
                '<p>' +
                    'Alle testresultaten van de 4 onderdelen op het gebied ICT deskundigheid, worden verzameld en er worden gemiddelde scores berekend. ' +
                    'Aan de hand van de gemiddelde score, berekent Pillars het aantal punten dat gescoord wordt op het gebied Deskundigheid. ' +
                '</p> ' +
                '<p>We wensen je veel succes met het gebruik van Pillars.</p>'
                ; 
            var request = mailjet
                  .post("send", {'version': 'v3.1'})
                  .request({
                    "Messages":[
                        {
                            "From": {
                                "Email": "notifications@pillars.school",
                                "Name": "Pillars"
                            },
                            "To": [
                                {
                                    "Email": user.username,
                                    "Name": user.firstName + " " + user.lastName
                                }
                            ],
                            "Cc": [
                                {
                                    "Email": req.user.username,
                                    "Name": "School administrator"
                                }
                            ],
                            "Subject": "Welkom bij Pillars",
                            "HTMLPart": htmlMessage,
                        }
                    ]
                  });
                request
                  .then((result) => {
                    req.flash("success", "Nieuwe medewerker geregistreerd! Er is een email verstuurd met inlog gegevens en verdere instructies.");
                    res.redirect("/scholen/" + school._id + "/user");
                  })
                  .catch((err) => {
                    req.flash("error", err.statusCode);
                    res.redirect("back");
                  });
            });
        }
    });
});

//SHOW ROUTE - PROFILE PAGE
router.get("/user/:id", middleware.isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
      if(err || !user){
          req.flash("error", err);
          res.redirect("back");
      } else {
            Test.find({"owner": user._id}, function(err, tests){
                if(err) {
                    req.flash("error", err);
                } else {
                    res.render("user/show", {user: user, global: global, tests: tests});        
                }
            });
      }
    });
});

//EDIT ROUTE - EDIT PROFILE PAGE
router.get("/user/:id/edit", middleware.isUser, function(req,res){
    User.findById(req.params.id, function(err, user){
        if(err || !user){
            req.flash("error", "Geen gebruiker gevonden of onbekende fout");
            res.redirect("back");
        } else {
            res.render("user/edit", {user: user});
        }
    });
});

//UPDATE route to store edited user to database
router.put("/user/:id", middleware.isUser, function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, user){
        if(err || !user) {
            req.flash('error', "Geen gebruiker gevonden");
            res.redirect("/scholen/profiel/user/"+req.params.username);
        }  else {
            req.flash("success", "Profiel updated");
            res.redirect("/user/"+user._id);
        }
    });
});

//VERIFY USER EMAIL ACCOUNT
router.get("/user/:id/verify", middleware.isLoggedIn, function(req, res){
   User.findById(req.params.id, function(err, user){
       if(err || !user){
           req.flash('error', "Geen gebruiker gevonden");
           res.redirect("/scholen/profiel/user/"+req.params.username);
       } else {
           crypto.randomBytes(20, function(err, buf) {
            if(err){
              req.flash("error", err.message);
            } else {
              var token = buf.toString('hex');
              user.emailAuthenticationToken = token;
              user.save();
              
              var htmlMessage = 
              '<h3>Email verificatie Pillars</h3>' +
              '<p>Beste ' +
              user.firstName + ' ' + user.lastName + ', </p>' +
              '<p>Click aub op de onderstaande link om jouw email adres te verifieren:</p>' +
              'https://app.pillars.school/verify/' + token +
              '<p>We wensen je veel plezier met het gebruik van Pillars</p>'
              ;
              
              var request = mailjet
                  .post("send", {'version': 'v3.1'})
                  .request({
                    "Messages":[
                        {
                            "From": {
                                "Email": "notifications@pillars.school",
                                "Name": "Pillars"
                            },
                            "To": [
                                {
                                    "Email": user.username,
                                    "Name": user.firstName + " " + user.lastName
                                }
                            ],
                            "Subject": "Email verificatie",
                            "HTMLPart": htmlMessage,
                        }
                    ]
                  });
                request
                  .then((result) => {
                    req.flash("success", "Email met verificatie link gestuurd!");
                    res.redirect("back");
                  })
                  .catch((err) => {
                    req.flash("error", err.statusCode);
                    res.redirect("back");
                  });
            }
        });
       }
   }); 
});

//DESTROY route to delete user from database
router.delete("/scholen/:id/user/:user_id", middleware.isSchoolOwner, function(req, res){
    User.findByIdAndRemove(req.params.user_id, function(err){
        if(err) {
            req.flash('error', err.message);
            res.redirect("/scholen");
        }  else {
            req.flash("success", "School medewerker verwijderd");
            res.redirect("/scholen/" + req.params.id + "/user");
        }
    });
});

module.exports = router;