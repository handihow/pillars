var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var config = require("../config/config");

var OrganisationSchema = new mongoose.Schema({
   name: {type: String, required: true},
   address: String,
   postalCode: String,
   city: {type: String, required: true},
   country: String,
   activationCode: String,
   activated: {type: Boolean, default: false},
   isDisabled: {type: Boolean, default: false},
   logo: String,
   created: {type: Date, default: Date.now},
   settings: {type: {}, default: config.organisationSettings}
}, { usePushEach: true });

OrganisationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Organisation", OrganisationSchema);