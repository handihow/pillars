var mongoose = require("mongoose");

var SecurityIncidentSchema = new mongoose.Schema({ 
   //part 1 of form
   reporterName: String,
   reporterOrganisationAddress: String,
   reporterOrganisationAddressNumber: String,
   reporterOrganisationPostalCode: String,
   reporterOrganisationCity: String,
   reporterOrganisationCountry: String,
   reporterOrganisationPhoneNumber: String,
   reporterOrganisationEmail: String,
   //part 2 of form
   securityIncidentName: {type: String, required: true},
   discoveryDateAndTime: String,
   notificationDateAndTime: String,
   incidentDateAndTime: String,
   incidentPlace: String,
   incidentDescription: String,
   natureOfInfringement: String,
   //part 3 of form
   numberOfPersonsAffected: String,
   typeOfDataCompromised: String,
   consequences: String,
   mitigationMeasures: String,
   preventionMeasures: String,
   //part 4 of form
   hasAuthorityReport: Boolean,
   authorityReport: String,
   hasConcernedPeopleReport: Boolean,
   concernedPeopleReport: String,
   otherRelevantInformation: String,
   //other
   created: {type: Date, default: Date.now},
   processingActivity: String,
   school: {                                 
       type: mongoose.Schema.Types.ObjectId,
       ref: "School"
   },
   organisation: {                                 
       type: mongoose.Schema.Types.ObjectId,
       ref: "Organisation"
   },
   isValidForAllOrganisation: Boolean
}, { usePushEach: true });

module.exports = mongoose.model("SecurityIncident", SecurityIncidentSchema);