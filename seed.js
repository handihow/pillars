var mongoose = require("mongoose");
var Hardware = require("./models/hardware");
var School = require("./models/school");

var data = [
    {
        brin: "16AH",
        instellingsnaam: "Openbare Basisschool 't Eenspan",
        straatnaam: "Oosterstraat",
        huisnummer: "58",
        postcode: "7822 HG",
        plaatsnaam: "EMMEN",
        bevoegdGezag: "10249"
        
    },
    {
        brin: "10BV",
        instellingsnaam: "Openbare Basisschool De Gezellehoek",
        straatnaam: "Rodenbachlaan",
        huisnummer: "31",
        postcode: "4707 NH",
        plaatsnaam: "ROOSENDAAL",
        bevoegdGezag: "41471"
    }
];

function seedDB(){
    //remove all schools
    School.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed schools");
            // data.forEach(function(seed){
            //   School.create(seed, function(err, school){
            //       if(err){
            //           console.log(err);
            //       } else {
            //           console.log("added a school");
            //           Hardware.create({
            //                 type: "Computer",
            //                 naam: "BE-152",
            //                 merk: "Dell"
            //           }, function(err, hardware){
            //               if(err){
            //                   console.log(err);
            //               } else {
            //                   school.hardware.push(hardware);
            //                   school.save();
            //                   console.log("created a new hardware");
            //               }
            //           });
            //       }
            //   }); 
            // });
        }
    });
}

module.exports = seedDB;