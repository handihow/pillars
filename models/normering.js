var mongoose = require("mongoose");
var global = require("../models/global");

var normeringSchema=  mongoose.Schema({
    naam: String,
    //NORMEN 1. HARDWARE - ALGEMEEN
    minRAM: {type: Number, default: global.minRAM},
    minYear: {type: Number, default: global.minYear},
        //NORM 1.1: AANTAL COMPUTERS PER LEERLING
    hardwareTypesCountedAsComputer: {type: [String], default: global.hardwareTypesCountedAsComputer},   
    computersPerLeerling: {type: Number, default: global.computersPerLeerling},
    maxScoreComputersPerLeerling: {type: Number, default: global.maxScoreComputersPerLeerling},
        //NORM 1.2: AANTAL DIGITALE BORDEN PER KLASLOKAAL
    isTouchscreen: {type: Boolean, default: global.isTouchscreen},
    digibordenPerKlaslokaal: {type: Number, default: global.digibordenPerKlaslokaal},
    maxScoreDigibordenPerKlaslokaal: {type: Number, default: global.maxScoreDigibordenPerKlaslokaal},
        //NORM 1.3: GOED NETWERK
    maxScoreNetwerk: {type: Number, default: global.maxScoreNetwerk},
        //NORM 1.4: AANTAL DRAAGBARE COMPUTERS PER SCHOOL
    hardwareTypesCountedAsPortableComputer: {type: [String], default: global.hardwareTypesCountedAsPortableComputer},
    portableComputersPerSchool: {type: Number, default: global.portableComputersPerSchool},
    maxScorePortableComputersPerSchool: {type: Number, default: global.maxScorePortableComputersPerSchool},
    //ALGEMEEN    
    created: {type: Date, default: Date.now},
    owner: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String,
    },
});

module.exports = mongoose.model("Normering", normeringSchema);