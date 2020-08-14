var score = {};
var config = require('./config');
var hardwareScore = require('./hardware/score');
var softwareScore = require('./software/score');
var competenceScore = require('./competence/score');
var managementScore = require('./management/score');

score.calculate = function(school, surveyResults, onlyHardware) {
    if (typeof surveyResults === 'undefined') { surveyResults = []; }
    if (typeof onlyHardware === 'undefined') { onlyHardware = false; }

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
            goodComputers: [0,0,0,0,0],
            requiredComputers: 0,
            missingComputers: [0,0,0,0,0],
            computersPerStudent: 0,
            goodDigitalSchoolbords: [0,0,0,0,0],
            requiredDigitalSchoolbords: 0,
            missingDigitalSchoolbords: [0,0,0,0,0],
            digitalSchoolbordsPerClassroom: 0,
            network: 0,
            goodLaptops: [0,0,0,0,0],
            requiredLaptops: 0,
            missingLaptops: [0,0,0,0,0],
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
            mediaSkills: 0,
            assessmentForm: 0,
            rubric: 0,
            podd: 0,
            ddl: 0
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
        result.hardware.requiredComputers = computersPerStudent.requiredComputers;
        result.hardware.missingComputers = computersPerStudent.missingComputers;
        if(computersPerStudent.error){
            result.errors.push(computersPerStudent.error);
        }
        //check digitale borden per lokaal
        let digitalSchoolbordsPerClassroom = hardwareScore.digitalSchoolbordsPerClassroom(school);
        result.hardware.goodDigitalSchoolbords = digitalSchoolbordsPerClassroom.goodDigitalSchoolbords;
        result.hardware.requiredDigitalSchoolbords = digitalSchoolbordsPerClassroom.requiredDigitalSchoolbords;
        result.hardware.missingDigitalSchoolbords = digitalSchoolbordsPerClassroom.missingDigitalSchoolbords;
        result.hardware.digitalSchoolbordsPerClassroom = digitalSchoolbordsPerClassroom.digitalSchoolbordsPerClassroom;
        if(digitalSchoolbordsPerClassroom.error){
            result.errors.push(digitalSchoolbordsPerClassroom.error);
        }
        //check network criteria
        result.hardware.network = hardwareScore.network(school);
        //check portable computers per school criteria
        let portableComputersPerSchool = hardwareScore.portableComputersPerSchool(school);
        result.hardware.goodLaptops = portableComputersPerSchool.goodLaptops;
        result.hardware.requiredLaptops = portableComputersPerSchool.requiredLaptops;
        result.hardware.missingLaptops = portableComputersPerSchool.missingLaptops;
        result.hardware.portableComputersPerSchool = portableComputersPerSchool.portableComputersPerSchool;
        if(portableComputersPerSchool.error){
            result.errors.push(portableComputersPerSchool.error);
        }
        //end portable computers per school criteria
    } else {
        result.errors.push("Algemene gegevens niet compleet of geen hardware ingevoerd. Hardware score is niet berekend.")
    }
    if(!onlyHardware && school.software && school.software.length>0){
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
    } else if(!onlyHardware){
        result.errors.push("Geen digitale leermiddelen ingevoerd. Digitale leermiddelen score is niet berekend.")        
    }
    if(!onlyHardware && surveyResults.length > 0){
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
        config.competence.survey.competenceCategories.forEach(function(category){
            let newTestResult = competenceScore.averageTestResult(school, category.identifier, surveyResults)
            result.competence[category.identifier] = newTestResult.result;
            if(newTestResult.error){
                result.errors.push(newTestResult.error);
            }
        })
    } else if(!onlyHardware){
        result.errors.push("Geen tests ingevoerd. Score voor deskundigheid is niet berekend.")
    }
    if(!onlyHardware && school.management.roles[0].hours>0 || school.management.agreement || school.management.networkAdjustment ||
            school.management.networkProblemSolving || school.management.incidentReporting){
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
    } else if(!onlyHardware){
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
    // result.link = score.generateLink(school, result);
    return result;
};


module.exports = score;