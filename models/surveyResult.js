var mongoose = require("mongoose");

var surveyResultSchema = mongoose.Schema ( 
    {
        survey: {                                 
              type: mongoose.Schema.Types.ObjectId,
              ref: "Survey"
          },
        result: {type: {}, required: true},
        user: {                                 
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
          },
    }, { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model("SurveyResult", surveyResultSchema);