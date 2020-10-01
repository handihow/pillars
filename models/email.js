var mongoose = require("mongoose");

var emailSchema=  mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation"
    },
    emailAddress: {
        type: String,
        required: [true, 'Email adres is verplicht']
    },
    subject: {
        type: String,
        required: [true, 'Onderwerp is verplicht']
    },
    emailBody: {
        type: String,
        required: [true, 'Email bericht mag niet leeg zijn']
    },
    result: {
        type: String,
        default: 'success'
    }
}, { usePushEach: true, timestamps: true });

module.exports = mongoose.model("Email", emailSchema);