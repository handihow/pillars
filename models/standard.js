var mongoose = require("mongoose");
var config = require('../config/config');

var standardSchema=  mongoose.Schema({
    name: {type: String, required: true},
    hardware: {type: {}, default: config.hardware.standards},
    software: {type: {}, default: config.software.standards.primary},
    competence: {type: {}, default: config.competence.standards},
    management: {type: {}, default: config.management.standards},
    created: {type: Date, default: Date.now},
    organisation: {                                 
          type: mongoose.Schema.Types.ObjectId,
          ref: "Organisation"
      },
    isSecondarySchool: {type: Boolean, default: false}
} , { usePushEach: true });

module.exports = mongoose.model("Standard", standardSchema);