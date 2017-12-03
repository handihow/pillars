
//load jQuery when document is ready
$(document).ready(function() {

//================================================//
//FORM VALIDATIONS ON THE SCHOLEN ROUTE//
//================================================//

    $("#zoekScholen").
      form({
        fields: {
          "zoekcriterium": {
            identifier: "zoekcriterium",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Selecteer waarop je wilt zoeken (BRIN, vestigingsnummer of schoolbestuur nummer)"
                }
              ]
          },
          "zoekveld": {
            identifier: "zoekveld",
            rules: [
                {
                  type: "minLength[4]",
                  prompt: "Geef een geldig nummer in"
                }
              ]
          }
        }
      })  
    ;
    
    $("#scholenToevoegen").validate();
    
    $("#schoolEdit").form({
        fields: {
          "school[brin]": {
            identifier: "school[brin]",
            rules: [
                {
                  type: "exactLength[4]",
                  prompt: "Vul een geldig BRIN nummer in (bestaat uit twee cijfers en twee hoofdletters)"
                }
              ]
          },
          "school[vestigingsnummer]": {
            identifier: "school[vestigingsnummer]",
            rules: [
                {
                  type: "exactLength[6]",
                  prompt: "Vul een geldig vestigingsnummer in (bestaat uit twee cijfers, twee hoofdletters gevolgd door twee cijfers)"
                }
              ]
          },
          "school[bevoegdGezag]": {
            identifier: "school[bevoegdGezag]",
            rules: [
                {
                  type: "exactLength[5]",
                  prompt: "Vul een geldig bevoegd gezag nummer in (bestaat uit vijf cijfers)"
                }
              ]
          },
          "school[instellingsnaam]": {
            identifier: "school[instellingsnaam]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de naam van de instelling in"
                }
              ]
          },
          "school[plaatsnaam]": {
            identifier: "school[plaatsnaam]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de plaatsnaam van de instelling in"
                }
              ]
          },
          "school[aantalLeerlingen]": {
            identifier: "school[aantalLeerlingen]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het aantal leerlingen in (geheel getal)"
                }
              ]
          },
          "school[aantalKlaslokalen]": {
            identifier: "school[aantalKlaslokalen]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het aantal klaslokalen in (geheel getal)"
                }
              ]
          }
        }
      })  
    ;
//================================================//
//FORM VALIDATIONS ON THE ADMIN ROUTE//
//================================================//

  //Validation of the school admin user registration form
    $("#adminRegister").form({
        fields: {
          "firstName": {
            identifier: "firstName",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de voornaam van de medewerker in"
                }
              ]
          },
          "lastName": {
            identifier: "lastName",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de achternaam van de medewerker in"
                }
              ]
          },
          "username": {
            identifier: "username",
            rules: [
                {
                  type: "email",
                  prompt: "Vul een geldig email adres in"
                }
              ]
          },
          "password": {
            identifier: "password",
            rules: [
              {
                  type: "empty",
                  prompt: "Vul een wachtwoord in"
              }
            ]
          },
          "password_again": {
            identifier: "password_again",
            rules: [
              {
                  type: "match[password]",
                  prompt: "Wachtwoord moet twee keer hetzelfde zijn"
              }
            ]
          }
        }
      })  
    ;

//================================================//
//FORM VALIDATIONS ON THE HARDWARE ROUTE//
//================================================//
    //activate the dropdown menus
    $('.ui.dropdown').dropdown();
    
    $('#hardwareBulkForm').validate()
   
    $("#hardwareForm")
    .form({
        fields: {
          "hardware[naam]": {
            identifier: "hardware[naam]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de naam of identificatie-code in van de hardware."
                }
              ]
          },
          "hardware[type]": {
            identifier: "hardware[type]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul het hardware type in."
                }
              ]
          },
          "hardware[werkgeheugen]": {
            identifier: "hardware[werkgeheugen]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het werkgeheugen van deze computer in (GB). Dit is een kwaliteitsnorm."
                }
              ]
          },
          "hardware[jaarIngebruikname]": {
            identifier: "hardware[jaarIngebruikname]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het jaar van ingebruikname in. Dit is een kwaliteitsnorm."
                }
              ]
          },
          "hardware[aantalWerkplekkenMultipoint]": {
            identifier: "hardware[aantalWerkplekkenMultipoint]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het aantal werkplekken van deze multipoint computer in."
                }
              ]
          }
        }
    });
    

