var standards = {};
var roles = require('./roles');

//STANDARD 1 - AGREEMENT AND VISION
standards.agreement = {
	maxScore: 1
}

//STANDARD 2 - NETWORK
standards.network = {
	maxScore: 1
}

//STANDARDS FOR EACH ROLE IN THE ICT MANAGEMENT ORGANISATION		
roles.forEach(function(role){
	standards[role.key] = {
		maxScore: role.maxScore,
		hoursPerYear: role.hoursPerYear,
		additionalHoursPerYear: role.additionalHoursPerYear
	}
});

module.exports = standards;
