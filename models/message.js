var mongoose = require("mongoose");

var messageSchema=  mongoose.Schema({
    title: {type: String, required: true},
    message: String,
    thumbnailImage: {type: String, default: 'https://ucarecdn.com/e97d5084-3b6f-4e28-8fb8-3c087d2fec7e/information1481584_640.png'},
    //ALGEMEEN
    created: {type: Date, default: Date.now},
    owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
    organisation: {                                 
          type: mongoose.Schema.Types.ObjectId,
          ref: "Organisation"
      },
    school: {                                 
          type: mongoose.Schema.Types.ObjectId,
          ref: "School"
      },
    isSchoolLevel: {type: Boolean, default: false}
}, { usePushEach: true });

module.exports = mongoose.model("Message", messageSchema);