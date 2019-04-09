var mongoose = require("mongoose");

var statisticSchema = mongoose.Schema ( 
    {
        competenceStandardKey: String,
        competenceStandardTitle: String,
        results: [],
        isGlobalStatistic: Boolean,
        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation"
        },
        school: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "School"
      },
    }, { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model("Statistic", statisticSchema);