var mongoose = require("mongoose");
var config = require("../config/config");

var questionnaireSchema = mongoose.Schema ( 
    {
        name: {type: String, required: true},
        questionnaire: {type: {}, default: config.competence.questionnaire.standard},
        created: {type: Date, default: Date.now},
        organisation: {                                 
              type: mongoose.Schema.Types.ObjectId,
              ref: "Organisation"
          },
        isActual: Boolean,
        isMultipleChoice: Boolean
    }, { usePushEach: true }
);

module.exports = mongoose.model("Questionnaire", questionnaireSchema);