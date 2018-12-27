//load jQuery when document is ready
$(document).ready(function() {
    //Validation of the password reset form
    $("#reset").form({
        fields:{ 
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
        }
      });
    
});