//load jQuery when document is ready
jQuery(document).ready(function($) {
//================================================//
//FORM VALIDATIONS ON THE GENERAL ROUTE//
//================================================//
    console.log("connected");
    //Validation of the password reset form
    $("#resetform").validate({
      rules: {
        new_password: "required",
        new_password_again: {
          equalTo: "#new_password"
        }
      }
    });

    //Validation of the user registration form
    $("#registerValidation").validate({
      rules: {
        useremail: "required",
        password: "required",
        password_again: {
          equalTo: "#password"
        }
      }
    });
    
    //Validation of the login form
    $("#login").validate();
    
//================================================//
//FORM VALIDATIONS ON THE ADMIN ROUTE//
//================================================//

  //Validation of the school admin user registration form
    $("#adminRegister").validate({
      rules: {
        password: "required",
        password_again: {
          equalTo: "#password"
        }
      }
    });

});