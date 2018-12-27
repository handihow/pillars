//load jQuery when document is ready
$(document).ready(function() {
    //Validation of the login form
    $("#login").form({
        fields:{ 
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
                  type: "minLength[8]",
                  prompt: "Wachtwoord heeft minimaal 8 tekens"
                }
              ]
          }
        }
      });
});