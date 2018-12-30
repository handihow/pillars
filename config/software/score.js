var config = require('../config');
var softwareScore = {};

//checks software criteria
softwareScore.software = function(school, subject){
    var result = {result: 0, error: null};
    //check if the standards for this criterium exist, or override with the standard configuration
    var standard = checkSoftwareStandard(school, subject);
    //start checking
    var groupedSoftware = new Set();
    //first, combine all the software from the course
    school.software.forEach(function(software){
        //check if the software is for this course and quality is sufficient
        if(software.subject === subject.subject) {    
                //if so, add to the group of software (values are unique because of the use of SET)
                software.gradeLevels.forEach(function(gradeLevel){
                    groupedSoftware.add(gradeLevel);
                });
                software.functionalities.forEach(function(functionality){
                    groupedSoftware.add(functionality);
                });
                software.ratings.forEach(function(rating){
                    groupedSoftware.add(rating);
                })
            }
        });
    var groupCriterium = false;
    var functionCriterium = false;
    var ratingCriterium = false;
    // check if the software has all required groups 
    var count = 0;
    standard.gradeLevels.forEach(function(gradeLevel,i,arr){
        if(groupedSoftware.has(gradeLevel)){
            count++;
        }
        if(count === arr.length) {
            groupCriterium = true;
        }
    });
    //check if the software has all functions
    var count2 = 0;
    standard.functionalities.forEach(function(functionality,i,arr){
        if(groupedSoftware.has(functionality)){
            count2++;
        }
        if(count2 === arr.length) {
            functionCriterium = true;
        }
    });
    //check if the software has all ratings
    var count3 = 0;
    config.software.ratings.forEach(function(rating,i,arr){
        if(groupedSoftware.has(rating)){
            count3++;
        }
        if((count3 / arr.length) >= standard.minRating) {
            ratingCriterium = true;
        }
    });
    //if both criteria are met, give the maximum points
    if(groupCriterium && functionCriterium && ratingCriterium) {
        result.result = Number(standard.maxScore);
    }
    if(isNaN(result.result || typeof result.result !== 'number')){
	  	result.error = "Probleem bij het berekenen van de score van het criterium van software " + subject.subject;
	  	result.result = 0;
	  	return result;
	} else {
	  	return result;
	}
};

checkSoftwareStandard = function(school, subject){
	var standard = {}
	let subjectKey = subject.key;
	let standardConfig = school.isSecondarySchool ? 
								config.software.standards.secondary[subjectKey] : 
									config.software.standards.primary[subjectKey];
	Object.keys(standardConfig).forEach(function(key){
		standard[key] = school.standard.software[subjectKey][key] ?
							school.standard.software[subjectKey][key] :
								standardConfig[key]
	});
	return standard;
}

module.exports = softwareScore;