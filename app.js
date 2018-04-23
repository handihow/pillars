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
var fileUpload = require('express-fileupload');
var expressSanitizer = require("express-sanitizer");

//REQUIRING ROUTES
var hardwareRoutes = require("./routes/hardware");
var softwareRoutes = require("./routes/software");
var scholenRoutes = require("./routes/scholen");
var deskundigheidRoutes = require("./routes/deskundigheid");
var organisatieRoutes = require("./routes/organisatie");
var userRoutes = require("./routes/user");
var testRoutes = require("./routes/test");
var profielRoutes = require("./routes/profiel");
var normeringRoutes = require("./routes/normering");
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
app.use(bodyParser.urlencoded({extended: true}));
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
app.use("/user/:id/evaluation", user_evalRoutes);
app.use("/user/:id/test", testRoutes);
app.use(messageRoutes);
app.use("/scholen", scholenRoutes);
app.use("/normering", normeringRoutes);
app.use("/overview", overviewRoutes);
app.use("/profiel", profielRoutes);
app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("The Scholen Server has started!"); 
});