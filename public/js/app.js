
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
    
    //activate the dropdown menus
    $('.ui.dropdown').dropdown();


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
    
});