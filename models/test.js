var mongoose = require("mongoose");

var testSchema = mongoose.Schema ( 
    {
        subject: String,
        result: Number,
        created: {type: Date, default: Date.now},
        owner: {
              type:   mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
        username: String,
        questions: [String],
        answers: [Boolean]
    }
);

module.exports = mongoose.model("Test", testSchema);