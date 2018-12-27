var mongoose = require("mongoose");

var settingSchema=  mongoose.Schema({
    topic: String,
    category: String,
    key: String,
    booleanValue: Boolean,
    stringValue: String,
    arrayValue: [String],
    created: {type: Date, default: Date.now},
    school: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "School"
      },
} , { usePushEach: true });

module.exports = mongoose.model("Setting", settingSchema);

