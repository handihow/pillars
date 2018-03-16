var mongoose = require("mongoose");

var evaluationSchema=  mongoose.Schema({
    title: String,
    report: String,
    plan: String,
    //ALGEMEEN
    created: {type: Date, default: Date.now},
    owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
    school: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "School"
      },  
}, { usePushEach: true });

module.exports = mongoose.model("Evaluation", evaluationSchema);