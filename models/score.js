var score = {};

//checks computers per student criteria
score.computersPerStudent = function(school){
      var result = 0;
      var countGoodComputers = 0;
      school.hardware.forEach(function(hardware){
        if(school.normering.hardwareTypesCountedAsComputer.includes(hardware.type) && 
          ( hardware.werkgeheugen >= school.normering.minRAM || hardware.jaarIngebruikname >= school.normering.minYear)) {
            if(hardware.type=="Multipoint computer") {
              countGoodComputers = countGoodComputers + hardware.aantalWerkplekkenMultipoint; 
            } else {
              countGoodComputers++;
            }
          }
      });
      var normComputers = school.aantalLeerlingen * school.normering.computersPerLeerling;
      if(countGoodComputers >= normComputers) {
          result = school.normering.maxScoreComputersPerLeerling;
          
      } else {
          result = school.normering.maxScoreComputersPerLeerling * countGoodComputers / normComputers;
          
      }
      return result;
};

//checks digitale schoolborden per lokaal criteria
score.digitalBordsPerClassroom = function(school){
    var result = 0;
    var countGoodDigibord = 0;
      school.hardware.forEach(function(hardware){
        if(hardware.type==="Digitaal schoolbord" && ((hardware.isTouchscreenDigibord || 0) >= (school.normering.isTouchscreenDigibord || 0))) {
            countGoodDigibord ++;
          }
      });
      var normDigibord = school.aantalKlaslokalen * school.normering.digibordenPerKlaslokaal;
      if(countGoodDigibord > normDigibord){
          result = school.normering.maxScoreDigibordenPerKlaslokaal;
      } else {
          result= school.normering.maxScoreDigibordenPerKlaslokaal * countGoodDigibord / normDigibord;
          
      }
    return result;
};

//checks the network criterium
score.network = function(school){
    var result = 0;
    if(school.heeftGoedBedraadNetwerk && school.heeftGoedWirelessNetwerk){
        result = school.normering.maxScoreNetwerk;
    }
    return result;
};

//checks portable computers per school criterium
score.portableComputersPerSchool = function(school){
    var result = 0;
    var countGoodPortableComputers = 0;
    school.hardware.forEach(function(hardware){
        if(school.normering.hardwareTypesCountedAsPortableComputer.includes(hardware.type) && 
          ( hardware.werkgeheugen >= school.normering.minRAM || hardware.jaarIngebruikname >= school.normering.minYear)) {
              countGoodPortableComputers++;
          }
    });
    var normPortableComputers = school.normering.portableComputersPerSchool;
    if(countGoodPortableComputers >= normPortableComputers){
        result = school.normering.maxScorePortableComputersPerSchool;
    } else {
        result = school.normering.maxScorePortableComputersPerSchool * countGoodPortableComputers / normPortableComputers;
    }
    return result;
};

//checks software criteria
score.software = function(school, vak){
    var result = 0;
    var groupedSoftware = new Set();
    //first, combine all the software from the course
    school.software.forEach(function(software, i){
        //check if the software is for this course and quality is sufficient
        if(software.vak === vak && software.kwaliteit.length >= school.normering[vak].kwaliteiten) {    
                //if so, add to the group of software (values are unique because of the use of SET)
                school.software[i].groep.forEach(function(groep){
                    groupedSoftware.add(groep);
                });
                school.software[i].functie.forEach(function(functie){
                    groupedSoftware.add(functie);
                });
        }
    });
    var groupCriterium = false;
    var functionCriterium = false;
    // check if the software has all required groups 
    var count = 0;
    school.normering[vak].groepen.forEach(function(groep,i,arr){
        if(groupedSoftware.has(groep)){
            count++;
        }
        if(count === arr.length) {
            groupCriterium = true;
        }
    });
    //check if the software has all functions
    var count2 = 0;
    school.normering[vak].functies.forEach(function(functie,i,arr){
        if(groupedSoftware.has(functie)){
            count2++;
        }
        if(count2 === arr.length) {
            functionCriterium = true;
        }
    });
    //if both criteria are met, give the maximum points
    if(groupCriterium && functionCriterium) {
            result = school.normering[vak].maxScore;
        }
    return result;
};

