
function goBack() { window.history.back(); }

//load jQuery when document is ready
$(document).ready(function() {

    //generic functionality to prevent deleting by accident
    $("#delete").click(function(){
      $('.warning').removeClass("hidden");
      $('#delete').addClass("disabled");
    });
    //give users the chance to cancel the destroy method
    $("#cancel").click(function(){
      $('.warning').addClass("hidden");
      $('#delete').removeClass("disabled");
    });

    //warning before deleting the user
    $(".warning-delete-user").click(function(){
      $('.warning').removeClass("hidden");
      $('.warning-delete-user').addClass("disabled");
    });

    $(".cancel-delete-user").click(function(){
      $('.warning').addClass("hidden");
      $('.warning-delete-user').removeClass("disabled");
    });

    //activate the dropdown menus
    $('.ui.dropdown').dropdown();

    //activating the tabs menu;
    $('.menu .item')
      .tab();

    //activate the popups
    $('.vertical.item')
      .popup({
        position: 'right center'
      })
    ;
    
    //activate the popups
    $('.horizontal.item')
      .popup({
        position: 'bottom center'
      })
    ;

    //activate the popups
    $('.button')
      .popup({
        position: 'top center'
      })
    ;

    //activate the progress bars;
    $('.ui.progress').progress();

    $("#availability").click(function(){
      { $('.ui.modal.availability').modal('show');}
    });

    $("#integrity").click(function(){
      { $('.ui.modal.integrity').modal('show');}
    });

    $("#confidentiality").click(function(){
      { $('.ui.modal.confidentiality').modal('show');}
    });
     
    $("#floorMap").click(function(){
      { $('.ui.modal.floorMap').modal('show');}
    });

    if($("#resultsTable").length == 0) {

      $(".ui table").DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print', 'colvis'
            ],
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
            }
        }
      });
    }
  
    

});