//================================================//
//FORM VALIDATIONS ON THE SOFTWARE ROUTE//
//================================================//
    $("#digitaleLeermiddelenForm")
      .form({
        fields: {
          "software[naam]": {
            identifier: "software[naam]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de naam van het digitale leermiddel (software-pakket) in."
                }
              ]
          },
          "software[vak]": {
            identifier: "software[vak]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul het vak in."
                }
              ]
          },
          "software[effectiviteit]": {
            identifier: "software[effectiviteit]",
            rules: [
              {
                type: "integer[0..6]",
                prompt: "Beoordeel het digitale leermiddel met 1 (niet effectief) tot 6 (zeer effectief)"
              }
            ]
          },
          "software[functie]": {
            identifier: "software[functie]",
            rules: [
              {
                type: "minCount[1]",
                prompt: "Selecteer minimaal 1 functie"
              }
            ]
          },
          "software[groep]": {
            identifier: "software[groep]",
            rules: [
              {
                type: "minCount[1]",
                prompt: "Selecteer minimaal 1 groep"
              }
            ]
          }
        }
    });
    
    


//================================================//
//FORM VALIDATIONS ON THE DESKUNDIGHEID ROUTE//
//================================================//
    $("#deskundigheidForm").
      form({
        fields: {
          "school[deskLeerkrachten]": {
            identifier: "school[deskLeerkrachten]",
            rules: [
                {
                  type: "integer[1..6]",
                  prompt: "Beoordeel de deskundigheid met een geheel getal tussen 1 (niet deskundig) en 6 (zeer deskundig)."
                }
              ]
          },
          "school[deskEffectiviteit]": {
            identifier: "school[deskEffectiviteit]",
            rules: [
                {
                  type: "integer[1..6]",
                  prompt: "Beoordeel de gemiddelde effectiviteit van digitale leermiddelen met een geheel getal tussen 1 (niet effectief) en 6 (zeer effectief)."
                }
              ]
          }
        }
      })  
    ;
    
//================================================//
//FORM VALIDATIONS ON THE ORGANISATIE ROUTE//
//================================================//
    $("#organisatieForm").
      form({
        fields: {
          "school[orgICTIncidentMelder]": {
            identifier: "school[orgICTIncidentMelder]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de naam in van de medewerker die de taak heeft van ICT Incidentmelder."
                }
              ]
          },
          "school[orgNormjaartaakurenICTIncidentMelder]": {
            identifier: "school[orgNormjaartaakurenICTIncidentMelder]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het aantal normjaartaakuren in die toegewezen zijn aan de ICT Incidentmelder."
                }
              ]
          },
          "school[orgOnderwijskundigICTer]": {
            identifier: "school[orgOnderwijskundigICTer]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de naam in van de medewerker die de taak heeft van Onderwijskundig ICT'er."
                }
              ]
          },
          "school[orgNormjaartaakurenOnderwijskundigICTer]": {
            identifier: "school[orgNormjaartaakurenOnderwijskundigICTer]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het aantal normjaartaakuren in die toegewezen zijn aan de Onderwijskundig ICT'er."
                }
              ]
          },
          "school[orgICTInkoper]": {
            identifier: "school[orgICTInkoper]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de naam in van de medewerker die de taak heeft van ICT Inkoper."
                }
              ]
          },
          "school[orgNormjaartaakurenICTInkoper]": {
            identifier: "school[orgNormjaartaakurenICTInkoper]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het aantal normjaartaakuren in die toegewezen zijn aan de ICT Inkoper."
                }
              ]
          }
        }
      })  
    ;
    
