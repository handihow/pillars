
//load jQuery when document is ready
$(document).ready(function() {

    $('#cmd').click(function() {
        var HTML_Width = $(".html-content").width();
        var HTML_Height = $(".html-content").height();
        var top_left_margin = 50;
        var PDF_Width = HTML_Width + (top_left_margin * 2);
        var PDF_Height = (PDF_Width * 1.7) + (top_left_margin * 2);
        var canvas_image_width = HTML_Width;
        var canvas_image_height = HTML_Height;

        var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

        var htmlContent = $(".html-content")[0];
        console.log(htmlContent);
        html2canvas(htmlContent).then(function (canvas) {
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
            pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
            for (var i = 1; i <= totalPDFPages; i++) { 
                pdf.addPage(PDF_Width, PDF_Height);
                pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
            }
            pdf.save("Pillars Score Rapport.pdf");
        });
    });
    
    var result = $('#result').attr('data-value')?JSON.parse($('#result').attr('data-value')):null;

    console.log(result);

    if(result){
    Chart.defaults.global.legend.position = 'right';
    
    var ctx = $("#total");

    var totalData = Object.keys(result.total).map(function(key){
        return Math.round(result.total[key] * 100 / 5);
    });

    var backgroundColors = [
                    'rgba(227,6,19, 0.7)',
                    'rgba(0,159,227, 0.7)',
                    'rgba(249,178,51, 0.7)',
                    'rgba(0, 0, 0, 0.7)',
                    'rgba(1,105,54, 0.7)',
                    'rgba(254,154,118, 0.7)',
                    'rgba(180,19,236, 0.7)',
                    'rgba(160,160,160, 0.7)'
                ];
    var borderColors = [
                    'rgba(227,6,19,1)',
                    'rgba(0,159,227, 1)',
                    'rgba(249,178,51, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(1,105,54, 1)',
                    'rgba(254,154,118, 1)',
                    'rgba(180,19,236, 1)',
                    'rgba(160,160,160, 1)'
                ];
    
    var layout = {
                    padding: 10
                };
    var scale = {
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0,
                        stepSize: 20,
                        callback: function(tick) {
                          return tick.toString() + '%';
                        }
                    }
                };
    
    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ["Hardware", "Digitale Leermiddelen", "Deskundigheid", "Organisatie"],
            datasets: [{
                label: 'Pillars Score',
                data: totalData,
                backgroundColor: backgroundColors.slice(0,4),
                borderColor: borderColors.slice(0,4),
                borderWidth: 2
            }]
        },
        options: {
            layout: layout,
            scale: scale,
            plugins: {
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    color:'black',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    formatter: function(value, context){
                        return (value * 5 / 100).toFixed(1).replace('.', ',') + ' (5,0)';
                    }
                }
            }
        }
    });
    
    var ctx2 = $("#hardware");
    
    var hardwareData = ['computersPerStudent', 'digitalSchoolbordsPerClassroom', 'network', 'portableComputersPerSchool'].map(function(key){
        if(key==='portableComputersPerSchool'){
            return Math.round(result.hardware[key] / result.standard.hardware.laptopsPerSchool.maxScore * 100);
        } else {
            return Math.round(result.hardware[key] / result.standard.hardware[key].maxScore * 100);
        }
    });

    var myChart2 = new Chart(ctx2, {
        type: 'polarArea',
        data: {
            labels: ["Computers", "Digitale Schoolborden", "Netwerk", "Draagbare Computers"],
            datasets: [{
                label: 'Hardware',
                data: hardwareData,
                backgroundColor: backgroundColors.slice(0,4),
                borderColor: borderColors.slice(0,4),
                borderWidth: 2
            }]
        },
        options: {
            layout: layout,
            scale: scale,
            plugins: {
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    color:'black',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    formatter: function(value, context){
                        var standard = ['computersPerStudent', 'digitalSchoolbordsPerClassroom', 'network', 'laptopsPerSchool'].map(function(key){
                            return result.standard.hardware[key].maxScore;
                        });
                        var contextValue = parseFloat(standard[context.dataIndex]);
                        return (value * standard[context.dataIndex] / 100).toFixed(1).replace('.', ',') + ' (' + 
                                contextValue.toFixed(1).replace('.', ',') + ')';
                    }
                }
            }, 
        }
    });
    
    if($("#software").length > 0){

        var ctx3 = $("#software");

        var softwareData = Object.keys(result.standard.software).map(function(key){
            return Math.round(result.software[key] / result.standard.software[key].maxScore * 100);
        });
        
        var myChart3 = new Chart(ctx3, {
            type: 'polarArea',
            data: {
                labels: ["Rekenen", "Technisch lezen", "Begrijpend lezen", "Spelling", "Taal", "Toetsenbordvaardigheid", "Programmeren", "Mediawijsheid"],
                datasets: [{
                    label: 'Digitale Leermiddelen',
                    data: softwareData,
                    backgroundColor: backgroundColors.slice(0,8),
                    borderColor: borderColors.slice(0,8),
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
                            var standard = Object.keys(result.standard.software).map(function(key){
                                return result.standard.software[key].maxScore;
                            });
                            var contextValue = parseFloat(standard[context.dataIndex]);
                            return (value * standard[context.dataIndex] / 100).toFixed(1).replace('.', ',') + ' (' + 
                                    contextValue.toFixed(1).replace('.', ',') + ')';
                        }
                    }
                },
                layout: layout,
                scale: scale
            }
        });
    } else {
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

    var competenceLabels = ["ICT Geletterdheid", "Pedagogisch Didactisch Handelen", "Werken in de schoolcontext", 
                                "Persoonlijke Ontwikkeling", "Instumentele vaardigheden", "Informatievaardigheden", "Mediawijsheid"];
    var competenceIds = ['ictSkills', 'pedagogicalDidacticalSkills', 'workInSchoolContext', 'personalDevelopment', 'instrumentalSkills',
                            'informationSkills', 'mediaSkills'];
    var competenceCategories = [];
    Object.keys(result.standard.competence).forEach(function(key){
        if(result.standard.competence[key].maxScore !== '0'){
            let index = competenceIds.findIndex(cid => cid  === key);
            if(index>-1){
                competenceCategories.push({id: key, label: competenceLabels[index]});
            }
        }
    });    

    var competenceData = competenceCategories.map(function(key){
            return Math.round(result.competence[key.id] / result.standard.competence[key.id].maxScore * 100);
        });
    
    var ctx4 = $("#competence");
    
    var myChart4 = new Chart(ctx4, {
        type: 'polarArea',
        data: {
            labels: competenceCategories.map(cc => cc.label),
            datasets: [{
                label: 'Deskundigheid',
                data: competenceData,
                backgroundColor: backgroundColors.slice(0,competenceData.length),
                borderColor: borderColors.slice(0,competenceData.length),
                borderWidth: 2
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
                        var standard = competenceCategories.map(function(cat){
                            return result.standard.competence[cat.id].maxScore;
                        });
                        var contextValue = parseFloat(standard[context.dataIndex]);
                        return (value * standard[context.dataIndex] / 100).toFixed(1).replace('.', ',') + ' (' + 
                                contextValue.toFixed(1).replace('.', ',') + ')';
                    }
                }
            },
            layout: layout,
            scale: scale
        }
    });
    
    var ctx5 = $("#management");

    var managementLabels = ["Overeenstemming", "Netwerkbeheer", "Incidentmelder", "Onderwijskundig ICTer", "Inkoper", "Systeembeheerder"]
    
    var managementData = Object.keys(result.management).map(function(key){
            if(result.standard.management[key].maxScore === '0'){
                return 0
            } else {
                return Math.round(result.management[key] / result.standard.management[key].maxScore * 100);    
            }
        });

    var myChart5 = new Chart(ctx5, {
        type: 'polarArea',
        data: {
            labels: managementLabels,
            datasets: [{
                label: 'Organisatie',
                data: managementData,
                backgroundColor: backgroundColors.slice(0,6),
                borderColor: borderColors.slice(0,6),
                borderWidth: 2
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
                        var standard = Object.keys(result.standard.management).map(function(key){
                            return result.standard.management[key].maxScore;
                        });
                        var contextValue = parseFloat(standard[context.dataIndex]);
                        return (value * standard[context.dataIndex] / 100).toFixed(1).replace('.', ',') + ' (' + 
                                contextValue.toFixed(1).replace('.', ',') + ')';
                    }
                }
            },
            layout: layout,
            scale: scale
        }
    });

    }
});
