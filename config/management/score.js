var config = require('../config');
var managementScore = {};

//checks the score for organisation
managementScore.organisation = function(school, role){
    var result = {result: 0, error: null};
    //check or override the standards first
    let hoursPerYear = school.standard.management[role.key].hoursPerYear ? 
    						Number(school.standard.management[role.key].hoursPerYear) :
    							Number(config.management.standards[role.key].hoursPerYear);
	let additionalHoursPerYear = school.standard.management[role.key].additionalHoursPerYear ? 
    						Number(school.standard.management[role.key].additionalHoursPerYear) :
    							Number(config.management.standards[role.key].additionalHoursPerYear);
    let maxScore = school.standard.management[role.key].maxScore ? 
    						Number(school.standard.management[role.key].maxScore) :
    							Number(config.management.standards[role.key].maxScore);
    if(!school.standard.management[role.key].hoursPerYear || !school.standard.management[role.key].additionalHoursPerYear ||
    				!school.standard.management[role.key].maxScore){
    	result.error = "Waarschuwing: normering voor " + role.role + " is niet goed ingesteld of ingesteld op 0 uur."
    }
    var standardHours = hoursPerYear;
    //bereken het aantal extra uren
    var additionalHours = 0;
    if(school.countStudents>200) {
        additionalHours = additionalHoursPerYear * Math.ceil((school.countStudents - 200) / 100);
    }
    if(role.hours>=(standardHours+additionalHours)){ 
        result.result = maxScore;
    } else {
        result.result = role.hours * maxScore / (standardHours + additionalHours);
    }
    return result;
};

module.exports = managementScore;