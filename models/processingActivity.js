var mongoose = require("mongoose");

var ProcessingActivitySchema = new mongoose.Schema({ 
   //part 1 of form
   controllerName: String,
   controllerOrganisationAddress: String,
   controllerOrganisationAddressNumber: String,
   controllerOrganisationPostalCode: String,
   controllerOrganisationCity: String,
   controllerOrganisationCountry: String,
   controllerOrganisationChamberOfCommerceNumber: String,
   controllerOrganisationLegalForm: String,
   //part 2 of form
   jointControllerName: String,
   jointControllerOrganisationAddress: String,
   jointControllerOrganisationAddressNumber: String,
   jointControllerOrganisationPostalCode: String,
   jointControllerOrganisationCity: String,
   jointControllerOrganisationCountry: String,
   jointControllerOrganisationChamberOfCommerceNumber: String,
   jointControllerOrganisationLegalForm: String,
   //part 3 of form
   dataProtectionOfficerName: String,
   dataProtectionOfficerEmail: String,
   dataProtectionOfficerTelephone: String,
   //part 4 of form
   processingActivityName: String,
   processingActivityGoal: String,
   personalDataCategories: [String],
   legalJustificationForProcessing: [String],
   involvesProfiling: Boolean,
   involvesSensitiveData: Boolean,
   //part 5 of form
   concernedPersonCategories: String,
   processors: String,
   recipientsOtherThanProcessors: String,
   //part 6 of form
   securityMeasures: [String],
   otherMeasuresExplanation: String,
   //part 7 of form
   methodOfInformingConcernedDirectInformation: String,
   methodOfInformingConcernedIndirectInformation: String,
   methodOfExercisingRightsOfConcerned: String,
   //part 8 of form
   dataRetention: String,
   dataRetentionComments: String,
   //part 9 of form:
   attachment: String,
   hasMultipleAttachments: Boolean,
   //other
   created: {type: Date, default: Date.now},
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

module.exports = mongoose.model("ProcessingActivity", ProcessingActivitySchema);