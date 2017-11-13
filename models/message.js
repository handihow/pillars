var mongoose = require("mongoose");

var messageSchema=  mongoose.Schema({
    title: String,
    message: String,
    //ALGEMEEN
    created: {type: Date, default: Date.now},
    owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      }
});

module.exports = mongoose.model("Message", messageSchema);