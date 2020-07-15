var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Survey = require("../../models/survey");
var SurveyResult = require("../../models/surveyResult");
var middleware = require("../../middleware");
var json2csv = require("json2csv");
var config = require("../../config/config");
var score = require("../../config/score");
var calcs = require("../../config/competence/survey");
var _ = require("lodash");
var Organisation = require("../../models/organisation");
var Statistic = require("../../models/statistic");
var hardwareScore = require("../../config/hardware/score");

router.get("/schools", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}},
                function(err, schools){
                    if(err || !schools) {
                        req.flash("error", err.message);
                        res.redirect("back");
                    } else {
                        res.locals.scripts.header.datatables = true;
                        res.locals.scripts.footer.datatables = true;
                        res.render("overview/schools", {schools: schools, organisation: organisation});         
                    }
                });
        };
    });
});

//SHOW ROUTE HARDWARE OVERVIEW SCHOLEN
router.get("/hardware", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}})
            .populate("hardware")
            .populate("standard")
            .exec(function(err, schools){
                if(err || !schools) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    var trackedHardwares = []; var results = [];
                    schools.forEach((school, index) => {
                       var trackedHardware = hardwareScore.calculateHardwareStatus(school);
                       trackedHardwares.push(JSON.parse(JSON.stringify(trackedHardware)));
                    });
                    var combinedTracked = [];
                    config.hardware.types.forEach(function(hardwareType){
                        hardwareType.count = 0;
                        hardwareType.countLowSpecifications = 0;
                        hardwareType.countDepreciated = 0;
                        hardwareType.countDepreciatedNextYear = 0;
                        hardwareType.hasMemoryCriterium = false;
                        trackedHardwares.forEach(function(tracked){
                            var schoolTracked = JSON.parse(JSON.stringify(tracked));
                            var trackedIndex = schoolTracked.findIndex(hw => hw.singular == hardwareType.singular);
                            if(trackedIndex>-1){
                                hardwareType.count += schoolTracked[trackedIndex].count;
                                hardwareType.countLowSpecifications += schoolTracked[trackedIndex].countLowSpecifications;
                                hardwareType.countDepreciated += schoolTracked[trackedIndex].countDepreciated;
                                if(schoolTracked[trackedIndex].hasMemoryCriterium){
                                    hardwareType.hasMemoryCriterium = true;    
                                }
                            }
                        });
                        combinedTracked.push(hardwareType);
                    });
                    res.locals.scripts.footer.chartjs = true;
                    res.render("hardware/index", {
                        schools: schools, 
                        config: config, 
                        organisation: organisation, 
                        trackedHardware: combinedTracked
                    });         
                }
            }); 
        };
    });
});

    

//SHOW ROUTE HARDWARE OVERVIEW SCHOLEN
router.get("/hardware/list", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}})
            .populate("hardware")
            .populate("standard")
            .exec(function(err, schools){
                if(err || !schools) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    var items = [];
                    schools.forEach(function(school){
                        school.hardware.forEach(function(hardware){
                            if(school.standard){
                                if(school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
                                    hardware.memory < school.standard.hardware.computersPerStudent.minRAM){
                                    hardware.isDepreciated = true;
                                hardware.warning = "Te weinig werkgeheugen";
                            } else if(!school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
                                hardware.deploymentYear < (new Date()).getFullYear() - school.standard.hardware.computersPerStudent.maxYear) {
                                hardware.isDepreciated = true;
                                hardware.warning = "Apparaat is te oud";
                            }
                            hardware.schoolName = school.name;
                            items.push(hardware);
                        }
                    });
                    });
                    res.locals.scripts.header.datatables = true;
                    res.locals.scripts.footer.datatables = true;
                    res.render("table-view/index", {
                        schools: schools, 
                        organisation: organisation,
                        items: items, 
                        columns: config.hardware.columns,
                        header: 'hardware',
                        hasWarningRow: true
                    });         
                }
            })
        };
    });
});

