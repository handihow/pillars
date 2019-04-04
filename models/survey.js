var mongoose = require("mongoose");

var surveySchema = mongoose.Schema ( 
    {
        name: {type: String, required: true},
        surveyId: {type: String, required: true},
        survey: {type: {}, required: true},
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
        results: [],
    }, { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model("Survey", surveySchema);