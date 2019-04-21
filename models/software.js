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
        typeOfSoftware: {type: String, default: "Digitaal"},
        created: {type: Date, default: Date.now},
        school: {
          type:   mongoose.Schema.Types.ObjectId,
          ref: "School"
        },
        metadata: {}
    }, { usePushEach: true }
);

module.exports = mongoose.model("Software", softwareSchema);