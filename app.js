//APP SETUP
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var flash = require("connect-flash");

//INSTALL GMAIL FOR SENDING NOTIFICATION EMAILS
var gmailNode = require("gmail-node");
var clientSecret = {
    installed: {
        client_id: "724380779792-4rncpqe1j354m4lncgcpe47cbk7ctp9f.apps.googleusercontent.com",
        project_id: "elevated-hall-183908",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://accounts.google.com/o/oauth2/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "kvZSRLp6It1rR6NlVHzGWwZM",
        redirect_uris: [
            "urn:ietf:wg:oauth:2.0:oob",
            "http://localhost"
        ]
    }
};
gmailNode.init(clientSecret, './token.json', function(err,data){
    if(err) { console.log(err)}
});

//REQUIRING ROUTES
var hardwareRoutes = require("./routes/hardware");
var softwareRoutes = require("./routes/software");
var scholenRoutes = require("./routes/scholen");
var deskundigheidRoutes = require("./routes/deskundigheid");
var organisatieRoutes = require("./routes/organisatie");
var userRoutes = require("./routes/user");
var testRoutes = require("./routes/test");
var normeringRoutes = require("./routes/normering");
var indexRoutes = require("./routes/index");

mongoose.connect(process.env.DATABASEURL, {useMongoClient: true}); //DATABASEURL=mongodb://localhost/scholen_app

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

//SETUP THE APP WITH SOME DATA
//seedDB();

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
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.url = req.url;
   next();
});

//USE ROUTES
app.use("/scholen", scholenRoutes);
app.use("/scholen/:id/hardware", hardwareRoutes);
app.use("/scholen/:id/software", softwareRoutes);
app.use(userRoutes);
app.use("/user/:id/test", testRoutes);
app.use("/scholen/:id/deskundigheid", deskundigheidRoutes);
app.use("/scholen/:id/organisatie", organisatieRoutes);
app.use("/normering", normeringRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Scholen Server has started!"); 
});