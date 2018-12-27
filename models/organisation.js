var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var OrganisationSchema = new mongoose.Schema({
   name: {type: String, required: true},
   address: String,
   postalCode: String,
   city: {type: String, required: true},
   country: String,
   activationCode: String,
   activated: {type: Boolean, default: false},
   created: {type: Date, default: Date.now},
}, { usePushEach: true });

OrganisationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Organisation", OrganisationSchema);