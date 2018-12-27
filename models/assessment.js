var mongoose = require("mongoose");

var assessmentSchema=  mongoose.Schema({
    title: {type: String, required: true},
    report: String,
    plan: String,
    //Count
    countStudents: Number,
    countClassrooms: Number,
    //Hardware
    hasGoodWiredNetwork: {type: Boolean, default: false},
    hasGoodWirelessNetwork: {type: Boolean, default: false},
    //Competence
    competenceRatingTeachers: Number,
    isNecessaryTeacherSupport: Boolean,
    effectivenessRatingSoftware: Number,
    //Management
    hasReachedManagementAgreement: Boolean,
    hasGoodNetworkSupport: Boolean,
    hasGoodNetworkProblemSolving: Boolean,
    hasGoodIncidentReporting: Boolean,
    //Generic
    created: {type: Date, default: Date.now},
    school: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "School"
      },
    isActual: Boolean
} , { usePushEach: true });

module.exports = mongoose.model("Assessment", assessmentSchema);