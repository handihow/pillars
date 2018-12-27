var score = {};
var config = require('./config');

//checks computers per student criteria
score.computersPerStudent = function(school){
      var result = {goodComputers: 0, computersPerStudent: 0};
      var countGoodComputers = 0;
      school.hardware.forEach(function(hardware){
        if(school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
          ( hardware.memory >= school.standard.hardware.computersPerStudent.minRAM || 
                hardware.deploymentYear >= (new Date()).getFullYear() - school.standard.hardware.computersPerStudent.maxYear)) {
            if(hardware.type=="Multipoint computer" && hardware.numberWorkPlacesMultipoint) {
              countGoodComputers = countGoodComputers + hardware.numberWorkPlacesMultipoint; 
            } else {
              countGoodComputers++;
            }
          }
      });
      result.goodComputers = countGoodComputers;
      var normComputers = school.countStudents * Number(school.standard.hardware.computersPerStudent.standard);
      if(countGoodComputers >= normComputers) {
          result.computersPerStudent = Number(school.standard.hardware.computersPerStudent.maxScore);
      } else {
          result.computersPerStudent = Number(school.standard.hardware.computersPerStudent.maxScore) * countGoodComputers / normComputers;
          
      }
      return result;
};

//checks digitale schoolborden per lokaal criteria
score.digitalSchoolbordsPerClassroom = function(school){
    var result = {goodDigitalSchoolbords: 0, digitalSchoolbordsPerClassroom: 0};
    var countGoodDigibord = 0;
    school.hardware.forEach(function(hardware){
        if(hardware.type==="Digitaal schoolbord" 
                && ((hardware.isTouchscreenDigibord || 0) >= (school.standard.hardware.digitalSchoolbordsPerClassroom.isTouchscreen || 0))
                && hardware.deploymentYear >= (new Date()).getFullYear() - school.standard.hardware.computersPerStudent.maxYear) {
            countGoodDigibord ++;
          }
    });
    result.goodDigitalSchoolbords = countGoodDigibord;
    var normDigibord = school.countClassrooms * Number(school.standard.hardware.digitalSchoolbordsPerClassroom.standard);
    if(countGoodDigibord > normDigibord){
          result.digitalSchoolbordsPerClassroom = Number(school.standard.hardware.digitalSchoolbordsPerClassroom.maxScore);
    } else {
          result.digitalSchoolbordsPerClassroom = Number(school.standard.hardware.digitalSchoolbordsPerClassroom.maxScore) * countGoodDigibord / normDigibord;          
    }
    return result;
};

//checks the network criterium
score.network = function(school){
    var result = 0;
    if(school.network.wired && school.network.wireless){
        result = Number(school.standard.hardware.network.maxScore);
    }
    return result;
};

//checks portable computers per school criterium
score.portableComputersPerSchool = function(school){
    var result = {goodLaptops: 0, portableComputersPerSchool: 0};
    var countGoodPortableComputers = 0;
    school.hardware.forEach(function(hardware){
        if(school.standard.hardware.laptopsPerSchool.isLaptop.includes(hardware.type) && 
          ( hardware.memory >= school.standard.hardware.computersPerStudent.minRAM || 
                hardware.deploymentYear >= (new Date()).getFullYear() - school.standard.hardware.laptopsPerSchool.maxYear)) {
              countGoodPortableComputers++;
          }
    });
    result.goodLaptops = countGoodPortableComputers;
    var normPortableComputers = Number(school.standard.hardware.laptopsPerSchool.standard);
    if(countGoodPortableComputers >= normPortableComputers){
        result.portableComputersPerSchool = Number(school.standard.hardware.laptopsPerSchool.maxScore);
    } else {
        result.portableComputersPerSchool = Number(school.standard.hardware.laptopsPerSchool.maxScore) * countGoodPortableComputers / normPortableComputers;
    }
    return result;
};

