var mongoose = require("mongoose");

var hardwareSchema = mongoose.Schema (
    {
        type: {type: String, required: true},
        name: {type: String, required: true},
        brand: {type: String, default: ''},
        model: {type: String, default: ''},
        serialTag: {type: String, default: ''},
        processor: {type: String, default: ''},
        memory: {type: Number, default: 0},
        deploymentYear: {type: Number, default: new Date().getFullYear()},
        operatingSystem: {type: String, default: ''},
        numberWorkPlacesMultipoint: {type: Number, default: 1},
        isTouchscreenDigibord: {type: Boolean, default: false},
        screensizeDigibord: {type: Number, default: 0},
        supplier: {type: String, default: ''},
        warranty: {type: String, default: ''},
        isDepreciated: {type: Boolean, default: false},
        warning: {type: String, default: ''},
        cost: {type: Number, default: 0},
        depreciationPeriod: {type: Number, default: 5},
        location: {type: String, default: ''},
        functionsAs: {type: String, default: ''},
        created: {type: Date, default: Date.now},
        owner: {
              type:   mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
        school: {
              type:   mongoose.Schema.Types.ObjectId,
              ref: "School"
            }
    }, { usePushEach: true }
);

hardwareSchema.set('timestamps', true);

module.exports = mongoose.model("Hardware", hardwareSchema);