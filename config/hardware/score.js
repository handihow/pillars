var config = require('../config');
var hardwareScore = {};

hardwareScore.calculateHardwareStatus = function(school){
  let trackedHardware = config.hardware.types.filter(h => school.settings.hardware.findIndex(hw => hw.singular === h.singular && hw.track) > -1);
  trackedHardware.forEach(type => {
    type.count = 0;
    type.countLowSpecifications = 0;
    type.countDepreciated = 0;
    type.countDepreciatedNextYear = 0;
    type.hasMemoryCriterium = false;
  });
  school.hardware.forEach(function(hardware){
    let index = trackedHardware.findIndex(h => h.singular === hardware.type);
    if(index>-1){
       if(hardware.type==="Multipoint computer" && !isNaN(hardware.numberWorkPlacesMultipoint)){
          trackedHardware[index].count += hardware.numberWorkPlacesMultipoint;
        } else {
          trackedHardware[index].count += 1;
        }
    }
    //set warnings and calculate the number of devices out of spec
    if(school.standard && index>-1){
      if(school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type)){
        trackedHardware[index].hasMemoryCriterium = true;
      }
      if(school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
              hardware.memory < school.standard.hardware.computersPerStudent.minRAM){
          hardware.isDepreciated = true;
          hardware.warning = "Te weinig werkgeheugen";
          trackedHardware[index].countLowSpecifications += 1;
      } else if(hardware.deploymentYear < (new Date()).getFullYear() - school.standard.hardware.computersPerStudent.maxYear) {
          hardware.isDepreciated = true;
          hardware.warning = "Apparaat is te oud";
          trackedHardware[index].countDepreciated += 1;
          trackedHardware[index].countDepreciatedNextYear += 1;
      } else if(hardware.deploymentYear < (new Date()).getFullYear() - school.standard.hardware.computersPerStudent.maxYear + 1) {
          hardware.isDepreciated = true;
          hardware.warning = "Apparaat is volgend jaar afgeschreven";
          trackedHardware[index].countDepreciatedNextYear += 1;
      } else if(hardware.type==="Multipoint computer" && !hardware.numberWorkPlacesMultipoint){
        hardware.isDepreciated = true;
        hardware.warning = "Aantal werkplekken multipoint is niet gedefinieerd";
      }
    }
  });
  return trackedHardware;
}

