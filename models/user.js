var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var SurveyResult = require('./surveyResult');

var UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: String,
  role: {type: String, default: 'suser'},
  isTeacher: {type: Boolean, default: true},
  supportRole: [{role: String, hours: Number}],
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  imageUrl: String,
  job: {type: String, default: '-'},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  emailAuthenticationToken: String,
  emailIsAuthenticated: Boolean,
  publicProfile: {type: Boolean, default: true},
  toBeRemoved: Boolean,
  hasCompleteProfile: Boolean,
  numberOfSurveyResults: {type: Number, default: 0},
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation"
  },
  school: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "School"
  }],
  classroom: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom"
  }], 
  tests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test"
  }],
  evaluations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evaluation"
  }],
  dateOfBirth: Date,
  gender: {type: String, default: '-'},
  gradeLevelGroup: {type: [String], default: ['-']},
  technologyAdoption: String,
  hardwareAdoption: String,
  softwarePreference: String,
  hardwarePreference: String,
  twoFactorTempSecret: String,
  twoFactorSecret: String,
  twoFactorEnabled: {type: Boolean, default: false}
}, { usePushEach: true, timestamps: true });

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
 SurveyResult.find({"user": user._id}, function(err, surveyResults){
  surveyResults.forEach(function(surveyResult){
      surveyResult.remove(function(err, surveyResult){
        if(err) return console.log(err);
      })
    })
  });
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);