//CHARTS - charts of hardware
router.get("/hardware/charts", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}})
            .populate("hardware")
            .populate("standard")
            .exec(function(err, schools){
                if(err || !schools) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    let organisationHardware = {hardware : []};
                    schools.forEach(function(school){
                        school.hardware.forEach(function(hardware){
                            if(school.standard){
                                if(school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
                                    hardware.memory < school.standard.hardware.computersPerStudent.minRAM){
                                    hardware.isDepreciated = true;
                                hardware.warning = "Te weinig werkgeheugen";
                            } else if(!school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
                                hardware.deploymentYear < (new Date()).getFullYear() - school.standard.hardware.computersPerStudent.maxYear) {
                                hardware.isDepreciated = true;
                                hardware.warning = "Apparaat is te oud";
                            }
                        }
                        organisationHardware.hardware.push(hardware);
                    });
                    });
                    res.locals.scripts.header.surveyanalytics = true;
                    res.locals.scripts.footer.hardwareanalytics = true;
                    res.render("overview/hardware-charts", {
                        organisationHardware: organisationHardware, 
                        organisation: organisation
                    });        
                };
            });
        };  
    });
});    

//BUDGET - shows how much budget needs to be spent to get hardware in order
router.get("/hardware/budget", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else { 
            res.locals.scripts.header.datatables = true;
            res.locals.scripts.footer.datatables = true;
            res.render("overview/hardware-budget", {organisation: organisation, trackedHardware: config.hardware.types})  
        }
    });
});

//DOWNLOAD ROUTE HARDWARE OVERVIEW SCHOLEN
router.get("/hardware/download", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}})
            .populate("hardware")
            .exec(function(err, scholen){
                if(err || !scholen) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    var hardwareList = [];
                    scholen.forEach(function(school){
                        school.hardware.forEach(function(hardware){
                            hardware.school = school.name;
                            hardwareList.push(hardware);
                        });
                    });
                    var fields = ['school', 'type', 'name', 'brand', 'model', 'serialTag', 
                    'processor', 'memory', 'deploymentYear','numberWorkPlacesMultipoint',
                    'isTouchscreenDigibord', 'screensizeDigibord'];
                    var fieldNames = ['School', 'Type', 'Naam', 'Merk', 'Model', 'Serial/Tag', 
                    'Processor', 'Werkgeheugen (GB)', 'Jaar ingebruikname', 'Aantal werkplekken (Multipoint)',
                    'is Touchscreen', 'Schermgrootte'];
                    json2csv({ data: hardwareList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
                        if(err){
                            req.flash("error", err.message);
                            res.redirect("back");
                        } else {
                            res.setHeader('Hardware-download', 'attachment; filename=hardware.csv');
                            res.set('Content-Type', 'text/csv');
                            res.status(200).send(csv);
                        }
                    });
                }
            });
        }
    });
});

//SHOW ROUTE SOFTWARE OVERVIEW SCHOLEN
router.get("/software", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}})
            .populate("software")
            .exec(function(err, schools){
                if(err || !schools) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    res.locals.scripts.header.datatables = true;
                    res.locals.scripts.footer.datatables = true;
                    res.render("overview/software", {schools: schools, organisation: organisation});         
                }
            });
        }

    });
});

