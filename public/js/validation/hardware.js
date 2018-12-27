//load jQuery when document is ready
$(document).ready(function() {

//================================================//
//FORM VALIDATIONS ON THE HARDWARE ROUTE//
//================================================//
    $('#hardwareBulkForm').validate()
   
    $("#hardwareForm")
    .form({
        fields: {
          "hardware[name]": {
            identifier: "hardware[name]",
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
          "hardware[memory]": {
            identifier: "hardware[memory]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het werkgeheugen van deze computer in (GB). Dit is een kwaliteitsnorm."
                }
              ]
          },
          "hardware[deploymentYear]": {
            identifier: "hardware[deploymentYear]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het jaar van ingebruikname in. Dit is een kwaliteitsnorm."
                }
              ]
          },
          "hardware[numberWorkPlacesMultipoint]": {
            identifier: "hardware[numberWorkPlacesMultipoint]",
            rules: [
                {
                  type: "integer",
                  prompt: "Vul het aantal werkplekken van deze multipoint computer in."
                }
              ]
          }
        }
    });
    
});