//checks software criteria
score.software = function(school, subject){
    var result = 0;
    var groupedSoftware = new Set();
    //first, combine all the software from the course
    school.software.forEach(function(software){
        //check if the software is for this course and quality is sufficient
        if(software.subject === subject.subject && (software.ratings.length / config.software.ratings.length) >= school.standard.software[subject.key].minRating) {    
                //if so, add to the group of software (values are unique because of the use of SET)
                software.gradeLevels.forEach(function(gradeLevel){
                    groupedSoftware.add(gradeLevel);
                });
                software.functionalities.forEach(function(functionality){
                    groupedSoftware.add(functionality);
                });
        }
    });
    var groupCriterium = false;
    var functionCriterium = false;
    // check if the software has all required groups 
    var count = 0;
    school.standard.software[subject.key].gradeLevels.forEach(function(gradeLevel,i,arr){
        if(groupedSoftware.has(gradeLevel)){
            count++;
        }
        if(count === arr.length) {
            groupCriterium = true;
        }
    });
    //check if the software has all functions
    var count2 = 0;
    school.standard.software[subject.key].functionalities.forEach(function(functionality,i,arr){
        if(groupedSoftware.has(functionality)){
            count2++;
        }
        if(count2 === arr.length) {
            functionCriterium = true;
        }
    });
    //if both criteria are met, give the maximum points
    if(groupCriterium && functionCriterium) {
        result = Number(school.standard.software[subject.key].maxScore);
    }
    return result;
};

//checks competence criterium beoordeelde competence
score.competenceRating = function(school){
    var result = 0;
    if(school.competence.teachers>=Number(school.standard.competence.competenceRating.standard)){
        result = Number(school.standard.competence.competenceRating.maxScore);
    }
    return Number(result) ? Number(result) : 0;
};

//checks competence criterium gemiddelde effectiviteit
score.softwareRating = function(school){
    var result = 0;
    if(school.competence.effectiveness>=Number(school.standard.competence.softwareRating.standard)){
        result = Number(school.standard.competence.softwareRating.maxScore);
    }
    return result;
};