//DOWNLOAD ROUTE SOFTWARE OVERVIEW SCHOLEN
router.get("/software/download", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else  {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}})
            .populate("software")
            .exec(function(err, schools){
                if(err || !schools) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    var softwareList = [];
                    schools.forEach(function(school){
                        school.software.forEach(function(software){
                            var newSoftware = {};
                            newSoftware.school = school.name;
                            newSoftware.subject = software.subject;
                            newSoftware.name = software.name;
                            newSoftware.typeOfSoftware = software.typeOfSoftware;
                            software.functionalities.forEach(function(functionality){
                                newSoftware[functionality] = "Ja";
                            });
                            software.gradeLevels.forEach(function(gradeLevel){
                                newSoftware[gradeLevel] = "Ja"; 
                            });
                            software.ratings.forEach(function(rating){
                                newSoftware[rating] = "Ja";
                            });
                            newSoftware.effectiveness = software.effectiveness;
                            softwareList.push(newSoftware);
                        });
                    });
                    var fields = ['school', 'subject', 'name', 'typeOfSoftware'];
                    var fieldNames = ['School', 'Vak', 'Naam', 'Type'];
                    config.software.functionality.forEach(function(functionality){
                        fields.push(functionality);
                        fieldNames.push(functionality);
                    });
                    for (var i=1; i<=8; i++) {
                        var gradeLevel = "Groep " + i;
                        fields.push(gradeLevel);
                        fieldNames.push(gradeLevel);
                    }
                    config.software.ratings.forEach(function(rating){
                        fields.push(rating);
                        fieldNames.push(rating);
                    });
                    fields.push('effectiveness');
                    fieldNames.push('Effectiviteit');
                    json2csv({ data: softwareList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
                        if(err){
                            req.flash("error", err.message);
                            res.redirect("back");
                        } else {
                            res.setHeader('Software-download', 'attachment; filename=software.csv');
                            res.set('Content-Type', 'text/csv');
                            res.status(200).send(csv);
                        }
                    });
                };
            });
        };

    });
});

//SHOW ROUTE COMPETENCE SUMMARY ORGANISATION
router.get("/competence", middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id)
  .exec(function(err, organisation){
    if(err ||!organisation){
      req.flash("error", "Bestuur niet gevonden.");
      res.redirect("back");
    } else {
      Survey.find({
        "organisation": organisation._id, 
        "isCompetenceSurvey": true
      }, async function(err, surveys){
        let results = [];
        await asyncForEach(surveys, async function(survey, index){
           let result = await retrieveOrganisationSurveyResults(survey, organisation);
           results.push(result);
           if(index==surveys.length-1){
            res.locals.scripts.header.plotly = true;
            res.locals.scripts.footer.competence = true;
            res.render("overview/competence", {
              organisation: organisation, 
              surveys: surveys, 
              results: results
            })
          }
        });   
      })        
    }
  });
});

