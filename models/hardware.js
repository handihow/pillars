var mongoose = require("mongoose");

var hardwareSchema = mongoose.Schema (
    {
        type: {type: String, required: true},
        name: {type: String, required: true},
        brand: String,
        model: String,
        serialTag: String,
        processor: String,
        memory: Number,
        deploymentYear: Number,
        numberWorkPlacesMultipoint: Number,
        isTouchscreenDigibord: Boolean,
        screensizeDigibord: Number,
        supplier: String,
        warranty: String,
        isDepreciated: Boolean,
        warning: String,
        created: {type: Date, default: Date.now},
        owner: {
              type:   mongoose.Schema.Types.ObjectId,
              ref: "User"
            }
    }, { usePushEach: true }
);

module.exports = mongoose.model("Hardware", hardwareSchema);