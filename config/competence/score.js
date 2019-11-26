var config = require('../config');
var competenceScore = {};

//checks competence criterium rated competence
competenceScore.competenceRating = function(school){
    var result = {result: 0, error: null};
    //check if the standard is set, otherwise override with standard settings
    let maximumScore = school.standard.competence.competenceRating ? school.standard.competence.competenceRating.maxScore : undefined;
    if(typeof maximumScore !== 'undefined' && maximumScore>0){
        result.error = "Er is een score toegekend aan het criterium beoordeelde deskundigheid. Dit criterium is niet meer van toepassing.";
        return result;
    } else {
        return result;
    }
};

//checks competence criterium software rating
competenceScore.softwareRating = function(school){
    var result = {result: 0, error: null};
    //check if the standard is set, otherwise override with standard settings
    let maximumScore = school.standard.competence.softwareRating ? school.standard.competence.softwareRating.maxScore : undefined;
    if(typeof maximumScore !== 'undefined' && maximumScore>0){
        result.error = "Er is een score toegekend aan het criterium effectiviteit digitale leermiddelen. Dit criterium is niet meer van toepassing.";
        return result;
    } else {
        return result;
    }
};

//checks criterium if support is needed
competenceScore.support = function(school){
    var result = {result: 0, error: null};
    //check if the standard is set, otherwise override with standard settings
    let maximumScore = school.standard.competence.support ? school.standard.competence.support.maxScore : undefined;
    if(typeof maximumScore !== 'undefined' && maximumScore>0){
        result.error = "Er is een score toegekend aan het criterium ondersteuning nodig. Dit criterium is niet meer van toepassing.";
        return result;
    } else {
        return result;
    }
};

//checks the resulting average score from tests
competenceScore.averageTestResult = function(school, identifier, surveyResults){
    var total = 0;
    var count = 0;
    var result = {result: 0, error: null};
    //check if the standard is set, otherwise override with standard settings
    let maximumScore = school.standard.competence[identifier] && school.standard.competence[identifier].maxScore ? 
                            school.standard.competence[identifier].maxScore :
                                config.competence.standards[identifier].maxScore;
    surveyResults.forEach(function(surveyResult){
        if(surveyResult.competenceStandardKey === identifier){
            total = total + surveyResult.score;
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