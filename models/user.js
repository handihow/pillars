var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   role: String,
   firstName: String,
   lastName: String,
   org: String,
   job: String,
   resetPasswordToken: String,
   resetPasswordExpires: Date,
   emailAuthenticationToken: String,
   emailIsAuthenticated: Boolean
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);