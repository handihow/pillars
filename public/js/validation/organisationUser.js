//load jQuery when document is ready
$(document).ready(function() {
	//================================================//
//FORM VALIDATIONS ON THE ORGANISATION USER REGISTRATION ROUTE//
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


});