var mongoose = require("mongoose");

var scholenSchema=  mongoose.Schema({
    brin: String,
    instellingsnaam: String,
    straatnaam: String,
    huisnummer: String,
    postcode: String,
    plaatsnaam: String,
    bevoegdGezag: String,
    aantalLeerlingen: Number,
    aantalKlaslokalen: Number,
    created: {type: Date, default: Date.now},
    owner: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
    },
    heeftGoedBedraadNetwerk: {type: Boolean, default: false},
    heeftGoedWirelessNetwerk: {type: Boolean, default: false},
    hardware: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hardware"
        }
    ],
    software: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Software"
        }
    ],
    deskLeerkrachten: Number,
    deskOndersteuning: Boolean,
    deskEffectiviteit: Number,
    deskOvereenstemming: Boolean
});

module.exports = mongoose.model("School", scholenSchema);