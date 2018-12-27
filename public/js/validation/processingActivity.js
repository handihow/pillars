//load jQuery when document is ready
$(document).ready(function() {

  //================================================//
//FORM VALIDATIONS ON THE PROCESSING ACTIVITY REGISTRY  //
//================================================//
$("#processingActivityForm").form({
        fields:{ 
          "processingActivity[processingActivityName]": {
            identifier: "processingActivity[processingActivityName]",
            rules: [
                {
                  type: "empty",
                  prompt: "Naam voor de verwerking is verplicht"
                }
              ]
          },
          "processingActivity[controllerName]": {
            identifier: "processingActivity[controllerName]",
            rules: [
                {
                  type: "empty",
                  prompt: "Naam van de verwerkingsverantwoordelijke is verplicht"
                }
              ]
          },
          "processingActivity[internalLink]" : {
            identifier: "processingActivity[internalLink]",
            optional: true,
            rules: [
              {
                type: "url",
                prompt: "Geef een geldige url in"
              }
            ]
          }
        }
      });

});