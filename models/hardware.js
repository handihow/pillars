var mongoose = require("mongoose");

var hardwareSchema = mongoose.Schema (
    {
        type: String,
        naam: String,
        merk: String,
        model: String,
        serialTag: String,
        processor: String,
        werkgeheugen: Number,
        jaarIngebruikname: Number,
        aantalWerkplekkenMultipoint: Number,
        isTouchscreenDigibord: Boolean,
        schermgrootteDigibord: Number,
        created: {type: Date, default: Date.now},
        owner: {
              type:   mongoose.Schema.Types.ObjectId,
              ref: "User"
            }
    }, { usePushEach: true }
);

module.exports = mongoose.model("Hardware", hardwareSchema);