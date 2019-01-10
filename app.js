//APP SETUP
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;
var User = require("./models/user");
var flash = require("connect-flash");
var fileUpload = require('express-fileupload');
var expressSanitizer = require("express-sanitizer");
var config = require("./config/config");

//REQUIRING ROUTES
// //ROUTES RELATED TO SCHOOLS
var schoolRoutes = require("./routes/school/schools");
var hardwareRoutes = require("./routes/school/hardware");
var softwareRoutes = require("./routes/school/software");
var competenceRoutes = require("./routes/school/competence");
var managementRoutes = require("./routes/school/management");
var pillarsRoutes = require("./routes/school/pillars");
var evaluationRoutes = require("./routes/school/evaluation");
var informationRoutes = require("./routes/school/information");
var processingActivityRoutes = require("./routes/school/processingActivity");
var securityIncidentRoutes = require("./routes/school/securityIncident");
//ROUTES RELATED TO USERS
var orgUserRoutes = require("./routes/user/org-user");
var schoolUserRoutes = require("./routes/user/school-user");
var userProfileRoutes = require("./routes/user/user-profile");
var userTestRoutes = require("./routes/user/user-test");
var userEvalRoutes = require("./routes/user/user-eval");
//ROUTES RELATED TO ORGANISATION
var standardRoutes = require("./routes/organisation/standard");
var processingActivityOrganisationRoutes = require("./routes/organisation/processingActivityOrganisation");
var securityIncidentOrganisationRoutes = require("./routes/organisation/securityIncidentOrganisation");
var messageRoutes = require("./routes/organisation/message");
var questionnaireRoutes = require("./routes/organisation/questionnaire");
var overviewRoutes = require("./routes/organisation/overview");
//ROUTES RELATED TO PILLARS ADMINISTRATION
var organisationRoutes = require("./routes/admin/organisations");
var adminRoutes = require("./routes/admin/admin");
//ROUTE TO HOME PAGE
var verifyEmailRoutes = require("./routes/user/verify-email");
var loginRoutes = require("./routes/user/login");
var registerRoutes = require("./routes/user/register");
var retrievePasswordRoutes = require("./routes/user/retrieve-password");
var indexRoutes = require("./routes/index");

//DATABASE CONNECTION
mongoose.connect(process.env.DATABASEURL);

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(fileUpload());
app.use(expressSanitizer());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//PASSPORT GOOGLE CONFIGURATION
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
  	User.findOne({username: { $regex: "^" + profile.emails[0].value + "$", $options: "i"}}, function (err, user) {
      	if(user){
          //update the user profile if the profile contains name information
          if(profile.name && profile.name.givenName && profile.name.familyName){
            user.firstName = profile.name.givenName;
            user.lastName = profile.name.familyName;
            user.emailIsAuthenticated = true;
            user.save(function(err,user){
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
      	} else {
      		return done(null, false, {message: 'Geen account met dit email adres gevonden op Pillars. Neem contact op met de Pillars admin van jouw organisatie of school.'});
      	}
    });
  }
));
//PASSPORT OFFICE 365 CONFIGURATION
passport.use(new AzureAdOAuth2Strategy({
    clientID: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    callbackURL: process.env.AZURE_CALLBACK_URL
  },
  function(accessToken, refresh_token, params, profile, done) {
  	var profile = {};
    try {
        var tokenBase64 = accessToken.split('.')[1];
        var tokenBinary = new Buffer(tokenBase64, 'base64');
        var tokenAscii = tokenBinary.toString('ascii');
        var tokenObj = JSON.parse(tokenAscii);             
        profile.id = tokenObj.upn;
        profile.email = tokenObj.upn; //upn is the email on AD
        profile.givenName = tokenObj.given_name;
        profile.familyName = tokenObj.family_name;
        User.findOne({username: { $regex: "^" + profile.email + "$", $options: "i"}}, function (err, user) {
	      	if(user){
            //update the profile if this contains name information
            if(profile.givenName && profile.familyName){
              user.firstName = profile.givenName;
              user.lastName = profile.familyName;
              user.emailIsAuthenticated = true;
              user.save(function(err,user){
                return done(err, user);
              });
            } else {
              return done(err, user);
            }
	      	} else {
	      		return done(null, false, {message: 'Geen account met dit email adres gevonden op Pillars. Neem contact op met de Pillars admin van jouw organisatie of school.'});
	      	}
	    });
    } catch (ex) {
        return done(null, false, {message: "Unable to parse oauth2 token from WAAD."});
    }
  }
));

//DECLARE GLOBAL VARIABLES
app.use(function(req, res, next){
   res.locals.currentUser = req.user || null;
   res.locals.scripts = config.scripts;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.url = req.url;
   next();
});

//USE ROUTES
//ROUTES RELATED TO SCHOOLS
app.use("/schools", schoolRoutes);
app.use("/schools/:id/hardware", hardwareRoutes);
app.use("/schools/:id/software", softwareRoutes);
app.use("/schools/:id/competence", competenceRoutes);
app.use("/schools/:id/management", managementRoutes);
app.use("/schools/:id/pillars", pillarsRoutes);
app.use("/schools/:id/evaluation", evaluationRoutes);
app.use("/schools/:id/information", informationRoutes);
app.use("/schools/:id/processingActivity", processingActivityRoutes);
app.use("/schools/:id/securityIncident", securityIncidentRoutes);
//ROUTES RELATED TO USERS
app.use("/schools/:id/user", schoolUserRoutes);
app.use("/user/:id/test", userTestRoutes);
app.use("/user/:id/evaluation", userEvalRoutes);
app.use("/user/:id", userProfileRoutes);
app.use("/org-user", orgUserRoutes);
//ROUTES RELATED TO ORGANISATION
app.use("/standard", standardRoutes);
app.use("/processingActivity", processingActivityOrganisationRoutes);
app.use("/securityIncident", securityIncidentOrganisationRoutes);
app.use("/overview", overviewRoutes);
app.use("/questionnaire", questionnaireRoutes);
app.use("/message", messageRoutes);
//ROUTES RELATED TO PILLARS ADMIN
app.use("/organisations", organisationRoutes);
app.use("/admin", adminRoutes);
//HOME PAGES
app.use("/verify", verifyEmailRoutes);
app.use("/", loginRoutes);
app.use("/", registerRoutes);
app.use("/", retrievePasswordRoutes);
app.use(indexRoutes);

//LISTEN ON PORT
app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("The Scholen Server has started!"); 
});