var mongoose = require("mongoose");

var softwareSchema = mongoose.Schema ( 
    {
        vak: String,
        naam: String,
        functie: [ String ],
        groep: [ String ],
        kwaliteit: [ String ],
        effectiviteit: Number,
        licenties: Number,
        leverancier: String,
        created: {type: Date, default: Date.now},
        owner: {
            id: {
              type:   mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
            username: String
        }
    }, { usePushEach: true }
);

module.exports = mongoose.model("Software", softwareSchema);