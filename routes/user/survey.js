var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var Classroom = require("../../models/classroom");
var Survey = require("../../models/survey");
var SurveyResult = require("../../models/surveyResult");
var Organisation = require("../../models/organisation");
var middleware = require("../../middleware");
var User = require("../../models/user");
var config = require("../../config/config");
var ObjectId = require('mongoose').Types.ObjectId; 
var json2csv = require("json2csv");


//SHOWING A PRIVATE SURVEY
router.get("/:sid/private", middleware.isLoggedIn, function(req, res){
  Survey.findById(req.params.sid, function(err, survey){
        if(err ||!survey){
            req.flash("error", "Enquête niet gevonden.");
            res.redirect("back");
        } else {
          var surveyDefinition = survey.competenceStandardKey ?
          config.competence.survey[survey.competenceStandardKey] :
          config.software.survey[survey.softwareStandardKey];
          if(!surveyDefinition){
            req.flash("error", "Geen definitie gevonden van deze vragenlijst");
            return res.redirect("back");
          }
          survey.survey = surveyDefinition;
          var software = {};
          software.hasInfo = false;
          if(survey.isActiveSoftwareSurvey){
            software.hasInfo = true;
            software.course = req.query.course;
            software.name = req.query.name;
            software.supplier = req.query.supplier;
            software.gradeLevels = req.query.gradeLevels;
            software.type = req.query.type;
            software.school = req.query.school;
            software.id = req.query.softwareId;
          }
          res.locals.scripts.header.surveyjs = true;
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyOptions = true;
          res.locals.scripts.footer.surveyPrivate = true;
          var categories = survey.competenceStandardKey ? 
            config.competence.survey.competenceCategories.find(c => c.identifier === survey.competenceStandardKey).categories : 
            [];
          res.render("survey/fullscreen", {
            survey: survey, 
            software: software, 
            isShow: false, 
            categories: categories
          });            
        }
    });
});

