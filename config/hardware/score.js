var config = require('../config');
var hardwareScore = {};

hardwareScore.computersPerStudent = function(school){
  //first, check if all variables are known to start the calculation
  var result = {goodComputers: 0, computersPerStudent: 0, error: null};
  var standard = checkStandardComputersPerStudent(school);
  var countGoodComputers = 0;
  school.hardware.forEach(function(hardware){
    if(standard.isComputer.includes(hardware.type) && 
          ( hardware.memory >= standard.minRAM || 
            hardware.deploymentYear >= (new Date()).getFullYear() - standard.maxYear)) {
        if(hardware.type=="Multipoint computer" && hardware.numberWorkPlacesMultipoint) {
          countGoodComputers = countGoodComputers + hardware.numberWorkPlacesMultipoint; 
        } else {
          countGoodComputers++;
        }
      }
  });
  result.goodComputers = countGoodComputers;
  var normComputers = school.countStudents * Number(standard.standard);
  if(countGoodComputers >= normComputers) {
    result.computersPerStudent = Number(standard.maxScore);
  } else {
    result.computersPerStudent = Number(standard.maxScore) * countGoodComputers / normComputers;  
  }
  if(isNaN(result.computersPerStudent || typeof result.computersPerStudent !== 'number')){
  	result.error = "Probleem bij het berekenen van de score van het criterium computers per leerling";
  	result.computersPerStudent = 0;
  	return result;
  } else {
  	return result;
  }
};

checkStandardComputersPerStudent = function(school){
	var standard = {}
	Object.keys(config.hardware.standards.computersPerStudent).forEach(function(key){
		standard[key] = school.standard.hardware.computersPerStudent[key] ?
							school.standard.hardware.computersPerStudent[key] :
								config.hardware.standards.computersPerStudent[key]
	});
	return standard;
}

//checks digitale schoolborden per lokaal criteria
hardwareScore.digitalSchoolbordsPerClassroom = function(school){
    var result = {goodDigitalSchoolbords: 0, digitalSchoolbordsPerClassroom: 0, error: null};
    var standard = checkStandardDigitalSchoolbordsPerClassroom(school);
    var countGoodDigibord = 0;
    school.hardware.forEach(function(hardware){
        if(hardware.type==="Digitaal schoolbord" 
            && ((hardware.isTouchscreenDigibord || 0) >= (standard.isTouchscreen || 0))
            && hardware.deploymentYear >= (new Date()).getFullYear() - standard.maxYear) {
            countGoodDigibord ++;
	    }
	});
    result.goodDigitalSchoolbords = countGoodDigibord;
    var normDigibord = school.countClassrooms * Number(standard.standard);
    if(countGoodDigibord > normDigibord){
      result.digitalSchoolbordsPerClassroom = Number(standard.maxScore);
  } else {
      result.digitalSchoolbordsPerClassroom = Number(standard.maxScore) * countGoodDigibord / normDigibord;          
  }
  if(isNaN(result.digitalSchoolbordsPerClassroom || typeof result.digitalSchoolbordsPerClassroom !== 'number')){
  	result.error = "Probleem bij het berekenen van de score van het criterium digitale schoolborden per klas";
  	result.computersPerStudent = 0;
  	return result;
  } else {
  	return result;
  }
};

checkStandardDigitalSchoolbordsPerClassroom = function(school){
	var standard = {}
	Object.keys(config.hardware.standards.digitalSchoolbordsPerClassroom).forEach(function(key){
		standard[key] = school.standard.hardware.digitalSchoolbordsPerClassroom[key] ?
							school.standard.hardware.digitalSchoolbordsPerClassroom[key] :
								config.hardware.standards.digitalSchoolbordsPerClassroom[key]
	});
	return standard;
}

//checks the network criterium
hardwareScore.network = function(school){
    var result = 0;
    if(school.network.wired && school.network.wireless){
        result = Number(school.standard.hardware.network.maxScore);
    }
    return result;
};

//checks portable computers per school criterium
hardwareScore.portableComputersPerSchool = function(school){
    var result = {goodLaptops: 0, portableComputersPerSchool: 0, error: null};
    var standard = checkStandardPortableComputersPerSchool(school);
    var countGoodPortableComputers = 0;
    school.hardware.forEach(function(hardware){
        if(standard.isLaptop.includes(hardware.type) && 
          ( hardware.memory >= standard.minRAM || 
            hardware.deploymentYear >= (new Date()).getFullYear() - standard.maxYear)) {
          countGoodPortableComputers++;
	  }
	});
    result.goodLaptops = countGoodPortableComputers;
    var normPortableComputers = Number(standard.standard);
    if(countGoodPortableComputers >= normPortableComputers){
        result.portableComputersPerSchool = Number(standard.maxScore);
    } else {
        result.portableComputersPerSchool = Number(standard.maxScore) * countGoodPortableComputers / normPortableComputers;
    }
    if(isNaN(result.portableComputersPerSchool || typeof result.portableComputersPerSchool !== 'number')){
	  	result.error = "Probleem bij het berekenen van de score van het criterium laptops per school";
	  	result.computersPerStudent = 0;
	  	return result;
	} else {
	  	return result;
	}
};

checkStandardPortableComputersPerSchool = function(school){
	var standard = {}
	Object.keys(config.hardware.standards.laptopsPerSchool).forEach(function(key){
		standard[key] = school.standard.hardware.laptopsPerSchool[key] ?
							school.standard.hardware.laptopsPerSchool[key] :
								config.hardware.standards.laptopsPerSchool[key]
	});
	return standard;
}


module.exports = hardwareScore;