//checks criterium ondersteuning nodig
score.support = function(school){
    var result = 0;
    if(school.competence.support){
        result = Number(school.standard.competence.support.maxScore);
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

//checks the score for organisation
score.organisation = function(school, role){
    var result = 0;
    //calculate the standard hours first
    var standardHours = Number(school.standard.management[role.key].hoursPerYear);
    //bereken het aantal extra uren
    var additionalHours = 0;
    if(school.countStudents>200) {
        additionalHours = Number(school.standard.management[role.key].additionalHours) * Math.ceil((school.countStudents - 200) / 100);
    }
    if(Number(role.hoursPerYear)>=(standardHours+additionalHours)){ 
        result = Number(school.standard.management[role.key].maxScore);
    } else {
        result = Number(role.hoursPerYear) * Number(school.standard.management[role.key].maxScore) / (standardHours + additionalHours);
    }
    return result;
};

score.calculate = function(school) {
    //define the output variable "result" of the function
    var result = {
        school: school.name,
        total: {
            hardware:0,
            software:0,
            competence: 0,
            management: 0
        },
        hardware: {
            goodComputers: 0,
            computersPerStudent: 0,
            goodDigitalSchoolbords: 0,
            digitalSchoolbordsPerClassroom: 0,
            network: 0,
            goodLaptops: 0,
            portableComputersPerSchool: 0
        },
        software: {
            math: 0,
            functionalReading: 0,
            receptiveReading: 0,
            orthography: 0,
            language: 0,
            keyboardSkills: 0,
            programming: 0,
            mediaLiteracy: 0,
            geography: 0,
            biology: 0,
            german: 0,
            economy: 0,
            english: 0,
            french: 0, 
            history: 0,  
            physics: 0, 
            dutch: 0, 
            chemistry: 0,
            mathematics: 0
        },
        competence: {
            competenceRating: 0,
            softwareRating: 0,
            support: 0,
            ictSkills: 0,
            pedagogicalDidacticalSkills: 0,
            workInSchoolContext: 0,
            personalDevelopment: 0,
            instrumentalSkills: 0,
            informationSkills: 0,
            mediaSkills: 0
        },
        management: {
            agreement: 0,
            network: 0,
            incidentReporter: 0,
            ictEducationalContentManager: 0,
            ictPurchaser: 0,
            systemAdministrator: 0
        },
        link: "#",
        standard: school.standard
    };
    if(typeof(school.standard)==undefined || !school.standard){
        return result;
    }
    if(school.countStudents && school.hardware && school.hardware.length>0) {
        //check computers per student
        result.hardware.computersPerStudent = score.computersPerStudent(school).computersPerStudent;
        result.hardware.goodComputers = score.computersPerStudent(school).goodComputers;
        //check digitale borden per lokaal
        result.hardware.goodDigitalSchoolbords = score.digitalSchoolbordsPerClassroom(school).goodDigitalSchoolbords;
        result.hardware.digitalSchoolbordsPerClassroom = score.digitalSchoolbordsPerClassroom(school).digitalSchoolbordsPerClassroom;
        //check network criteria
        result.hardware.network = score.network(school);
        //check portable computers per school criteria
        result.hardware.goodLaptops = score.portableComputersPerSchool(school).goodLaptops;
        result.hardware.portableComputersPerSchool = score.portableComputersPerSchool(school).portableComputersPerSchool;
        //end portable computers per school criteria
    }
    if(school.software && school.software.length>0){
        //PILLARS CHECK SOFTWARE
        var evaluatedSubjects = school.isSecondarySchool ? config.software.subjects.secondary : config.software.subjects.primary;
        evaluatedSubjects.forEach(function(subject){
            if(subject.isCore){
                result.software[subject.key] = score.software(school,subject);     
            }
        });
    }
    if(school.tests && school.competence){
        //DESKUNDIGHEID
        //check beoordeelde competence
        result.competence.competenceRating = score.competenceRating(school);
        //check gemiddelde effectiviteit
        result.competence.softwareRating = score.softwareRating(school);
        //check ondersteuning nodig
        result.competence.support = score.support(school);
    }
    if(school.users && school.users.length>0){
        //ICT Geletterdheid
        result.competence.ictSkills = score.averageTestResult(school, "1 - ICT Geletterdheid") * school.standard.competence.ictSkills.maxScore;
        //Pedagogisch Didactisch Handelen
        result.competence.pedagogicalDidacticalSkills = score.averageTestResult(school, "2 - Pedagogisch Didactisch Handelen") * school.standard.competence.pedagogicalDidacticalSkills.maxScore;
        //Werken in de schoolcontext
        result.competence.workInSchoolContext = score.averageTestResult(school, "3 - Werken in de schoolcontext") * school.standard.competence.workInSchoolContext.maxScore;
        //Persoonlijke ontwikkeling
        result.competence.personalDevelopment = score.averageTestResult(school, "4 - Persoonlijke Ontwikkeling") * school.standard.competence.personalDevelopment.maxScore;
        //instrumentele vaardigheden
        result.competence.instrumentalSkills = score.averageTestResult(school, "1 - Instrumentele vaardigheden") * school.standard.competence.instrumentalSkills.maxScore;
        //informationSkills
        result.competence.informationSkills = score.averageTestResult(school, "2 - Informatievaardigheden") * school.standard.competence.informationSkills.maxScore;
        //mediavaardigheid
        result.competence.mediaSkills = score.averageTestResult(school, "3 - Mediavaardigheden") * school.standard.competence.mediaSkills.maxScore;
    }
    if(school.management.roles[0].hoursPerYear>0){
        // ORGANISATIE
        //check if the management has reached agreement
        if(school.management.agreement){
            result.management.agreement = school.standard.management.agreement.maxScore;
        }
        //check if the school has good network control (3 x yes)
        if(school.management.networkAdjustment && school.management.networkProblemSolving && school.management.incidentReporting){
            result.management.network = school.standard.management.network.maxScore;
        }
        school.management.roles.forEach(function(role){
            if(role.hoursPerYear){
                result.management[role.key] = score.organisation(school, role)    
            } 
        })
    }
    //CALCULATE TOTALS
    result.total.hardware = 
                                result.hardware.computersPerStudent +
                                result.hardware.digitalSchoolbordsPerClassroom +
                                result.hardware.network +
                                result.hardware.portableComputersPerSchool;

    Object.keys(result.software).forEach(function(score){
        result.total.software += Number(result.software[score]);
    });
    Object.keys(result.competence).forEach(function(score){
        result.total.competence += Number(result.competence[score]);
    });
    Object.keys(result.management).forEach(function(score){
        result.total.management += Number(result.management[score]);
    });
    //round the main results
    result.total.hardware = Math.round(result.total.hardware*10)/10;
    result.total.software = Math.round(result.total.software*10)/10;
    result.total.competence = Math.round(result.total.competence*10)/10;
    result.total.management = Math.round(result.total.management*10)/10;
    //generate a link for Google forms to enable report generation
    result.link = score.generateLink(school, result);
return result;
};

score.generateLink = function (school, result){
    var link = "https://docs.google.com/forms/d/e/1FAIpQLScLmHY0sOJmHPE-O0pcLiR2QMxzCCDIE4kmMBJcgL33GzG6sA/viewform?usp=pp_url";
    //add school name
    link = link + "&entry.953788525=" + school.name;
    //add streetname
    link = link + "&entry.1741489727=" + school.streetName;
    //add postal code
    link = link + "&entry.175180849=" + school.postalCode;
    //add plaatsnaam
    link = link + "&entry.2084187720=" + school.city;
    //add aantal leerlingen
    link = link + "&entry.1408877389=" + school.countStudents;
    //add klaslokalen
    link = link + "&entry.567949032=" + school.countClassrooms;
    //add score hardware
    link = link + "&entry.1443199867=" + Math.round(result.total.hardware * 100)/100;
    //add score digitale leermiddelen
    link = link + "&entry.333564130=" + Math.round(result.total.software * 100)/100;
    //add score competence
    link = link + "&entry.1156000193=" + Math.round(result.total.competence *100)/100;
    //add score management
    link = link + "&entry.1792957960=" + Math.round(result.total.management *100)/100;
    //add number of good computers
    link = link + "&entry.1168798708=" + result.hardware.goodComputers;
    //add computers per leerling
    link = link + "&entry.576878619=" + Math.round(result.hardware.computersPerStudent * 1000)/10;
    //add norm computers per leerling
    link = link + "&entry.1112676173=" + Math.round(school.standard.hardware.computersPerStudent.standard * 1000)/10;
    //add maximum points computers
    link = link + "&entry.806407324=" + Math.round(school.standard.hardware.computersPerStudent.maxScore * 10)/10;
    //add points for computers per student
    link = link + "&entry.826280419=" + Math.round(result.hardware.computersPerStudent * 10)/10;
    //add digital schoolbords
    link = link + "&entry.1922550124=" + result.hardware.goodDigitalSchoolbords;
    //add normering digitale schoolborden
    link = link + "&entry.859087552=" + Math.round(school.standard.hardware.digitalSchoolbordsPerClassroom.standard * 1000)/10;
    //add maximum punten digitale schoolborden
    link = link + "&entry.1703122271=" + school.standard.hardware.digitalSchoolbordsPerClassroom.maxScore;
    //add behaalde punten digitale schoolborden
    link = link + "&entry.132617233=" + Math.round(result.hardware.digitalSchoolbordsPerClassroom *10)/10;
    //goed functionerend netwerk
    //WEET IK NIET
    //norm goed functionerend netwerk
    link = link + "&entry.1658184490=Goed zowel bedraad als wireless";
    //add maximale punten netwerk
    link = link + "&entry.304334536=" + school.standard.hardware.network.maxScore;
    // add behaalde punten netwerk
    link = link +"&entry.269571127=" + result.hardware.network;
    // add aantal goede laptops
    link = link + "&entry.1782504718=" + result.hardware.goodLaptops;
    // add norm aantal goede laptops
    link = link + "&entry.53666413=" + school.standard.hardware.laptopsPerSchool.standard;
    // add maximum punten laptops
    link = link + "&entry.583038646=" + school.standard.hardware.laptopsPerSchool.maxScore;
    // add behaalde punten laptops
    link = link + "&entry.957149065=" + result.hardware.portableComputersPerSchool;
    // add commentaar en aanbevelingen hardware
    //LEEG
    // add norm rekenen
    link = link + "&entry.981434836=Software aanwezig voor: " + school.standard.software.math.gradeLevels;
    // add maximum punten rekenen
    link = link + "&entry.2102353953=" + school.standard.software.math.maxScore;
    // add behaalde punten rekenen
    link = link + "&entry.1814421759=" + result.software.math;
    // add norm technisch lezen
    link = link + "&entry.256813647=Software aanwezig voor: " + school.standard.software.functionalReading.gradeLevels;
    // add maximum punten technisch lezen 
    link = link + "&entry.1471802274=" + school.standard.software.functionalReading.maxScore;
    // add behaalde punten technisch lezen
    link = link + "&entry.919185926=" + result.software.functionalReading;
    // add norm begrijpend lezen
    link = link + "&entry.746014799=Software aanwezig voor: " + school.standard.software.receptiveReading.gradeLevels;
    // add maximum punten begrijpend lezen
    link = link + "&entry.1332213780=" + school.standard.software.receptiveReading.maxScore;
    // add behaalde punten begrijpend lezen
    link = link + "&entry.1808518925=" + result.software.receptiveReading;
    // add norm spelling
    link = link + "&entry.236935133=Software aanwezig voor: " + school.standard.software.orthography.gradeLevels;
    // add maximum punten spelling
    link = link + "&entry.855895981=" + school.standard.software.orthography.maxScore;
    // add behaalde punten spelling
    link = link + "&entry.1580913399=" + result.software.orthography;
    // add norm taal
    link = link + "&entry.852030879=Software aanwezig voor: " + school.standard.software.language.gradeLevels;
    // add maximum punten taal
    link = link + "&entry.172236022=" + school.standard.software.language.maxScore;
    // add behaalde punten taal
    link = link + "&entry.495845556=" + result.software.language;
    // add norm toetsenbordvaardigheid
    link = link + "&entry.515611439=Software aanwezig voor: " + school.standard.software.keyboardSkills.gradeLevels;
    // add maximum punten toetsenbordvaardigheid
    link = link + "&entry.1072111236=" + school.standard.software.keyboardSkills.maxScore;
    // add behaalde punten toetsenbordvaardigheid
    link = link + "&entry.610536905=" + result.software.keyboardSkills;
    // add norm programmeren
    link = link + "&entry.358140914=Software aanwezig voor: " + school.standard.software.programming.gradeLevels;
    // add maximum punten programmeren
    link = link + "&entry.1496499995=" + school.standard.software.programming.maxScore;
    // add behaalde punten programmeren
    link = link + "&entry.213984396=" + result.software.programming;
    // add norm mediawijsheid
    link = link + "&entry.1996120361=Software aanwezig voor: " + school.standard.software.mediaLiteracy.gradeLevels;
    // add maximum punten mediawijsheid
    link = link + "&entry.1636856887=" + school.standard.software.mediaLiteracy.maxScore;
    // add behaalde punten mediawijsheid
    link = link + "&entry.250864707=" + result.software.mediaLiteracy;
    // Commentaar digitale leermiddelen overgeslagen
    // add norm beoordeelde competence
    link = link + "&entry.1795064360=" + school.standard.competence.competenceRating.standard;
    // add maximumscore beoordeelde competence
    link = link + "&entry.1881446672=" + school.standard.competence.competenceRating.maxScore;
    // add behaalde punten beoordeelde competence
    link = link + "&entry.1465039664=" + Math.round(result.competence.competenceRating*100)/100;
    // add norm ondersteuning nodig
    link = link + "&entry.150943780=" + school.standard.competence.support.standard;
    // add maximum punten ondersteuning nodig
    link = link + "&entry.189457267=" + school.standard.competence.support.maxScore;
    // add behaalde punten ondersteuning nodig
    link = link + "&entry.1473449186=" + Math.round(result.competence.support*100)/100;
    // add norm gemiddelde effectiviteit
    link = link + "&entry.1693589537=" + school.standard.competence.softwareRating.standard;
    // add maximum punten gemiddelde effectiviteit
    link = link + "&entry.881247456=" + school.standard.competence.softwareRating.maxScore;
    // add behaalde punten gemiddelde effectiviteit
    link = link + "&entry.957904447=" + Math.round(result.competence.softwareRating*100)/100;
    // add maximum punten ict geletterdheid
    link = link + "&entry.1758323592=" + school.standard.competence.ictSkills.maxScore;
    // add behaalde punten ict geletterdheid
    link = link + "&entry.1619556793=" + Math.round(result.competence.ictSkills*100)/100;
    // add maximum punten pedagogisch didactisch handelen
    link = link + "&entry.1451364700=" + school.standard.competence.pedagogicalDidacticalSkills.maxScore;
    // add behaalde punten pedagogisch didactisch handelen
    link = link + "&entry.1859745088=" + Math.round(result.competence.pedagogicalDidacticalSkills*100)/100;
    // add maximum punten werken in schoolcontext
    link = link + "&entry.1351167981=" + school.standard.competence.workInSchoolContext.maxScore;
    // add behaalde punten werken in schoolcontext
    link = link + "&entry.139397010=" + Math.round(result.competence.workInSchoolContext*100)/100;
    // add maximum punten persoonlijke ontwikkeling
    link = link + "&entry.1425717852=" + school.standard.competence.personalDevelopment.maxScore;
    // add behaalde punten persoonlijke ontwikkeling
    link = link + "&entry.245857129=" + Math.round(result.competence.personalDevelopment*100)/100;
    // add norm overeenstemming
    link = link + "&entry.1609604763=Er is overeenstemming";
    // add maximum punten overeenstemming
    link = link + "&entry.104211716=" + school.management.agreement.maxScore;
    // add behaalde punten overeenstemming
    link = link + "&entry.1010607763=" + Math.round(result.management.agreement*100)/100;
    // add norm networkder
    link = link + "&entry.2043717862=Drie vragen network positief beantwoord";
    // add maximum punten networkder
    link = link + "&entry.1293847054=" + school.standard.management.network.maxScore;
    // add behaalde punten network
    link = link + "&entry.574310292=" + Math.round(result.management.network*100)/100;
    // add norm ict incidentReporter
    // link = link + "&entry.144283806=standaard: " + school.management.incidentReporter.hoursPerYear 
    //                         + " extra: " + school.management.incidentReporter.additionalHoursPerYear;
    // // add maximum punten ICT incidentReporter
    // link = link + "&entry.186744948=" + school.management.incidentReporter.maxScore;
    // // add behaalde punten ICT Incidentmelder
    // link = link + "&entry.554137846=" + Math.round(result.management.incidentReporter * 100)/100;
    // // add norm onderwijskundig ICT'er
    // link = link + "&entry.1499110767=standaard:" + school.management.ictEducationalContentManager.hoursPerYear
    //                         + " extra: " + school.management.ictEducationalContentManager.additionalHoursPerYear;
    // // add maximum punten onderwijskundig ICT'er
    // link = link + "&entry.921727624=" + school.management.ictEducationalContentManager.maxScore;
    // // add behaalde punten onderwijskundig ICT'er
    // link = link + "&entry.1105626580=" + Math.round(result.management.ictEducationalContentManager *100)/100;
    // // add norm ICT inkoper
    // link = link + "&entry.1266514313=standaard:" + school.management.ictPurchaser.hoursPerYear
    //                         + " extra: " + school.management.ictPurchaser.additionalHoursPerYear;
    // // add maximum punten ICT inkoper
    // link = link + "&entry.1686565580=" + school.management.ictPurchaser.maxScore;
    // // add behaalde punten ICT inkoper
    // link = link + "&entry.414594386=" + Math.round(result.management.ictPurchaser*100)/100;
    //vervang de spaties met +
    return link.split(' ').join('+');
}

module.exports = score;