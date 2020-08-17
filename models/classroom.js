var mongoose = require("mongoose");
var config = require("../config/config");

var User = require("./user");
var SurveyResult = require('./surveyResult');

var classroomSchema=  mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Naam van de klas is verplicht']
    },
    numberStudents: {
        type: Number, 
        required: [true, 'Aantal leerlingen is verplicht']
    },
    numberOfSurveys: {
        type: Number,
        default: 0
    },
    level: {
        type: String,
        enum: ['Onderbouw basisschool', 'Middenbouw basisschool', 'Bovenbouw basisschool', 'Onderbouw middelbare school VMBO BK', 'Onderbouw middelbare school VMBO GT', 'Onderbouw middelbare school HAVO/VWO', 'Bovenbouw middelbare school VMBO BK', 'Bovenbouw middelbare school VMBO GT', 'Bovenbouw middelbare school HAVO/VWO'], 
        required: true
    },
    description: String,
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    isSecondarySchool: {type: Boolean, default: false},
}, { usePushEach: true, timestamps: true });

module.exports = mongoose.model("Classroom", classroomSchema);