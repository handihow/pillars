var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Test = require("./test");

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
   publicProfile: Boolean,
   owner: {                                        //user type Schoolbestuur (Bestuur Admin) - badmin 
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
    },
   organisation: {                                 
          type: mongoose.Schema.Types.ObjectId,
          ref: "Organisation"
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

UserSchema.post('remove', function(user){
   Test.find({"owner": user._id}, function(err, tests){
      tests.forEach(function(test){
        test.remove(function(err, test){
          if(err) return console.log(err);
        })
      })
   });
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);