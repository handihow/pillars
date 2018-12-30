var config = require('../config');
var competenceScore = {};

//checks competence criterium rated competence
competenceScore.competenceRating = function(school){
    var result = {result: 0, error: null};
    if(!school.standard.competence.competenceRating){
        result.error = "Waarschuwing: standaard voor beoordeelde deskundigheid lijkt niet goed ingesteld."
    }
    //check if the standard is set, otherwise override with standard settings
    let minimumRating = school.standard.competence.competenceRating.standard ? 
                    school.standard.competence.competenceRating.standard :
                        config.competence.standards.competenceRating.standard;
    let maximumScore = school.standard.competence.competenceRating.maxScore ? 
                    school.standard.competence.competenceRating.maxScore :
                        config.competence.standards.competenceRating.maxScore;
    if(Number(school.competence.teachers)>=Number(minimumRating)){
        result.result = Number(maximumScore);
    }      
    return result;
};

//checks competence criterium software rating
competenceScore.softwareRating = function(school){
    var result = {result: 0, error: null};
    if(!school.standard.competence.softwareRating){
        result.error = "Waarschuwing: standaard voor gemiddelde effectiviteit software lijkt niet goed ingesteld."
    }
    //check if the standard is set, otherwise override with standard settings
    let minimumRating = school.standard.competence.softwareRating.standard ? 
                    school.standard.competence.softwareRating.standard :
                        config.competence.standards.softwareRating.standard;
    let maximumScore = school.standard.competence.softwareRating.maxScore ? 
                    school.standard.competence.softwareRating.maxScore :
                        config.competence.standards.softwareRating.maxScore;
    if(school.competence.effectiveness>=Number(minimumRating)){
        result.result = Number(maximumScore);
    }
    return result;
};

//checks criterium if support is needed
competenceScore.support = function(school){
    var result = {result: 0, error: null};
    //check if the standard is set, otherwise override with standard settings
    let maximumScore = school.standard.competence.support.maxScore ? 
                    school.standard.competence.support.maxScore :
                        config.competence.standards.support.maxScore;
    if(!school.competence.support){
        result.result = Number(maximumScore);
    }
    if(isNaN(result.result || typeof result.result !== 'number')){
        result.error = "Probleem bij het berekenen van de score van het criterium ondersteuning nodig";
        result.result = 0;
        return result;
    } else {
        return result;
    }
};

//checks the resulting average score from tests
competenceScore.averageTestResult = function(school, subject){
    var total = 0;
    var count = 0;
    var result = {result: 0, error: null};
    let subjectKey = subject.key;
    //check if the standard is set, otherwise override with standard settings
    let maximumScore = school.standard.competence[subjectKey].maxScore ? 
                            school.standard.competence[subjectKey].maxScore :
                                config.competence.standards[subjectKey].maxScore;
    school.tests.forEach(function(test){
        if(test.subject === subject.topic){
            total = total + test.result;
            count ++;
        }
    });
    if(count > 0){
        result.result = (total / count) * maximumScore;
    }
    if(isNaN(result.result || typeof result.result !== 'number')){
        result.error = "Probleem bij het berekenen van de score van het criterium test op onderdeel " + subject.topic;
        result.result = 0;
        return result;
    } else {
        return result;
    }
};

module.exports = competenceScore;