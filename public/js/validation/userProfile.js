
//load jQuery when document is ready
$(document).ready(function() {
//================================================//
//USER PROFILE FORM//
//================================================//
  $("#profileForm")
    .form({
        fields: {
          "user[username]": {
            identifier: "user[username]",
            rules: [
                {
                  type: "email",
                  prompt: "Vul een geldig email adres in. Let op! Als je het email adres wijzigt, moet je opnieuw inloggen."
                }
              ]
          },
          "user[dateOfBirth]": {
            identifier: "user[dateOfBirth]",
            optional: true,
            rules: [
              {
                type: 'regExp',
                value: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
                prompt: "Je gebruikt een non-supported browser, waarschijnlijk Safari. Datum kan hierdoor niet worden ingevuld via een datum-uitklapmenu. Vul de datum als volgt in: jjjj-mm-dd. We raden je aan om Chrome te gebruiken voor Pillars."
              }
            ]
          }
      }
    });

  $("#testForm").validate();
    
});


