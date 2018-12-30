
//load jQuery when document is ready
$(document).ready(function() {
    
    var result = $('#result').attr('data-value')?JSON.parse($('#result').attr('data-value')):null;

    if(result){
    Chart.defaults.global.legend.display = false;
    
    var ctx = $("#total");
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Hardware", "Digitale Leermiddelen", "Deskundigheid", "Organisatie"],
            datasets: [{
                label: 'Pillars Score',
                data: [result.total.hardware, result.total.software, result.total.competence, result.total.management],
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
            },
            plugins: {
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    color:'black',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    formatter: function(value, context){
                        return (Math.round(value/5 * 1000)/10 + "%")
                    }
                }
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
                data: [result.hardware.computersPerStudent, result.hardware.digitalSchoolbordsPerClassroom, 
                            result.hardware.network, result.hardware.portableComputersPerSchool],
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
            plugins: {
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    color:'black',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    formatter: function(value, context){
                        var standard = [result.standard.hardware.computersPerStudent.maxScore,
                            result.standard.hardware.digitalSchoolbordsPerClassroom.maxScore,
                            result.standard.hardware.network.maxScore,
                            result.standard.hardware.laptopsPerSchool.maxScore];
                        return (Math.round(value/standard[context.dataIndex] * 1000)/10 + "%")
                    }
                }
            },
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
                data: [result.software.math, result.software.functionalReading, result.software.receptiveReading,
                             result.software.orthography, result.software.language, result.software.keyboardSkills,
                              result.software.programming, result.software.mediaLiteracy],
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
            plugins: {
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    color:'black',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    formatter: function(value, context){
                        var standard = [result.standard.software.math.maxScore, 
                        result.standard.software.functionalReading.maxScore, 
                        result.standard.software.receptiveReading.maxScore,
                        result.standard.software.orthography.maxScore, 
                        result.standard.software.language.maxScore, 
                        result.standard.software.keyboardSkills.maxScore,
                        result.standard.software.programming.maxScore, 
                        result.standard.software.mediaLiteracy.maxScore];
                        return (Math.round(value/standard[context.dataIndex] * 1000)/10 + "%")
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    
    var ctx4 = $("#competence");
    
    var myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ["Beoord desk", "Gem eff", "Ond nodig", "ICT Gel", "Ped Did Hand", "Werk schcxt", "Pers Ontw", "Instum", "Inform", "Mediav"],
            datasets: [{
                label: 'Deskundigheid',
                data: [result.competence.competenceRating, result.competence.softwareRating, 
                        result.competence.support, result.competence.ictSkills, result.competence.pedagogicalDidacticalSkills,
                         result.competence.workInSchoolContext, result.competence.personalDevelopment,
                          result.competence.instrumentalSkills, result.competence.informationSkills, 
                          result.competence.mediaSkills],
                backgroundColor: [
                    'rgba(249, 178, 51, 0.7)',
                    'rgba(246, 190, 91, 0.7)',
                    'rgba(249, 203, 19, 0.7)',
                    'rgba(255, 222, 0, 0.7)',
                    'rgba(241, 220, 77, 0.7)',
                    'rgba(255, 241, 95, 0.7)',
                    'rgba(248, 239, 150, 0.7)',
                    'rgba(251, 244, 150, 0.7)',
                    'rgba(244, 232, 150, 0.7)',
                    'rgba(246, 238, 150, 0.7)'
                ],
                borderColor: [
                    'rgba(249, 178, 51, 1)',
                    'rgba(246, 190, 91, 1)',
                    'rgba(249, 203, 19, 1)',
                    'rgba(255, 222, 0, 1)',
                    'rgba(241, 220, 77, 1)',
                    'rgba(255, 241, 95, 1)',
                     'rgba(248, 239, 150, 1)',
                    'rgba(251, 244, 150, 1)',
                    'rgba(244, 232, 150, 1)',
                    'rgba(246, 238, 150, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    color:'black',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    formatter: function(value, context){
                        var standard = [result.standard.competence.competenceRating.maxScore, 
                        result.standard.competence.softwareRating.maxScore, 
                        result.standard.competence.support.maxScore, 
                        result.standard.competence.ictSkills.maxScore, 
                        result.standard.competence.pedagogicalDidacticalSkills.maxScore,
                        result.standard.competence.workInSchoolContext.maxScore, 
                        result.standard.competence.personalDevelopment.maxScore,
                        result.standard.competence.instrumentalSkills.maxScore, 
                        result.standard.competence.informationSkills.maxScore, 
                        result.standard.competence.mediaSkills.maxScore];
                        var calculatedScore = Math.round(value/standard[context.dataIndex] * 1000)/10;
                        if(calculatedScore){
                            return (calculatedScore + "%")
                        } else {
                            return "0 %"
                        }
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    
    var ctx5 = $("#management");
    
    var myChart5 = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: ["Overeenstemming", "Netwerkbeheer", "Incidentmelder", "Ond ICTer", "Inkoper", "Systeembeheerder"],
            datasets: [{
                label: 'Organisatie',
                data: [result.management.agreement, result.management.network, result.management.incidentReporter,
                         result.management.ictEducationalContentManager, result.management.ictPurchaser,
                            result.management.systemAdministrator],
                backgroundColor: [
                    'rgba(0, 0, 0, 0.7)',
                    'rgba(58, 58, 58, 0.7)',
                    'rgba(112, 112, 112, 0.7)',
                    'rgba(170, 170, 170, 0.7)',
                    'rgba(220, 220, 220, 0.7)',
                    'rgba(280, 280, 280, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                    'rgba(58, 58, 58, 1)',
                    'rgba(112, 112, 112, 1)',
                    'rgba(170, 170, 170, 1)',
                    'rgba(220, 220, 220, 1)',
                    'rgba(280, 280, 280, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    color:'black',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    formatter: function(value, context){
                        var standard = [result.standard.management.agreement.maxScore, 
                        result.standard.management.network.maxScore, 
                        result.standard.management.incidentReporter.maxScore,
                        result.standard.management.ictEducationalContentManager.maxScore, 
                        result.standard.management.ictPurchaser.maxScore,
                        result.standard.management.systemAdministrator.maxScore];
                        var calculatedScore = Math.round(value/standard[context.dataIndex] * 1000)/10;
                        if(calculatedScore){
                            return (calculatedScore + "%")
                        } else {
                            return "0 %"
                        }
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    var ctx6 = $("#softwareSS");
    
    var myChart6 = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: ["Aardrijkskunde", "Biologie", "Duits", "Economie", "Engels", "Frans", "Geschiedenis",  
      "Natuurkunde", "Nederlands", "Scheikunde", "Wiskunde"],
            datasets: [{
                label: 'Digitale Leermiddelen',
                data: [result.software.geography, result.software.biology, result.software.german, result.software.economy,
                         result.software.english, result.software.french, result.software.history, result.software.physics,
                         result.software.dutch, result.software.chemistry, result.software.mathematics],
                backgroundColor: [
                    'rgba(0, 159, 227, 0.7)',
                    'rgba(34, 34, 188, 0.7)',
                    'rgba(36, 83, 189, 0.7)',
                    'rgba(20, 105, 192, 0.7)',
                    'rgba(107, 178, 250, 0.7)',
                    'rgba(63, 158, 218, 0.7)',
                    'rgba(131, 208, 245, 0.7)',
                    'rgba(174, 216, 234, 0.7)',
                    'rgba(0, 159, 227, 0.7)',
                    'rgba(34, 34, 188, 0.7)',
                    'rgba(36, 83, 189, 0.7)',
                   
                ],
                borderColor: [
                    'rgba(0, 159, 227, 1)',
                    'rgba(34, 34, 188, 1)',
                    'rgba(36, 83, 189, 1)',
                    'rgba(20, 105, 192, 1)',
                    'rgba(107, 178, 250, 1)',
                    'rgba(63, 158, 218, 1)',
                    'rgba(131, 208, 245, 1)',
                    'rgba(174, 216, 234, 0.7)',
                    'rgba(0, 159, 227, 1)',
                    'rgba(34, 34, 188, 1)',
                    'rgba(36, 83, 189, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    display: false
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    }
});