//COMPLETED A PRIVATE SURVEY
router.post("/:sid/private", middleware.isLoggedIn, function(req, res){
  Survey.findById(req.params.sid, function(err, survey){
    if(err || !survey){
        res.contentType('json');
        res.send({ 
          success: false, 
          error: 'Foutmelding: enquête niet gevonden. Server geeft fout: ' + err.message 
        });
    } else {
      User.findById(req.user._id, function(err, user){
        if(err || !user){
          res.contentType('json')
          res.send({
            success: false,
            error: "Foutmelding: gebruiker niet gevonden."
          })
        } else {
            SurveyResult.findOne({user: user, survey: survey}, function(err, surveyResult){
              if(err) {
                res.contentType('json');
                res.send({ 
                    success: false, 
                    error: 'Foutmelding: ' + err.message 
                  });

              } else if(surveyResult && survey.competenceStandardKey === 'podd' && user.school && user.school[0]) {
                surveyResult.result = JSON.parse(req.body.result);
                surveyResult.save();
                School.findById(user.school[0]).populate("users").exec(function(err, school){
                      if(err || !school){
                          res.send({ 
                                success: false, 
                                error: 'Probleem bij verzenden van email. School niet gevonden.' 
                           });
                      } else {
                      var toEmails = school.users.filter(u => u.role === 'sadmin').map(u => u.username);
                      if(toEmails.length > 0) {
                          var firstName = user.firstName ? user.firstName : user.username;
                          var lastName = user.lastName ? user.lastName : "";
                          var fullName =  firstName + " " + lastName;
                          var competenceCategoryIndex = config.competence.survey.competenceCategories.findIndex(c => c.identifier === 'podd');
                          if(competenceCategoryIndex > -1){
                            var competenceCategories = config.competence.survey.competenceCategories[competenceCategoryIndex].categories;
                            var {result: {actionPlan}} = surveyResult;
                            var actionPlanCategories = [];
                            Object.keys(actionPlan).map(function(key) {
                              var categoryIndex = competenceCategories.findIndex(cc => cc.name === key);
                              if(categoryIndex > -1 && actionPlan[key].develop === 'J'){
                                actionPlanCategories.push(competenceCategories[categoryIndex].title);
                              }
                            })
                          }
                          var subject = fullName + " heeft test ingediend";
                          var data = {
                            fullName: fullName,
                            schoolName: school.name,
                            actionPlanCategories: actionPlanCategories.join(', '),
                            subject: subject
                          }
                          var request = config.email.podd(toEmails, subject, data);
                          request
                            .then((result) => {
                              res.contentType('json');
                              res.send({ success: true, surveyResultId:  surveyResult._id});
                            })
                            .catch((err) => {
                              res.contentType('json');
                              res.send({ 
                                success: false, 
                                error: 'Probleem bij verzenden van email. Server geeft fout: ' + err.message 
                              });
                            });
                        } else {
                          res.contentType('json');
                          res.send({ success: true, surveyResultId:  surveyResult._id});
                        }
                      }
                  })

              } else if(surveyResult && ['ddl', 'podd'].includes(survey.competenceStandardKey)){
                surveyResult.result = JSON.parse(req.body.result);
                surveyResult.save(function(err, updatedSurveyResult){
                  if(err){
                    res.contentType('json');
                    res.send({ 
                      success: false, 
                      error: 'Probleem bij updaten van gebruiker. Server geeft fout: ' + err.message 
                    })
                  } else {
                    res.contentType('json');
                    res.send({ 
                      success: true, 
                      surveyResultId:  updatedSurveyResult._id 
                    })
                  }
                });
                
              } else if(surveyResult && survey.isActiveCompetenceSurvey) {
                res.contentType('json');
                res.send({ 
                    success: false, 
                    error: 'Foutmelding: u heeft deze vragenlijst al eerder ingevuld.'
                  });
              } else {
                
                    var surveyAnswers = JSON.parse(req.body.result);
                    let surveyResult = SurveyResult({
                      survey: survey._id,
                      result: surveyAnswers,
                      score: req.body.score,
                      statistics: req.body.statistics ? JSON.parse(req.body.statistics) : undefined,
                      flags: req.body.flags ? JSON.parse(req.body.flags) : undefined,
                      questionScores: req.body.questionScores ? JSON.parse(req.body.questionScores) : undefined,
                      organisation: req.user.organisation,
                      user: user._id,
                      isCompetenceSurvey: survey.isCompetenceSurvey ? true : false,
                      competenceStandardKey: survey.competenceStandardKey ? survey.competenceStandardKey : '',
                      competenceStandardTitle: survey.competenceStandardTitle ? survey.competenceStandardTitle : '',
                      isSoftwareSurvey: survey.isSoftwareSurvey ? true : false,
                      softwareStandardKey: survey.softwareStandardKey ? survey.softwareStandardKey : '',
                      softwareStandardTitle: survey.softwareStandardTitle ? survey.softwareStandardTitle : '',
                    });
                    if((user.role==='suser' || user.role==='sadmin') && user.school && user.school.length>0){
                      let schoolId = user.school[0];
                      surveyResult.school = schoolId;
                    } else if(user.role==='student'){
                      let schoolId = user.school[0];
                      surveyResult.school = schoolId;
                      let classroomId = user.classroom[0];
                      surveyResult.classroom = classroomId;
                    }
                    SurveyResult.create(surveyResult, function(err, createdSurveyResult){
                      if (err) {
                        res.contentType('json');
                        res.send({ 
                            success: false, 
                            error: 'Probleem bij bewaren van de enquête resultaten. Server geeft fout: ' + err.message 
                          });
                      } else {
                        user.numberOfSurveyResults = user.numberOfSurveyResults ? user.numberOfSurveyResults + 1 : 1;
                        if(survey.competenceStandardKey === 'podd'){
                          user.firstName = surveyAnswers.firstName;
                          user.lastName = surveyAnswers.lastName;
                          user.isTeacher = surveyAnswers.isTeacher;
                          user.job = surveyAnswers.job;
                          user.publicProfile = surveyAnswers.publicProfile;
                        } else if (survey.competenceStandardKey === 'ddl') {
                          user.firstName = surveyAnswers.firstName;
                          user.lastName = surveyAnswers.lastName;
                          user.isTeacher = false;
                        }
                        if(surveyAnswers.dateOfBirth){
                          user.dateOfBirth = surveyAnswers.dateOfBirth;
                        }
                        if(surveyAnswers.gender){
                          user.gender = surveyAnswers.gender;
                        }
                        if(surveyAnswers.gradeLevelGroup){
                          user.gradeLevelGroup = surveyAnswers.gradeLevelGroup;
                        }
                        if(surveyAnswers.technologyAdoption){
                          user.technologyAdoption = surveyAnswers.technologyAdoption;
                        }
                        if(surveyAnswers.hardwareAdoption){
                          user.hardwareAdoption = surveyAnswers.hardwareAdoption;
                        }
                        if(surveyAnswers.softwarePreference){
                          user.softwarePreference = surveyAnswers.softwarePreference;
                        }
                        if(surveyAnswers.hardwarePreference){
                          user.hardwarePreference = surveyAnswers.hardwarePreference;
                        }
                        user.save(function(err, user){
                          if(err){
                            res.contentType('json');
                            res.send({ 
                              success: false, 
                              error: 'Probleem bij updaten van gebruiker. Server geeft fout: ' + err.message 
                            })
                          } else {
                            if((user.role==='suser' || user.role==='sadmin') && user.school && user.school.length>0){
                              School.findById(user.school[0]).populate("users").exec(function(err, school){
                                school.surveyResults.push(createdSurveyResult._id);
                                school.save(function(err, school){
                                  if(err){
                                    res.contentType('json');
                                    res.send({ 
                                      success: false, 
                                      error: 'Probleem bij updaten van school. Server geeft fout: ' + err.message 
                                    });
                                  } else {
                                    res.contentType('json');
                                    res.send({ success: true, surveyResultId:  createdSurveyResult._id});
                                  }
                                });
                              })
                            } else if(user.role==='student' && user.classroom && user.classroom.length>0){
                              Classroom.findById(user.classroom[0], function(err, classroom){
                                classroom.surveyResults.push(createdSurveyResult._id);
                                classroom.save(function(err, classroom){
                                  if(err){
                                    res.contentType('json');
                                    res.send({ 
                                      success: false, 
                                      error: 'Probleem bij updaten van klas. Server geeft fout: ' + err.message 
                                    });
                                  } else {
                                    res.contentType('json');
                                    res.send({ success: true, surveyResultId:  createdSurveyResult._id});
                                  }
                                });
                              })
                            } else {
                              res.contentType('json');
                              res.send({ success: true, surveyResultId:  createdSurveyResult._id});
                            }
                          }
                        })
                      }
                    });
                }
              });
          }
        });
    }
  });
});

