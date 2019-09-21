
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
        var myClass = $(this).attr("class");
        $('.warning.'+myClass[myClass.length -1]).removeClass("hidden");
        $('.warning-delete-user'+myClass[myClass.length -1]).addClass("disabled");
      });
    }

    if($(".cancel-delete-user").length > 0) {
      $(".cancel-delete-user").click(function(){
        $('.warning').addClass("hidden");
        $('.warning-delete-user').removeClass("disabled");
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
  
    

});
