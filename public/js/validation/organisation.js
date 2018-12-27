
//load jQuery when document is ready
$(document).ready(function() {
  //================================================//
//FORM VALIDATIONS ON THE ORGANISATION ROUTE //
//================================================//
  $("#organisationEdit").form({
          fields:{ 
            "organisation[name]": {
              identifier: "organisation[name]",
              rules: [
                  {
                    type: "empty",
                    prompt: "Vul de naam van de organisatie in"
                  }
                ]
            },
            "organisation[city]": {
              identifier: "organisation[city]",
              rules: [
                  {
                    type: "empty",
                    prompt: "Vul de plaatsnaam van de organisatie in"
                  }
                ]
            },
            "organisation[activationCode]": {
              identifier: "organisation[activationCode]",
              rules: [
                  {
                    type: "minLength[8]",
                    prompt: "Vul een activatie code in van minimaal 8 tekens (letters en cijfers)"
                  }
                ]
            },
           
          }
        })  
      ;
});