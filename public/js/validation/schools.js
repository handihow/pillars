
//load jQuery when document is ready
$(document).ready(function() {
//================================================//
//FORM VALIDATIONS ON THE SCHOOL ROUTES//
//================================================//
    $("#zoekScholen").
      form({
        fields: {
          "zoekcriterium": {
            identifier: "zoekcriterium",
            rules: [
                {
                  type: "minCount[1]",
                  prompt: "Selecteer waarop je wilt zoeken (BRIN, schoolLocationIdNumber of schoolbestuur nummer)"
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
          "school[schoolIdNumber]": {
            identifier: "school[schoolIdNumber]",
            rules: [
                {
                  type: "exactLength[4]",
                  prompt: "Vul een geldig BRIN nummer in (bestaat uit twee cijfers en twee hoofdletters)"
                }
              ]
          },
          "school[schoolLocationIdNumber]": {
            identifier: "school[schoolLocationIdNumber]",
            rules: [
                {
                  type: "exactLength[6]",
                  prompt: "Vul een geldig locatienummer in (bestaat uit twee cijfers, twee hoofdletters gevolgd door twee cijfers)"
                }
              ]
          },
          "school[organisationIdNumber]": {
            identifier: "school[organisationIdNumber]",
            rules: [
                {
                  type: "exactLength[5]",
                  prompt: "Vul een geldig bevoegd gezag nummer in (bestaat uit vijf cijfers)"
                }
              ]
          },
          "school[name]": {
            identifier: "school[name]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de naam van de instelling in"
                }
              ]
          },
          "school[city]": {
            identifier: "school[city]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de plaatsnaam van de instelling in"
                }
              ]
          },
          "school[countStudents]": {
            identifier: "school[countStudents]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het aantal leerlingen in (geheel getal)"
                }
              ]
          },
          "school[countClassrooms]": {
            identifier: "school[countClassrooms]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het aantal klaslokalen in (geheel getal)"
                }
              ]
          },
          "school[logo]": {
            identifier: "school[logo]",
            optional: true,
            rules: [
                {
                  type: "url",
                  prompt: "Vul een geldige url in"
                }
              ]
          }
        }
      })  
    ;
});