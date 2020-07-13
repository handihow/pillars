var mongoose = require("mongoose");

var formSchema = mongoose.Schema (
    {
        name: {type: String, required: true},
        purpose: {type: String, required: true},
        text: String,
        version: {type: String, required: true},
        comment: {type: String, required: true},
    }, { usePushEach: true }
);

formSchema.set('timestamps', true);

module.exports = mongoose.model("Form", formSchema);