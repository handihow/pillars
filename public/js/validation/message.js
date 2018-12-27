//load jQuery when document is ready
$(document).ready(function() {

//================================================//
//VALIDATIONS ON THE MESSAGE FORMS//
//================================================//
  $("#messageForm")
  .form({
        fields: {
          "message[title]": {
            identifier: "message[title]",
            rules: [
                {
                  type: "empty",
                  prompt: "Dit veld is verplicht"
                }
              ]
          },
          "message[message]": {
            identifier: "message[message]",
            rules: [
                {
                  type: "empty",
                  prompt: "Dit veld is verplicht"
                }
              ]
          }
      }
    });  

});