hardwareScore.computersPerStudent = function(school){
  var result = {
    goodComputers: [],
    missingComputers: [],
    requiredComputers: 0, 
    computersPerStudent: 0, 
    error: null
  };
  //first, check if all variables are known to start the calculation
  var standard = checkStandardComputersPerStudent(school);
  var countGoodComputers = [0,0,0,0,0];
  school.hardware.filter(h => h.functionsAs !== 'Medewerker device' || h.functionsAs !== 'Directie device').forEach(function(hardware){
     [0,1,2,3,4].forEach(function(number){
       if(standard.isComputer.includes(hardware.type) && 
            hardware.memory >= standard.minRAM && 
              hardware.deploymentYear >= (new Date()).getFullYear() - standard.maxYear + number) {
          if(hardware.type=="Multipoint computer" && hardware.numberWorkPlacesMultipoint) {
            countGoodComputers[number] = countGoodComputers[number] + hardware.numberWorkPlacesMultipoint; 
          } else {
            countGoodComputers[number] = countGoodComputers[number] + 1;
          }
        }
     })
  });
  var normComputers = school.countStudents * Number(standard.standard);
  result.requiredComputers = Math.round(normComputers);
  [0,1,2,3,4].forEach(function(number, i){
    result.goodComputers.push(countGoodComputers[number]);
    if(i === 0 && result.goodComputers[0] >= normComputers){
      result.computersPerStudent = Number(standard.maxScore);
    } else if(i === 0) {
      result.computersPerStudent = Number(standard.maxScore) * result.goodComputers[0] / normComputers;
    }
    if(result.goodComputers[number] >= normComputers) {
      result.missingComputers[number] = 0;
    } else {
      result.missingComputers[number] = Math.round(normComputers - result.goodComputers[number]);
    }
  });
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
  var result = {
    goodDigitalSchoolbords: [],
    missingDigitalSchoolbords: [],
    requiredDigitalSchoolbords: 0,
    digitalSchoolbordsPerClassroom: 0, 
    error: null
  };
  var standard = checkStandardDigitalSchoolbordsPerClassroom(school);
  var countGoodDigibord = [0,0,0,0,0];
  school.hardware.forEach(function(hardware){
    [0,1,2,3,4].forEach(function(number){
      if(hardware.type==="Digitaal schoolbord" 
            && ((hardware.isTouchscreenDigibord || 0) >= (standard.isTouchscreen || 0))
            && hardware.deploymentYear >= (new Date()).getFullYear() - standard.maxYear + number) {
            countGoodDigibord[number] ++;
	    }
    });
  });
  var normDigibord = school.countClassrooms * Number(standard.standard);
  result.requiredDigitalSchoolbords = Math.round(normDigibord);
  [0,1,2,3,4].forEach(function(number, i){
    result.goodDigitalSchoolbords.push(countGoodDigibord[number]);
    if(i === 0 && result.goodDigitalSchoolbords[0] > normDigibord){
        result.digitalSchoolbordsPerClassroom = Number(standard.maxScore);
    } else if(i === 0) {
        result.digitalSchoolbordsPerClassroom = Number(standard.maxScore) * result.goodDigitalSchoolbords[0] / normDigibord;
    }
    if(result.goodDigitalSchoolbords[number] > normDigibord){
        result.missingDigitalSchoolbords.push(0);
    } else {
        result.missingDigitalSchoolbords.push(Math.round(normDigibord - result.goodDigitalSchoolbords[number]));          
    }
  });
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
    var result = {
      goodLaptops: [], 
      requiredLaptops: 0,
      missingLaptops: [],
      portableComputersPerSchool: 0, 
      error: null
    };
    var standard = checkStandardPortableComputersPerSchool(school);
    var countGoodPortableComputers = [0,0,0,0,0];
    school.hardware.filter(h => h.functionsAs !== 'Medewerker device' || h.functionsAs !== 'Directie device').forEach(function(hardware){
      [0,1,2,3,4].forEach(function(number){
        if(standard.isLaptop.includes(hardware.type) && 
            hardware.memory >= standard.minRAM && 
              hardware.deploymentYear >= (new Date()).getFullYear() - standard.maxYear + number) {
          countGoodPortableComputers[number] = countGoodPortableComputers[number] + 1;
    	  }
      });
  	});
    var normPortableComputers = Number(standard.standard);
    result.requiredLaptops = Math.round(normPortableComputers);
    [0,1,2,3,4].forEach(function(number, i){
      result.goodLaptops.push(countGoodPortableComputers[number]);
      if(i === 0 && countGoodPortableComputers[0] >= normPortableComputers){
          result.portableComputersPerSchool = Number(standard.maxScore);
      } else if(i === 0) {
          result.portableComputersPerSchool = Number(standard.maxScore) * countGoodPortableComputers[0] / normPortableComputers;
      }
      if(countGoodPortableComputers[number] >= normPortableComputers){
          result.missingLaptops.push(0);
      } else {
          result.missingLaptops.push(Math.round(normPortableComputers - countGoodPortableComputers[number]));
      }
    });
    if(isNaN(result.portableComputersPerSchool || typeof result.portableComputersPerSchool !== 'number')){
	  	result.error = "Probleem bij het berekenen van de score van het criterium laptops per school";
	  	result.computersPerStudent = 0;
	  	return result;
	} else {
	  	return result;
	}
};

checkStandardPortableComputersPerSchool = function(school){
	var standard = checkStandardComputersPerStudent(school);
	Object.keys(config.hardware.standards.laptopsPerSchool).forEach(function(key){
		standard[key] = school.standard.hardware.laptopsPerSchool[key] ?
							school.standard.hardware.laptopsPerSchool[key] :
								config.hardware.standards.laptopsPerSchool[key]
	});
	return standard;
}


module.exports = hardwareScore;