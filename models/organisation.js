var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var OrganisationSchema = new mongoose.Schema({
   name: String,
   address: String,
   postalCode: String,
   city: String,
   country: String,
   activationCode: String,
   activated: {type: Boolean, default: false},
   created: {type: Date, default: Date.now},
}, { usePushEach: true });

OrganisationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Organisation", OrganisationSchema);