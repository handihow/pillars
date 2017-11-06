//load jQuery when document is ready
$(document).ready(function() {
    
    var ctx = $("#hardware");
    
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Computers", "Digitale Schoolborden", "Netwerk", "Draagbare Computers"],
        datasets: [{
            label: 'Hardware',
            data: [$("#scoreComputersPerLeerling").text(), $("#scoreDigibordenPerKlaslokaal").text(), $("#scoreNetwerk").text(), $("#scorePortableComputersPerLeerling").text()],
            backgroundColor: [
                'rgba(227,6,19, 0.7)',
                'rgba(0,159,227, 0.7)',
                'rgba(249,178,51, 0.7)',
                'rgba(0, 0, 0, 0.7)'
            ],
            borderColor: [
                'rgba(227,6,19,1)',
                'rgba(0,159,227, 1)',
                'rgba(249,178,51, 1)',
                'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
});
