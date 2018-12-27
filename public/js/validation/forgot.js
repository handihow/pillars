//load jQuery when document is ready
$(document).ready(function() {
    //Validation of the login form
    $("#forgot").form({
        fields:{ 
          "username": {
            identifier: "username",
            rules: [
                {
                  type: "email",
                  prompt: "Vul een geldig email adres in"
                }
              ]
          }
        }
      });
});