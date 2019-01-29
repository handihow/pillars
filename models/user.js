var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Test = require("./test");

var UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: String,
  role: String,
  supportRole: [{role: String, hours: Number}],
  firstName: String,
  lastName: String,
  job: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  emailAuthenticationToken: String,
  emailIsAuthenticated: Boolean,
  publicProfile: Boolean,
  toBeRemoved: Boolean,
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation"
  },
  school: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "School"
  }], 
  evaluations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evaluation"
  }],
  dateOfBirth: Date,
  gender: String,
  gradeLevelGroup: String
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