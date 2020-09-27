var mongoose = require("mongoose");

var softwareSchema = mongoose.Schema ( 
    {
        subject: String,
        name: {type: String, required: true},
        functionalities: [String],
        gradeLevels: [String],
        ratings: [ String ],
        effectiveness: {type: Number, default: 1},
        licences: {type: Number, default: 1},
        cost: {type: Number, default: 0},
        supplier: {type: String, default: ''},
        typeOfSoftware: {type: String, default: "Digitaal"},
        created: {type: Date, default: Date.now},
        school: {
          type:   mongoose.Schema.Types.ObjectId,
          ref: "School"
        },
        teachingMethod: {
          type:   mongoose.Schema.Types.ObjectId,
          ref: "TeachingMethod"
        },
        metadata: {}
    }, { usePushEach: true }
);

module.exports = mongoose.model("Software", softwareSchema);