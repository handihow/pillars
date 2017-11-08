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
    //NORMEN 2. DIGITALE LEERMIDDELEN
        //NORM 2.1 REKENEN:
    groepenRekenen: {type: [String], default: global.groepenRekenen},
    functiesRekenen: {type: [String], default: global.functiesRekenen},
    maxScoreRekenen: {type: Number, default: global.maxScoreRekenen},
        //NORM 2.2 TECHNISCH LEZEN:
    groepenTechnischLezen: {type: [String], default: global.groepenTechnischLezen},
    functiesTechnischLezen: {type: [String], default: global.functiesTechnischLezen},
    maxScoreTechnischLezen: {type: Number, default: global.maxScoreTechnischLezen},
        //NORM 2.3 BEGRIJPEND LEZEN:
    groepenBegrijpendLezen: {type: [String], default: global.groepenBegrijpendLezen},
    functiesBegrijpendLezen: {type: [String], default: global.functiesBegrijpendLezen},
    maxScoreBegrijpendLezen: {type: Number, default: global.maxScoreBegrijpendLezen},
        //NORM 2.4 SPELLING:
    groepenSpelling: {type: [String], default: global.groepenSpelling},
    functiesSpelling: {type: [String], default: global.functiesSpelling},
    maxScoreSpelling: {type: Number, default: global.maxScoreSpelling},
        //NORM 2.5 TAAL:
    groepenTaal: {type: [String], default: global.groepenTaal},
    functiesTaal: {type: [String], default: global.functiesTaal},
    maxScoreTaal: {type: Number, default: global.maxScoreTaal},
        //NORM 2.6 TOETSENBORDVAARDIGHEID
    groepenToetsenbordvaardigheid: {type: [String], default: global.groepenToetsenbordvaardigheid},
    functiesToetsenbordvaardigheid: {type: [String], default: global.functiesToetsenbordvaardigheid},
    maxScoreToetsenbordvaardigheid: {type: Number, default: global.maxScoreToetsenbordvaardigheid},
        //NORM 2.7 PROGRAMMEREN
    groepenProgrammeren: {type: [String], default: global.groepenProgrammeren},
    functiesProgrammeren: {type: [String], default: global.functiesProgrammeren},
    maxScoreProgrammeren: {type: Number, default: global.maxScoreProgrammeren},
        //NORM 2.8 MEDIAWIJSHEID
    groepenMediawijsheid: {type: [String], default: global.groepenMediawijsheid},
    functiesMediawijsheid: {type: [String], default: global.functiesMediawijsheid},
    maxScoreMediawijsheid: {type: Number, default: global.maxScoreMediawijsheid},
    //ALGEMEEN    
    created: {type: Date, default: Date.now},
    owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      }
});

module.exports = mongoose.model("Normering", normeringSchema);