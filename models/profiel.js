var mongoose = require("mongoose");
var global = require("../models/global");

var profielSchema = mongoose.Schema ( 
    {
        name: String,
        profiel: {type: {}, default: global.profiel},
        created: {type: Date, default: Date.now},
        owner: {
              type:   mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
        isActueel: Boolean
    }
);

module.exports = mongoose.model("Profiel", profielSchema);