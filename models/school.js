var mongoose = require("mongoose");
var global = require("../models/global");

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
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String,
      role: String
    },
    users: [{                                        //user type School Administrator & Medewerker (User) - sadmin and suser
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String,
      role: String,
      firstName: String,
      lastName: String
    }],
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
    //Organisatie
    heeftOrganisatorischeOvereenstemming: Boolean,
    heeftGoedeNetwerkAanpassing: Boolean,
    heeftGoedeNetwerkProbleemOplossing: Boolean,
    heeftGoedeIncidentMelding: Boolean,
    orgICTIncidentMelder: String,
    orgNormjaartaakurenICTIncidentMelder: {type: Number, default: 0},
    isBekendICTIncidentmelder: Boolean,
    orgOnderwijskundigICTer: String,
    orgNormjaartaakurenOnderwijskundigICTer: {type: Number, default: 0},
    isBekendOnderwijskundigICTer: Boolean,
    orgICTInkoper: String,
    orgNormjaartaakurenICTInkoper: {type: Number, default: 0},
    isBekendICTInkoper: Boolean,
    //INSTELLINGEN
    instellingenHardwareTypes: {type: [{}], default: global.hardwareTypes},
    instellingenSoftware: {type: {}, default: global.software},
    instellingenSoftwareFuncties: {type: [String], default: global.softwareFuncties},
    instellingenSoftwareKwaliteiten: {type: [String], default: global.softwareKwaliteiten},
    //STATUS PROGRESSIE
    isIngevuldAlgemeneInformatie: Boolean,
    isToegevoegdHardware: Boolean,
    isToegevoegdSoftware: Boolean,
    isIngevuldDeskundigheid: Boolean,
    isIngevuldOrganisatie: Boolean,
    isToegevoegdMedewerker: Boolean
});

module.exports = mongoose.model("School", scholenSchema);