//load jQuery when document is ready
$(document).ready(function() {

  console.log("validating softwaresettingsform..");
//================================================//
//FORM VALIDATIONS ON THE SOFTWARE SETTINGS ROUTE//
//================================================//
    $("#softwareSettingsForm")
      .form({
        fields: {
          "ratings0": {
            identifier: "ratings0",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de eerste kwaliteitseis in."
                }
              ]
          },
          "ratings1": {
            identifier: "ratings1",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de tweede kwaliteitseis in."
                }
              ]
          },
          "ratings2": {
            identifier: "ratings2",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de derde kwaliteitseis in."
                }
              ]
          },
          "ratings3": {
            identifier: "ratings3",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de vierde kwaliteitseis in."
                }
              ]
          },
          "ratings4": {
            identifier: "ratings4",
            rules: [
                {
                  type: "empty",
                  prompt: "Vul de vijfde kwaliteitseis in."
                }
              ]
          },
        }
    });


});