//================================================//
//ACTIVATING THE TAB MENUS//
//================================================//
    $('.menu .item')
      .tab()
    ;
    
//================================================//
//USER EDIT FORM//
//================================================//
  $("#profielForm")
    .form({
        fields: {
          "user[username]": {
            identifier: "user[username]",
            rules: [
                {
                  type: "email",
                  prompt: "Vul een geldig email adres in. Let op! Als je het email adres wijzigt, moet je opnieuw inloggen."
                }
              ]
          }
      }
    });  

//================================================//
//EVALUATION FORM//
//================================================//

$("#evaluationForm").validate();    

//================================================//
//PROFILE TEST FORM//
//================================================//
  $("#profielTest").submit(function(){
    var countChecked = $('#profielTest').find('input[type=checkbox]:checked').length;
    var countTotal = $('#profielTest').find('input[type=checkbox]').length;
    $('#testResult').val(countChecked / countTotal);
  });

//================================================//
//VALIDATIONS ON THE MESSAGE FORMS//
//================================================//

  $("#bericht")
  .form({
        fields: {
          "message[title]": {
            identifier: "message[title]",
            rules: [
                {
                  type: "empty",
                  prompt: "Dit veld is verplicht"
                }
              ]
          },
          "message[message]": {
            identifier: "message[message]",
            rules: [
                {
                  type: "empty",
                  prompt: "Dit veld is verplicht"
                }
              ]
          }
      }
    });  

