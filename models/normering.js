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
    "Rekenen":          {
                            groepen: {type: [String], default: global.groepenRekenen},
                            functies: {type: [String], default: global.functiesRekenen},
                            maxScore: {type: Number, default: global.maxScoreRekenen},
                            kwaliteiten: {type: Number, default: global.kwaliteiten}
                        },
        //NORM 2.2 TECHNISCH LEZEN:
    "Technisch lezen": {
                            groepen: {type: [String], default: global.groepenTechnischLezen},
                            functies: {type: [String], default: global.functiesTechnischLezen},
                            maxScore: {type: Number, default: global.maxScoreTechnischLezen},
                            kwaliteiten: {type: Number, default: global.kwaliteiten}
                        },
        //NORM 2.3 BEGRIJPEND LEZEN:
    "Begrijpend lezen": {
                            groepen: {type: [String], default: global.groepenBegrijpendLezen},
                            functies: {type: [String], default: global.functiesBegrijpendLezen},
                            maxScore: {type: Number, default: global.maxScoreBegrijpendLezen},
                            kwaliteiten: {type: Number, default: global.kwaliteiten}
                        },
        //NORM 2.4 SPELLING:
    "Spelling":         {
                            groepen: {type: [String], default: global.groepenSpelling},
                            functies: {type: [String], default: global.functiesSpelling},
                            maxScore: {type: Number, default: global.maxScoreSpelling},
                            kwaliteiten: {type: Number, default: global.kwaliteiten}
                        },
        //NORM 2.5 TAAL:
    "Taal":             {
                            groepen: {type: [String], default: global.groepenTaal},
                            functies: {type: [String], default: global.functiesTaal},
                            maxScore: {type: Number, default: global.maxScoreTaal},
                            kwaliteiten: {type: Number, default: global.kwaliteiten}
                        },
            //NORM 2.6 TOETSENBORDVAARDIGHEID
    "Toetsenbordvaardigheid":             {
                            groepen: {type: [String], default: global.groepenToetsenbordvaardigheid},
                            functies: {type: [String], default: global.functiesToetsenbordvaardigheid},
                            maxScore: {type: Number, default: global.maxScoreToetsenbordvaardigheid},
                            kwaliteiten: {type: Number, default: global.kwaliteiten}
                        },
        //NORM 2.7 PROGRAMMEREN
    "Programmeren":     {
                            groepen: {type: [String], default: global.groepenProgrammeren},
                            functies: {type: [String], default: global.functiesProgrammeren},
                            maxScore: {type: Number, default: global.maxScoreProgrammeren},
                            kwaliteiten: {type: Number, default: global.kwaliteiten}
                        },
        //NORM 2.8 MEDIAWIJSHEID
    "Mediawijsheid":    {
                            groepen: {type: [String], default: global.groepenMediawijsheid},
                            functies: {type: [String], default: global.functiesMediawijsheid},
                            maxScore: {type: Number, default: global.maxScoreMediawijsheid},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    //for secondary education:
    "Aardrijkskunde":   {
                            groepen: {type: [String], default: global.groepenAardrijkskunde},
                            functies: {type: [String], default: global.functiesAardrijkskunde},
                            maxScore: {type: Number, default: global.maxScoreAardrijkskunde},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Biologie":         {
                            groepen: {type: [String], default: global.groepenBiologie},
                            functies: {type: [String], default: global.functiesBiologie},
                            maxScore: {type: Number, default: global.maxScoreBiologie},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Duits":            {
                            groepen: {type: [String], default: global.groepenDuits},
                            functies: {type: [String], default: global.functiesDuits},
                            maxScore: {type: Number, default: global.maxScoreDuits},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Economie":         {
                            groepen: {type: [String], default: global.groepenEconomie},
                            functies: {type: [String], default: global.functiesEconomie},
                            maxScore: {type: Number, default: global.maxScoreEconomie},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Engels":           {
                            groepen: {type: [String], default: global.groepenEngels},
                            functies: {type: [String], default: global.functiesEngels},
                            maxScore: {type: Number, default: global.maxScoreEngels},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Frans":           {
                            groepen: {type: [String], default: global.groepenFrans},
                            functies: {type: [String], default: global.functiesFrans},
                            maxScore: {type: Number, default: global.maxScoreFrans},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Geschiedenis":     {
                            groepen: {type: [String], default: global.groepenGeschiedenis},
                            functies: {type: [String], default: global.functiesGeschiedenis},
                            maxScore: {type: Number, default: global.maxScoreGeschiedenis},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Natuurkunde":      {
                            groepen: {type: [String], default: global.groepenNatuurkunde},
                            functies: {type: [String], default: global.functiesNatuurkunde},
                            maxScore: {type: Number, default: global.maxScoreNatuurkunde},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Nederlands":       {
                            groepen: {type: [String], default: global.groepenNederlands},
                            functies: {type: [String], default: global.functiesNederlands},
                            maxScore: {type: Number, default: global.maxScoreNederlands},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Scheikunde":       {
                            groepen: {type: [String], default: global.groepenScheikunde},
                            functies: {type: [String], default: global.functiesScheikunde},
                            maxScore: {type: Number, default: global.maxScoreScheikunde},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    "Wiskunde":         {
                            groepen: {type: [String], default: global.groepenWiskunde},
                            functies: {type: [String], default: global.functiesWiskunde},
                            maxScore: {type: Number, default: global.maxScoreWiskunde},
                            kwaliteiten: {type: Number, default: global.kwaliteiten},
                        },
    //NORMEN 3. DESKUNDIGHEID
        //NORM 3.1 BEOORDEELDE DESKUNDIGHEID
    minBeoordeeldeDeskundigheid: {type: Number, default: global.minBeoordeeldeDeskundigheid},
    maxScoreBeoordeeldeDeskundigheid: {type: Number, default: global.maxScoreBeoordeeldeDeskundigheid},
        //NORM 3.2 GEMIDDELDE EFFECTIVITEIT DIGITALE LEERMIDDELEN
    gemEffectiviteitDigitaleLeermiddelen: {type: Number, default: global.gemEffectiviteitDigitaleLeermiddelen},
    maxScoreGemEffectiviteitDigitaleLeermiddelen: {type: Number, default: global.maxScoreGemEffectiviteitDigitaleLeermiddelen},
        //NORM 3.3 ONDERSTEUNING EN/OF TRAINING NODIG
    ondersteuningNodig: {type: Boolean, default: global.ondersteuningNodig},
    maxScoreOndersteuningNodig: {type: Number, default: global.maxScoreOndersteuningNodig},
        //NORM 3.4 ICT GELETTERDHEID
    maxScoreICTGeletterdheid: {type: Number, default: global.maxScoreICTGeletterdheid},
        //NORM 3.5 PEDAGOGISCH DIDACTISCH HANDELEN
    maxScorePedagogischDidactischHandelen: {type: Number, default: global.maxScorePedagogischDidactischHandelen},
        //NORM 3.6 WERKEN IN DE SCHOOLCONTEXT
    maxScoreWerkenSchoolcontext: {type: Number, default: global.maxScoreWerkenSchoolcontext},
        //NORM 3.7 PERSOONLIJKE ONTWIKKELING
    maxScorePersoonlijkeOntwikkeling: {type: Number, default: global.maxScorePersoonlijkeOntwikkeling},
        //NORM 3.8 INSTRUMENTELE VAARDIGHEDEN
    maxScoreInstrumenteleVaardigheden: {type: Number, default: 0},
        //NORM 3.9 INFORMATIE VAARDIGHEDEN
    maxScoreInformatieVaardigheden: {type: Number, default: 0},
        //NORM 3.10 MEDIAVAARDIGHEDEN
    maxScoreMediavaardigheden: {type: Number, default: 0},
    //ORGANISATIE
        //NORM 4.1 ORGANISATORISCHE OVEREENSTEMMING
    maxScoreOvereenstemming: {type: Number, default: global.maxScoreOvereenstemming},
        //NORM 4.2 NETWERKBEHEER
    maxScoreNetwerkbeheer: {type: Number, default: global.maxScoreNetwerkbeheer},
        //NORM 4.3 ICT INCIDENTMELDER
    "ICT Incidentmelder":   {
                                normjaartaakuren: {type: Number, default: global.urenICTIncidentmelder},
                                extraUren: {type: Number, default: global.extraUrenICTIncidentmelder},
                                maxScore: {type: Number, default: global.maxScoreICTIncidentmelder}
                            },
        //NORM 4.4 ONDERWIJSKUNDIG ICTER
    "Onderwijskundig ICTer":   {
                                normjaartaakuren: {type: Number, default: global.urenOnderwijskundigICTer},
                                extraUren: {type: Number, default: global.extraUrenOnderwijskundigICTer},
                                maxScore: {type: Number, default: global.maxScoreOnderwijskundigICTer}
                            },
    "ICT Inkoper":          {
                                normjaartaakuren: {type: Number, default: global.urenICTInkoper},
                                extraUren: {type: Number, default: global.extraUrenICTInkoper},
                                maxScore: {type: Number, default: global.maxScoreICTInkoper}
                            },
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
    isSecondarySchool: Boolean
} , { usePushEach: true });

module.exports = mongoose.model("Normering", normeringSchema);