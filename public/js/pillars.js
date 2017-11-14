//load jQuery when document is ready
$(document).ready(function() {
    
    Chart.defaults.global.legend.display = false;
    
    var ctx = $("#totaal");
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Hardware", "Digitale Leermiddelen", "Deskundigheid", "Organisatie"],
            datasets: [{
                label: 'Pillars Score',
                data: [$("#totaalHardware").text(), $("#totaalSoftware").text(), $("#totaalDeskundigheid").text(), $("#totaalOrganisatie").text()],
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
    
    var ctx2 = $("#hardware");
    
    var myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ["Computers", "Digitale Schoolborden", "Netwerk", "Draagbare Computers"],
            datasets: [{
                label: 'Hardware',
                data: [$("#scoreComputersPerLeerling").text(), $("#scoreDigibordenPerKlaslokaal").text(), $("#scoreNetwerk").text(), $("#scorePortableComputersPerLeerling").text()],
                backgroundColor: [
                    'rgba(227,6,19, 0.7)',
                    'rgba(156,16,6, 0.7)',
                    'rgba(191,35,66, 0.7)',
                    'rgba(239, 58, 79, 0.7)'
                ],
                borderColor: [
                    'rgba(227,6,19,1)',
                    'rgba(156,16,6, 1)',
                    'rgba(191,35,66, 1)',
                    'rgba(239, 58, 79, 1)'
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
    
    var ctx3 = $("#software");
    
    var myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ["Rekenen", "Technisch lezen", "Begrijpend lezen", "Spelling", "Taal", "Toetsenbordvaardigheid", "Programmeren", "Mediawijsheid"],
            datasets: [{
                label: 'Digitale Leermiddelen',
                data: [$("#Rekenen").text(), $("[id='Technisch lezen']").text(), $("[id='Begrijpend lezen']").text(), $("#Spelling").text(), $("#Taal").text(), $("#Toetsenbordvaardigheid").text(), $("#Programmeren").text(), $("#Mediawijsheid").text()],
                backgroundColor: [
                    'rgba(0, 159, 227, 0.7)',
                    'rgba(34, 34, 188, 0.7)',
                    'rgba(36, 83, 189, 0.7)',
                    'rgba(20, 105, 192, 0.7)',
                    'rgba(107, 178, 250, 0.7)',
                    'rgba(63, 158, 218, 0.7)',
                    'rgba(131, 208, 245, 0.7)',
                    'rgba(174, 216, 234, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 159, 227, 1)',
                    'rgba(34, 34, 188, 1)',
                    'rgba(36, 83, 189, 1)',
                    'rgba(20, 105, 192, 1)',
                    'rgba(107, 178, 250, 1)',
                    'rgba(63, 158, 218, 1)',
                    'rgba(131, 208, 245, 1)',
                    'rgba(174, 216, 234, 0.7)'
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
    
    var ctx4 = $("#deskundigheid");
    
    var myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ["Beoord desk", "Gem eff", "Ond nodig", "ICT Gel", "Ped Did Hand", "Werk schcxt", "Pers Ontw"],
            datasets: [{
                label: 'Deskundigheid',
                data: [$("#beoordeeldeDeskundigheid").text(), $("#gemiddeldeEffectiviteit").text(), $("#ondersteuningNodig").text(), $("#ictGeletterheid").text(), $("#pedagogischDidactisch").text(), $("#werkenSchooltext").text(), $("#persoonlijkeOntwikkeling").text()],
                backgroundColor: [
                    'rgba(249, 178, 51, 0.7)',
                    'rgba(246, 190, 91, 0.7)',
                    'rgba(249, 203, 19, 0.7)',
                    'rgba(255, 222, 0, 0.7)',
                    'rgba(241, 220, 77, 0.7)',
                    'rgba(255, 241, 95, 0.7)',
                    'rgba(246, 238, 150, 0.7)'
                ],
                borderColor: [
                    'rgba(249, 178, 51, 1)',
                    'rgba(246, 190, 91, 1)',
                    'rgba(249, 203, 19, 1)',
                    'rgba(255, 222, 0, 1)',
                    'rgba(241, 220, 77, 1)',
                    'rgba(255, 241, 95, 1)',
                    'rgba(246, 238, 150, 1)'
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
    
    var ctx5 = $("#organisatie");
    
    var myChart5 = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: ["Overeenstemming", "Netwerkbeheer", "Incidentmelder", "Ond ICTer", "Inkoper"],
            datasets: [{
                label: 'Organisatie',
                data: [$("#organisatorischeOvereenstemming").text(), $("#netwerkbeheer").text(), $("#incidentmelder").text(), $("#onderwijskundigICTer").text(), $("#ictInkoper").text()],
                backgroundColor: [
                    'rgba(0, 0, 0, 0.7)',
                    'rgba(58, 58, 58, 0.7)',
                    'rgba(112, 112, 112, 0.7)',
                    'rgba(170, 170, 170, 0.7)',
                    'rgba(220, 220, 220, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                    'rgba(58, 58, 58, 1)',
                    'rgba(112, 112, 112, 1)',
                    'rgba(170, 170, 170, 1)',
                    'rgba(220, 220, 220, 1)'
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
