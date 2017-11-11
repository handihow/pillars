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
    
    var ctx3 = $("#software");
    
    var myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ["Rekenen", "Technisch lezen", "Begrijpend lezen", "Spelling", "Taal", "Toetsenbordvaardigheid", "Programmeren", "Mediawijsheid"],
            datasets: [{
                label: 'Digitale Leermiddelen',
                data: [$("#Rekenen").text(), $("[id='Technisch lezen']").text(), $("[id='Begrijpend lezen']").text(), $("#Spelling").text(), $("#Taal").text(), $("#Toetsenbordvaardigheid").text(), $("#Programmeren").text(), $("#Mediawijsheid").text()],
                backgroundColor: [
                    'rgba(52, 232, 88, 0.7)',
                    'rgba(172, 70, 147, 0.7)',
                    'rgba(227, 6, 19, 0.7)',
                    'rgba(0, 159, 227, 0.7)',
                    'rgba(249, 178, 51, 0.7)',
                    'rgba(18, 172, 19, 0.7)',
                    'rgba(172, 18, 171, 0.7)',
                    'rgba(0, 0, 0, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 232, 88, 1)',
                    'rgba(172, 70, 147, 1)',
                    'rgba(227, 6, 19, 1)',
                    'rgba(0, 159, 227, 1)',
                    'rgba(249, 178, 51, 1)',
                    'rgba(18, 172, 19, 1)',
                    'rgba(172, 18, 171, 1)',
                    'rgba(0, 0, 0, 0.7)'
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
                    'rgba(52, 232, 88, 0.7)',
                    'rgba(172, 70, 147, 0.7)',
                    'rgba(227, 6, 19, 0.7)',
                    'rgba(0, 159, 227, 0.7)',
                    'rgba(249, 178, 51, 0.7)',
                    'rgba(18, 172, 19, 0.7)',
                    'rgba(0, 0, 0, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 232, 88, 1)',
                    'rgba(172, 70, 147, 1)',
                    'rgba(227, 6, 19, 1)',
                    'rgba(0, 159, 227, 1)',
                    'rgba(249, 178, 51, 1)',
                    'rgba(18, 172, 19, 1)',
                    'rgba(0, 0, 0, 0.7)'
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
                    'rgba(227, 6, 19, 0.7)',
                    'rgba(0, 159, 227, 0.7)',
                    'rgba(249, 178, 51, 0.7)',
                    'rgba(18, 172, 19, 0.7)',
                    'rgba(0, 0, 0, 0.7)'
                ],
                borderColor: [
                    'rgba(227, 6, 19, 1)',
                    'rgba(0, 159, 227, 1)',
                    'rgba(249, 178, 51, 1)',
                    'rgba(18, 172, 19, 1)',
                    'rgba(0, 0, 0, 0.7)'
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
