//load jQuery when document is ready
$(document).ready(function() {
//================================================//
//FORM VALIDATIONS ON THE COMPETENCE ROUTE//
//================================================//
    $("#competenceForm").
      form({
        fields: {
          "school[competence][teachers]": {
            identifier: "school[competence][teachers]",
            rules: [
                {
                  type: "integer[1..6]",
                  prompt: "Beoordeel de deskundigheid met een geheel getal tussen 1 (niet deskundig) en 6 (zeer deskundig)."
                }
              ]
          },
          "school[competence][effectiveness]": {
            identifier: "school[competence][effectiveness]",
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

});