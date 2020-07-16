var mongoose = require("mongoose");

var surveySchema = mongoose.Schema ( 
    {
        name: {type: String, required: true},
        survey: {},
        organisation: {                                 
              type: mongoose.Schema.Types.ObjectId,
              ref: "Organisation"
          },
        school: {                                 
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        owner: {                                 
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
        },
        isValidForAllOrganisation: Boolean,
        isPublic: {type: Boolean, default: false},
        isCompetenceSurvey: {type: Boolean, default: false},
        isSoftwareSurvey: {type: Boolean, default: false},
        competenceStandardKey: String,
        softwareStandardKey: String,
        competenceStandardTitle: String,
        softwareStandardTitle: String,
        isActiveCompetenceSurvey: {type: Boolean, default: false},
        isActiveSoftwareSurvey: {type: Boolean, default: false},
        minimumLevel: {type: Number, default: 50},
        highLevel: {type: Number, default: 75},
        surveyOption: String,
        results: [],
        chartElementVisibility: [],
    }, { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model("Survey", surveySchema);