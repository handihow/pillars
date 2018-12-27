//load jQuery when document is ready
$(document).ready(function() {

//================================================//
//QUESTIONNAIRE VALIDATIONS AND FORMS//
//================================================//
  $('#questionnaireForm').validate();
  
  $('form').on('click', '.trash', function(){
    $( this ).parent().parent().remove();
  });
  
  $('form').on('click', '.plus', function(){
    //generate a random number for id of the new element
    var random = Math.round(Math.random() * 1000000);
    //get the class attribute of the element
    var classAttr = $(this).attr('class').substring('plus icon '.length);
    var idAttr = $(this).attr('id');
    console.log(classAttr, idAttr);
    //get the id of the parent element
    var id = $(this).parent().parent().attr('id');
    //insert new elements after the parent element
    $('<div class="changing fields" id="' + random +
        '"><div class="fourteen wide field">' +
            '<input type="text" name="questionnaire[questionnaire][' + classAttr +
            '][' + idAttr + ']" required>' +
        '</div>' +
        '<div class="one wide field">' +
          '<i class="plus icon ' + classAttr +'" id="' + idAttr + '"></i>' +
        '</div>' +
        '<div class="one wide field">' +
          '<i class="trash icon"></i>' + 
        '</div>' +
      '</div>').insertAfter('#' + id);
  });

});
  