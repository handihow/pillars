var mongoose = require("mongoose");

var softwareSchema = mongoose.Schema ( 
    {
        vak: String,
        naam: String,
        functie: [ String ],
        groep: [ String ],
        kwaliteit: [ String ],
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