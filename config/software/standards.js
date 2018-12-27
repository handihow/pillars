var subjects = require('./subjects');

var standards = {};

standards.primary = {};

////////////////////////////////////////////
// primary education  					///
///////////////////////////////////////////

subjects.primary.core.forEach(function(subject){
	standards.primary[subject.key] = {
		subject: subject.subject,
		maxScore: subject.maxScore,
		minRating: subject.minRating,
		gradeLevels: subject.gradeLevels,
		functionalities: subject.functionalities
	}	
});

////////////////////////////////////////////
// secondary education					///
///////////////////////////////////////////

standards.secondary = {};

subjects.secondary.core.forEach(function(subject){
	standards.secondary[subject.key] = {
		subject: subject.subject,
		maxScore: subject.maxScore,
		minRating: subject.minRating,
		gradeLevels: subject.gradeLevels,
		functionalities: subject.functionalities
	}	
});

module.exports = standards;