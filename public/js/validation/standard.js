//load jQuery when document is ready
$(document).ready(function() {

//================================================//
//VALIDATIONS ON THE STANDARDIZATION FORM//
//================================================//
// INFOMESSAGES

$('.hardwareMessage').focus(function(){
  $("#infoHardware").attr('class', 'ui message')
});

$('.hardwareMessage').focusout(function(){
  $("#infoHardware").attr('class', 'ui hidden message')
});

$('#computersPerStudent').focus(function(){
  $("#infoComputersPerStudent").attr('class', 'ui message')
});

$('#computersPerStudent').focusout(function(){
  $("#infoComputersPerStudent").attr('class', 'ui hidden message')
});

$('#digitalBordsPerClassroom').focus(function(){
  $("#infoDigitalBords").attr('class', 'ui message')
});

$('#digitalBordsPerClassroom').focusout(function(){
  $("#infoDigitalBords").attr('class', 'ui hidden message')
});

$('#portableComputersPerSchool').focus(function(){
  $("#infoPortableComputers").attr('class', 'ui message')
});

$('#portableComputersPerSchool').focusout(function(){
  $("#infoPortableComputers").attr('class', 'ui hidden message')
});

$('.maxScoreHardware').focus(function(){
  $("#infoMaxScoreHardware").attr('class', 'ui message')
});

$('.maxScoreHardware').focusout(function(){
  $("#infoMaxScoreHardware").attr('class', 'ui hidden message')
});


$.fn.form.settings.rules.greaterThan = function (inputValue, validationValue) {
  return inputValue >= validationValue;
};

$.fn.form.settings.rules.smallerThan = function (inputValue, validationValue) {
  return inputValue <= validationValue;
};


$("#addStandard")
.form({
  fields: {
    'standard[name]': {
      identifier: 'standard[name]',
      rules: [
      {
        type: "empty",
        prompt: "Vul een naam in voor de normering"
      }
      ]
    }
  }
})


var standardFormFields = 
{
  fields: {
    "standard[name]": {
      identifier: "standard[name]",
      rules: [
      {
        type: "empty",
        prompt: "Vul een naam in voor de normering."
      }
      ]
    },
    "standard[hardware][computersPerStudent][minRAM]": {
      identifier: "standard[hardware][computersPerStudent][minRAM]",
      rules: [
      {
        type: "integer[1..64]",
        prompt: "Vul het werkgeheugen in (GB). Dit is een geheel getal tussen 1 en 64 (GB)."
      }
      ]
    },
    "standard[hardware][computersPerStudent][maxYear]": {
      identifier: "standard[hardware][computersPerStudent][maxYear]",
      rules: [
      {
        type: "integer[1..20]",
        prompt: "Vul de maximale ouderdom van hardware in (gehele jaren). Devices ouder dan zoveel jaar worden niet meegeteld."
      }
      ]
    },
    "standard[hardware][computersPerStudent][isComputer]": {
      identifier: "standard[hardware][computersPerStudent][isComputer]",
      rules: [
      {
        type: "minCount[1]",
        prompt: "Vul minimaal 1 soort hardware in dat meegeteld wordt als computer."
      }
      ]
    },
    "standard[hardware][computersPerStudent][standard]": {
      identifier: "standard[hardware][computersPerStudent][standard]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 1. Hierbij is 0,2 bijvoorbeeld 1 computer per 5 leerlingen."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 1,
        prompt: 'Getal moet kleiner of gelijk zijn aan 1.'
      }
      ]
    },
    "standard[hardware][digitalSchoolbordsPerClassroom][isTouchscreen]": {
      identifier: "standard[hardware][digitalSchoolbordsPerClassroom][isTouchscreen]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 1. Hierbij is 1 bijvoorbeeld 1 digitaal schoolbord per klaslokaal."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 1,
        prompt: 'Getal moet kleiner of gelijk zijn aan 1.'
      }
      ]
    },
    "standard[hardware][laptopsPerSchool][isLaptop]": {
      identifier: "standard[hardware][laptopsPerSchool][isLaptop]",
      rules: [
      {
        type: "minCount[1]",
        prompt: "Vul minimaal 1 soort hardware in dat meegeteld wordt als laptop."
      }
      ]
    },
    "standard[hardware][laptopsPerSchool][standard]": {
      identifier: "standard[hardware][laptopsPerSchool][standard]",
      rules: [
      {
        type: "integer",
        prompt: "Vul een geheel getal in."
      }
      ]
    },
    "standard[hardware][laptopsPerSchool][maxYear]": {
      identifier: "standard[hardware][laptopsPerSchool][maxYear]",
      rules: [
      {
        type: "integer[1..20]",
        prompt: "Vul de maximale ouderdom van laptops in (gehele jaren). Devices ouder dan zoveel jaar worden niet meegeteld."
      }
      ]
    },
    "standard[hardware][computersPerStudent][maxScore]": {
      identifier: "standard[hardware][computersPerStudent][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[hardware][digitalSchoolbordsPerClassroom][maxScore]" : {
      identifier: "standard[hardware][digitalSchoolbordsPerClassroom][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[hardware][network][maxScore]": {
      identifier: "standard[hardware][network][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[hardware][laptopsPerSchool][maxScore]": {
      identifier: "standard[hardware][laptopsPerSchool][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][competenceRating][standard]": {
      identifier: "standard[competence][competenceRating][standard]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 1 en 6. "
      },
      {
        type: 'greaterThan',
        value: 1,
        prompt: 'Getal moet groter zijn dan 1.'
      }
      ,
      {
        type: 'smallerThan',
        value: 6,
        prompt: 'Getal moet kleiner of gelijk zijn aan 6.'
      }
      ]
    },
    "standard[competence][softwareRating][standard]": {
      identifier: "standard[competence][softwareRating][standard]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 1 en 6. "
      },
      {
        type: 'greaterThan',
        value: 1,
        prompt: 'Getal moet groter zijn dan 1.'
      }
      ,
      {
        type: 'smallerThan',
        value: 6,
        prompt: 'Getal moet kleiner of gelijk zijn aan 6.'
      }
      ]
    },
    "standard[competence][competenceRating][maxScore]": {
      identifier: "standard[competence][competenceRating][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][softwareRating][maxScore]": {
      identifier: "standard[competence][softwareRating][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][support][maxScore]": {
      identifier: "standard[competence][support][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][ictSkills][maxScore]": {
      identifier: "standard[competence][ictSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][pedagogicalDidacticalSkills][maxScore]": {
      identifier: "standard[competence][pedagogicalDidacticalSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][workInSchoolContext][maxScore]": {
      identifier: "standard[competence][workInSchoolContext][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][personalDevelopment][maxScore]": {
      identifier: "standard[competence][personalDevelopment][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][instrumentalSkills][maxScore]": {
      identifier: "standard[competence][instrumentalSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][informationSkills][maxScore]": {
      identifier: "standard[competence][informationSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][mediaSkills][maxScore]": {
      identifier: "standard[competence][mediaSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[management][agreement][maxScore]": {
      identifier: "standard[management][agreement][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[management][network][maxScore]": {
      identifier: "standard[management][network][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    }
  }
}

var softwareKeys = ["geography", "biology", "german", "economy", "english", "french", "history",
        "physics", "dutch", "chemistry", "math", "functionalReading", "receptiveReading", "orthography",
        "language", "keyboardSkills", "programming", "mediaLiteracy"];
softwareKeys.forEach(function(softwareKey){
          var identifierGL = 'standard[software][' + softwareKey + '][gradeLevels]'
            standardFormFields.fields[identifierGL] = {
              identifier: identifierGL,
              rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 groep of klas in."
                }
              ]
            }
          var identifierFunc = 'standard[software][' + softwareKey + '][functionalities]'
            standardFormFields.fields[identifierFunc] = {
              identifier: identifierFunc,
              rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 functie in."
                }
              ]
            }
          var identifierMS = 'standard[software][' + softwareKey + '][maxScore]'
            standardFormFields.fields[identifierMS] = {
              identifier: identifierMS,
              rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 5,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
                }
              ]
            }
          var identifierR = 'standard[software][' + softwareKey + '][minRating]'
            standardFormFields.fields[identifierR] = {
              identifier: identifierR,
              rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 1. Hierbij is 0,75 bijvoorbeeld dat 75% van de kwaliteiten aanwezig zijn."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 1,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 1.'
                }
              ]
            } 
        })

var roleKeys = ['incidentReporter','ictEducationalContentManager','ictPurchaser'];
roleKeys.forEach(function(roleKey){
          var identifierH = 'standard[management][' + roleKey + '][hoursPerYear]'
            standardFormFields.fields[identifierH] = {
              identifier: identifierH,
              rules: [
                {
                  type: "number",
                  prompt: "Vul een geheel aantal normjaartaakuren in."
                }
              ]
            }
          var identifierAH = 'standard[management][' + roleKey + '][additionalHoursPerYear]'
            standardFormFields.fields[identifierAH] = {
              identifier: identifierAH,
              rules: [
                {
                  type: "number",
                  prompt: "Vul een geheel aantal extra normjaartaakuren in."
                }
              ]
            }
          var identifierMS = 'standard[management][' + roleKey + '][maxScore]'
            standardFormFields.fields[identifierMS] = {
              identifier: identifierMS,
              rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 5,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
                }
              ]
            } 
        })

$("#standardForm").form(standardFormFields); 

});