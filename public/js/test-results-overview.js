//load jQuery when document is ready
$(document).ready(function() {
	var params=location.pathname.split("/");

	$.get( "/user/"+ params[2] + "/api/tests", function( results ) {
		console.log(results);
		var ctx = $('#grafiek');
		backgroundColors = [];
		borderColors = [];
        results.forEach(function(result, index){
        	if(index%4 == 0){
        		backgroundColors.push('rgba(227,6,19, 0.7)');
            	borderColors.push('rgba(227,6,19,1)');
        	} else if(index%4 == 1){
        		backgroundColors.push('rgba(0,159,227, 0.7)');
            	borderColors.push('rgba(0,159,227, 1)');
        	} else if(index%4 == 2){
        		backgroundColors.push('rgba(249,178,51, 0.7)');
            	borderColors.push('rgba(249,178,51, 1)');
        	} else {
        		backgroundColors.push('rgba(0, 0, 0, 0.7)');
            	borderColors.push('rgba(0, 0, 0, 1)');
        	}
        })
        var myChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
            labels: results.map(o => o.subject),
            datasets: [{
                label: 'Test Resultaten',
                data: results.map(o => o.result * 100),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2
              }
            ]
          },
          options: {
          	legend: {display: false},
            scales: {
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxes: [{
              	position: top,
              	scaleLabel: {display: true,
              	labelString: 'Resultaat (%)'},
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }]

            }
          }
        });

    });



});