//SHOWING A  SURVEY
router.get("/:sid/result", function(req, res){
  SurveyResult.findById(req.params.sid).populate("survey").populate("user").exec(function(err, surveyResult){
        if(err ||!surveyResult){
            req.flash("error", "Inzending niet gevonden.");
            res.redirect("back");
        } else {
          var competenceStandardKey = surveyResult.survey && surveyResult.survey.competenceStandardKey ?
                  surveyResult.survey.competenceStandardKey : null;
          var softwareStandardKey = surveyResult.survey && surveyResult.survey.softwareStandardKey ?
                  surveyResult.survey.softwareStandardKey : null;
          var surveyDefinition = competenceStandardKey ? config.competence.survey[competenceStandardKey] :
                config.software.survey[softwareStandardKey];
          if(!surveyDefinition){
            req.flash("error", "Geen definitie gevonden van deze vragenlijst");
            return res.redirect("back");
          }
          surveyResult.survey.survey = surveyDefinition;
          res.locals.scripts.header.surveyjs = true;
          res.locals.scripts.footer.surveyjs = true;
          res.locals.scripts.footer.surveyPrivate = true;
          var categories = competenceStandardKey ? 
            config.competence.survey.competenceCategories.find(c => c.identifier === competenceStandardKey).categories : 
            [];
          res.render("survey/fullscreen", {
            surveyResult: surveyResult, 
            user: surveyResult.user, 
            isShow: true, 
            survey: surveyResult.survey, 
            categories: categories,
            software: {},
            customCSS: config.competence.customCSS
          });            
        }
    });
});

//SHOW INDIVIDUAL RESULTS ROUTE
router.get("/:sid/:uid", middleware.isLoggedIn, function(req, res){
	Survey.findById(req.params.sid, function(err, survey){
		if(err || !survey){
			req.flash("error", "Enquête niet gevonden. Foutmelding: " + err ? err.message : '-');
			res.redirect("back");
		} else {
			User.findById(req.params.uid).populate('schools').exec(function(err, user){
				if(err || !user){
					req.flash("error", "Medewerker is niet gevonden. Foutmelding: " + err);
					res.redirect("back");
				} else {
					res.locals.scripts.footer.individualResults = true;
					res.locals.scripts.header.plotly = true;  
					SurveyResult.find({survey: req.params.sid})
					.populate('user')
					.exec(function(err, surveyResults){
						if(err){
							req.flash("error", "Resultaten niet gevonden. Foutmelding: " + err ? err.message : '-');
							res.redirect("back");
						} else {
							var organisationSurveyResults = surveyResults.filter(sr => sr.user && sr.user._id);
							var organisationStatistics = config.competence.survey.calculateStatistics(survey, organisationSurveyResults);
							var individualResult = organisationSurveyResults.find(result => result.user._id.equals(user._id));
							var individualStatistics = config.competence.survey.calculateStatistics(survey, [individualResult]);
							var schoolSurveyResults = organisationSurveyResults.filter(csr => csr.school && 
									csr.school.equals(individualResult.school));
							var	schoolStatistics = config.competence.survey.calculateStatistics(survey, schoolSurveyResults);
							res.render("survey/individual", {
                user: user,
								school: user.schools && user.schools[0] ? user.schools[0] : null, 
								survey: survey,
								schoolStatistics: schoolStatistics,
								organisationStatistics: organisationStatistics,
								individualStatistics: individualStatistics,
								totalOrganisationSurveyResults: organisationSurveyResults.length,
								totalSchoolSurveyResults: schoolSurveyResults.length
							}); 
						}
					});        
				}
			});
		}
	});
});

module.exports = router;
