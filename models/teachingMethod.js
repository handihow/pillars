var mongoose = require("mongoose");

var teachingMethodSchema = mongoose.Schema ( 
    {
        subject: String,
        name: {type: String, required: true},
        functionalities: [String],
        gradeLevels: [String],
        ratings: [ String ],
        effectiveness: Number,
        supplier: String,
        typeOfSoftware: {type: String, default: "Digitaal"},
        isSecondarySchool: {type: Boolean, default: false}
    }, { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model("TeachingMethod", teachingMethodSchema);