//================================================//
//VALIDATIONS ON THE NORMERING FORM//
//================================================//

  $.fn.form.settings.rules.greaterThan = function (inputValue, validationValue) {
    return inputValue > validationValue;
  };
  
  $.fn.form.settings.rules.smallerThan = function (inputValue, validationValue) {
    return inputValue <= validationValue;
  };

    $("#normeringForm")
    .form({
        fields: {
          "normering[naam]": {
            identifier: "normering[naam]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul een naam in voor de normering."
                }
              ]
          },
          "normering[minRAM]": {
            identifier: "normering[minRAM]",
            rules: [
                {
                  type: "integer[1..64]",
                  prompt: "Vul het werkgeheugen in (GB). Dit is een geheel getal tussen 1 en 64 (GB)."
                }
              ]
          },
          "normering[minYear]": {
            identifier: "normering[minYear]",
            rules: [
                {
                  type: "integer[2000..2030]",
                  prompt: "Vul het minimale jaar van ingebruikname in. Devices ouder dan dit jaar worden niet meegeteld."
                }
              ]
          },
          "normering[hardwareTypesCountedAsComputer]": {
            identifier: "normering[hardwareTypesCountedAsComputer]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 soort hardware in dat meegeteld wordt als computer."
                }
              ]
          },
          "normering[computersPerLeerling]": {
            identifier: "normering[computersPerLeerling]",
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
          "normering[digibordenPerKlaslokaal]": {
            identifier: "normering[computersPerLeerling]",
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
          "normering[portableComputersPerSchool]": {
            identifier: "normering[portableComputersPerSchool]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul een geheel getal in."
                }
              ]
          },
          "normering[maxScoreComputersPerLeerling]": {
            identifier: "normering[maxScoreComputersPerLeerling]",
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
          "normering[maxScoreDigibordenPerKlaslokaal]" : {
            identifier: "normering[maxScoreDigibordenPerKlaslokaal]",
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
          "normering[maxScoreNetwerk]": {
            identifier: "normering[maxScoreNetwerk]",
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
          "normering[maxScorePortableComputersPerSchool]": {
            identifier: "normering[maxScorePortableComputersPerSchool]",
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
          "normering[Rekenen][groepen]": {
            identifier: "normering[Rekenen][groepen]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 groep in."
                }
              ]
          },
          "normering[Technisch Lezen][groepen]": {
            identifier: "normering[Technisch Lezen][groepen]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 groep in."
                }
              ]
          },
          "normering[Begrijpend Lezen][groepen]": {
            identifier: "normering[Begrijpend Lezen][groepen]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 groep in."
                }
              ]
          },
          "normering[Spelling][groepen]": {
            identifier: "normering[Spelling][groepen]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 groep in."
                }
              ]
          },
          "normering[Taal][groepen]": {
            identifier: "normering[Taal][groepen]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 groep in."
                }
              ]
          },
          "normering[Toetsenbordvaardigheid][groepen]": {
            identifier: "normering[Toetsenbordvaardigheid][groepen]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 groep in."
                }
              ]
          },
          "normering[Programmeren][groepen]": {
            identifier: "normering[Programmeren][groepen]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 groep in."
                }
              ]
          },
          "normering[Mediawijsheid][groepen]": {
            identifier: "normering[Mediawijsheid][groepen]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 groep in."
                }
              ]
          },
          "normering[Rekenen][functies]": {
            identifier: "normering[Rekenen][functies]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 functie in."
                }
              ]
          },
          "normering[Technisch Lezen][functies]": {
            identifier: "normering[Technisch Lezen][functies]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 functie in."
                }
              ]
          },
          "normering[Begrijpend Lezen][functies]": {
            identifier: "normering[Begrijpend Lezen][functies]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 functie in."
                }
              ]
          },
          "normering[Spelling][functies]": {
            identifier: "normering[Spelling][functies]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 functie in."
                }
              ]
          },
          "normering[Taal][functies]": {
            identifier: "normering[Taal][functies]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 functie in."
                }
              ]
          },
          "normering[Toetsenbordvaardigheid][functies]": {
            identifier: "normering[Toetsenbordvaardigheid][functies]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 functie in."
                }
              ]
          },
          "normering[Programmeren][functies]": {
            identifier: "normering[Programmeren][functies]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 functie in."
                }
              ]
          },
          "normering[Mediawijsheid][functies]": {
            identifier: "normering[Mediawijsheid][functies]",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Vul minimaal 1 functie in."
                }
              ]
          },
          "normering[Rekenen][maxScore]": {
            identifier: "normering[Rekenen][maxScore]",
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
          "normering[Technisch Lezen][maxScore]": {
            identifier: "normering[Technisch Lezen][maxScore]",
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
          "normering[Begrijpend Lezen][maxScore]": {
            identifier: "normering[Begrijpend Lezen][maxScore]",
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
          "normering[Spelling][maxScore]": {
            identifier: "normering[Spelling][maxScore]",
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
          "normering[Taal][maxScore]": {
            identifier: "normering[Taal][maxScore]",
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
          "normering[Toetsenbordvaardigheid][maxScore]": {
            identifier: "normering[Toetsenbordvaardigheid][maxScore]",
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
          "normering[Programmeren][maxScore]": {
            identifier: "normering[Programmeren][maxScore]",
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
          "normering[Mediawijsheid][maxScore]": {
            identifier: "normering[Mediawijsheid][maxScore]",
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
          "normering[Rekenen][kwaliteiten]": {
            identifier: "normering[Rekenen][kwaliteiten]",
            rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 1,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
              ]
          },
          "normering[Technisch Lezen][kwaliteiten]": {
            identifier: "normering[Technisch Lezen][kwaliteiten]",
            rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 1,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
              ]
          },
          "normering[Begrijpend Lezen][kwaliteiten]": {
            identifier: "normering[Begrijpend Lezen][kwaliteiten]",
            rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 1,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
              ]
          },
          "normering[Spelling][kwaliteiten]": {
            identifier: "normering[Spelling][kwaliteiten]",
            rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 1,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
              ]
          },
          "normering[Taal][kwaliteiten]": {
            identifier: "normering[Taal][kwaliteiten]",
            rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 1,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
              ]
          },
          "normering[Toetsenbordvaardigheid][kwaliteiten]": {
            identifier: "normering[Toetsenbordvaardigheid][kwaliteiten]",
            rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 1,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
              ]
          },
          "normering[Programmeren][kwaliteiten]": {
            identifier: "normering[Programmeren][kwaliteiten]",
            rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 1,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
              ]
          },
          "normering[Mediawijsheid][kwaliteiten]": {
            identifier: "normering[Mediawijsheid][kwaliteiten]",
            rules: [
                {
                  type: "number",
                  prompt: "Vul een getal in tussen 0 en 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen."
                },
                {
                  type: 'greaterThan',
                  value: 0,
                  prompt: 'Getal moet groter zijn dan 0. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
                ,
                {
                  type: 'smallerThan',
                  value: 1,
                  prompt: 'Getal moet kleiner of gelijk zijn aan 1. Dit is het aantal kwaliteitseisen waaraan software moet voldoen.'
                }
              ]
          },
          "normering[minBeoordeeldeDeskundigheid]": {
            identifier: "normering[minBeoordeeldeDeskundigheid]",
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
          "normering[gemEffectiviteitDigitaleLeermiddelen]": {
            identifier: "normering[gemEffectiviteitDigitaleLeermiddelen]",
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
          "normering[maxScoreBeoordeeldeDeskundigheid]": {
            identifier: "normering[maxScoreBeoordeeldeDeskundigheid]",
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
          "normering[maxScoreGemEffectiviteitDigitaleLeermiddelen]": {
            identifier: "normering[maxScoreGemEffectiviteitDigitaleLeermiddelen]",
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
          "normering[maxScoreOndersteuningNodig]": {
            identifier: "normering[maxScoreOndersteuningNodig]",
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
          "normering[maxScoreICTGeletterdheid]": {
            identifier: "normering[maxScoreICTGeletterdheid]",
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
          "normering[maxScorePedagogischDidactischHandelen]": {
            identifier: "normering[maxScorePedagogischDidactischHandelen]",
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
          "normering[maxScoreWerkenSchoolcontext]": {
            identifier: "normering[maxScoreWerkenSchoolcontext]",
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
          "normering[maxScorePersoonlijkeOntwikkeling]": {
            identifier: "normering[maxScorePersoonlijkeOntwikkeling]",
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
      }
    }); 
    
          
  // INFOMESSAGES
  
    $('.hardwareMessage').focus(function(){
      $("#infoHardware").attr('class', 'ui message')
    });
    
    $('.hardwareMessage').focusout(function(){
      $("#infoHardware").attr('class', 'ui hidden message')
    });
    
     $('#computersPerLeerling').focus(function(){
      $("#infoComputersPerLeerling").attr('class', 'ui message')
    });
    
    $('#computersPerLeerling').focusout(function(){
      $("#infoComputersPerLeerling").attr('class', 'ui hidden message')
    });
    
    $('#digibordenPerKlaslokaal').focus(function(){
      $("#infoDigiborden").attr('class', 'ui message')
    });
    
    $('#digibordenPerKlaslokaal').focusout(function(){
      $("#infoDigiborden").attr('class', 'ui hidden message')
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
    
//================================================//
//PROFILE QUESTIONS VALIDATIONS AND FORMS//
//================================================//
  
  $('#profielUpdateForm').validate();
  
  $('form').on('click', '.trash', function(){
    $( this ).parent().parent().remove();
  });
  
  $('form').on('click', '.plus', function(){
    //generate a random number for id of the new element
    var random = Math.round(Math.random() * 1000000);
    //get the class attribute of the element
    var classAttr = $(this).attr('class').substring('plus icon '.length);
    var idAttr = $(this).attr('id');
    console.log(classAttr, idAttr);
    //get the id of the parent element
    var id = $(this).parent().parent().attr('id');
    //insert new elements after the parent element
    $('<div class="changing fields" id="' + random +
        '"><div class="fourteen wide field">' +
            '<input type="text" name="profiel[profiel][' + classAttr +
            '][' + idAttr + ']" required>' +
        '</div>' +
        '<div class="one wide field">' +
          '<i class="plus icon ' + classAttr +'" id="' + idAttr + '"></i>' +
        '</div>' +
        '<div class="one wide field">' +
          '<i class="trash icon"></i>' + 
        '</div>' +
      '</div>').insertAfter('#' + id);
  });
  
  
  
});
