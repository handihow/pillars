var types = require('./types');
var standards = {};

//STANDARD 1 - COMPUTERS PER STUDENT
standards.computersPerStudent = {
	maxScore: 1.5,
	standard: 0.2,
	maxYear: 5,
	isComputer: types.computers(),
	minRAM: 4
}

//STANDARD 2 - DIGITAL BORDS PER CLASSROOM
standards.digitalSchoolbordsPerClassroom = {
	maxScore: 1.5,
	standard: 1,
	isTouchscreen: true,
	maxYear: 5
}

//STANDARD 3 - GOOD NETWORK CONNECTION
standards.network = {
	maxScore: 1
}

//STANDARD 4 - LAPTOP COMPUTERS PER SCHOOL
standards.laptopsPerSchool = {
	maxScore: 1,
	standard: 30,
	maxYear: 5,
	isLaptop: types.laptops()
}


module.exports = standards;