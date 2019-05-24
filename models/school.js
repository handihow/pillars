var mongoose = require("mongoose");
var config = require("../config/config");

var User = require("./user");
var Hardware = require("./hardware");
var Software = require("./software");
var Test = require("./test");
var Evaluation = require("./evaluation");
var Setting = require("./setting");

var scholenSchema=  mongoose.Schema({
    schoolIdNumber: {type: String, required: true},
    schoolLocationIdNumber: String,
    organisationIdNumber: String,
    name: {type: String, required: true},
    streetName: String,
    houseNumber: String,
    postalCode: String,
    city: {type: String, required: true},
    logo: String,
    uploadedLogo: String,
    inspectionResult: String,
    floorMap: String,
    countStudents: Number,
    countClassrooms: Number,
    network: {
        wired: {type: Boolean, default: false},
        wireless: {type: Boolean, default: false}
    },
    competence: {
        teachers: Number,
        support: {type: Boolean, default: false},
        effectiveness: Number
    },
    management: {
        agreement: {type: Boolean, default: false},
        networkAdjustment: {type: Boolean, default: false},
        networkProblemSolving: {type: Boolean, default: false},
        incidentReporting: {type: Boolean, default: false},
        roles: {type: [{}], default: config.management.roles}
    },
    created: {type: Date, default: Date.now},
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation"
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    hardware: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hardware"
    }],
    software: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Software"
    }],
    tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    }],
    settings: {
        hardware: {type: [{}], default: config.hardware.types},
        software: {
            subjects: {type: {}, default: config.software.subjects.primary.schoolConfig()},
            functionalities: {type: [String], default: config.software.functionality},
            ratings: {type: [String], default: config.software.ratings},    
        }
    },
    standard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Standard"
    },
    timeRange: {type: String, default: 'ALL'},
    evaluations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evaluation"
    }],
    isSecondarySchool: {type: Boolean, default: false},
}, { usePushEach: true, timestamps: true });

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
        Test.findByIdAndRemove(test, function(err){
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