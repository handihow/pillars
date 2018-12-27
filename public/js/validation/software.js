//load jQuery when document is ready
$(document).ready(function() {
//================================================//
//FORM VALIDATIONS ON THE SOFTWARE ROUTE//
//================================================//
    $("#softwareForm")
      .form({
        fields: {
          "software[name]": {
            identifier: "software[name]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de naam van het digitale leermiddel (software-pakket) in."
                }
              ]
          },
          "software[subject]": {
            identifier: "software[subject]",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul het vak in."
                }
              ]
          },
          "software[effectiveness]": {
            identifier: "software[effectiveness]",
            rules: [
              {
                type: "integer[0..6]",
                prompt: "Beoordeel het digitale leermiddel met 1 (niet effectief) tot 6 (zeer effectief)"
              }
            ]
          },
          "software[functionalities]": {
            identifier: "software[functionalities]",
            rules: [
              {
                type: "minCount[1]",
                prompt: "Selecteer minimaal 1 functie"
              }
            ]
          },
          "software[gradeLevels]": {
            identifier: "software[gradeLevels]",
            rules: [
              {
                type: "minCount[1]",
                prompt: "Selecteer minimaal 1 groep"
              }
            ]
          }
        }
    });
    
    


});