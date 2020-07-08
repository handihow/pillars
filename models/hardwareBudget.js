var mongoose = require("mongoose");

var hardwareBudgetSchema = mongoose.Schema (
    {
        'type': {type: String, required: true},
        'price': {type: Number, required: true},
        '2020': {type: Number, default: 0},
        '2021': {type: Number, default: 0},
        '2022': {type: Number, default: 0},
        '2023': {type: Number, default: 0},
        '2024': {type: Number, default: 0},
        '2025': {type: Number, default: 0},
        '2026': {type: Number, default: 0},
        '2027': {type: Number, default: 0},
        '2028': {type: Number, default: 0},
        '2029': {type: Number, default: 0},
        '2030': {type: Number, default: 0},
        'school': {
          type:   mongoose.Schema.Types.ObjectId,
          ref: "School"
        },
    }, { usePushEach: true }
);

hardwareBudgetSchema.set('timestamps', true);

module.exports = mongoose.model("HardwareBudget", hardwareBudgetSchema);