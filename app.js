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
//var seedDB = require("./seed");

//requiring routes
var hardwareRoutes = require("./routes/hardware");
var softwareRoutes = require("./routes/software");
var scholenRoutes = require("./routes/scholen");
var deskundigheidRoutes = require("./routes/deskundigheid");
var indexRoutes = require("./routes/index");

//mongoose.connect("mongodb://localhost/scholen_app", {useMongoClient: true});
mongoose.connect("mongodb://rverbakel:!ose3054@ds123695.mlab.com:23695/pillars", {useMongoClient: true});

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
app.use("/scholen/:id/hardware", hardwareRoutes);
app.use("/scholen/:id/software", softwareRoutes);
app.use("/scholen", scholenRoutes);
app.use("/scholen/deskundigheid", deskundigheidRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Scholen Server has started!"); 
});