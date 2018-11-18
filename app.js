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

//REQUIRING ROUTES
var hardwareRoutes = require("./routes/hardware");
var softwareRoutes = require("./routes/software");
var scholenRoutes = require("./routes/scholen");
var organisationRoutes = require("./routes/organisations");
var deskundigheidRoutes = require("./routes/deskundigheid");
var organisatieRoutes = require("./routes/organisatie");
var userRoutes = require("./routes/user");
var testRoutes = require("./routes/test");
var profielRoutes = require("./routes/profiel");
var normeringRoutes = require("./routes/normering");
var processingActivityRoutes = require("./routes/processingActivity");
var processingActivityOrganisationRoutes = require("./routes/processingActivityOrganisation");
var pillarsRoutes = require("./routes/pillars");
var indexRoutes = require("./routes/index");
var messageRoutes = require("./routes/message");
var overviewRoutes = require("./routes/overview");
var evaluationRoutes = require("./routes/evaluation");
var user_evalRoutes = require("./routes/user_eval");
var adminRoutes = require("./routes/admin");

mongoose.connect(process.env.DATABASEURL); //DATABASEURL=mongodb://localhost/scholen_app

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
    secret: "CJ is the cutest dog of the universe",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
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
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.url = req.url;
   next();
});

//USE ROUTES
app.use("/scholen/:id/hardware", hardwareRoutes);
app.use("/scholen/:id/software", softwareRoutes);
app.use("/scholen/:id/evaluation", evaluationRoutes);
app.use("/scholen/:id/deskundigheid", deskundigheidRoutes);
app.use("/scholen/:id/organisatie", organisatieRoutes);
app.use("/scholen/:id/pillars", pillarsRoutes);
app.use("/scholen/:id/processingActivity", processingActivityRoutes);
app.use("/user/:id/evaluation", user_evalRoutes);
app.use("/user/:id/test", testRoutes);
app.use("/scholen", scholenRoutes);
app.use("/organisations", organisationRoutes);
app.use("/normering", normeringRoutes);
app.use("/processingActivity", processingActivityOrganisationRoutes);
app.use("/overview", overviewRoutes);
app.use("/profiel", profielRoutes);
app.use("/admin", adminRoutes);
app.use("/message", messageRoutes);
app.use(indexRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("The Scholen Server has started!"); 
});