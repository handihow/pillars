var score = {};
var config = require('./config');
var hardwareScore = require('./hardware/score');
var softwareScore = require('./software/score');
var competenceScore = require('./competence/score');
var managementScore = require('./management/score');

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
        standard: school.standard,
        errors: []
    };
    if(typeof(school.standard)==undefined || !school.standard){
        result.errors.push("Geen normering gevonden bij deze school. Pillars score is niet berekend.");
        return result;
    }
    if(school.countStudents && school.hardware && school.hardware.length>0) {
        //check computers per student
        let computersPerStudent = hardwareScore.computersPerStudent(school);
        result.hardware.computersPerStudent = computersPerStudent.computersPerStudent;
        result.hardware.goodComputers = computersPerStudent.goodComputers;
        if(computersPerStudent.error){
            result.errors.push(computersPerStudent.error);
        }
        //check digitale borden per lokaal
        let digitalSchoolbordsPerClassroom = hardwareScore.digitalSchoolbordsPerClassroom(school);
        result.hardware.goodDigitalSchoolbords = digitalSchoolbordsPerClassroom.goodDigitalSchoolbords;
        result.hardware.digitalSchoolbordsPerClassroom = digitalSchoolbordsPerClassroom.digitalSchoolbordsPerClassroom;
        if(digitalSchoolbordsPerClassroom.error){
            result.errors.push(digitalSchoolbordsPerClassroom.error);
        }
        //check network criteria
        result.hardware.network = hardwareScore.network(school);
        //check portable computers per school criteria
        let portableComputersPerSchool = hardwareScore.portableComputersPerSchool(school);
        result.hardware.goodLaptops = portableComputersPerSchool.goodLaptops;
        result.hardware.portableComputersPerSchool = portableComputersPerSchool.portableComputersPerSchool;
        if(portableComputersPerSchool.error){
            result.errors.push(portableComputersPerSchool.error);
        }
        //end portable computers per school criteria
    } else {
        result.errors.push("Algemene gegevens niet compleet of geen hardware ingevoerd. Hardware score is niet berekend.")
    }
    if(school.software && school.software.length>0){
        //PILLARS CHECK SOFTWARE
        var evaluatedSubjects = school.isSecondarySchool ? config.software.subjects.secondary : config.software.subjects.primary;
        evaluatedSubjects.forEach(function(subject){
            if(subject.isCore){
                let resultingScore = softwareScore.software(school,subject);
                result.software[subject.key] = resultingScore.result;
                if(resultingScore.error){
                    result.errors.push(resultingScore.error);
                }     
            }
        });
    } else {
        result.errors.push("Geen digitale leermiddelen ingevoerd. Digitale leermiddelen score is niet berekend.")
    }
    if(school.tests && school.tests.length>0){
        //DESKUNDIGHEID
        //check rated competence
        let newCompetenceRating = competenceScore.competenceRating(school);
        result.competence.competenceRating = newCompetenceRating.result;
        if(newCompetenceRating.error){
            result.errors.push(newCompetenceRating.error)
        }
        //check effectiveness of software
        let newSoftwareRating = competenceScore.softwareRating(school)
        result.competence.softwareRating = newSoftwareRating.result;
        if(newSoftwareRating.error){
            result.errors.push(newSoftwareRating.error)
        }
        //check support needed
        let newSupportRating = competenceScore.support(school);
        result.competence.support = newSupportRating.result;
        if(newSupportRating.error){
            result.errors.push(newSupportRating.error);
        }
        //check the test results
        config.competence.questionnaire.topics.forEach(function(topic){
            let newTestResult = competenceScore.averageTestResult(school, topic)
            result.competence[topic.key] = newTestResult.result;
            if(newTestResult.error){
                result.errors.push(newTestResult.error);
            }
        })
    } else {
        result.errors.push("Geen tests ingevoerd. Score voor deskundigheid is niet berekend.")
    }
    if(school.management.roles[0].hours>0){
        // ORGANISATIE
        //check if the management has reached agreement
        if(school.management.agreement){
            result.management.agreement = school.standard.management.agreement.maxScore ?
                                                Number(school.standard.management.agreement.maxScore) :
                                                    Number(config.management.standards.agreement.maxScore);
        }
        //check if the school has good network control (3 x yes)
        if(school.management.networkAdjustment && school.management.networkProblemSolving && school.management.incidentReporting){
            result.management.network = school.standard.management.network.maxScore ? 
                                            Number(school.standard.management.network.maxScore) :
                                                Number(config.management.standards.network.maxScore);
        }
        school.management.roles.forEach(function(role){
            let newRoleResult = managementScore.organisation(school, role)
            result.management[role.key] = newRoleResult.result;
            if(newRoleResult.error){
                result.errors.push(newRoleResult.error);
            } 
        })
    } else {
        result.errors.push("Gegevens van organisatie zijn niet compleet. Score organisatie is niet berekend.")
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
        console.log(score);
        console.log(result.competence[score]);
        result.total.competence += Number(result.competence[score]);
    });
    Object.keys(result.management).forEach(function(score){
        result.total.management += Number(result.management[score]);
    });
    console.log(result.total.competence);
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