var mongoose = require("mongoose");

var softwareSchema = mongoose.Schema ( 
    {
        subject: String,
        name: {type: String, required: true},
        functionalities: [String],
        gradeLevels: [String],
        ratings: [ String ],
        effectiveness: Number,
        licences: Number,
        supplier: String,
        created: {type: Date, default: Date.now},
        school: {
          type:   mongoose.Schema.Types.ObjectId,
          ref: "School"
        }
    }, { usePushEach: true }
);

module.exports = mongoose.model("Software", softwareSchema);