
function goBack() { window.history.back(); }

//load jQuery when document is ready
$(document).ready(function() {

    //generic functionality to prevent deleting by accident
    if($("#delete").length > 0) {
      $("#delete").click(function(){
        $('.warning').removeClass("hidden");
        $('#delete').addClass("disabled");
      });
    }
    //give users the chance to cancel the destroy method
    if($("#cancel").length > 0) {
      $("#cancel").click(function(){
        $('.warning').addClass("hidden");
        $('#delete').removeClass("disabled");
      });
    }

    //warning before deleting the user
    if($(".warning-delete-user").length > 0) {
      $(".warning-delete-user").click(function(){
        var myClass = $(this).attr("class").split(' ');
        $('.warning.'+myClass[myClass.length -1]).removeClass("hidden");
        $('.user-info.'+myClass[myClass.length -1]).addClass("hidden");
        $('.warning-delete-user'+myClass[myClass.length -1]).addClass("disabled");
      });
    }

    if($(".cancel-delete-user").length > 0) {
      $(".cancel-delete-user").click(function(){
        var myClass = $(this).attr("class").split(' ');
        $('.warning.'+myClass[myClass.length -1]).addClass("hidden");
        $('.user-info.'+myClass[myClass.length -1]).removeClass("hidden");
        $('.warning-delete-user.'+myClass[myClass.length -1]).removeClass("disabled");
      });
    }

    if($('.ui.dropdown').length > 0){
      //activate the dropdown menus
      $('.ui.dropdown').dropdown();
    }

    if($('.menu .item').length > 0){
      //activating the tabs menu;
      $('.menu .item')
      .tab();
    }

    if($('.school-remove').length > 0){
      $('.school-remove').click(function() {
        var myClass = $(this).attr("class");
        var myClasses = myClass.split(/\s+/)
        var index = myClasses.pop();
        $('#' + index).remove();
      })
    }

    if($('.vertical.item').length > 0){
    //activate the popups
    $('.vertical.item')
    .popup({
      position: 'right center'
    })
  };
  
  if($('.horizontal.item').length > 0){
      //activate the popups
      $('.horizontal.item')
      .popup({
        position: 'bottom center'
      })
    };

    if($('.button').length > 0){
      //activate the popups
      $('.button')
      .popup({
        position: 'top center'
      })
    };

    //activate the progress bars;
    if($('.ui.progress').length > 0){
      $('.ui.progress').progress();
    }

    if($("#availability").length > 0){
      $("#availability").click(function(){
        { $('.ui.modal.availability').modal('show');}
      });
    }

    if($("#integrity").length > 0){
      $("#integrity").click(function(){
        { $('.ui.modal.integrity').modal('show');}
      });
    }

    if($("#confidentiality").length > 0){
      $("#confidentiality").click(function(){
        { $('.ui.modal.confidentiality').modal('show');}
      });
    }
    
    if($("#floorMap").length > 0){
      $("#floorMap").click(function(){
        { $('.ui.modal.floorMap').modal('show');}
      });
    }

    if($("#resultsTable").length == 0 && $(".ui table").length > 0 ) {

      $(".ui table").DataTable({
        pageLength: 25,
        buttons: [
        'copy', 'csv', 'excel', 'colvis'
        ],
        dom: 'Bfrtip',
        "language": {
          "sProcessing": "Bezig...",
          "sLengthMenu": "_MENU_ resultaten weergeven",
          "sZeroRecords": "Geen resultaten gevonden",
          "sInfo": "_START_ tot _END_ van _TOTAL_ resultaten",
          "sInfoEmpty": "Geen resultaten om weer te geven",
          "sInfoFiltered": " (gefilterd uit _MAX_ resultaten)",
          "sInfoPostFix": "",
          "sSearch": "Zoeken:",
          "sEmptyTable": "Geen resultaten aanwezig in de tabel",
          "sInfoThousands": ".",
          "sLoadingRecords": "Een moment geduld aub - bezig met laden...",
          "oPaginate": {
            "sFirst": "Eerste",
            "sLast": "Laatste",
            "sNext": "Volgende",
            "sPrevious": "Vorige"
          },
          "oAria": {
            "sSortAscending":  ": activeer om kolom oplopend te sorteren",
            "sSortDescending": ": activeer om kolom aflopend te sorteren"
          },
          "buttons": {
            "colvis": "Zichtbare kolommen"
          },
        }
      });

    }

//===================================================
//FORM VALIDATIONS ON THE ACCOUNT MANAGEMENT PAGE
//===================================================
$("#accountManageForm").form({
  fields: {
    "user[firstName]": {
      identifier: "user[firstName]",
      rules: [
        {
          type: "empty",
          prompt: "Voornaam is verplicht" 
        }
      ]
    },
    "user[lastName]": {
      identifier: "user[lastName]",
      rules: [
        {
          type: "empty",
          prompt: "Achternaam is verplicht" 
        }
      ]
    },
    "user[username]": {
         identifier: "user[username]",
         rules: [
         {
           type: "email",
           prompt: "Vul een geldig email adres in"
         }
       ]
     }
  }
});

//==================
//FORM VALIDATION ON THE USER BULK IMPORT
//=======================================
$('#usersForm').form({
  fields: {
    "organisation": {
      identifier: "organisation",
      rules: [
        {
          type: "empty",
          prompt: "Bestuur is verplicht"
        }
      ]
    },
    "school": {
      identifier: "school",
      rules: [
        {
          type: "empty",
          prompt: "School is verplicht"
        }
      ]
    }
  }
});

  //================================================//
//FORM VALIDATIONS ON THE COMPETENCE ROUTE//
//================================================//
$("#competenceForm").
form({
  fields: {
    "school[competence][teachers]": {
      identifier: "school[competence][teachers]",
      rules: [
      {
        type: "integer[1..6]",
        prompt: "Beoordeel de deskundigheid met een geheel getal tussen 1 (niet deskundig) en 6 (zeer deskundig)."
      }
      ]
    },
    "school[competence][effectiveness]": {
      identifier: "school[competence][effectiveness]",
      rules: [
      {
        type: "integer[1..6]",
        prompt: "Beoordeel de gemiddelde effectiviteit van digitale leermiddelen met een geheel getal tussen 1 (niet effectief) en 6 (zeer effectief)."
      }
      ]
    }
  }
})  
;

  //================================================//
//EVALUATION FORM//
//FOR USERS AND SCHOOLS
//================================================//
$("#evaluationForm").validate();    


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

 //================================================//
//FORM VALIDATIONS ON THE MANAGEMENT ROUTE//
//================================================//
$("#managementForm").validate();


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


  //================================================//
//FORM VALIDATIONS ON THE PROCESSING ACTIVITY REGISTRY  //
//================================================//
$("#processingActivityForm").form({
  fields:{ 
    "processingActivity[processingActivityName]": {
      identifier: "processingActivity[processingActivityName]",
      rules: [
      {
        type: "empty",
        prompt: "Naam voor de verwerking is verplicht"
      }
      ]
    },
    "processingActivity[controllerName]": {
      identifier: "processingActivity[controllerName]",
      rules: [
      {
        type: "empty",
        prompt: "Naam van de verwerkingsverantwoordelijke is verplicht"
      }
      ]
    },
    "processingActivity[internalLink]" : {
      identifier: "processingActivity[internalLink]",
      optional: true,
      rules: [
      {
        type: "url",
        prompt: "Geef een geldige url in"
      }
      ]
    }
  }
});


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

  //================================================//
//FORM VALIDATIONS ON THE SCHOOL ROUTES//
//================================================//
$("#zoekScholen").
form({
  fields: {
    "zoekcriterium": {
      identifier: "zoekcriterium",
      rules: [
      {
        type: "minCount[1]",
        prompt: "Selecteer waarop je wilt zoeken (BRIN, schoolLocationIdNumber of schoolbestuur nummer)"
      }
      ]
    },
    "zoekveld": {
      identifier: "zoekveld",
      rules: [
      {
        type: "minLength[4]",
        prompt: "Geef een geldig nummer in"
      }
      ]
    }
  }
})  
;

$("#scholenToevoegen").validate();

$("#schoolEdit").form({
  fields: {
    "school[schoolIdNumber]": {
      identifier: "school[schoolIdNumber]",
      rules: [
      {
        type: "exactLength[4]",
        prompt: "Vul een geldig BRIN nummer in (bestaat uit twee cijfers en twee hoofdletters)"
      }
      ]
    },
    "school[schoolLocationIdNumber]": {
      identifier: "school[schoolLocationIdNumber]",
      rules: [
      {
        type: "exactLength[6]",
        prompt: "Vul een geldig locatienummer in (bestaat uit twee cijfers, twee hoofdletters gevolgd door twee cijfers)"
      }
      ]
    },
    "school[organisationIdNumber]": {
      identifier: "school[organisationIdNumber]",
      rules: [
      {
        type: "exactLength[5]",
        prompt: "Vul een geldig bevoegd gezag nummer in (bestaat uit vijf cijfers)"
      }
      ]
    },
    "school[name]": {
      identifier: "school[name]",
      rules: [
      {
        type: "empty",
        prompt: "Vul de naam van de instelling in"
      }
      ]
    },
    "school[city]": {
      identifier: "school[city]",
      rules: [
      {
        type: "empty",
        prompt: "Vul de plaatsnaam van de instelling in"
      }
      ]
    },
    "school[countStudents]": {
      identifier: "school[countStudents]",
      rules: [
      {
        type: "integer",
        prompt: "Vul het aantal leerlingen in (geheel getal)"
      }
      ]
    },
    "school[countClassrooms]": {
      identifier: "school[countClassrooms]",
      rules: [
      {
        type: "integer",
        prompt: "Vul het aantal klaslokalen in (geheel getal)"
      }
      ]
    },
    "school[logo]": {
      identifier: "school[logo]",
      optional: true,
      rules: [
      {
        type: "url",
        prompt: "Vul een geldige url in"
      }
      ]
    }
  }
})  
;

 //================================================//
//FORM VALIDATIONS ON THE SOFTWARE ROUTE//
//================================================//
$("#softwareForm")
.form({
  fields: {
    "software[name]": {
      identifier: "software[name]",
      rules: [
      {
        type: "empty",
        prompt: "Vul de naam van het digitale leermiddel (software-pakket) in."
      }
      ]
    },
    "software[subject]": {
      identifier: "software[subject]",
      rules: [
      {
        type: "empty",
        prompt: "Vul het vak in."
      }
      ]
    },
    "software[effectiveness]": {
      identifier: "software[effectiveness]",
      rules: [
      {
        type: "integer[0..6]",
        prompt: "Beoordeel het digitale leermiddel met 1 (niet effectief) tot 6 (zeer effectief)"
      }
      ]
    },
    "software[functionalities]": {
      identifier: "software[functionalities]",
      rules: [
      {
        type: "minCount[1]",
        prompt: "Selecteer minimaal 1 functie"
      }
      ]
    },
    "software[gradeLevels]": {
      identifier: "software[gradeLevels]",
      rules: [
      {
        type: "minCount[1]",
        prompt: "Selecteer minimaal 1 groep"
      }
      ]
    }
  }
});


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

  //================================================//
//VALIDATIONS ON THE STANDARDIZATION FORM//
//================================================//
// INFOMESSAGES

$('.hardwareMessage').focus(function(){
  $("#infoHardware").attr('class', 'ui message')
});

$('.hardwareMessage').focusout(function(){
  $("#infoHardware").attr('class', 'ui hidden message')
});

$('#computersPerStudent').focus(function(){
  $("#infoComputersPerStudent").attr('class', 'ui message')
});

$('#computersPerStudent').focusout(function(){
  $("#infoComputersPerStudent").attr('class', 'ui hidden message')
});

$('#digitalBordsPerClassroom').focus(function(){
  $("#infoDigitalBords").attr('class', 'ui message')
});

$('#digitalBordsPerClassroom').focusout(function(){
  $("#infoDigitalBords").attr('class', 'ui hidden message')
});

$('#portableComputersPerSchool').focus(function(){
  $("#infoPortableComputers").attr('class', 'ui message')
});

$('#portableComputersPerSchool').focusout(function(){
  $("#infoPortableComputers").attr('class', 'ui hidden message')
});

$('.maxScoreHardware').focus(function(){
  $("#infoMaxScoreHardware").attr('class', 'ui message')
});

$('.maxScoreHardware').focusout(function(){
  $("#infoMaxScoreHardware").attr('class', 'ui hidden message')
});


$.fn.form.settings.rules.greaterThan = function (inputValue, validationValue) {
  return inputValue >= validationValue;
};

$.fn.form.settings.rules.smallerThan = function (inputValue, validationValue) {
  return inputValue <= validationValue;
};


$("#addStandard")
.form({
  fields: {
    'standard[name]': {
      identifier: 'standard[name]',
      rules: [
      {
        type: "empty",
        prompt: "Vul een naam in voor de normering"
      }
      ]
    }
  }
})


var standardFormFields = 
{
  fields: {
    "standard[name]": {
      identifier: "standard[name]",
      rules: [
      {
        type: "empty",
        prompt: "Vul een naam in voor de normering."
      }
      ]
    },
    "standard[hardware][computersPerStudent][minRAM]": {
      identifier: "standard[hardware][computersPerStudent][minRAM]",
      rules: [
      {
        type: "integer[1..64]",
        prompt: "Vul het werkgeheugen in (GB). Dit is een geheel getal tussen 1 en 64 (GB)."
      }
      ]
    },
    "standard[hardware][computersPerStudent][maxYear]": {
      identifier: "standard[hardware][computersPerStudent][maxYear]",
      rules: [
      {
        type: "integer[1..20]",
        prompt: "Vul de maximale ouderdom van hardware in (gehele jaren). Devices ouder dan zoveel jaar worden niet meegeteld."
      }
      ]
    },
    "standard[hardware][computersPerStudent][isComputer]": {
      identifier: "standard[hardware][computersPerStudent][isComputer]",
      rules: [
      {
        type: "minCount[1]",
        prompt: "Vul minimaal 1 soort hardware in dat meegeteld wordt als computer."
      }
      ]
    },
    "standard[hardware][computersPerStudent][standard]": {
      identifier: "standard[hardware][computersPerStudent][standard]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 1. Hierbij is 0,2 bijvoorbeeld 1 computer per 5 leerlingen."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 1,
        prompt: 'Getal moet kleiner of gelijk zijn aan 1.'
      }
      ]
    },
    "standard[hardware][digitalSchoolbordsPerClassroom][isTouchscreen]": {
      identifier: "standard[hardware][digitalSchoolbordsPerClassroom][isTouchscreen]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 1. Hierbij is 1 bijvoorbeeld 1 digitaal schoolbord per klaslokaal."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 1,
        prompt: 'Getal moet kleiner of gelijk zijn aan 1.'
      }
      ]
    },
    "standard[hardware][laptopsPerSchool][isLaptop]": {
      identifier: "standard[hardware][laptopsPerSchool][isLaptop]",
      rules: [
      {
        type: "minCount[1]",
        prompt: "Vul minimaal 1 soort hardware in dat meegeteld wordt als laptop."
      }
      ]
    },
    "standard[hardware][laptopsPerSchool][standard]": {
      identifier: "standard[hardware][laptopsPerSchool][standard]",
      rules: [
      {
        type: "integer",
        prompt: "Vul een geheel getal in."
      }
      ]
    },
    "standard[hardware][laptopsPerSchool][maxYear]": {
      identifier: "standard[hardware][laptopsPerSchool][maxYear]",
      rules: [
      {
        type: "integer[1..20]",
        prompt: "Vul de maximale ouderdom van laptops in (gehele jaren). Devices ouder dan zoveel jaar worden niet meegeteld."
      }
      ]
    },
    "standard[hardware][computersPerStudent][maxScore]": {
      identifier: "standard[hardware][computersPerStudent][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[hardware][digitalSchoolbordsPerClassroom][maxScore]" : {
      identifier: "standard[hardware][digitalSchoolbordsPerClassroom][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[hardware][network][maxScore]": {
      identifier: "standard[hardware][network][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[hardware][laptopsPerSchool][maxScore]": {
      identifier: "standard[hardware][laptopsPerSchool][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][competenceRating][standard]": {
      identifier: "standard[competence][competenceRating][standard]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 1 en 6. "
      },
      {
        type: 'greaterThan',
        value: 1,
        prompt: 'Getal moet groter zijn dan 1.'
      }
      ,
      {
        type: 'smallerThan',
        value: 6,
        prompt: 'Getal moet kleiner of gelijk zijn aan 6.'
      }
      ]
    },
    "standard[competence][softwareRating][standard]": {
      identifier: "standard[competence][softwareRating][standard]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 1 en 6. "
      },
      {
        type: 'greaterThan',
        value: 1,
        prompt: 'Getal moet groter zijn dan 1.'
      }
      ,
      {
        type: 'smallerThan',
        value: 6,
        prompt: 'Getal moet kleiner of gelijk zijn aan 6.'
      }
      ]
    },
    "standard[competence][competenceRating][maxScore]": {
      identifier: "standard[competence][competenceRating][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][softwareRating][maxScore]": {
      identifier: "standard[competence][softwareRating][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][support][maxScore]": {
      identifier: "standard[competence][support][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][ictSkills][maxScore]": {
      identifier: "standard[competence][ictSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][pedagogicalDidacticalSkills][maxScore]": {
      identifier: "standard[competence][pedagogicalDidacticalSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][workInSchoolContext][maxScore]": {
      identifier: "standard[competence][workInSchoolContext][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][personalDevelopment][maxScore]": {
      identifier: "standard[competence][personalDevelopment][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][instrumentalSkills][maxScore]": {
      identifier: "standard[competence][instrumentalSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][informationSkills][maxScore]": {
      identifier: "standard[competence][informationSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[competence][mediaSkills][maxScore]": {
      identifier: "standard[competence][mediaSkills][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[management][agreement][maxScore]": {
      identifier: "standard[management][agreement][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    },
    "standard[management][network][maxScore]": {
      identifier: "standard[management][network][maxScore]",
      rules: [
      {
        type: "number",
        prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
      },
      {
        type: 'greaterThan',
        value: 0,
        prompt: 'Getal moet groter zijn dan 0.'
      }
      ,
      {
        type: 'smallerThan',
        value: 5,
        prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
      }
      ]
    }
  }
}

var softwareKeys = ["geography", "biology", "german", "economy", "english", "french", "history",
"physics", "dutch", "chemistry", "math", "functionalReading", "receptiveReading", "orthography",
"language", "keyboardSkills", "programming", "mediaLiteracy"];
softwareKeys.forEach(function(softwareKey){
  var identifierGL = 'standard[software][' + softwareKey + '][gradeLevels]'
  standardFormFields.fields[identifierGL] = {
    identifier: identifierGL,
    rules: [
    {
      type: "minCount[1]",
      prompt: "Vul minimaal 1 groep of klas in."
    }
    ]
  }
  var identifierFunc = 'standard[software][' + softwareKey + '][functionalities]'
  standardFormFields.fields[identifierFunc] = {
    identifier: identifierFunc,
    rules: [
    {
      type: "minCount[1]",
      prompt: "Vul minimaal 1 functie in."
    }
    ]
  }
  var identifierMS = 'standard[software][' + softwareKey + '][maxScore]'
  standardFormFields.fields[identifierMS] = {
    identifier: identifierMS,
    rules: [
    {
      type: "number",
      prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
    },
    {
      type: 'greaterThan',
      value: 0,
      prompt: 'Getal moet groter zijn dan 0.'
    }
    ,
    {
      type: 'smallerThan',
      value: 5,
      prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
    }
    ]
  }
  var identifierR = 'standard[software][' + softwareKey + '][minRating]'
  standardFormFields.fields[identifierR] = {
    identifier: identifierR,
    rules: [
    {
      type: "number",
      prompt: "Vul een getal in tussen 0 en 1. Hierbij is 0,75 bijvoorbeeld dat 75% van de kwaliteiten aanwezig zijn."
    },
    {
      type: 'greaterThan',
      value: 0,
      prompt: 'Getal moet groter zijn dan 0.'
    }
    ,
    {
      type: 'smallerThan',
      value: 1,
      prompt: 'Getal moet kleiner of gelijk zijn aan 1.'
    }
    ]
  } 
})

var roleKeys = ['incidentReporter','ictEducationalContentManager','ictPurchaser'];
roleKeys.forEach(function(roleKey){
  var identifierH = 'standard[management][' + roleKey + '][hoursPerYear]'
  standardFormFields.fields[identifierH] = {
    identifier: identifierH,
    rules: [
    {
      type: "number",
      prompt: "Vul een geheel aantal normjaartaakuren in."
    }
    ]
  }
  var identifierAH = 'standard[management][' + roleKey + '][additionalHoursPerYear]'
  standardFormFields.fields[identifierAH] = {
    identifier: identifierAH,
    rules: [
    {
      type: "number",
      prompt: "Vul een geheel aantal extra normjaartaakuren in."
    }
    ]
  }
  var identifierMS = 'standard[management][' + roleKey + '][maxScore]'
  standardFormFields.fields[identifierMS] = {
    identifier: identifierMS,
    rules: [
    {
      type: "number",
      prompt: "Vul een getal in tussen 0 en 5. Zorg ervoor dat maximale scores tezamen 5 zijn."
    },
    {
      type: 'greaterThan',
      value: 0,
      prompt: 'Getal moet groter zijn dan 0.'
    }
    ,
    {
      type: 'smallerThan',
      value: 5,
      prompt: 'Getal moet kleiner of gelijk zijn aan 5.'
    }
    ]
  } 
})

$("#standardForm").form(standardFormFields); 

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