//checks deskundigheid criterium beoordeelde deskundigheid
score.beoordeeldeDeskundigheid = function(school){
    var result = 0;
    if(school.deskLeerkrachten>=school.normering.minBeoordeeldeDeskundigheid){
        result = school.normering.maxScoreBeoordeeldeDeskundigheid;
    }
    return result;
};

//checks deskundigheid criterium gemiddelde effectiviteit
score.gemiddeldeEffectiviteit = function(school){
    var result = 0;
    if(school.deskEffectiviteit>=school.normering.gemEffectiviteitDigitaleLeermiddelen){
        result = school.normering.maxScoreGemEffectiviteitDigitaleLeermiddelen;
    }
    return result;
};

//checks deskundigheid criterium ondersteuning nodig
score.ondersteuningNodig = function(school){
    var result = 0;
    if((school.deskOndersteuning === true ? 1 : 0)<=(school.normering.ondersteuningNodig=== true ? 1 : 0)){
        result = school.normering.maxScoreOndersteuningNodig;
    }
    return result;
};

//checks the resulting average score from tests
score.averageTestResult = function(school, subject){
    var total = 0;
    var count = 0;
    var result = 0;
    school.tests.forEach(function(test){
        if(test.subject === subject){
            total = total + test.result;
            count ++;
        }
    });
    if(count > 0){
        result = total / count;
    }
    return result;
};

score.calculate = function(school) {
    //define the output variable "result" of the function
    var result = {
        hardware: {
            computersPerStudent: 0,
            digitalBordsPerClassroom: 0,
            network: 0,
            portableComputersPerSchool: 0
        },
        software: {
            "Rekenen": 0,
            "Technisch lezen": 0,
            "Begrijpend lezen": 0,
            "Spelling": 0,
            "Taal": 0,
            "Toetsenbordvaardigheid": 0,
            "Programmeren": 0,
            "Mediawijsheid": 0
        },
        deskundigheid: {
            beoordeeldeDeskundigheid: 0,
            gemiddeldeEffectiviteit: 0,
            ondersteuningNodig: 0,
            ictGeletterdheid: 0,
            pedagogischDidactisch: 0,
            werkenSchooltext: 0,
            persoonlijkeOntwikkeling: 0
        }
    };
    //check computers per student
    result.hardware.computersPerStudent = score.computersPerStudent(school);
    //check digitale borden per lokaal
    result.hardware.digitalBordsPerClassroom = score.digitalBordsPerClassroom(school);
    //check network criteria
    result.hardware.network = score.network(school);
    //check portable computers per school criteria
    result.hardware.portableComputersPerSchool = score.portableComputersPerSchool(school);
    //end portable computers per school criteria
    //PILLARS CHECK DIGITALE LEERMIDDELEN (SOFTWARE)
    Object.keys(result.software).forEach(function(vak){
        result.software[vak] = score.software(school,vak);
    });
    //check beoordeelde deskundigheid
    result.deskundigheid.beoordeeldeDeskundigheid = score.beoordeeldeDeskundigheid(school);
    //check gemiddelde effectiviteit
    result.deskundigheid.gemiddeldeEffectiviteit = score.gemiddeldeEffectiviteit(school);
    //check ondersteuning nodig
    result.deskundigheid.ondersteuningNodig = score.ondersteuningNodig(school);
    //ICT Geletterdheid
    result.deskundigheid.ictGeletterheid = score.averageTestResult(school, "ICT Geletterdheid") * school.normering.maxScoreICTGeletterdheid;
    //Pedagogisch Didactisch Handelen
    result.deskundigheid.pedagogischDidactisch = score.averageTestResult(school, "Pedagogisch Didactisch Handelen") * school.normering.maxScorePedagogischDidactischHandelen;
    //Werken in de schoolcontext
    result.deskundigheid.werkenSchooltext = score.averageTestResult(school, "Werken in de schoolcontext") * school.normering.maxScoreWerkenSchoolcontext;
    //Persoonlijke ontwikkeling
    result.deskundigheid.persoonlijkeOntwikkeling = score.averageTestResult(school, "Persoonlijke Ontwikkeling") * school.normering.maxScorePersoonlijkeOntwikkeling;
    
    
return result;
};

module.exports = score;