var mongoose = require("mongoose");

var temporarySurveyResultSchema = mongoose.Schema ( 
    {
        currentPageNo: {type: Number, required: true},
        data: {type: {}, required: true},
        user: {                                 
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
        },
        survey: {                                 
              type: mongoose.Schema.Types.ObjectId,
              ref: "Survey"
          },
        
    }, { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model("TemporarySurveyResult", temporarySurveyResultSchema);