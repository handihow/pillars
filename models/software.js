var mongoose = require("mongoose");

var softwareSchema = mongoose.Schema ( 
    {
        vak: String,
        naam: String,
        functies: {
            instructie: { type: Boolean, default: false },
            oefenen: { type: Boolean, default: false },
            toets: { type: Boolean, default: false }
        },
        groep: [ { type: Boolean, default: false } ],
        kwaliteit: {
            sluitAanOpLeerdoelen: { type: Boolean, default: false },
            veelGebruikt: { type: Boolean, default: false },
            isGebruiksvriendelijk: { type: Boolean, default: false },
            resultatenZichtbaar: { type: Boolean, default: false },
            lesdoelenAangepast: { type: Boolean, default: false },
            voldoendeTijdOefenen: { type: Boolean, default: false },
            thuisOefenen: { type: Boolean, default: false }
        },
        effectiviteit: Number,
        created: {type: Date, default: Date.now},
        owner: {
            id: {
              type:   mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
            username: String
        }
    }
);

module.exports = mongoose.model("Software", softwareSchema);