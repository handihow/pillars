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
   emailIsAuthenticated: Boolean,
   owner: {                                        //user type Schoolbestuur (Bestuur Admin) - badmin 
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
    },
   evaluations: [
         {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Evaluation"
         }
      ],
   geboorteDatum: Date,
   geslacht: String,
   bouw: String
}, { usePushEach: true });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);