//SHOW ROUTE COMPETENCE SUMMARY ORGANISATION
router.get("/podd", middleware.isAuthenticatedBadmin, function(req, res){
  Organisation.findById(req.params.id)
  .exec(function(err, organisation){
    if(err ||!organisation){
      req.flash("error", "Bestuur niet gevonden.");
      res.redirect("back");
    } else {
      Survey.findOne({
        "organisation": organisation._id, 
        "isPODDSurvey": true
      }, async function(err, survey){
        let results = await retrieveOrganisationSurveyResults(survey, organisation);
        if(index==surveys.length-1){
            res.locals.scripts.header.chartjs = true;
            res.render("overview/podd", {
              organisation: organisation, 
              survey: survey, 
              results: results
            })
          }
      })        
    }
  });
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function retrieveOrganisationSurveyResults(survey, organisation){
  return new Promise(function(resolve, reject) {
    SurveyResult.find({"survey": survey._id}).populate('user').exec(async function(err, surveyResults){
      if(err){
        return resolve({
          average: 0,
          comparingAverage: 0,
          count: 0,
          comparingCount: 0
        });
      } else {
        var organisationSurveyResults = surveyResults.filter(sr => sr.user && sr.user._id);
        var organisationStatistics = config.competence.survey.calculateStatistics(survey, organisationSurveyResults);
        var statistic = await retrieveGlobalStatistic(survey.competenceStandardKey);
        return resolve({
          average: _.mean(organisationStatistics[0].statistics),
          comparingAverage: statistic ? _.mean(statistic.results) * 100 : 0,
          count: _.size(organisationStatistics[0].statistics),
          comparingCount: statistic ? statistic.results.length : 0
        });
       }
    })
  });
}

function retrieveGlobalStatistic(competenceStandardKey){
    return new Promise(function (resolve, reject){
        Statistic.findOne({"competenceStandardKey": competenceStandardKey, "isGlobalStatistic": true}, function(err, statistic){
            if(err || !statistic){
                resolve(null);
            } else {
                resolve(statistic);
            }
        });
    });
}

//SHOW ROUTE PILLARS RESULTATEN SCHOLEN
router.get("/pillars", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}})
            .populate("hardware")
            .populate("software")
            .populate("standard")
            .exec(async function(err, schools){
                if(err || !schools) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    var results = [];
                    await asyncForEach(schools, async function(school, index, schools){
                        let surveyResults = await retrieveSurveyResultsForPillarsScoreOverview(school);
                        var result = score.calculate(school, surveyResults);
                        results.push(result);
                    });
                    res.locals.scripts.footer.chartjs = true;
                    res.locals.scripts.footer.pillars = true;
                    res.locals.scripts.footer.overview = true;
                    res.locals.scripts.header.datatables = true;
                    res.locals.scripts.footer.datatables = true;
                    res.render("overview/pillars", {schools: schools, results: results, organisation: organisation});  
                };
            });
        };
    });
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function retrieveSurveyResultsForPillarsScoreOverview(school){
  return new Promise(function(resolve, reject) {
    var surveyResults = [];
    if(school.users.length == 0){
      return resolve(surveyResults);
    } 
    var filter = {isCompetenceSurvey: true};
    school.users.forEach(function(user, index, users){
      filter.user = user;
      SurveyResult
        .find(filter)
        .populate("survey")
        .exec(function(err, userSurveyResults){
            if(err){
              return resolve(surveyResults);
            }
            userSurveyResults.forEach(function(result){
              if(result.score){
                surveyResults.push(result);  
              } else {
                let resultToBeAnalyzed = [];
                resultToBeAnalyzed.push(result);
                let statistics = calcs.calculateStatistics(result.survey, resultToBeAnalyzed);
                if(statistics){
                    result.score = statistics[0].statistics[0] / 100;
                    surveyResults.push(result);
                }
              }
            });
            if(index == users.length - 1){
              return resolve(surveyResults);
            }
      });
    });
  });
}

//SHOW ROUTE TEST RESULTATEN SCHOLEN
router.get("/pillars/api", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}})
            .populate("hardware")
            .populate("software")
            .populate("standard")
            .exec(async function(err, schools){
                if(err || !schools) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    var results = [];
                    await asyncForEach(schools, async function(school, index, schools){
                        let surveyResults = await retrieveSurveyResultsForPillarsScoreOverview(school);
                        var result = score.calculate(school, surveyResults);
                        results.push(result);
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(results));
                }
            });
        };
    });
});



//DOWNLOAD ROUTE TEST RESULTATEN SCHOLEN
router.get("/pillars/download", middleware.isAuthenticatedBadmin, function(req, res){
    Organisation.findById(req.params.id, function(err, organisation){
        if(err || !organisation){
            req.flash("error", "Probleem bij het vinden van het bestuur");
            res.redirect("back");
        } else {
            School.find(
                {"organisation": organisation._id}, 
                null,
                {sort: {name: 1}})
            .populate("hardware")
            .populate("software")
            .populate("tests")
            .populate("standard")
            .exec(function(err, scholen){
                if(err || !scholen) {
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    var results = [];
                    scholen.forEach(function(school){
                        var result = score.calculate(school);
                        result.school = school.name;
                        results.push(result);
                    });
                    var fields = ['school', 'total[hardware]', 'total[software]','total[competence]', 'total[management]'];
                    var fieldNames = ['School', 'Hardware', 'Digitale Leermiddelen', 'Deskundigheid', 'Organisatie'];
                    json2csv({ data: results, fields: fields, fieldNames: fieldNames }, function(err, csv) {
                        if(err){
                            req.flash("error", err.message);
                            res.redirect("back");
                        } else {
                            res.setHeader('Pillars-download', 'attachment; filename=pillars.csv');
                            res.set('Content-Type', 'text/csv');
                            res.status(200).send(csv);
                        }
                    });
                };
            });
        };    
    });
});

module.exports = router;