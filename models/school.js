var mongoose = require("mongoose");
var global = require("../models/global");

var User = require("./user");
var Hardware = require("./hardware");
var Software = require("./software");
var Test = require("./test");
var Evaluation = require("./evaluation");

var scholenSchema=  mongoose.Schema({
    brin: String,
    vestigingsnummer: String,
    instellingsnaam: String,
    straatnaam: String,
    huisnummer: String,
    postcode: String,
    plaatsnaam: String,
    bevoegdGezag: String,
    aantalLeerlingen: Number,
    aantalKlaslokalen: Number,
    created: {type: Date, default: Date.now},
    owner: {                                        //user type Schoolbestuur (Bestuur Admin) - badmin 
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
    },
    organisation: {                                 
          type: mongoose.Schema.Types.ObjectId,
          ref: "Organisation"
    },
    users: [                                        //user type School Administrator & Medewerker (User) - sadmin and suser
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
    ],
    //Hardware
    heeftGoedBedraadNetwerk: {type: Boolean, default: false},
    heeftGoedWirelessNetwerk: {type: Boolean, default: false},
    hardware: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hardware"
        }
    ],
    //Software
    software: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Software"
        }
    ],
    //Deskundigheid
    deskLeerkrachten: Number,
    deskOndersteuning: Boolean,
    deskEffectiviteit: Number,
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test"
        }
    ],
    //Organisatie
    heeftOrganisatorischeOvereenstemming: Boolean,
    heeftGoedeNetwerkAanpassing: Boolean,
    heeftGoedeNetwerkProbleemOplossing: Boolean,
    heeftGoedeIncidentMelding: Boolean,
    orgICTIncidentMelder: String,
    'ICT Incidentmelder': {type: Number, default: 0},
    isBekendICTIncidentmelder: Boolean,
    orgOnderwijskundigICTer: String,
    'Onderwijskundig ICTer': {type: Number, default: 0},
    isBekendOnderwijskundigICTer: Boolean,
    orgICTInkoper: String,
    'ICT Inkoper': {type: Number, default: 0},
    isBekendICTInkoper: Boolean,
    //INSTELLINGEN
    instellingenHardwareTypes: {type: [{}], default: global.hardwareTypes},
    instellingenSoftware: {type: {}, default: global.subjectsPrimary},
    instellingenSoftwareFuncties: {type: [String], default: global.softwareFuncties},
    instellingenSoftwareKwaliteiten: {type: [String], default: global.softwareKwaliteiten},
    normering: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Normering"
        },
    //STATUS PROGRESSIE
    isIngevuldAlgemeneInformatie: Boolean,
    isToegevoegdHardware: Boolean,
    isToegevoegdSoftware: Boolean,
    isIngevuldDeskundigheid: Boolean,
    isIngevuldOrganisatie: Boolean,
    isToegevoegdMedewerker: Boolean,
    evaluations: [
         {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Evaluation"
         }
      ],
    isSecondarySchool: Boolean
}, { usePushEach: true });

scholenSchema.post("remove", function(school){
    console.log("triggered");
    this.users.forEach(function(user){
        User.findByIdAndRemove(user, function(err){
            if(err){
                console.log(err);
            }
        });
    });
    this.hardware.forEach(function(hardware){
        console.log("hardware each..")
        Hardware.findByIdAndRemove(hardware, function(err){
            if(err){
                console.log(err);
            }
        });
    });
    this.software.forEach(function(software){
        console.log("software each..");
        Software.findByIdAndRemove(software, function(err){
            if(err){
                console.log(err)
            }
        });
    });
    this.tests.forEach(function(test){
        Test.findByIdAndRemove(test, function(test){
            if(err){
                console.log(err);
            }
        });
    });
    this.evaluations.forEach(function(evaluation){
        Evaluation.findByIdAndRemove(evaluation, function(err){
            if(err){
                console.log(err);
            }
        });
    });
});

module.exports = mongoose.model("School", scholenSchema);