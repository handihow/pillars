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

UserSchema.pre('save', function(next) {
  var username =this.username;
  if(username.indexOf(' ') == -1){
    next();  
  } else {
    var err = new Error('ERROR: Spatie(s) aanwezig in het email adres.');
    next(err);
  }
  
});

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