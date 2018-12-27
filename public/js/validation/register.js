//load jQuery when document is ready
$(document).ready(function() {

    $("#register").form({
        fields:{
          "firstName": {
            identifier: "firstName",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul je voornaam in"
                }
              ]
          },
          "lastName": {
            identifier: "lastName",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul je achternaam in"
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
                  type: "minLength[8]",
                  prompt: "Wachtwoord heeft minimaal 8 tekens"
                }
              ]
          },
          "password_again": {
            identifier: "password_again",
            rules: [
                {
                  type: "match[password]",
                  prompt: "Het wachtwoord is niet 2x hetzelfde"
                }
              ]
          },
          "organisation": {
            identifier: "organisation",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de organisatie in"
                }
              ]
          },
          "activationCode": {
            identifier: "activationCode",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de activatie code in"
                }
              ]
          },
        }
      });
    
});