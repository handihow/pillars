var survey = {};

var competenceCategories = [
	{
		identifier: 'ictSkills',
		title: "ICT Geletterdheid",
		previousTitle: "1 - ICT Geletterdheid",
		surveyOption: "pillars",
		type: "boolean",
		categories: [
			{
				name: "basicSkills",
				title: "ICT Basisvaardigheden",
				previousIdentifier: "a - ICT Basisvaardigheden",
			},
			{
				name: "informationSkills",
				title: "Informatievaardigheden",
				previousIdentifier: "b - Informatievaardigheden"
			},
			{
				name: "mediaSkills",
				title: "Mediawijsheid",
				previousIdentifier: "c - Mediawijsheid"
			},
			{
				name: "computationalThinking",
				title: "Computational Thinking",
				previousIdentifier: "d - Computational Thinking"
			}
		],
	},
	{
		identifier: 'pedagogicalDidacticalSkills',
		title: "Pedagogisch Didactisch Handelen",
		previousTitle: "2 - Pedagogisch Didactisch Handelen",
		surveyOption: "pillars",
		type: "boolean",
		categories: [
			{
				name: "instructing",
				title: "Instructie geven",
				previousIdentifier: "a - Instructie geven"
			},
			{
				name: "learning",
				title: "Laten leren",
				previousIdentifier: "b - Laten leren"
			},
			{
				name: "testing",
				title: "Toetsen",
				previousIdentifier: "c - Toetsen"
			}
		],
	},
	{
		identifier: 'workInSchoolContext',
		title: "Werken in de schoolcontext",
		previousTitle: "3 - Werken in de schoolcontext",
		surveyOption: "pillars",
		type: "boolean",
		categories: [
			{
				name: "registration",
				title: "Registreren",
				previousIdentifier: "a - Registreren"
			},
			{
				name: "justification",
				title: "Volgen en verantwoorden",
				previousIdentifier: "b - Volgen en verantwoorden"
			},
			{
				name: "communication",
				title: "Communiceren",
				previousIdentifier: "c - Communiceren"
			}
		],
	},
	{
		identifier: 'personalDevelopment',
		title: "Persoonlijke Ontwikkeling",
		previousTitle: "4 - Persoonlijke Ontwikkeling",
		surveyOption: "pillars",
		type: "boolean",
		categories: [
			{
				name: "developing",
				title: "Ontwikkelingen volgen in vakgebied",
				previousIdentifier: "a - Ontwikkelingen volgen in vakgebied"
			},
			{
				name: "sharing",
				title: "Delen van ervaring",
				previousIdentifier: "b - Delen van ervaring"
			}
		]
	},
	{
		identifier: 'instrumentalSkills',
		title: "Instrumentele vaardigheden",
		previousTitle: "1 - Instrumentele vaardigheden",
		surveyOption: "alpha",
		type: "rating",
		categories: [
			{
				name: "ictKnowledge",
				title: "Kennis van ICT voorzieningen",
				previousIdentifier: "a - Kennis van ICT voorzieningen"
			},
			{
				name: "ictUsage",
				title: "Gebruik van ICT voorzieningen",
				previousIdentifier: "b - Gebruik van ICT voorzieningen"
			},
			{
				name: "ictDevelopment",
				title: "Volgen van ICT ontwikkelingen",
				previousIdentifier: "c - Volgen van ICT ontwikkelingen"
			},
			{
				name: "socialMedia",
				title: "Sociale Media",
				previousIdentifier: "d - Sociale Media"
			},
			{
				name: "contentCreation",
				title: "Creëren van content",
				previousIdentifier: "e - Creëren van content"
			}
		]
	},
	{
		identifier: 'informationSkills',
		title: "Informatievaardigheden",
		previousTitle: "2 - Informatievaardigheden",
		surveyOption: "alpha",
		type: "rating",
		categories: [
			{
				name: "searchInformation",
				title: "Zoeken van informatie",
				previousIdentifier: "a - Zoeken van informatie"
			},
			{
				name: "administerInformation",
				title: "Beheren van informatie",
				previousIdentifier: "b - Beheren van informatie"
			}
		]
	},
	{
		identifier: 'mediaSkills',
		title: "Mediavaardigheden",
		previousTitle: "3 - Mediavaardigheden",
		surveyOption: "alpha",
		type: "rating",
		categories: [
			{
				name: "personalSkills",
				title: "Eigen vaardigheden",
				previousIdentifier: "a - Eigen vaardigheden"
			},
			{
				name: "teachingMediaSkills",
				title: "Lesgeven in de mediawijsheid",
				previousIdentifier: "b - Lesgeven in de mediawijsheid"
			}
		]
	},
  {
    identifier: 'assessmentForm',
    title: "Observatie-instrument voor optimaal leerrendement uit ICT-gebruik",
    surveyOption: "assessment",
    type: "rating",
    categories: [
      {
        name: "teacherDrivenLearning",
        title: "Leerkrachtgestuurd leren",
      },
      {
        name: "selfOrganizedLearning",
        title: "Zelfgeorganiseerd leren",
      },
      {
        name: "instructionAndExercise",
        title: "Instructie en oefening",
      },
      {
        name: "personalLearningEnvironment",
        title: "Persoonlijke leeromgeving"
      },
      {
        name: "independentLearning",
        title: "Zelfstandig leren"
      },
      {
        name: "adaptiveLearningMaterial",
        title: "Adaptief leermateriaal"
      }
    ]
  },
  {
    identifier: 'rubric',
    title: 'Beoordelingsinstrument adhv Rubrics',
    surveyOption: 'assessment',
    type: 'matrix',
    categories: [
      {
        name: 'interpersonalCompetence',
        title: 'Interpersoonlijk competent',
        subCategories: ['interactingWithPupils', 'communicatingWithPupils', 'creatingGoodAtmosphereForCooperation']
      },
      {
        name: 'pedagogicalCompetence',
        title: 'Pedagogisch competent',
        subCategories: ['safeLearningEnvironment', 'acknowledgingDifferences', 'socialEmotionalDevelopment', 'independentResponsible', 'talentCapabilities']
      },
      {
        name: 'competenceInSubjectMatterAndDidactics',
        title: 'Vakinhoudelijk en didactisch competent',
        subCategories: ['knowledgeOfSubjectMatter', 'learningObjectives', 'possibilitiesAndLimitations', 'strategyAndImplementation', 'modesOfInstruction', 'teachingMaterial', 'testing', 'assistingTheLearningProcess', 'givingFeedback']
      },
      {
        name: 'organisationalCompetence',
        title: 'Organisatorisch competent',
        subCategories: ['upholdingProceduresAndRules', 'organisationOfTeachingProcess', 'organisationOfTeachingEnvironment', 'timeManagement']
      },
      {
        name: 'competenceWhenWorkingWithColleagues',
        title: 'Competent in het samenwerken met collegas',
        subCategories: ['sharingInformation', 'developmentsAndImprovementsAtSchool', 'settingBoundaries']
      },
      {
        name: 'competenceInWorkingWithTheEnvironment',
        title: 'Competent in het samenwerken met de omgeving',
        subCategories: ['sharingInformationWithParents', 'outsideActivities', 'effectiveCommunicationWithEnvironment']
      },
      {
        name: 'competenceInReflectionAndPersonalDevelopment',
        title: 'Competent in reflectie en zelfontwikkeling',
        subCategories: ['feedback', 'professionalDevelopment', 'didacticDevelopment', 'developingClassManagement', 'adaptingBehaviour']
      }
    ]
  },
  {
    identifier: 'podd',
    title: "Pillars Overzicht Digitale Deskundigheid",
    surveyOption: "podd",
    type: 'miscellaneous',
    categories: [
      {
        name: "IB",
        title: "ICT basisvaardigheden",
        abbrTitle: 'ICT basis.',
        parent: "DG",
        parentAbbrTitle: 'Dig.Gel.',
        parentTitle: "Digitale Geletterdheid"
      },
      {
        name: "MW",
        title: "Mediawijsheid",
        abbrTitle: 'Mediaw.',
        parent: "DG",
        parentAbbrTitle: 'Dig.Gel.',
        parentTitle: "Digitale Geletterdheid"
      },
      {
        name: "IV",
        title: "Informatievaardigheden",
        abbrTitle: 'Informatiev.',
        parent: "DG",
        parentAbbrTitle: 'Dig.Gel.',
        parentTitle: "Digitale Geletterdheid"
      },
      {
        name: "CT",
        title: "Computational Thinking",
        abbrTitle: 'Comp.Think.',
        parent: "DG",
        parentAbbrTitle: 'Dig.Gel.',
        parentTitle: "Digitale Geletterdheid"
      },
      {
        name: "IG",
        title: "Instructie geven",
        abbrTitle: 'Instr.Gvn.',
        parent: "PDH",
        parentAbbrTitle: 'Ped.Did.Han.',
        parentTitle: "Pedagogisch Didactisch Handelen"
      },
      {
        name: "LTNL",
        title: "Laten leren",
        abbrTitle: 'Laten Lrn.',
        parent: "PDH",
        parentAbbrTitle: 'Ped.Did.Han.',
        parentTitle: "Pedagogisch Didactisch Handelen"
      },
      {
        name: "TTSN",
        title: "Toetsen",
        abbrTitle: 'Toetsen',
        parent: "PDH",
        parentAbbrTitle: 'Ped.Did.Han.',
        parentTitle: "Pedagogisch Didactisch Handelen"
      },
      {
        name: "OVVG",
        title: "Ontwikkelingen volgen in vakgebied",
        abbrTitle: 'Ontw.Vol.i.Vakg.',
        parent: "PO",
        parentAbbrTitle: 'Pers.Ontw.',
        parentTitle: "Persoonlijke Ontwikkeling"
      },
      {
        name: "DVE",
        title: "Delen van ervaringen",
        abbrTitle: 'Dln. v. Erv.',
        parent: "PO",
        parentAbbrTitle: 'Pers.Ontw.',
        parentTitle: "Persoonlijke Ontwikkeling"
      },
      {
        name: "RE",
        title: "Registreren",
        abbrTitle: 'Registr.',
        parent: "WSC",
        parentAbbrTitle: 'Werk.i.d.Schoolc.',
        parentTitle: "Werken in de schoolcontext"
      },
      {
        name: "VEV",
        title: "Volgen en verantwoorden",
        abbrTitle: 'Vlgn.e.Verantw.',
        parent: "WSC",
        parentAbbrTitle: 'Werk.i.d.Schoolc.',
        parentTitle: "Werken in de schoolcontext"
      },
      {
        name: "COM",
        title: "Communiceren",
        abbrTitle: 'Communicrn.',
        parent: "WSC",
        parentAbbrTitle: 'Werk.i.d.Schoolc.',
        parentTitle: "Werken in de schoolcontext"
      }
    ],
  }
];

survey.competenceCategories = competenceCategories;

survey.calculateStatistics = function(survey, surveyResults){
  if(!survey){
    return
  }
	var statistics = [];
	var index = competenceCategories.findIndex(cat => cat.identifier == survey.competenceStandardKey);
  var isRubric = index > -1 && competenceCategories[index].identifier == 'rubric' ? true : false;
  if(index>-1){
    var generalStatistic = {
      name: competenceCategories[index].identifier,
      title: competenceCategories[index].title,
      statistics: [],
      subCategories: []
    }
    statistics.push(generalStatistic);
		competenceCategories[index].categories.forEach(function(category){
      if(!category.noScores){
        var newStatistic = {
          name: category.name,
          title: category.title,
          subCategories: category.subCategories ? category.subCategories : [],
          statistics: [],
        }
        statistics.push(newStatistic);
      }
		});
    if(isRubric){
      surveyResults.forEach(function(surveyResult){
        var totalScore = 0;
        statistics.forEach(function(stat, statIndex){
          var score = 0;
          stat.subCategories.forEach(function(subCat, subCatIndex){
            var value = surveyResult.result[stat.name][subCat];
            score += parseInt(value);
          });
          var average = score / stat.subCategories.length;
          if(statIndex > 0){
            stat.statistics.push(average);
            totalScore += average;
          }
        });
        var grandAverage = totalScore / 7;
        statistics[0].statistics.push(grandAverage);
      });
    } else {
      surveyResults.forEach(function(surveyResult){
          statistics.forEach(function(stat, statIndex){
            if(statIndex === 0 && typeof surveyResult.score !== 'undefined'){
              stat.statistics.push(surveyResult.score * 100);
            } else if(surveyResult.statistics && surveyResult.statistics[stat.name]){
              stat.statistics.push(surveyResult.statistics[stat.name])
            } else {
              var questions = 0;
               var total = 0;
               Object.keys(surveyResult.result).forEach(function(key){
                  var value = surveyResult.result[key];
                  if(typeof value == 'string' && (value == "true" || value == "false")){
                    transformedValue = value == "true" ? 1 : 0;
                  } else if(typeof value == 'string'){
                    transformedValue = parseFloat(value);
                  } else if(typeof value == 'boolean'){
                    transformedValue = value ? 1 : 0;
                  }
                  if(statIndex == 0 && !isNaN(transformedValue)) {
                     //this is the general statistics
                     questions += 1;
                     total += transformedValue;
                  }
                  var name = key.substring(0,key.indexOf("-"));
                  if(name == stat.name){
                     questions += 1;
                     total += transformedValue;            
                  }
                });
                var result = Math.round(total / questions * 100);
                stat.statistics.push(result);
            }
           
         });
      });
    }
	} 
	return statistics;
}

survey.ictSkills = {
 "locale": "nl",
 "title": {
  "nl": "ICT Geletterdheid"
 },
 "logo": {
  "nl": "http://pillars.school/wp-content/uploads/2017/06/cropped-pillars-logo2.png"
 },
 "logoWidth": 100,
 "logoHeight": 100,
 "logoPosition": "right",
 "pages": [
  {
   "name": "basicSkills1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "basicSkills-question1",
     "title": {
      "nl": "Ik weet welke ICT voorzieningen (hard- en software) er bij ons op school beschikbaar zijn"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "basicSkills-question2",
     "title": {
      "nl": "Ik gebruik de ICT voorzieningen met gemak"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (1/5)"
   }
  },
  {
   "name": "basicSkills2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "basicSkills-question4",
     "title": {
      "nl": "Ik kan mij zonder veel moeite een nieuw device eigen maken en gebruiken voor educatieve toepassingen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "basicSkills-question3",
     "title": {
      "nl": "Ik ben in staat om meerdere types (mobiele) devices in te zetten (denk aan: smartphone, tablet, chromebook e.d.)"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (2/5)"
   }
  },
  {
   "name": "basicSkills3",
   "elements": [
    {
     "type": "radiogroup",
     "name": "basicSkills-question6",
     "title": {
      "nl": "Ik maak snelkoppelingen naar veelgebruikte mappen of internetpagina's op mijn desktop"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "basicSkills-question5",
     "title": {
      "nl": "Ik sla mijn mappen en bestanden steeds vaker op in de cloud (Google Drive, OneDrive, Dropbox) en snap hoe ik daarmee documenten kan beheren en delen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (3/5)"
   }
  },
  {
   "name": "basicSkills4",
   "elements": [
    {
     "type": "radiogroup",
     "name": "basicSkills-question8",
     "title": {
      "nl": "Ik creëer informatie en gebruik het internet voor de publicatie (website, blog, etc.)"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "basicSkills-question7",
     "title": {
      "nl": "Ik kan met verschillende bestandstypen en omgaan met bestanden (opslaan/terugvinden, kopiëren/verwijderen, verzenden/ontvangen, delen) op verschillende opslagmedia"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (4/5)"
   }
  },
  {
   "name": "basicSkills5",
   "elements": [
    {
     "type": "radiogroup",
     "name": "basicSkills-question10",
     "title": {
      "nl": "Ik maak zelf wel eens filmpjes om mijn boodschap goed over te brengen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "basicSkills-question9",
     "title": {
      "nl": "Ik ben op de hoogte van de mogelijkheden van YouTube, kan filmpjes toevoegen of een afspeellijst samenstellen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (5/5)"
   }
  },
  {
   "name": "informationSkills1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "informationSkills-question1",
     "title": {
      "nl": "Informatie die ik vind op internet kan ik makkelijk integreren in presentaties of opdrachten, zonder dat ik daar veel werk aan heb (bijvoorbeeld knippen en plakken, of integreren van filmpjes in een presentatie)"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "informationSkills-question2",
     "title": {
      "nl": "Als mijn zoekopdrachten onvoldoende resultaat opleveren, probeer ik mijn zoektermen aan te passen om toch de informatie te vinden die ik zoek"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Informatievaardigheden (1/4)"
   }
  },
  {
   "name": "informationSkills2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "informationSkills-question4",
     "title": {
      "nl": "Ik gebruik een internetbrowser met favorieten zodat ik snel op mijn meest gebruikte pagina's terecht kan"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "informationSkills-question3",
     "title": {
      "nl": "Ik controleer over het algemeen de juistheid en actualiteit van de websites of andere plekken waar ik mijn informatie vandaan haal"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Informatievaardigheden (2/4)"
   }
  },
  {
   "name": "informationSkills3",
   "elements": [
    {
     "type": "radiogroup",
     "name": "informationSkills-question6",
     "title": {
      "nl": "Als ik (leer)materiaal maak met informatie die ik op internet vind, vermeld ik altijd de bron en ik weet welke regels hiervoor gelden"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "informationSkills-question5",
     "title": {
      "nl": "Ik kan goed uit de voeten met zoekvelden, filters en sorteerfuncties"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Informatievaardigheden (3/4)"
   }
  },
  {
   "name": "informationSkills4",
   "elements": [
    {
     "type": "radiogroup",
     "name": "informationSkills-question7",
     "title": {
      "nl": "Ik weet hoe ik de betrouwbaarheid van educatieve software en websites kan controleren"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Informatievaardigheden (4/4)"
   }
  },
  {
   "name": "mediaSkills1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "mediaSkills-question1",
     "title": {
      "nl": "Ik weet hoe ik filmpjes of afbeeldingen kan bewerken (bijvoorbeeld inkorten of tekst toevoegen) en doe dat soms ook om de les er beter van te maken"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "mediaSkills-question2",
     "title": {
      "nl": "Ik lees jaarlijks meer dan 3 artikelen over het gebruik van ICT in het onderwijs"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Mediawijsheid (1/6)"
   }
  },
  {
   "name": "mediaSkills2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "mediaSkills-question4",
     "title": {
      "nl": "Ik waak over de nettiquette binnen sociale netwerken"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "mediaSkills-question3",
     "title": {
      "nl": "Ik gebruik dagelijks ICT toepassingen in mijn onderwijs"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Mediawijsheid (2/6)"
   }
  },
  {
   "name": "mediaSkills3",
   "elements": [
    {
     "type": "radiogroup",
     "name": "mediaSkills-question6",
     "title": {
      "nl": "Ik kan een overzicht geven van gebruikte sociale netwerken zoals Facebook, LinkedIn e.d."
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "mediaSkills-question5",
     "title": {
      "nl": "Ik probeer regelmatig nieuwe ICT toepassingen uit in mijn lessen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Mediawijsheid (3/6)"
   }
  },
  {
   "name": "mediaSkills4",
   "elements": [
    {
     "type": "radiogroup",
     "name": "mediaSkills-question8",
     "title": {
      "nl": "Ik verbeter me in de mediavaardigheden die ik zelf nodig heb om in deze digitale samenleving goed te functioneren"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "mediaSkills-question7",
     "title": {
      "nl": "Ik snap goed welke risico's internet en sociale media met zich meebrengen en wat dit voor invloed heeft op de dynamiek in de klas"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Mediawijsheid (4/6)"
   }
  },
  {
   "name": "mediaSkills5",
   "elements": [
    {
     "type": "radiogroup",
     "name": "mediaSkills-question10",
     "title": {
      "nl": "Ik leer mijn klas 21e eeuwse vaardigheden zoals kritisch denken, oplossend vermogen en digitale vaardigheden door deze in te passen in de standaard methoden"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "mediaSkills-question9",
     "title": {
      "nl": "Ik probeer de risico's van sociale media te bespreken in mijn klas, door dit bijvoorbeeld te verwerken in een reflectie van een opdracht"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Mediawijsheid (5/6)"
   }
  },
  {
   "name": "mediaSkills6",
   "elements": [
    {
     "type": "radiogroup",
     "name": "mediaSkills-question11",
     "title": {
      "nl": "Ik heb met mijn klas regelmatig gesprekken over wat er gebeurt op sociale media zoals WhatsApp, Instagram en SnapChat (bijvoorbeeld roddelen of pesten) en hoe ze daarmee om (kunnen) gaan"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Mediawijsheid (6/6)"
   }
  },
  {
   "name": "computationalThinking1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "computationalThinking-question1",
     "title": {
      "nl": "Ik kan informatie weergeven in relevante grafieken, tabellen, woorden en plaatjes"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "computationalThinking-question2",
     "title": {
      "nl": "Ik snap eenvoudige programeerprincipes en kan deze toepassen op websites zoals Scratch of Microbit"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Computational Thinking (1/3)"
   }
  },
  {
   "name": "computationalThinking2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "computationalThinking-question4",
     "title": {
      "nl": "Ik kan repetitieve taken laten uitvoeren door computers, bijvoorbeeld het laten uitrekenen van cellen in Excel of het automatisch vullen van brieven in Word"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "computationalThinking-question3",
     "title": {
      "nl": "Ik kan een computerprogramma schrijven in een omgeving voor kinderen (Microbit / Scratch) of zelfs in een programeertaal zoals Python of C#"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Computational Thinking (2/3)"
   }
  },
  {
   "name": "computationalThinking3",
   "elements": [
    {
     "type": "radiogroup",
     "name": "computationalThinking-question6",
     "title": {
      "nl": "Ik kan de Voice Assistent van mijn telefoon gebruiken om sneller taken uit te voeren op mijn telefoon"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "computationalThinking-question5",
     "title": {
      "nl": "Ik kan een probleem oplossen door het te automatiseren met behulp van bestaande programma's of websites, bijvoorbeeld met behulp van If This Then That"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Computational Thinking (3/3)"
   }
  }
 ],
 "showTitle": true,
 "showQuestionNumbers": "off",
 "showProgressBar": "bottom",
 "requiredText": ""
};

survey.pedagogicalDidacticalSkills = {
 "locale": "nl",
 "title": {
  "nl": "Pedagogisch Didactisch Handelen"
 },
 "logo": {
  "nl": "http://pillars.school/wp-content/uploads/2017/06/cropped-pillars-logo2.png"
 },
 "logoWidth": 100,
 "logoHeight": 100,
 "logoPosition": "right",
 "pages": [
  {
   "name": "instructing1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "instructing-question1",
     "title": {
      "nl": "Ik kan op eigen initiatief geschikte toepassingen inzetten bij het leerproces"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "instructing-question2",
     "title": {
      "nl": "Ik ben actief op zoek naar nieuwe educatieve toepassingen en zet deze in binnen het onderwijs"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Instructie geven (1/3)"
   }
  },
  {
   "name": "instructing2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "instructing-question3",
     "title": {
      "nl": "Ik gebruik wel eens tools als Kahoot!, Padlet, Mentimeter en Quizlet om mijn lessen te verrijken"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "instructing-question4",
     "title": {
      "nl": "Ik kan een connectie tot stand brengen tussen (leerling-) devices en het digitale bord t.b.v. een interactieve manier van lesgeven"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Instructie geven (2/3)"
   }
  },
  {
   "name": "instructing3",
   "elements": [
    {
     "type": "radiogroup",
     "name": "instructing-question5",
     "title": {
      "nl": "Ik kan het aanwezige digibord functioneel en interactief inzetten in mijn lessen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "instructing-question6",
     "title": {
      "nl": "Ik ben bekend met video conferencing apps zoals Skype en FaceTime en kan daarmee op afstand instructie geven"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Instructie geven (3/3)"
   }
  },
  {
   "name": "learning1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "learning-question1",
     "title": {
      "nl": "Ik kan leerlingen laten werken met educatieve programmas"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "learning-question2",
     "title": {
      "nl": "Ik kan apps downloaden, installeren, beoordelen en verwijderen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Laten leren (1/4)"
   }
  },
  {
   "name": "learning2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "learning-question3",
     "title": {
      "nl": "Ik gebruik een online omgeving en/of elo die voor het onderwijs op onze school aanwezig is"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "learning-question4",
     "title": {
      "nl": "Ik weet hoe ik de online omgeving en/of elo vanaf verschillende devices kan benaderen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Laten leren (2/4)"
   }
  },
  {
   "name": "learning3",
   "elements": [
    {
     "type": "radiogroup",
     "name": "learning-question5",
     "title": {
      "nl": "Voor de op onderwijs gerichte online en/of elo omgeving weet ik hoe leerlingen toegevoegd of verwijderd moeten worden"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "learning-question6",
     "title": {
      "nl": "Als we op school een nieuwe digitale methode krijgen kan ik deze snel in mijn lessen gebruiken"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Laten leren (3/4)"
   }
  },
  {
   "name": "learning4",
   "elements": [
    {
     "type": "radiogroup",
     "name": "learning-question7",
     "title": {
      "nl": "Ik zet op basis van onderzoek media bewust en systematisch in om het eigen onderwijs te verrijken en leerlingen optimaal te laten leren"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "learning-question8",
     "title": {
      "nl": "Ik ben in staat om met behulp van digitale leermiddelen leerlingen met uiteenlopende zorgbehoeften te ondersteunen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Laten leren (4/4)"
   }
  },
  {
   "name": "testing1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "testing-question1",
     "title": {
      "nl": "Ik kan met behulp van digitale leermiddelen toetsen afnemen en de resultaten analyseren"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "testing-question2",
     "title": {
      "nl": "Ik ben in staat om zelf digitale toetsen te maken (bijvoorbeeld met behulp van Google formulieren)"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Toetsen (1/2)"
   }
  },
  {
   "name": "testing2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "testing-question3",
     "title": {
      "nl": "Ik kan de leerdoelen per leerling aanpassen met behulp van de resultaten van digitale toetsen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "testing-question4",
     "title": {
      "nl": "Ik kan toetsen op maat aanbieden (adaptieve toets) met behulp van digitale leermiddelen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Toetsen (2/2)"
   }
  }
 ],
 "showTitle": true,
 "showQuestionNumbers": "off",
 "showProgressBar": "bottom"
};

survey.workInSchoolContext = {
 "locale": "nl",
 "title": {
  "nl": "Werken in de schoolcontext"
 },
 "logo": {
  "nl": "http://pillars.school/wp-content/uploads/2017/06/cropped-pillars-logo2.png"
 },
 "logoWidth": 100,
 "logoHeight": 100,
 "logoPosition": "right",
 "pages": [
  {
   "name": "registration1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "registration-question1",
     "title": {
      "nl": "Ik kan een absentie en cijferregistratie invoeren"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "registration-question2",
     "title": {
      "nl": "Ik kan dossiers aanleggen van leerlingen en deze gegevens met collegas delen"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Registreren (1/2)"
   }
  },
  {
   "name": "registration2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "registration-question3",
     "title": {
      "nl": "Ik kan mijn administratie (bijvoorbeeld het opstellen van handelingsplannen of het schrijven van een rapportage) op afstand invoeren"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Registreren (2/2)"
   }
  },
  {
   "name": "justification1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "justification-question1",
     "title": {
      "nl": "Ik kan een leerlingenrapport maken met behulp van de beschikbare software"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "justification-question2",
     "title": {
      "nl": "Ik kan een handelings of groepsplan opstellen met behulp van tekstverwerkers of spreadsheets"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Volgen en verantwoorden (1/2)"
   }
  },
  {
   "name": "justification2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "justification-question3",
     "title": {
      "nl": "Ik kan overzichten van resultaten maken en deze verwerken in presentaties"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "justification-question4",
     "title": {
      "nl": "Ik kan resultaten van leerlingen uit digitale leermiddelen analyseren en interpreteren"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Volgen en verantwoorden (2/2)"
   }
  },
  {
   "name": "communication1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "communication-question1",
     "title": {
      "nl": "Ik kan communiceren met anderen via e-mail of ander communicatieprogramma of app"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "communication-question2",
     "title": {
      "nl": "Ik gebruik sociale netwerken om het publiek (ouders, betrokken professionals e.d.) te informeren over relevante schoolse zaken"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Communiceren (1/2)"
   }
  },
  {
   "name": "communication2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "communication-question3",
     "title": {
      "nl": "Ik weet de kwaliteiten en verdiensten van het eigen onderwijs, de leerlingen en de school naar buiten toe te belichten"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Communiceren (2/2)"
   }
  }
 ],
 "showTitle": true,
 "showQuestionNumbers": "off",
 "showProgressBar": "bottom"
};

survey.personalDevelopment = {
 "locale": "nl",
 "title": {
  "nl": "Persoonlijke Ontwikkeling"
 },
 "logo": {
  "nl": "http://pillars.school/wp-content/uploads/2017/06/cropped-pillars-logo2.png"
 },
 "logoWidth": 100,
 "logoHeight": 100,
 "logoPosition": "right",
 "pages": [
  {
   "name": "developing1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "developing-question1",
     "title": {
      "nl": "Ik kan sociale netwerken professioneel gebruiken. Denk aan een WhatsApp-groep met collega's"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "developing-question2",
     "title": {
      "nl": "Ik kan een beschrijving geven van minimaal 3 onderwijs gerelateerde thema's per jaar die ik online volg (bijvoorbeeld via een interessegroep op LinkedIn of via nieuwsbrieven)"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Ontwikkelingen volgen in vakgebied (1/2)"
   }
  },
  {
   "name": "developing2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "developing-question3",
     "title": {
      "nl": "Ik ben door middel van discussie, toevoegingen, e.d. bij minimaal 1 online thema over onderwijs online betrokken"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "developing-question4",
     "title": {
      "nl": "Ik ben van minimaal 1 online thema over onderwijs de moderator (= beheerder van het forum of onderwerp)"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Ontwikkelingen volgen in vakgebied (2/2)"
   }
  },
  {
   "name": "sharing1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "sharing-question1",
     "title": {
      "nl": "Ik deel mijn eigen ervaringen (bijvoorbeeld via een blog) en inspireer zo collega’s en vakgenoten"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "sharing-question2",
     "title": {
      "nl": "Ik deel wel eens digitale content die ik zelf heb gemaakt voor in mijn lessen met collega's (bv op wikiwijs)"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Delen van ervaring (1/2)"
   }
  },
  {
   "name": "sharing2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "sharing-question3",
     "title": {
      "nl": "Ik plaats wel een foto's of video's van de school, om ouders te informeren over het onderwijs in mijn klas"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "sharing-question4",
     "title": {
      "nl": "Ik stimuleer de interactie tussen leerlingen en/of collega’s en vakgenoten"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "false",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "true",
       "text": {
        "nl": "Ja"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Delen van ervaring (2/2)"
   }
  }
 ],
 "showTitle": true,
 "showQuestionNumbers": "off",
 "showProgressBar": "bottom"
};

survey.instrumentalSkills = {
 "locale": "nl",
 "title": {
  "nl": "Instrumentele vaardigheden"
 },
 "logo": {
  "nl": "http://pillars.school/wp-content/uploads/2017/06/cropped-pillars-logo2.png"
 },
 "logoWidth": 100,
 "logoHeight": 100,
 "logoPosition": "right",
 "pages": [
  {
   "name": "ictKnowledge1",
   "elements": [
    {
     "type": "rating",
     "name": "ictKnowledge-question1",
     "title": {
      "nl": "Ik weet welke ict-voorzieningen (hard- én software) er bij ons op school beschikbaar zijn."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictKnowledge-question2",
     "title": {
      "nl": "Ik gebruik de ict-voorzieningen met gemak"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Kennis van ICT voorzieningen (1/5)"
   }
  },
  {
   "name": "ictKnowledge2",
   "elements": [
    {
     "type": "rating",
     "name": "ictKnowledge-question3",
     "title": {
      "nl": "Ik kan aangeven hoe ik de ict-omgeving van de school inzet."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictKnowledge-question4",
     "title": {
      "nl": "Ik houd mij op de hoogte van het beschikbaar komen van nieuwe ict toepassingen voor het onderwijs."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Kennis van ICT voorzieningen (2/5)"
   }
  },
  {
   "name": "ictKnowledge3",
   "elements": [
    {
     "type": "rating",
     "name": "ictKnowledge-question5",
     "title": {
      "nl": "Als er een nieuw softwareprogramma of app bij ons wordt geïntroduceerd, vind ik daarin gemakkelijk mijn weg."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictKnowledge-question6",
     "title": {
      "nl": "Als ik ict in de les wil gebruiken, kan ik goed beoordelen wat de voor- en nadelen van specifieke digitale leermiddelen zijn."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Kennis van ICT voorzieningen (3/5)"
   }
  },
  {
   "name": "ictKnowledge4",
   "elements": [
    {
     "type": "rating",
     "name": "ictKnowledge-question7",
     "title": {
      "nl": "Ik kan benoemen welke didactische ict-toepassingen ik gebruik in mijn lessen."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictKnowledge-question8",
     "title": {
      "nl": "Ik kan benoemen welke ict- voorzieningen wel en welke niet goed werken in het gebruik voor leren en lesgeven."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Kennis van ICT voorzieningen (4/5)"
   }
  },
  {
   "name": "ictKnowledge5",
   "elements": [
    {
     "type": "rating",
     "name": "ictKnowledge-question9",
     "title": {
      "nl": "Ik kan het aanwezige digibord functioneel en interactief inzetten tijdens mijn lessen."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Kennis van ICT voorzieningen (5/5)"
   }
  },
  {
   "name": "ictUsage1",
   "elements": [
    {
     "type": "rating",
     "name": "ictUsage-question1",
     "title": {
      "nl": "Ik ben in staat om meerdere types (mobiele) devices in te zetten (denk aan: smartphone, tablet, chromebook e.d.)"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictUsage-question2",
     "title": {
      "nl": "Ik kan mij zonder veel moeite een nieuw device eigen maken en gebruiken voor educatieve toepassingen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Gebruik van ICT voorzieningen (1/5)"
   }
  },
  {
   "name": "ictUsage2",
   "elements": [
    {
     "type": "rating",
     "name": "ictUsage-question3",
     "title": {
      "nl": "Ik gebruik de online omgeving en/of elo die voor het onderwijs op onze school aanwezig is"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictUsage-question4",
     "title": {
      "nl": "Ik gebruik de ondersteunende systemen (LVS) voor het onderwijs op onze school met gemak"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Gebruik van ICT voorzieningen (2/5)"
   }
  },
  {
   "name": "ictUsage3",
   "elements": [
    {
     "type": "rating",
     "name": "ictUsage-question5",
     "title": {
      "nl": "Ik weet hoe ik de online omgeving en/of elo vanaf verschillende devices kan benaderen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictUsage-question6",
     "title": {
      "nl": "Voor de op onderwijs gerichte online en/of elo omgeving weet ik hoe leerlingen toegevoegd of verwijderd moeten worden"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Gebruik van ICT voorzieningen (3/5)"
   }
  },
  {
   "name": "ictUsage4",
   "elements": [
    {
     "type": "rating",
     "name": "ictUsage-question7",
     "title": {
      "nl": "Ik kan een connectie tot stand brengen tussen (leerling-) devices en het digitale bord t.b.v. een interactieve manier van lesgeven"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictUsage-question8",
     "title": {
      "nl": "Als we op school een nieuwe digitale methode krijgen, kan ik deze snel in mijn lessen gebruiken"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Gebruik van ICT voorzieningen (4/5)"
   }
  },
  {
   "name": "ictUsage5",
   "elements": [
    {
     "type": "rating",
     "name": "ictUsage-question9",
     "title": {
      "nl": "Ik gebruik wel eens tools als kahoot!, Padlet en Quizlet om mijn lessen te verrijken"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Gebruik van ICT voorzieningen (5/5)"
   }
  },
  {
   "name": "ictDevelopment1",
   "elements": [
    {
     "type": "rating",
     "name": "ictDevelopment-question1",
     "title": {
      "nl": "Ik lees jaarlijks meer dan 3 artikelen over het gebruik van ict in het onderwijs"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictDevelopment-question2",
     "title": {
      "nl": "Ik ga jaarlijks naar minimaal 1 ict-gerelateerde bijeenkomst waarin ik word geïnformeerd over nieuwe ontwikkelingen of toepassingen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Volgen van ICT ontwikkelingen (1/3)"
   }
  },
  {
   "name": "ictDevelopment2",
   "elements": [
    {
     "type": "rating",
     "name": "ictDevelopment-question3",
     "title": {
      "nl": "Ik volg online scholingen/cursussen of heb deze gevolgd"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "ictDevelopment-question4",
     "title": {
      "nl": "Ik gebruik dagelijks ict toepassingen in mijn onderwijs"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Volgen van ICT ontwikkelingen (2/3)"
   }
  },
  {
   "name": "ictDevelopment3",
   "elements": [
    {
     "type": "rating",
     "name": "ictDevelopment-question5",
     "title": {
      "nl": "Ik probeer regelmatig nieuwe toepassingen uit in mijn lessen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Volgen van ICT ontwikkelingen (3/3)"
   }
  },
  {
   "name": "socialMedia1",
   "elements": [
    {
     "type": "rating",
     "name": "socialMedia-question1",
     "title": {
      "nl": "Ik kan een overzicht geven van gebruikte sociale netwerken zoals Facebook, LinkedIn e.d."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "socialMedia-question2",
     "title": {
      "nl": "Ik kan van deze netwerken aangeven op welke wijze ik ze ook professioneel gebruik. Denk aan WhatsAppgroep met collega's"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Sociale Media (1/3)"
   }
  },
  {
   "name": "socialMedia2",
   "elements": [
    {
     "type": "rating",
     "name": "socialMedia-question3",
     "title": {
      "nl": "Ik kan een beschrijving geven van minimaal 3 onderwijs gerelateerde thema's per jaar die ik online volg (bijvoorbeeld via een interessegroep op LinkedIn, of via nieuwsbrieven)"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "socialMedia-question4",
     "title": {
      "nl": "Ik ben door middel van discussie, toevoegingen, e.d. bij minimaal 1 online thema over onderwijs online betrokken"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Sociale Media (2/3)"
   }
  },
  {
   "name": "socialMedia3",
   "elements": [
    {
     "type": "rating",
     "name": "socialMedia-question5",
     "title": {
      "nl": "Ik ben van minimaal 1 online thema over onderwijs de moderator (= beheerder van het forum of onderwerp)"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Sociale Media (3/3)"
   }
  },
  {
   "name": "contentCreation1",
   "elements": [
    {
     "type": "rating",
     "name": "contentCreation-question1",
     "title": {
      "nl": "Ik ben op de hoogte van de mogelijkheden van YouTube, kan filmpjes toevoegen of een afspeellijst samenstellen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "contentCreation-question2",
     "title": {
      "nl": "Ik maak wel eens zelf filmpjes om mijn boodschap goed over te kunnen brengen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Creëren van content (1/3)"
   }
  },
  {
   "name": "contentCreation2",
   "elements": [
    {
     "type": "rating",
     "name": "contentCreation-question3",
     "title": {
      "nl": "Ik zoek vaak filmpjes of afbeeldingen op internet om aan mijn klas te laten zien, zodat ze de lesstof beter snappen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "contentCreation-question4",
     "title": {
      "nl": "Ik weet hoe ik filmpjes of afbeeldingen kan bewerken (bijvoorbeeld inkorten, of tekst toevoegen) en doe dat soms ook om de les er beter van te maken"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Creëren van content (2/3)"
   }
  },
  {
   "name": "contentCreation3",
   "elements": [
    {
     "type": "rating",
     "name": "contentCreation-question5",
     "title": {
      "nl": "Ik deel wel eens digitale content die ik zelf heb gemaakt voor in mijn lessen met collega's (bv op wikiwijs)"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "contentCreation-question6",
     "title": {
      "nl": "Ik plaats wel eens foto’s of video’s op de website en/of facebookpagina van de school, om ouders te informeren over het onderwijs in mijn klas"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Creëren van content (3/3)"
   }
  }
 ],
 "showTitle": true,
 "showQuestionNumbers": "off",
 "showProgressBar": "bottom"
};

  survey.informationSkills = {
 "locale": "nl",
 "title": {
  "nl": "Informatievaardigheden"
 },
 "logo": {
  "nl": "http://pillars.school/wp-content/uploads/2017/06/cropped-pillars-logo2.png"
 },
 "logoWidth": 100,
 "logoHeight": 100,
 "logoPosition": "right",
 "pages": [
  {
   "name": "searchInformation1",
   "elements": [
    {
     "type": "rating",
     "name": "searchInformation-question1",
     "title": {
      "nl": "Als mijn zoekopdrachten onvoldoende resultaat opleveren, probeer ik mijn zoektermen aan te passen om toch de informatie te vinden die ik zoek"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "searchInformation-question2",
     "title": {
      "nl": "Ik controleer over het algemeen de juistheid en actualiteit van de websites of andere plekken waar ik mijn informatie vandaan haal"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Zoeken van informatie (1/4)"
   }
  },
  {
   "name": "searchInformation2",
   "elements": [
    {
     "type": "rating",
     "name": "searchInformation-question3",
     "title": {
      "nl": "Ik gebruik een internetbrowser met favorieten zodat ik snel op mijn meest gebruikte pagina's terecht kan"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "searchInformation-question4",
     "title": {
      "nl": "Ik ga regelmatig op zoek naar digitaal (leer)materiaal, buiten de kanalen die ik al ken"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Zoeken van informatie (2/4)"
   }
  },
  {
   "name": "searchInformation3",
   "elements": [
    {
     "type": "rating",
     "name": "searchInformation-question5",
     "title": {
      "nl": "Ik zoek vaak naar nieuw digitaal (leer)materiaal op wikiwijs.nl of vergelijkbare platforms"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "searchInformation-question6",
     "title": {
      "nl": "Als ik informatie moet zoeken in ons administratiesysteem, lukt me dat over het algemeen goed"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Zoeken van informatie (3/4)"
   }
  },
  {
   "name": "searchInformation4",
   "elements": [
    {
     "type": "rating",
     "name": "searchInformation-question7",
     "title": {
      "nl": "Ik kan goed uit de voeten met zoekvelden, filters en sorteerfuncties"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Zoeken van informatie (4/4)"
   }
  },
  {
   "name": "administerInformation1",
   "elements": [
    {
     "type": "rating",
     "name": "administerInformation-question1",
     "title": {
      "nl": "Informatie die ik vind op internet kan ik makkelijk integreren in presentaties of opdrachten, zonder dat ik daar te veel werk aan heb (bijvoorbeeld knippen en plakken, of integreren van filmpjes in een presentatie)"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "administerInformation-question2",
     "title": {
      "nl": "Ik maak gebruik van mappen om mijn bestanden te structureren. Indien nodig pas ik die structuur aan"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Beheren van informatie (1/4)"
   }
  },
  {
   "name": "administerInformation2",
   "elements": [
    {
     "type": "rating",
     "name": "administerInformation-question3",
     "title": {
      "nl": "Ik sla mijn mappen en bestanden steeds vaker op in de cloud (Google Drive, OneDrive, Dropbox) en snap hoe ik daarmee documenten kan beheren en delen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "administerInformation-question4",
     "title": {
      "nl": "Ik maak snelkoppelingen naar veelgebruikte mappen op mijn desktop, of ik hang ze aan 'snelle toegang'"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Beheren van informatie (2/4)"
   }
  },
  {
   "name": "administerInformation3",
   "elements": [
    {
     "type": "rating",
     "name": "administerInformation-question5",
     "title": {
      "nl": "Als ik (leer)materiaal maak met informatie die ik op internet vind, vermeld ik altijd de bron en ik weet welke regels hiervoor gelden"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "administerInformation-question6",
     "title": {
      "nl": "Ik word er soms wel eens op gewezen dat de informatie in mijn lessen niet klopt, of dat mijn leerlingen tegenstrijdige informatie hebben gevonden op internet"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Beheren van informatie (3/4)"
   }
  },
  {
   "name": "administerInformation4",
   "elements": [
    {
     "type": "rating",
     "name": "administerInformation-question7",
     "title": {
      "nl": "Als mijn leerlingen een opdracht inleveren, valt mij snel op of ze iets van internet hebben gekopieerd en ik weet hoe ik dit makkelijk kan controleren"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Beheren van informatie (4/4)"
   }
  }
 ],
 "showTitle": true,
 "showQuestionNumbers": "off",
 "showProgressBar": "bottom"
};

survey.mediaSkills = {
 "locale": "nl",
 "title": {
  "nl": "Mediavaardigheden"
 },
 "logo": {
  "nl": "http://pillars.school/wp-content/uploads/2017/06/cropped-pillars-logo2.png"
 },
 "logoWidth": 100,
 "logoHeight": 100,
 "logoPosition": "right",
 "pages": [
  {
   "name": "personalSkills1",
   "elements": [
    {
     "type": "rating",
     "name": "personalSkills-question1",
     "title": {
      "nl": "Ik bespreek regelmatig (minstens 1x per maand) met mijn team of leidinggevende hoe wij actuele media gebruiken op school"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "personalSkills-question2",
     "title": {
      "nl": "Ik snap goed welke risico's internet en sociale media met zich meebrengen en wat dit voor invloed heeft op de dynamiek in de klas"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Eigen vaardigheden (1/3)"
   }
  },
  {
   "name": "personalSkills2",
   "elements": [
    {
     "type": "rating",
     "name": "personalSkills-question3",
     "title": {
      "nl": "Ik verbeter me in de mediavaardigheden die ik zelf nodig heb om in deze digitale samenleving goed te functioneren"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "personalSkills-question4",
     "title": {
      "nl": "Ik leer mijn klas 21e eeuwse vaardigheden zoals kritisch denken, oplossend vermogen en digitale vaardigheden door deze in te passen in de standaard methoden"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Eigen vaardigheden (2/3)"
   }
  },
  {
   "name": "personalSkills3",
   "elements": [
    {
     "type": "rating",
     "name": "personalSkills-question5",
     "title": {
      "nl": "Ik weet hoe ik de betrouwbaarheid van educatieve software en websites kan controleren"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Eigen vaardigheden (3/3)"
   }
  },
  {
   "name": "teachingMediaSkills1",
   "elements": [
    {
     "type": "rating",
     "name": "teachingMediaSkills-question1",
     "title": {
      "nl": "Bij het voorbereiden van mijn lessen bedenk ik regelmatig (minstens 1x per maand) of ik sociale media kan inpassen in de les"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "teachingMediaSkills-question2",
     "title": {
      "nl": "Ik probeer de risico's van sociale media en internet te bespreken in mijn klas, door dit bijvoorbeeld te werken in een reflectie van een opdracht"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "teachingMediaSkills-question4",
     "title": {
      "nl": "Ik begrijp wat voor invloed media(uitingen) op mijn leerlingen kunnen hebben en ga hierover regelmatig met hen in gesprek, door het bijvoorbeeld te verwerken in opdrachten"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "teachingMediaSkills-question5",
     "title": {
      "nl": "Ik heb met mijn klas regelmatig gesprekken over wat gebeurt op sociale media zoals whatsapp, instagram en snapchat (bijvoorbeeld roddelen of pesten) en hoe ze daarmee om (kunnen) gaan"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Lesgeven in de mediawijsheid (1/2)"
   }
  },
  {
   "name": "teachingMediaSkills2",
   "elements": [
    {
     "type": "rating",
     "name": "teachingMediaSkills-question3",
     "title": {
      "nl": "Ik begrijp dat sommige mediaboodschappen bedoeld zijn om kinderen tot (soms negatief) gedrag aan te zetten en houdt hier rekening mee als ik voor de klas sta"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Lesgeven in de mediawijsheid (2/2)"
   }
  }
 ],
 "showTitle": true,
 "showQuestionNumbers": "off",
 "showProgressBar": "bottom"
};

survey.assessmentForm = {
 "locale": "nl",
 "title": {
  "default": "Observatie-instrument voor optimaal leerrendement uit ICT-gebruik op schoolniveau",
  "nl": "Observatie-instrument voor optimaal leerrendement uit ICT-gebruik"
 },
 "pages": [
  {
   "name": "observation",
   "elements": [
    {
     "type": "text",
     "name": "question1",
     "title": {
      "nl": "Naam observator"
     },
     "isRequired": true
    },
    {
     "type": "rating",
     "name": "teacherDrivenLearning-question1",
     "title": {
      "nl": "Leerkracht geeft klassikaal uitleg om kennis over te dragen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "selfOrganizedLearning-question1",
     "title": {
      "nl": "Leerling stelt op eigen initiatief doelen over eindresultaat en leerproces"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "instructionAndExercise-question1",
     "title": {
      "nl": "Digitaal lesmateriaal wordt door leerkracht aangereikt om lesstof te oefenen en te herhalen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "personalLearningEnvironment-question1",
     "title": {
      "nl": "Leerlingen zoeken zelf naar digitale bronnen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "independentLearning-question1",
     "title": {
      "nl": "Leerkracht coacht wat betreft inhoud, maar leerling kan op eigen tempo werken"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "adaptiveLearningMaterial-question1",
     "title": {
      "nl": "Leerling bestudeert digitale bronnen waarin gezocht wordt naar antwoorden"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "selfOrganizedLearning-question2",
     "title": {
      "nl": "Leerlingen werken samen om de stof te ontdekken en geven elkaar daarbij feedback"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "personalLearningEnvironment-question2",
     "title": {
      "nl": "Leerlingen werken samen met behulp van een digitale leeromgeving"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "teacherDrivenLearning-question2",
     "title": {
      "nl": "Leerkracht geeft gerichte opdracht om stof te verwerken via oefening"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "selfOrganizedLearning-question3",
     "title": {
      "nl": "Leerlingen voeren opdrachten uit die aansluiten bij hun individuele leerproces waarbij leraar als coach fungeert"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "instructionAndExercise-question2",
     "title": {
      "nl": "Leerkracht gebruikt ICT om kennis over te brengen of opdrachten te geven"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "teacherDrivenLearning-question3",
     "title": {
      "nl": "Leerkracht sluit les af door middel van klassikale terugkoppeling over geleerde stof (feedback/toets)"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "instructionAndExercise-question3",
     "title": {
      "nl": "Leerlingen volgen niet allen hetzelfde programma, digitaal lesmateriaal is gepersonaliseerd"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "adaptiveLearningMaterial-question2",
     "title": {
      "nl": "Digitaal leermateriaal voorziet in feedback en hints aan leerling"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "adaptiveLearningMaterial-question3",
     "title": {
      "nl": "Digitaal leermateriaal past zich aan op niveau en tempo van leerling"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "independentLearning-question2",
     "title": {
      "nl": "Leerkracht biedt bronnen aan waar leerlingen mee aan de slag kunnen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "independentLearning-question3",
     "title": {
      "nl": "Leerkracht stimuleert de leerlingen zichzelf doelen te stellen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "personalLearningEnvironment-question3",
     "title": {
      "nl": "Leerlingen maken gebruik van een digitale leeromgeving die ingericht kan worden naar eigen behoefte"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "personalLearningEnvironment-question4",
     "title": {
      "nl": "Leerlingen wisselen feedback uit met behulp van een digitale leeromgeving"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "comment",
     "name": "question3",
     "title": {
      "nl": "Commentaar observator"
     }
    },
    {
     "type": "comment",
     "name": "question2",
     "title": {
      "nl": "Commentaar  leraar"
     }
    }
   ],
   "title": {
    "nl": "Observatie instrument"
   },
   "description": {
    "nl": "Nodig een collega uit om jouw les te observeren met behulp van deze vragenlijst!\nBron:\nHulshof, C. D. (2016, 4 mei). Observatie instrument voor optimaal leerrendement uit ICT-gebruik op schoolniveau. Geraadpleegd op 22 april 2019, van https://dspace.library.uu.nl/handle/1874/330790"
   }
  }
 ],
 "showTitle": true
}

survey.rubric = {
 "locale": "nl",
 "title": {
  "default": "Beoordelingscriteria leraar adhv Rubrics",
  "nl": "Beoordelingscriteria adhv Rubrics"
 },
 "pages": [
  {
   "name": "interpersonalCompetencePage",
   "elements": [
    {
     "type": "matrix",
     "name": "interpersonalCompetence",
     "title": {
      "nl": "Interpersoonlijk competent"
     },
     "isRequired": true,
     "columns": [
      {
       "value": "1",
       "text": {
        "nl": "Niveau 1"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Niveau 2"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Niveau 3"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Niveau 4"
       }
      }
     ],
     "rows": [
      {
       "value": "interactingWithPupils",
       "text": {
        "nl": "In contact met leerlingen "
       }
      },
      {
       "value": "communicatingWithPupils",
       "text": {
        "nl": "Communiceren met leerlingen"
       }
      },
      {
       "value": "creatingGoodAtmosphereForCooperation",
       "text": {
        "nl": "Klimaat voor samenwerking  scheppen"
       }
      }
     ],
     "cells": {
      "interactingWithPupils": {
       "1": {
        "nl": "Heeft amper zicht op wat leerlingen bezighoudt. \n\nMijdt ongeïnteresseerde, lastige leerlingen; mijdt moeilijke situaties."
       },
       "2": {
        "nl": "Heeft enig zicht op wat leerlingen bezighoudt; weet dat af en toe te benutten.\n\nGaat lastige leerlingen en situaties wel aan, maar heeft daarbij hulp van anderen nodig.\n\nLeidt, begeleidt."
       },
       "3": {
        "nl": "Merkt op wat leerlingen bezighoudt en weet dat te benutten; stemt af.\n\nHoudt zich staande bij  lastige leerlingen en situaties.\n\nLeidt, begeleidt, bouwt een band op en zet met succes leerlingen aan tot acties."
       },
       "4": {
        "nl": "Heeft goed zicht op wat leerlingen bezighoudt, en weet geregeld moeilijke leerlingen voor zich te winnen."
       }
      },
      "communicatingWithPupils": {
       "1": {
        "nl": "Communiceert moeizaam en luistert niet goed.\n\nIs eigen en andermans emoties niet de baas."
       },
       "2": {
        "nl": "Past aanwijzingen toe m.b.t. het tot stand brengen van communicatie met de klas en met de leerlingen.\n\nCommuniceert op inhoudsniveau.\n\nHoudt zich in, en weert (verbale) agressie af."
       },
       "3": {
        "nl": "Houdt in taalgebruik en manier van communiceren rekening met wat gebruikelijk is in de leefwereld van leerlingen.\n\nLuistert naar de leerlingen en reageert op hen.\n\nCommuniceert goed op inhoudsniveau.\n\nZet non-verbale communicatie in.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       },
       "4": {
        "nl": "Communiceert effectief, efficiënt en met empathie. \n\nCommuniceert goed op inhouds- en betrekkingsniveau.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       }
      },
      "creatingGoodAtmosphereForCooperation": {
       "1": {
        "nl": "Werkt vooral klassikaal; er is samenwerking tussen docent en individuele leerlingen. "
       },
       "2": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\nLaat merken dat hij/zij een goede samenwerking tussen leerlingen waardeert."
       },
       "3": {
        "nl": "Werkt samen met de klas; stimuleert samenwerking tussen de leerlingen. \nWerkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nMerkt op hoe de sociale verhoudingen liggen; zet zich in om deze zo nodig te verbeteren.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. "
       },
       "4": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. \n\nVerantwoordt hoe hij/zij met de (heterogene) groepen omgaat en ook met de individuele leerlingen.\n"
       }
      }
     },
     "isAllRowRequired": true
    },
    {
     "type": "comment",
     "name": "interpersonalCompetenceCommentSelf",
     "title": {
      "nl": "Eigen commentaar"
     }
    },
    {
     "type": "comment",
     "name": "interpersonalCompetenceCommentCoach",
     "title": {
      "nl": "Commentaar observator"
     }
    }
   ],
   "title": "Interpersoonlijk competent"
  },
  {
   "name": "pedagogicalCompetencePage",
   "elements": [
    {
     "type": "matrix",
     "name": "pedagogicalCompetence",
     "title": {
      "nl": "Pedagogisch competent"
     },
     "isRequired": true,
     "columns": [
      {
       "value": "1",
       "text": {
        "nl": "Niveau 1"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Niveau 2"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Niveau 3"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Niveau 4"
       }
      }
     ],
     "rows": [
      {
       "value": "safeLearningEnvironment",
       "text": {
        "nl": "Veilige leeromgeving scheppen"
       }
      },
      {
       "value": "acknowledgingDifferences",
       "text": {
        "nl": "Recht doen aan verschillen tussen leerlingen"
       }
      },
      {
       "value": "socialEmotionalDevelopment",
       "text": {
        "nl": "Begeleiden van leerlingen op het gebied van sociaal-emotionele en morele ontwikkeling"
       }
      },
      {
       "value": "independentResponsible",
       "text": {
        "nl": "Begeleiden van leerlingen op het gebied van zelfstandig en verantwoordelijk worden"
       }
      },
      {
       "value": "talentCapabilities",
       "text": {
        "nl": "Begeleiden van leerlingen bij het ontwikkelen van talent/capaciteiten"
       }
      }
     ],
     "cells": {
      "interactingWithPupils": {
       "1": {
        "nl": "Heeft amper zicht op wat leerlingen bezighoudt. \n\nMijdt ongeïnteresseerde, lastige leerlingen; mijdt moeilijke situaties."
       },
       "2": {
        "nl": "Heeft enig zicht op wat leerlingen bezighoudt; weet dat af en toe te benutten.\n\nGaat lastige leerlingen en situaties wel aan, maar heeft daarbij hulp van anderen nodig.\n\nLeidt, begeleidt."
       },
       "3": {
        "nl": "Merkt op wat leerlingen bezighoudt en weet dat te benutten; stemt af.\n\nHoudt zich staande bij  lastige leerlingen en situaties.\n\nLeidt, begeleidt, bouwt een band op en zet met succes leerlingen aan tot acties."
       },
       "4": {
        "nl": "Heeft goed zicht op wat leerlingen bezighoudt, en weet geregeld moeilijke leerlingen voor zich te winnen."
       }
      },
      "communicatingWithPupils": {
       "1": {
        "nl": "Communiceert moeizaam en luistert niet goed.\n\nIs eigen en andermans emoties niet de baas."
       },
       "2": {
        "nl": "Past aanwijzingen toe m.b.t. het tot stand brengen van communicatie met de klas en met de leerlingen.\n\nCommuniceert op inhoudsniveau.\n\nHoudt zich in, en weert (verbale) agressie af."
       },
       "3": {
        "nl": "Houdt in taalgebruik en manier van communiceren rekening met wat gebruikelijk is in de leefwereld van leerlingen.\n\nLuistert naar de leerlingen en reageert op hen.\n\nCommuniceert goed op inhoudsniveau.\n\nZet non-verbale communicatie in.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       },
       "4": {
        "nl": "Communiceert effectief, efficiënt en met empathie. \n\nCommuniceert goed op inhouds- en betrekkingsniveau.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       }
      },
      "creatingGoodAtmosphereForCooperation": {
       "1": {
        "nl": "Werkt vooral klassikaal; er is samenwerking tussen docent en individuele leerlingen. "
       },
       "2": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\nLaat merken dat hij/zij een goede samenwerking tussen leerlingen waardeert."
       },
       "3": {
        "nl": "Werkt samen met de klas; stimuleert samenwerking tussen de leerlingen. \nWerkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nMerkt op hoe de sociale verhoudingen liggen; zet zich in om deze zo nodig te verbeteren.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. "
       },
       "4": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. \n\nVerantwoordt hoe hij/zij met de (heterogene) groepen omgaat en ook met de individuele leerlingen.\n"
       }
      },
      "safeLearningEnvironment": {
       "1": {
        "nl": "Het (niet) handelen in de klas bevordert geregeld eerder chaos dan orde.\n\nLaat gedrag vrijwel volledig leiden door het groepsgebeuren."
       },
       "2": {
        "nl": "Merkt op hoe de leerlingen met elkaar omgaan en wat dat voor gevolgen heeft voor het welbevinden van individuele leerlingen. \n\nDeelt de leerlingen omgangsregels mee en handhaaft deze soms wel, soms niet.\n\nRespecteert de leerlingen; laat ze in hun waarde."
       },
       "3": {
        "nl": "Bespreekt met de leerlingen de sfeer in de groep en de omgang met elkaar. \n\nSpreekt geregeld leerlingen aan op ongewenst gedrag;\nstimuleert gewenst gedrag.\n\nGeeft positieve feedback.\n\nWaardeert de inbreng van de leerlingen; staat open voor hun ideeën.\n\nOndersteunt het zelfvertrouwen van de leerlingen; behandelt iedereen gelijkwaardig."
       },
       "4": {
        "nl": "Schept en handhaaft in vrijwel elke situatie een veilige leeromgeving, waar de leerlingen zich medeverantwoordelijk voor voelen."
       }
      },
      "acknowledgingDifferences": {
       "1": {
        "nl": "Ziet de klas als geheel; heeft geen oog voor individuele leerlingen."
       },
       "2": {
        "nl": "Merkt op dat de leerlingen op verschillende manieren functioneren (verschillende interesses, kenmerken, achtergronden hebben)."
       },
       "3": {
        "nl": "Signaleert verschillen tussen de leerlingen; reageert daar adequaat op. \n\nBenadert verschillende leerlingen passend en effectief."
       },
       "4": {
        "nl": "Doet recht aan verschillen tussen de leerlingen; stimuleert de leerlingen om op een eigen manier te leren."
       }
      },
      "socialEmotionalDevelopment": {
       "1": {
        "nl": "Heeft nauwelijks oog voor de sociaal-emotionele en morele ontwikkeling van de leerlingen."
       },
       "2": {
        "nl": "Signaleert de sociaal-emotionele ontwikkeling (of de belemmering daarin) nog niet zelf, maar gaat hier wel mee om als er op gewezen wordt. \n\nSignaleert de morele ontwikkeling (of de belemmering daarin) nog niet zelf, maar gaat hier wel mee om als er op gewezen wordt."
       },
       "3": {
        "nl": "Merkt op waar individuele leerlingen zijn in hun sociaal-emotionele ontwikkeling, en waar ze afwijken of achterblijven. \n\n\nMerkt op waar individuele leerlingen zijn in hun morele ontwikkeling, en waar ze afwijken of achterblijven."
       },
       "4": {
        "nl": "Signaleert problemen en belemmeringen in de sociaal-emotionele ontwikkeling van leerlingen; consulteert collega’s daarover en onderneemt passende actie. \n\nSpeelt in op de sociaal-emotionele ontwikkeling van leerlingen. \n\nSignaleert problemen en belemmeringen in de morele ontwikkeling van leerlingen; consulteert collega’s daarover en onderneemt passende actie.\nSpeelt in op de morele ontwikkeling van de leerlingen. "
       }
      },
      "independentResponsible": {
       "1": {
        "nl": "Heeft nauwelijks oog voor de zelfstandigheid en verantwoordelijkheid van de leerlingen."
       },
       "2": {
        "nl": "Helpt bij de begeleiding van de leerlingen naar zelfstandigheid en verantwoordelijkheid, als daarop gewezen wordt."
       },
       "3": {
        "nl": "Merkt op hoe de leerlingen zich ontwikkelen in zelfstandigheid en verantwoordelijkheid.\n\nDraagt bij aan deze ontwikkeling."
       },
       "4": {
        "nl": "Signaleert individuele verschillen tussen leerlingen in hun ontwikkeling naar zelfstandigheid en verantwoordelijkheid.\n\nBegeleidt individuele leerlingen die achterblijven in deze ontwikkeling."
       }
      },
      "talentCapabilities": {
       "1": {
        "nl": "Heeft nauwelijks oog voor talent/capaciteiten van de leerlingen."
       },
       "2": {
        "nl": "Kan de talenten en capaciteiten van individuele leerlingen nog niet herkennen, maar als erop gewezen wordt wel mee omgaan."
       },
       "3": {
        "nl": "Merkt op welke talenten en capaciteiten de leerlingen hebben."
       },
       "4": {
        "nl": "Helpt en begeleidt de leerlingen bij het ontwikkelen van individuele talenten en capaciteiten, en kan adviseren over de (school)loopbaan. \nHoudt rekening met verschillen. \nLeert leerlingen wat hun rol en verantwoordelijkheid in de samenleving is door een voorbeeld te zijn in gedrag."
       }
      }
     },
     "isAllRowRequired": true
    },
    {
     "type": "comment",
     "name": "pedagogicalCompetenceCommentSelf",
     "title": {
      "nl": "Eigen commentaar"
     }
    },
    {
     "type": "comment",
     "name": "pedagogicalCompetenceCommentCoach",
     "title": {
      "nl": "Commentaar observator"
     }
    }
   ],
   "title": {
    "nl": "Pedagogisch competent"
   }
  },
  {
   "name": "competenceInSubjectMatterAndDidacticsPage",
   "elements": [
    {
     "type": "matrix",
     "name": "competenceInSubjectMatterAndDidactics",
     "title": {
      "nl": "Vakinhoudelijk en didactisch competent"
     },
     "isRequired": true,
     "columns": [
      {
       "value": "1",
       "text": {
        "nl": "Niveau 1"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Niveau 2"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Niveau 3"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Niveau 4"
       }
      }
     ],
     "rows": [
      {
       "value": "knowledgeOfSubjectMatter",
       "text": {
        "nl": "Vakinhoudelijke kennis"
       }
      },
      {
       "value": "learningObjectives",
       "text": {
        "nl": "Leerdoelen"
       }
      },
      {
       "value": "possibilitiesAndLimitations",
       "text": {
        "nl": "Mogelijkheden en beperkingen"
       }
      },
      {
       "value": "strategyAndImplementation",
       "text": {
        "nl": "Aanpak en uitvoering"
       }
      },
      {
       "value": "modesOfInstruction",
       "text": {
        "nl": "Werkvormen"
       }
      },
      {
       "value": "teachingMaterial",
       "text": {
        "nl": "Leermiddelen"
       }
      },
      {
       "value": "testing",
       "text": {
        "nl": "Toetsing"
       }
      },
      {
       "value": "assistingTheLearningProcess",
       "text": {
        "nl": "Bevorderen van leren"
       }
      },
      {
       "value": "givingFeedback",
       "text": {
        "nl": "Feedback geven"
       }
      }
     ],
     "cells": {
      "interactingWithPupils": {
       "1": {
        "nl": "Heeft amper zicht op wat leerlingen bezighoudt. \n\nMijdt ongeïnteresseerde, lastige leerlingen; mijdt moeilijke situaties."
       },
       "2": {
        "nl": "Heeft enig zicht op wat leerlingen bezighoudt; weet dat af en toe te benutten.\n\nGaat lastige leerlingen en situaties wel aan, maar heeft daarbij hulp van anderen nodig.\n\nLeidt, begeleidt."
       },
       "3": {
        "nl": "Merkt op wat leerlingen bezighoudt en weet dat te benutten; stemt af.\n\nHoudt zich staande bij  lastige leerlingen en situaties.\n\nLeidt, begeleidt, bouwt een band op en zet met succes leerlingen aan tot acties."
       },
       "4": {
        "nl": "Heeft goed zicht op wat leerlingen bezighoudt, en weet geregeld moeilijke leerlingen voor zich te winnen."
       }
      },
      "communicatingWithPupils": {
       "1": {
        "nl": "Communiceert moeizaam en luistert niet goed.\n\nIs eigen en andermans emoties niet de baas."
       },
       "2": {
        "nl": "Past aanwijzingen toe m.b.t. het tot stand brengen van communicatie met de klas en met de leerlingen.\n\nCommuniceert op inhoudsniveau.\n\nHoudt zich in, en weert (verbale) agressie af."
       },
       "3": {
        "nl": "Houdt in taalgebruik en manier van communiceren rekening met wat gebruikelijk is in de leefwereld van leerlingen.\n\nLuistert naar de leerlingen en reageert op hen.\n\nCommuniceert goed op inhoudsniveau.\n\nZet non-verbale communicatie in.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       },
       "4": {
        "nl": "Communiceert effectief, efficiënt en met empathie. \n\nCommuniceert goed op inhouds- en betrekkingsniveau.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       }
      },
      "creatingGoodAtmosphereForCooperation": {
       "1": {
        "nl": "Werkt vooral klassikaal; er is samenwerking tussen docent en individuele leerlingen. "
       },
       "2": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\nLaat merken dat hij/zij een goede samenwerking tussen leerlingen waardeert."
       },
       "3": {
        "nl": "Werkt samen met de klas; stimuleert samenwerking tussen de leerlingen. \nWerkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nMerkt op hoe de sociale verhoudingen liggen; zet zich in om deze zo nodig te verbeteren.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. "
       },
       "4": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. \n\nVerantwoordt hoe hij/zij met de (heterogene) groepen omgaat en ook met de individuele leerlingen.\n"
       }
      },
      "knowledgeOfSubjectMatter": {
       "1": {
        "nl": "Staat onvoldoende boven de lesstof. \n\nIs te afhankelijk van de gebruikte methode.\n\nHeeft te weinig parate vakinhoudelijke kennis. \n\nBeantwoordt \nvragen soms foutief."
       },
       "2": {
        "nl": "Geeft alleen in samenwerking met de collega een vakinhoudelijk correcte les. \n\nHeeft soms moeite met uitstapjes buiten de lesstof en met onverwachte vragen. "
       },
       "3": {
        "nl": "Heeft geen moeite met de correcte weergave van de stof uit de gebruikte methode; variëren en improviseren gaat niet vloeiend.\n\nBeantwoordt vragen van de leerlingen met betrekking tot de lesstof goed. \n\nVoert zelf opdrachten, oefeningen en toetsen op onderbouwniveau waar zijn leerlingen mee te maken krijgen foutloos uit."
       },
       "4": {
        "nl": "Staat ruim boven de lesstof. Heeft een voldoende groot arsenaal aan voorbeelden waaruit hij kan putten.\n \nBeantwoordt onverwachte vragen van leerlingen vakinhoudelijk correct. \n\nLeunt voor vakinhoudelijke kennis niet op de methode. \n\nVoert zelf opdrachten, oefeningen en toetsen op bovenbouwniveau waar zijn leerlingen mee te maken krijgen foutloos uit."
       }
      },
      "learningObjectives": {
       "1": {
        "nl": "Leerdoelen zijn nog niet altijd relevant en haalbaar."
       },
       "2": {
        "nl": "Heeft voor de leerlingen haalbare en relevante doelen;\nontwerpt nog niet altijd passende leeractiviteiten bij de leerdoelen."
       },
       "3": {
        "nl": "Heeft voor de leerlingen haalbare, relevante en toetsbare doelen; ontwerpt daarbij meestal passende leeractiviteiten.\n\nLegt duidelijk uit aan de leerlingen welke leerdoelen hij met welke activiteiten nastreeft."
       },
       "4": {
        "nl": "Heeft voor de leerlingen haalbare, relevante en toetsbare doelen; ontwerpt daarbij passende leeractiviteiten; houdt daarbij rekening met verschillen tussen de leerlingen. \n\nLegt duidelijk uit aan de leerlingen welke leerdoelen hij met welke activiteiten nastreeft."
       }
      },
      "possibilitiesAndLimitations": {
       "1": {
        "nl": "Bereidt een les voor, maar vindt nauwelijks aansluiting op voorkennis en anticipatie op misconcepties."
       },
       "2": {
        "nl": "Bereidt een les voor waarin rekening is gehouden met voorkennis en mogelijke misconcepties."
       },
       "3": {
        "nl": "Bereidt een les voor waarin rekening is gehouden met voorkennis en mogelijke misconcepties; voert deze uit zoals beoogd."
       },
       "4": {
        "nl": "Bereidt een lessenserie voor waarin rekening is gehouden met voorkennis en mogelijke misconcepties; voert deze uit zoals beoogd."
       }
      },
      "strategyAndImplementation": {
       "1": {
        "nl": "Bereidt een les voor, maar houdt daarbij nauwelijks rekening met vaktaal, afgesproken notaties, en fasen in de les."
       },
       "2": {
        "nl": "Bereidt een les voor waarin rekening is gehouden vaktaal, afgesproken notaties en indeling in fasen."
       },
       "3": {
        "nl": "Bereidt een les voor waarin rekening is gehouden met vaktaal en afgesproken notaties.\nDeelt een les in fasen in.\nKan directe instructie inzetten.\nVoert deze uit zoals beoogd."
       },
       "4": {
        "nl": "Bereidt een lessenserie voor waarin rekening is gehouden met vaktaal en afgesproken notaties.\nDeelt een les in fasen in. \nKan directe instructie inzetten.\nVoert de lessenserie uit zoals beoogd."
       }
      },
      "modesOfInstruction": {
       "1": {
        "nl": "Heeft nog nauwelijks oog voor werkvormen in relatie tot leerdoelen."
       },
       "2": {
        "nl": "Gebruikt een beperkt aantal werkvormen, ook als andere werkvormen meer voor de hand zouden liggen."
       },
       "3": {
        "nl": "Gebruikt minstens de werkvormen klassikale uitleg, onderwijsleergesprek en zelfstandig werken en enkele ADSL (Activerende Didactiek & Samenwerkend Leren)werkvormen die in principe tot het realiseren van de leerdoelen kunnen leiden; de uitvoering is soms nog niet zoals beoogd."
       },
       "4": {
        "nl": "Gebruikt een breed repertoire van activerende werkvormen, waaronder samenwerkende werkvormen, die gegeven de doelen functioneel zijn; voert deze uit zoals beoogd."
       }
      },
      "teachingMaterial": {
       "1": {
        "nl": "Heeft nog nauwelijks oog voor hoe het leren bij leerlingen kan worden bevorderd met behulp van leermiddelen."
       },
       "2": {
        "nl": "Heeft kennis van  leermiddelen, waaronder ICT-middelen om het leren bij leerlingen te bevorderen."
       },
       "3": {
        "nl": "Maakt gebruik van  leermiddelen, waaronder ICT-middelen.\n\nLaat de leerlingen met ICT-middelen werken."
       },
       "4": {
        "nl": "Maakt gebruik van  leermiddelen, waaronder ICT-middelen die effectief bijdragen aan het bereiken van de leerdoelen."
       }
      },
      "testing": {
       "1": {
        "nl": "Heeft nog nauwelijks  oog voor verschillende soorten toetsing."
       },
       "2": {
        "nl": "Stelt betrouwbare en valide toetsen op, met een correctiemodel en toetsmatrijs."
       },
       "3": {
        "nl": "Gaat tijdens de les na in hoeverre de leerlingen de doelen bereiken.\n\nStelt betrouwbare en valide toetsen op, met een correctiemodel en toetsmatrijs. \n\nKijkt toetsen na en bespreekt die aan de hand van een correctiemodel. "
       },
       "4": {
        "nl": "Gaat tijdens de les na in hoeverre de leerlingen de doelen bereiken, en past de (volgende) les daar op aan.\n\nStelt betrouwbare en valide toetsen op, met een correctiemodel en toetsmatrijs.\n\nKijkt toetsen na en bespreekt die aan de hand van een correctiemodel. \n\nDoet op basis van toetsing betrouwbare uitspraken over kennis en vaardigheden van leerlingen."
       }
      },
      "assistingTheLearningProcess": {
       "1": {
        "nl": "Heeft nog nauwelijks oog voor het leren van leerlingen en hoe hij dit leren kan bevorderen. "
       },
       "2": {
        "nl": "Kan benoemen wat de vorderingen zijn van de leerlingen. Signaleert leerproblemen."
       },
       "3": {
        "nl": "Kan benoemen wat de vorderingen zijn van de leerlingen en wat hun sterke en zwakke punten zijn. \n\nSignaleert leerproblemen en weet waar hij  en de leerling eventueel hulp kunnen vinden in en buiten de school."
       },
       "4": {
        "nl": "Kan benoemen  hoe zijn leerlingen leren, wat hun vorderingen zijn en hun sterke en zwakke punten, en hoe hij hun leren bevordert. \n\nSignaleert leerproblemen en kan beoordelen of en hoe hij die problemen zelf kan aanpakken, en  weet waar hij en de leerling eventueel hulp kunnen vinden in en buiten de school."
       }
      },
      "givingFeedback": {
       "1": {
        "nl": "Herkent hoe docenten feedback geven aan leerlingen. Kan terugkoppelen of iets goed of fout is, maar geeft nog geen duidelijke feedback."
       },
       "2": {
        "nl": "Geeft opbouwend commentaar op het werk van zijn leerlingen en op de manier waarop ze werken."
       },
       "3": {
        "nl": "Geeft in verschillende situaties goede individuele feedback aan leerlingen. \n\nGeeft opbouwend commentaar op het werk van zijn leerlingen en op de manier waarop ze werken."
       },
       "4": {
        "nl": "Geeft in verschillende situaties goede individuele feedback aan leerlingen, en onderbouwt deze feedback. \n\nGeeft opbouwend commentaar op het werk van zijn leerlingen en op de manier waarop ze werken."
       }
      }
     },
     "isAllRowRequired": true
    },
    {
     "type": "comment",
     "name": "competenceInSubjectMatterAndDidacticsCommentSelf",
     "title": {
      "nl": "Eigen commentaar"
     }
    },
    {
     "type": "comment",
     "name": "competenceInSubjectMatterAndDidacticsCommentCoach",
     "title": {
      "nl": "Commentaar observator"
     }
    }
   ],
   "title": {
    "nl": "Vakinhoudelijk en didactisch competent"
   }
  },
  {
   "name": "organisationalCompetencePage",
   "elements": [
    {
     "type": "matrix",
     "name": "organisationalCompetence",
     "title": {
      "nl": "Organisatorisch competent"
     },
     "isRequired": true,
     "columns": [
      {
       "value": "1",
       "text": {
        "nl": "Niveau 1"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Niveau 2"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Niveau 3"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Niveau 4"
       }
      }
     ],
     "rows": [
      {
       "value": "upholdingProceduresAndRules",
       "text": {
        "nl": "Hanteren procedures en afspraken"
       }
      },
      {
       "value": "organisationOfTeachingProcess",
       "text": {
        "nl": "Organisatie (leer)proces"
       }
      },
      {
       "value": "organisationOfTeachingEnvironment",
       "text": {
        "nl": "Organisatie leeromgeving"
       }
      },
      {
       "value": "timeManagement",
       "text": {
        "nl": "Planning / timemanagement"
       }
      }
     ],
     "cells": {
      "interactingWithPupils": {
       "1": {
        "nl": "Heeft amper zicht op wat leerlingen bezighoudt. \n\nMijdt ongeïnteresseerde, lastige leerlingen; mijdt moeilijke situaties."
       },
       "2": {
        "nl": "Heeft enig zicht op wat leerlingen bezighoudt; weet dat af en toe te benutten.\n\nGaat lastige leerlingen en situaties wel aan, maar heeft daarbij hulp van anderen nodig.\n\nLeidt, begeleidt."
       },
       "3": {
        "nl": "Merkt op wat leerlingen bezighoudt en weet dat te benutten; stemt af.\n\nHoudt zich staande bij  lastige leerlingen en situaties.\n\nLeidt, begeleidt, bouwt een band op en zet met succes leerlingen aan tot acties."
       },
       "4": {
        "nl": "Heeft goed zicht op wat leerlingen bezighoudt, en weet geregeld moeilijke leerlingen voor zich te winnen."
       }
      },
      "communicatingWithPupils": {
       "1": {
        "nl": "Communiceert moeizaam en luistert niet goed.\n\nIs eigen en andermans emoties niet de baas."
       },
       "2": {
        "nl": "Past aanwijzingen toe m.b.t. het tot stand brengen van communicatie met de klas en met de leerlingen.\n\nCommuniceert op inhoudsniveau.\n\nHoudt zich in, en weert (verbale) agressie af."
       },
       "3": {
        "nl": "Houdt in taalgebruik en manier van communiceren rekening met wat gebruikelijk is in de leefwereld van leerlingen.\n\nLuistert naar de leerlingen en reageert op hen.\n\nCommuniceert goed op inhoudsniveau.\n\nZet non-verbale communicatie in.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       },
       "4": {
        "nl": "Communiceert effectief, efficiënt en met empathie. \n\nCommuniceert goed op inhouds- en betrekkingsniveau.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       }
      },
      "creatingGoodAtmosphereForCooperation": {
       "1": {
        "nl": "Werkt vooral klassikaal; er is samenwerking tussen docent en individuele leerlingen. "
       },
       "2": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\nLaat merken dat hij/zij een goede samenwerking tussen leerlingen waardeert."
       },
       "3": {
        "nl": "Werkt samen met de klas; stimuleert samenwerking tussen de leerlingen. \nWerkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nMerkt op hoe de sociale verhoudingen liggen; zet zich in om deze zo nodig te verbeteren.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. "
       },
       "4": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. \n\nVerantwoordt hoe hij/zij met de (heterogene) groepen omgaat en ook met de individuele leerlingen.\n"
       }
      },
      "upholdingProceduresAndRules": {
       "1": {
        "nl": "Kent de schoolregels, en weet of/hoe docenten die handhaven.\n\nDoet pogingen tot gezag.\n\nIs oriënterend m.b.t. die aspecten van groeps- of klassenmanagement die voor zijn vorm van onderwijs relevant zijn. "
       },
       "2": {
        "nl": "Is duidelijk over afspraken en procedures; grijpt nog niet altijd in.\n\nPast de regels gedeeltelijk toe; soms wat overdreven ingrijpen.\n\nGezag wordt gedeeltelijk aanvaard.\n\nIs bekend met die aspecten van groeps- of klassenmanagement die voor zijn/haar vorm van onderwijs relevant zijn."
       },
       "3": {
        "nl": "Is duidelijk over afspraken en procedures.\n \nPast de regels toe.\n\nLeerlingen accepteren gezag. Is een enkele keer aarzelend in corrigeren.\n\nHanteert die aspecten van groeps- of klassenmanagement die voor zijn vorm van onderwijs relevant zijn."
       },
       "4": {
        "nl": "Het is duidelijk en vanzelfsprekend dat regels en procedures gehandhaafd worden; houdt zichzelf en de klas daar ook aan.\n\nGaat goed om met ordeproblemen;\ncorrigeert leerlingen op het juiste moment. \n\nIs, en toont zich leidinggevende. \n\nVerantwoordt zijn opvattingen, aanpak van groeps- of klassenmanagement en de organisatie van zijn onderwijs."
       }
      },
      "organisationOfTeachingProcess": {
       "1": {
        "nl": "Weet hoe vorm te geven aan het leerproces.\n\nPast dit nog niet toe."
       },
       "2": {
        "nl": "Heeft nog hulp nodig van begeleidend docent om het leerproces vorm te geven. \n\nZiet het verschil tussen orde en wanorde nog niet scherp genoeg."
       },
       "3": {
        "nl": "Laat les ordelijk verlopen. \n\nOndersteunt leeractiviteiten daarmee.\n\nHeeft werkvormen en leermiddelen ter ondersteuning van de leeractiviteiten paraat."
       },
       "4": {
        "nl": "Laat les ordelijk en gestructureerd verlopen.\n\nHeeft werkvormen en leermiddelen ter ondersteuning van de leeractiviteiten paraat. \n\nVerantwoordt zijn werkvormen en leermiddelen."
       }
      },
      "organisationOfTeachingEnvironment": {
       "1": {
        "nl": "Geeft opdrachten zonder doelen en verwachtingen.\n \nBereidt alleen eigen aandeel in de les voor.\n\nHeeft sporadisch overzicht tijdens de les."
       },
       "2": {
        "nl": "Geeft opdrachten zonder doelen óf verwachtingen.\n\nBereidt vooral eigen aandeel in de les voor, en summier dat van leerlingen. \n\nGebruikt enkele activiteiten en werkvormen. \n\nHeeft wisselend overzicht tijdens de les."
       },
       "3": {
        "nl": "Is meestal helder over doelen, taken en verwachtingen. \n\nBereidt leerling-activerende les voor, met eigen aandeel daarin.\n\n\nHeeft goed overzicht tijdens de les. \n\n\nGebruikt feedback van leerlingen om organisatie te verbeteren."
       },
       "4": {
        "nl": "Is glashelder over doelen, taken en verwachtingen.\n \nOrganiseert elk type les en onderwijsactiviteit goed en vlot. \n\nGebruikt een ruime  variatie in activiteiten en werkvormen. \n\nHeeft overzicht en anticipeert tijdens de les. \n\nWerkt soms in andere opstelling, of buiten het lokaal. \n\nIntroduceert nieuwe werkvormen en activiteiten in de school."
       }
      },
      "timeManagement": {
       "1": {
        "nl": "Onrealistisch en weinig flexibel in planning.\n \nOrganisatie-eenheid is de les."
       },
       "2": {
        "nl": "Redelijk realistisch maar gaat nog te rigide om met eigen planning. \n\nVerliest planning uit het oog.\n\nOrganisatie-eenheid is  hoofdstuk of onderwerp."
       },
       "3": {
        "nl": "Maakt een realistische planning;\nis flexibel in de omgang van de planning; informeert leerlingen over planning. \n\nKomt incidenteel in de problemen.\n\nHelpt leerlingen plannen.\n\nOrganisatie-eenheid is trimester of rapportperiode."
       },
       "4": {
        "nl": "Realistisch en flexibel in planning, ook van experimentele en complexe leerprocessen.\n\nGebruikt leertijd efficiënt.\n \nOrganisatie-eenheid is het cursusjaar.\n"
       }
      }
     },
     "isAllRowRequired": true
    },
    {
     "type": "comment",
     "name": "organisationalCompetenceCommentSelf",
     "title": {
      "nl": "Eigen commentaar"
     }
    },
    {
     "type": "comment",
     "name": "organisationalCompetenceCommentCoach",
     "title": {
      "nl": "Commentaar observator"
     }
    }
   ],
   "title": {
    "nl": "Organisatorisch competent"
   }
  },
  {
   "name": "competenceWhenWorkingWithColleaguesPage",
   "elements": [
    {
     "type": "matrix",
     "name": "competenceWhenWorkingWithColleagues",
     "title": {
      "nl": "Competent in het samenwerken met collega's"
     },
     "isRequired": true,
     "columns": [
      {
       "value": "1",
       "text": {
        "nl": "Niveau 1"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Niveau 2"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Niveau 3"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Niveau 4"
       }
      }
     ],
     "rows": [
      {
       "value": "sharingInformation",
       "text": {
        "nl": "Informatie delen met collega’s, overleg en samenwerken"
       }
      },
      {
       "value": "developmentsAndImprovementsAtSchool",
       "text": {
        "nl": "Ontwikkelen en verbeteren van de school"
       }
      },
      {
       "value": "settingBoundaries",
       "text": {
        "nl": "Grenzen stellen"
       }
      }
     ],
     "cells": {
      "interactingWithPupils": {
       "1": {
        "nl": "Heeft amper zicht op wat leerlingen bezighoudt. \n\nMijdt ongeïnteresseerde, lastige leerlingen; mijdt moeilijke situaties."
       },
       "2": {
        "nl": "Heeft enig zicht op wat leerlingen bezighoudt; weet dat af en toe te benutten.\n\nGaat lastige leerlingen en situaties wel aan, maar heeft daarbij hulp van anderen nodig.\n\nLeidt, begeleidt."
       },
       "3": {
        "nl": "Merkt op wat leerlingen bezighoudt en weet dat te benutten; stemt af.\n\nHoudt zich staande bij  lastige leerlingen en situaties.\n\nLeidt, begeleidt, bouwt een band op en zet met succes leerlingen aan tot acties."
       },
       "4": {
        "nl": "Heeft goed zicht op wat leerlingen bezighoudt, en weet geregeld moeilijke leerlingen voor zich te winnen."
       }
      },
      "communicatingWithPupils": {
       "1": {
        "nl": "Communiceert moeizaam en luistert niet goed.\n\nIs eigen en andermans emoties niet de baas."
       },
       "2": {
        "nl": "Past aanwijzingen toe m.b.t. het tot stand brengen van communicatie met de klas en met de leerlingen.\n\nCommuniceert op inhoudsniveau.\n\nHoudt zich in, en weert (verbale) agressie af."
       },
       "3": {
        "nl": "Houdt in taalgebruik en manier van communiceren rekening met wat gebruikelijk is in de leefwereld van leerlingen.\n\nLuistert naar de leerlingen en reageert op hen.\n\nCommuniceert goed op inhoudsniveau.\n\nZet non-verbale communicatie in.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       },
       "4": {
        "nl": "Communiceert effectief, efficiënt en met empathie. \n\nCommuniceert goed op inhouds- en betrekkingsniveau.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       }
      },
      "creatingGoodAtmosphereForCooperation": {
       "1": {
        "nl": "Werkt vooral klassikaal; er is samenwerking tussen docent en individuele leerlingen. "
       },
       "2": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\nLaat merken dat hij/zij een goede samenwerking tussen leerlingen waardeert."
       },
       "3": {
        "nl": "Werkt samen met de klas; stimuleert samenwerking tussen de leerlingen. \nWerkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nMerkt op hoe de sociale verhoudingen liggen; zet zich in om deze zo nodig te verbeteren.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. "
       },
       "4": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. \n\nVerantwoordt hoe hij/zij met de (heterogene) groepen omgaat en ook met de individuele leerlingen.\n"
       }
      },
      "upholdingProceduresAndRules": {
       "1": {
        "nl": "Kent de schoolregels, en weet of/hoe docenten die handhaven.\n\nDoet pogingen tot gezag.\n\nIs oriënterend m.b.t. die aspecten van groeps- of klassenmanagement die voor zijn vorm van onderwijs relevant zijn. "
       },
       "2": {
        "nl": "Is duidelijk over afspraken en procedures; grijpt nog niet altijd in.\n\nPast de regels gedeeltelijk toe; soms wat overdreven ingrijpen.\n\nGezag wordt gedeeltelijk aanvaard.\n\nIs bekend met die aspecten van groeps- of klassenmanagement die voor zijn/haar vorm van onderwijs relevant zijn."
       },
       "3": {
        "nl": "Is duidelijk over afspraken en procedures.\n \nPast de regels toe.\n\nLeerlingen accepteren gezag. Is een enkele keer aarzelend in corrigeren.\n\nHanteert die aspecten van groeps- of klassenmanagement die voor zijn vorm van onderwijs relevant zijn."
       },
       "4": {
        "nl": "Het is duidelijk en vanzelfsprekend dat regels en procedures gehandhaafd worden; houdt zichzelf en de klas daar ook aan.\n\nGaat goed om met ordeproblemen;\ncorrigeert leerlingen op het juiste moment. \n\nIs, en toont zich leidinggevende. \n\nVerantwoordt zijn opvattingen, aanpak van groeps- of klassenmanagement en de organisatie van zijn onderwijs."
       }
      },
      "organisationOfTeachingProcess": {
       "1": {
        "nl": "Weet hoe vorm te geven aan het leerproces.\n\nPast dit nog niet toe."
       },
       "2": {
        "nl": "Heeft nog hulp nodig van begeleidend docent om het leerproces vorm te geven. \n\nZiet het verschil tussen orde en wanorde nog niet scherp genoeg."
       },
       "3": {
        "nl": "Laat les ordelijk verlopen. \n\nOndersteunt leeractiviteiten daarmee.\n\nHeeft werkvormen en leermiddelen ter ondersteuning van de leeractiviteiten paraat."
       },
       "4": {
        "nl": "Laat les ordelijk en gestructureerd verlopen.\n\nHeeft werkvormen en leermiddelen ter ondersteuning van de leeractiviteiten paraat. \n\nVerantwoordt zijn werkvormen en leermiddelen."
       }
      },
      "organisationOfTeachingEnvironment": {
       "1": {
        "nl": "Geeft opdrachten zonder doelen en verwachtingen.\n \nBereidt alleen eigen aandeel in de les voor.\n\nHeeft sporadisch overzicht tijdens de les."
       },
       "2": {
        "nl": "Geeft opdrachten zonder doelen óf verwachtingen.\n\nBereidt vooral eigen aandeel in de les voor, en summier dat van leerlingen. \n\nGebruikt enkele activiteiten en werkvormen. \n\nHeeft wisselend overzicht tijdens de les."
       },
       "3": {
        "nl": "Is meestal helder over doelen, taken en verwachtingen. \n\nBereidt leerling-activerende les voor, met eigen aandeel daarin.\n\n\nHeeft goed overzicht tijdens de les. \n\n\nGebruikt feedback van leerlingen om organisatie te verbeteren."
       },
       "4": {
        "nl": "Is glashelder over doelen, taken en verwachtingen.\n \nOrganiseert elk type les en onderwijsactiviteit goed en vlot. \n\nGebruikt een ruime  variatie in activiteiten en werkvormen. \n\nHeeft overzicht en anticipeert tijdens de les. \n\nWerkt soms in andere opstelling, of buiten het lokaal. \n\nIntroduceert nieuwe werkvormen en activiteiten in de school."
       }
      },
      "timeManagement": {
       "1": {
        "nl": "Onrealistisch en weinig flexibel in planning.\n \nOrganisatie-eenheid is de les."
       },
       "2": {
        "nl": "Redelijk realistisch maar gaat nog te rigide om met eigen planning. \n\nVerliest planning uit het oog.\n\nOrganisatie-eenheid is  hoofdstuk of onderwerp."
       },
       "3": {
        "nl": "Maakt een realistische planning;\nis flexibel in de omgang van de planning; informeert leerlingen over planning. \n\nKomt incidenteel in de problemen.\n\nHelpt leerlingen plannen.\n\nOrganisatie-eenheid is trimester of rapportperiode."
       },
       "4": {
        "nl": "Realistisch en flexibel in planning, ook van experimentele en complexe leerprocessen.\n\nGebruikt leertijd efficiënt.\n \nOrganisatie-eenheid is het cursusjaar.\n"
       }
      },
      "default": {
       "3": {
        "nl": "\n\nProbeert collega’s tot steun te zijn, toont betrokkenheid bij de school of het team."
       }
      },
      "sharingInformation": {
       "1": {
        "nl": "Heeft vrijwel alleen contact met zijn directe collega's.\n\nStemt werkzaamheden nog niet af met collega’s; wacht af of collega’s informatie delen.\n\nLoopt (observerend) mee in het team."
       },
       "2": {
        "nl": "Wisselt soms informatie uit met collega’s.\n\nMaakt gebruik van informatie van collega’s.\n\nIs passief lid van het team."
       },
       "3": {
        "nl": "Zoekt actief naar uitwisseling met collega’s om eigen lessen te optimaliseren.\n\nDeelt informatie, en maakt gebruik van informatie van collega’s; stemt werkzaamheden af. \n\nLevert een bijdrage aan verschillende vormen van overleg en samenwerken op school.\n\nIs actief lid van het team. "
       },
       "4": {
        "nl": "Wisselt structureel ervaringen uit met collega’s gericht op verdere wederzijdse professionalisering. \n\nLevert een constructieve bijdrage aan verschillende vormen van overleg en samenwerken op school.\n\nNeemt actief deel aan en initieert overleg.\n\nHeeft een gemakkelijk toegankelijke administratie en registratie van leerlinggegevens. \n\nIs collega’s tot steun, toont betrokkenheid bij school en team."
       }
      },
      "developmentsAndImprovementsAtSchool": {
       "1": {
        "nl": "Is niet bekend met ontwikkelingen binnen de school."
       },
       "2": {
        "nl": "Weet van ontwikkelingen binnen de school.\n \nHoudt ontwikkelingen actief in de gaten."
       },
       "3": {
        "nl": "Is op de hoogte van ontwikkelingen en projecten op de school.\n\nPast de bevindingen daaruit toe in de lespraktijk.\n\nLevert een bijdrage aan verbeteringen in de school."
       },
       "4": {
        "nl": "Werkt met collega’s (onderzoeksmatig) samen aan de ontwikkeling en verbetering van zijn school.\n\nInitieert en levert een bijdrage aan verbeteringen in de school. \n\nIs op de hoogte van modellen voor kwaliteitszorg en methodieken voor onderwijsverbetering en schoolontwikkeling."
       }
      },
      "settingBoundaries": {
       "1": {
        "nl": "Ondergaat werkdruk zonder grenzen aan te geven."
       },
       "2": {
        "nl": "Probeert grenzen van tijd en betrokkenheid af te bakenen."
       },
       "3": {
        "nl": "Geeft grenzen van tijd en betrokkenheid aan."
       },
       "4": {
        "nl": "Geeft grenzen van tijd en betrokkenheid aan.\n\nSpreekt de organisatie aan op verantwoordelijkheid naar haar werknemers."
       }
      }
     },
     "isAllRowRequired": true
    },
    {
     "type": "comment",
     "name": "competenceWhenWorkingWithColleaguesCommentSelf",
     "title": {
      "nl": "Eigen commentaar"
     }
    },
    {
     "type": "comment",
     "name": "competenceWhenWorkingWithColleaguesCommentCoach",
     "title": {
      "nl": "Commentaar observator"
     }
    }
   ],
   "title": {
    "nl": "Competent in het samenwerken met collega’s"
   }
  },
  {
   "name": "competenceInWorkingWithTheEnvironmentPage",
   "elements": [
    {
     "type": "matrix",
     "name": "competenceInWorkingWithTheEnvironment",
     "title": {
      "nl": "Competent in het samenwerken met de omgeving"
     },
     "isRequired": true,
     "columns": [
      {
       "value": "1",
       "text": {
        "nl": "Niveau 1"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Niveau 2"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Niveau 3"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Niveau 4"
       }
      }
     ],
     "rows": [
      {
       "value": "sharingInformationWithParents",
       "text": {
        "nl": "Informatie uitwisselen met ouders"
       }
      },
      {
       "value": "outsideActivities",
       "text": {
        "nl": "Binnen- en buitenschools leren afstemmen (bijvoorbeeld opdrachten, excursies, stages)"
       }
      },
      {
       "value": "effectiveCommunicationWithEnvironment",
       "text": {
        "nl": "Doelmatig contact met de omgeving"
       }
      }
     ],
     "cells": {
      "interactingWithPupils": {
       "1": {
        "nl": "Heeft amper zicht op wat leerlingen bezighoudt. \n\nMijdt ongeïnteresseerde, lastige leerlingen; mijdt moeilijke situaties."
       },
       "2": {
        "nl": "Heeft enig zicht op wat leerlingen bezighoudt; weet dat af en toe te benutten.\n\nGaat lastige leerlingen en situaties wel aan, maar heeft daarbij hulp van anderen nodig.\n\nLeidt, begeleidt."
       },
       "3": {
        "nl": "Merkt op wat leerlingen bezighoudt en weet dat te benutten; stemt af.\n\nHoudt zich staande bij  lastige leerlingen en situaties.\n\nLeidt, begeleidt, bouwt een band op en zet met succes leerlingen aan tot acties."
       },
       "4": {
        "nl": "Heeft goed zicht op wat leerlingen bezighoudt, en weet geregeld moeilijke leerlingen voor zich te winnen."
       }
      },
      "communicatingWithPupils": {
       "1": {
        "nl": "Communiceert moeizaam en luistert niet goed.\n\nIs eigen en andermans emoties niet de baas."
       },
       "2": {
        "nl": "Past aanwijzingen toe m.b.t. het tot stand brengen van communicatie met de klas en met de leerlingen.\n\nCommuniceert op inhoudsniveau.\n\nHoudt zich in, en weert (verbale) agressie af."
       },
       "3": {
        "nl": "Houdt in taalgebruik en manier van communiceren rekening met wat gebruikelijk is in de leefwereld van leerlingen.\n\nLuistert naar de leerlingen en reageert op hen.\n\nCommuniceert goed op inhoudsniveau.\n\nZet non-verbale communicatie in.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       },
       "4": {
        "nl": "Communiceert effectief, efficiënt en met empathie. \n\nCommuniceert goed op inhouds- en betrekkingsniveau.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       }
      },
      "creatingGoodAtmosphereForCooperation": {
       "1": {
        "nl": "Werkt vooral klassikaal; er is samenwerking tussen docent en individuele leerlingen. "
       },
       "2": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\nLaat merken dat hij/zij een goede samenwerking tussen leerlingen waardeert."
       },
       "3": {
        "nl": "Werkt samen met de klas; stimuleert samenwerking tussen de leerlingen. \nWerkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nMerkt op hoe de sociale verhoudingen liggen; zet zich in om deze zo nodig te verbeteren.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. "
       },
       "4": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. \n\nVerantwoordt hoe hij/zij met de (heterogene) groepen omgaat en ook met de individuele leerlingen.\n"
       }
      },
      "sharingInformationWithParents": {
       "1": {
        "nl": "Weet hoe het contact met ouders verloopt binnen de regels, normen en waarden van school. "
       },
       "2": {
        "nl": "Observeert contact met ouders (bv ouderavond). \n\nGeeft en krijgt de informatie van ouders (bv ouderavond) binnen de regels, normen en waarden van school.\n\nIs zich bewust van ieders verantwoordelijkheid en bijdrage m.b.t  het leren binnen en buiten de school."
       },
       "3": {
        "nl": "Neemt indien nodig contact op met ouders binnen de regels, normen en waarden van school. \nGebruikt de informatie die hij van hen krijgt.\n\nMaakt ieders verantwoordelijkheid en bijdrage duidelijk m.b.t. het leren binnen en buiten de school.\n\nNeemt deel aan verschillende vormen van overleg met mensen en instellingen buiten de school."
       },
       "4": {
        "nl": "Geeft op professionele manier informatie over de leerlingen aan ouders en andere belanghebbenden. Maakt relevant gebruik van de informatie die hij van hen krijgt. Zorgt in overleg met de leerling en andere betrokkenen voor afstemming tussen het leren in en buiten de school en voor duidelijkheid over ieders verantwoordelijkheid en bijdrage hierin. Neemt op een constructieve manier deel aan verschillende vormen van overleg met mensen en instellingen buiten de school.\nVerantwoordt zijn professionele opvattingen en werkwijze met betrekking tot een leerling aan ouders en andere belanghebbenden en past in gezamenlijk overleg zo nodig zijn werk met die leerling aan."
       }
      },
      "outsideActivities": {
       "1": {
        "nl": "Is nauwelijks op de hoogte van mogelijkheden van leren die buiten de les kunnen plaatsvinden."
       },
       "2": {
        "nl": "Begeleidt bij (vakoverstijgende) activiteiten buiten de les. \n\nBegeleidt bij buitenschoolse activiteiten."
       },
       "3": {
        "nl": "Helpt bij het organiseren van leeractiviteiten buiten de les, en buitenschools. "
       },
       "4": {
        "nl": "Initieert en organiseert activiteiten buiten de les, en past dit ook actief toe in het onderwijs.\n\nInitieert en organiseert buitenschoolse activiteiten en past dit ook actief toe in het onderwijs."
       }
      },
      "effectiveCommunicationWithEnvironment": {
       "1": {
        "nl": "Schrikt terug voor contact met de omgeving.\n\nLevert als gesprekspartner nog nauwelijks constructieve bijdragen."
       },
       "2": {
        "nl": "Afwachtend in contact met de omgeving; raadpleegt deskundigen over procedures van de school.\n\nLevert als gesprekspartner soms constructieve bijdragen."
       },
       "3": {
        "nl": "Toont initiatief in contact met de omgeving; past procedures van de school zelfstandig toe.\n\nLevert als gesprekspartner geregeld constructieve bijdragen; bereidt zich geregeld voor op belangrijke gesprekken en overlegsituaties.\n\nPoogt culturele verschillen te overbruggen  o.m. door respect te tonen."
       },
       "4": {
        "nl": "Initiatiefrijk in contact met de omgeving, past procedures van de school zelfstandig toe en ontwikkelt nieuwe. \n\nLevert als gesprekspartner geregeld constructieve bijdragen; bereidt zich steevast voor op belangrijke gesprekken en overlegsituaties\n\nTreedt op als effectieve mediator bij moeilijke contacten.\n\nPoogt culturele verschillen te overbruggen o.m. door respect te tonen en respect te oogsten.\n\nTreedt op als woordvoerder voor de school."
       }
      }
     },
     "isAllRowRequired": true
    },
    {
     "type": "comment",
     "name": "competenceInWorkingWithTheEnvironmentCommentSelf",
     "title": {
      "nl": "Eigen commentaar"
     }
    },
    {
     "type": "comment",
     "name": "competenceInWorkingWithTheEnvironmentCommentCoach",
     "title": {
      "nl": "Commentaar observator"
     }
    }
   ],
   "title": {
    "nl": "Competent in het samenwerken met de omgeving"
   }
  },
  {
   "name": "competenceInReflectionAndPersonalDevelopmentPage",
   "elements": [
    {
     "type": "matrix",
     "name": "competenceInReflectionAndPersonalDevelopment",
     "title": {
      "nl": "Competent in reflectie en zelfontwikkeling"
     },
     "isRequired": true,
     "columns": [
      {
       "value": "1",
       "text": {
        "nl": "Niveau 1"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Niveau 2"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Niveau 3"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Niveau 4"
       }
      }
     ],
     "rows": [
      {
       "value": "feedback",
       "text": {
        "nl": "Feedback vragen en gebruiken"
       }
      },
      {
       "value": "professionalDevelopment",
       "text": {
        "nl": "Werken aan vakinhoudelijke ontwikkeling"
       }
      },
      {
       "value": "didacticDevelopment",
       "text": {
        "nl": "Werken aan vakdidactische ontwikkeling"
       }
      },
      {
       "value": "developingClassManagement",
       "text": {
        "nl": "Werken aan ontwikkeling in klassenmanagement"
       }
      },
      {
       "value": "adaptingBehaviour",
       "text": {
        "nl": "Gedrag aanpassen aan team en school"
       }
      }
     ],
     "cells": {
      "interactingWithPupils": {
       "1": {
        "nl": "Heeft amper zicht op wat leerlingen bezighoudt. \n\nMijdt ongeïnteresseerde, lastige leerlingen; mijdt moeilijke situaties."
       },
       "2": {
        "nl": "Heeft enig zicht op wat leerlingen bezighoudt; weet dat af en toe te benutten.\n\nGaat lastige leerlingen en situaties wel aan, maar heeft daarbij hulp van anderen nodig.\n\nLeidt, begeleidt."
       },
       "3": {
        "nl": "Merkt op wat leerlingen bezighoudt en weet dat te benutten; stemt af.\n\nHoudt zich staande bij  lastige leerlingen en situaties.\n\nLeidt, begeleidt, bouwt een band op en zet met succes leerlingen aan tot acties."
       },
       "4": {
        "nl": "Heeft goed zicht op wat leerlingen bezighoudt, en weet geregeld moeilijke leerlingen voor zich te winnen."
       }
      },
      "communicatingWithPupils": {
       "1": {
        "nl": "Communiceert moeizaam en luistert niet goed.\n\nIs eigen en andermans emoties niet de baas."
       },
       "2": {
        "nl": "Past aanwijzingen toe m.b.t. het tot stand brengen van communicatie met de klas en met de leerlingen.\n\nCommuniceert op inhoudsniveau.\n\nHoudt zich in, en weert (verbale) agressie af."
       },
       "3": {
        "nl": "Houdt in taalgebruik en manier van communiceren rekening met wat gebruikelijk is in de leefwereld van leerlingen.\n\nLuistert naar de leerlingen en reageert op hen.\n\nCommuniceert goed op inhoudsniveau.\n\nZet non-verbale communicatie in.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       },
       "4": {
        "nl": "Communiceert effectief, efficiënt en met empathie. \n\nCommuniceert goed op inhouds- en betrekkingsniveau.\n\nGeeft en wekt vertrouwen, en bezweert agressie."
       }
      },
      "creatingGoodAtmosphereForCooperation": {
       "1": {
        "nl": "Werkt vooral klassikaal; er is samenwerking tussen docent en individuele leerlingen. "
       },
       "2": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\nLaat merken dat hij/zij een goede samenwerking tussen leerlingen waardeert."
       },
       "3": {
        "nl": "Werkt samen met de klas; stimuleert samenwerking tussen de leerlingen. \nWerkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nMerkt op hoe de sociale verhoudingen liggen; zet zich in om deze zo nodig te verbeteren.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. "
       },
       "4": {
        "nl": "Werkt samen met de klas; zorgt ervoor dat leerlingen rekening houden met elkaar.\n\nZet groepswerk in; zorgt ervoor dat leerlingen onderling samenwerken. \n\nVerantwoordt hoe hij/zij met de (heterogene) groepen omgaat en ook met de individuele leerlingen.\n"
       }
      },
      "feedback": {
       "1": {
        "nl": "Gebruikt feedback nauwelijks. "
       },
       "2": {
        "nl": "Herkent en staat open voor commentaar van leerlingen en collega's, maar weet die feedback niet te gebruiken."
       },
       "3": {
        "nl": "Herkent en staat open voor commentaar van leerlingen en collega's en onderneemt actie in overeenstemming daarmee."
       },
       "4": {
        "nl": "Vraagt met regelmaat en systematisch om feedback en benut die voor het ontwikkelen van het eigen handelen."
       }
      },
      "professionalDevelopment": {
       "1": {
        "nl": "Beschrijft en benoemt de te onderwijzen stof."
       },
       "2": {
        "nl": "Identificeert bij zichzelf sterke en zwakke punten, maar weet daar nog geen praktische consequenties aan te verbinden."
       },
       "3": {
        "nl": "Weet bij zichzelf met regelmaat zwakke en sterke punten te identificeren; werkt aan verbetering van zwaktes en uitbouwen van sterktes. "
       },
       "4": {
        "nl": "Werkt voortdurend en systematisch aan het identificeren van eigen sterktes en zwaktes, en het verbinden van praktische consequenties daaraan. "
       }
      },
      "didacticDevelopment": {
       "1": {
        "nl": "Beschrijft en benoemt lesvormen / didactische aspecten. "
       },
       "2": {
        "nl": "Identificeert bij zichzelf sterke en zwakke punten, maar weet daar nog geen praktische consequenties aan te verbinden."
       },
       "3": {
        "nl": "Weet bij zichzelf met regelmaat zwakke en sterke punten te identificeren; werkt aan verbetering van zwaktes en uitbouwen van sterktes."
       },
       "4": {
        "nl": "Werkt voortdurend en systematisch aan het identificeren van sterktes en zwaktes, en het verbinden van praktische consequenties daaraan."
       }
      },
      "developingClassManagement": {
       "1": {
        "nl": "Is zich bewust van ordeproblemen als die zich voordoen."
       },
       "2": {
        "nl": "Identificeert bij zichzelf sterke en zwakke punten, maar weet daar nog geen praktische consequenties aan te verbinden."
       },
       "3": {
        "nl": "Weet bij zichzelf met regelmaat zwakke en sterke punten te identificeren; werkt aan verbetering van zwaktes en uitbouwen van sterktes. "
       },
       "4": {
        "nl": "Werkt voortdurend en systematisch aan het identificeren van sterktes en zwaktes, en het verbinden van praktische consequenties daaraan."
       }
      },
      "adaptingBehaviour": {
       "1": {
        "nl": "Benoemt de regels van de school. "
       },
       "2": {
        "nl": "Benoemt de regels van de school.\n\nBenoemt de verwachtingen \nvan het team (sectie, afdeling, school). "
       },
       "3": {
        "nl": "Benoemt de regels van de school.\n\nBenoemt de verwachtingen \nvan het team (sectie, afdeling, school).\n\nWeet zijn/haar gedrag daar in veel gevallen op aan te passen."
       },
       "4": {
        "nl": "Weet wat er verwacht wordt, beoordeelt het eigen handelen systematisch in dat licht, en past dat zo nodig aan. "
       }
      }
     },
     "isAllRowRequired": true
    },
    {
     "type": "comment",
     "name": "competenceInReflectionAndPersonalDevelopmentCommentSelf",
     "title": {
      "nl": "Eigen commentaar"
     }
    },
    {
     "type": "comment",
     "name": "competenceInReflectionAndPersonalDevelopmentCommentCoach",
     "title": {
      "nl": "Commentaar observator"
     }
    }
   ],
   "title": {
    "nl": "Competent in reflectie en ontwikkeling"
   }
  },
  {
   "name": "actionItems",
   "elements": [
    {
     "type": "text",
     "name": "coach",
     "title": {
      "nl": "Naam observator"
     },
     "isRequired": true
    },
    {
     "type": "text",
     "name": "place",
     "title": {
      "nl": "Plaats en datum van het beoordelingsgesprek"
     },
     "isRequired": true
    },
    {
     "type": "paneldynamic",
     "name": "actions",
     "title": {
      "nl": "Actie punten"
     },
     "templateElements": [
      {
       "type": "text",
       "name": "dueDate",
       "width": "20%",
       "startWithNewLine": false,
       "title": {
        "nl": "Vervaldatum"
       },
       "inputType": "date"
      },
      {
       "type": "text",
       "name": "actionItem",
       "width": "30%",
       "startWithNewLine": false,
       "title": {
        "nl": "Actie punt"
       }
      },
      {
       "type": "text",
       "name": "hyperlink",
       "width": "30%",
       "startWithNewLine": false,
       "title": {
        "nl": "Hyperlink"
       },
       "inputType": "url"
      },
      {
       "type": "boolean",
       "name": "isDone",
       "width": "20%",
       "startWithNewLine": false,
       "title": {
        "nl": "Klaar"
       },
       "defaultValue": "false"
      }
     ],
     "panelCount": 3,
     "minPanelCount": 3,
     "panelAddText": {
      "nl": "Voeg actiepunt toe"
     },
     "panelRemoveText": {
      "nl": "Verwijder actiepunt"
     }
    }
   ],
   "title": {
    "nl": "Actie punten"
   }
  }
 ],
 "showTitle": true,
 "showQuestionNumbers": "off"
};

survey.podd = {
 "locale": "nl",
 "title": {
  "nl": "Pillars Overzicht Digitale Deskundigheid"
 },
 "logo": {
  "nl": "https://pillars.school/wp-content/uploads/2020/07/pillars-podd-logo_1.png"
 },
 "logoWidth": 120,
 "logoHeight": 120,
 "logoPosition": "right",
 "pages": [
  {
   "name": "START",
   "elements": [
    {
     "type": "image",
     "name": "logo",
     "width": "30%",
     "minWidth": "300",
     "maxWidth": "",
     "imageLink": "https://pillars.school/wp-content/uploads/2020/07/Survey-Pillars-01.png",
     "imageFit": "cover",
     "imageHeight": 175,
     "imageWidth": 175
    },
    {
     "type": "html",
     "name": "welcomeMessage",
     "width": "70%",
     "minWidth": "300",
     "startWithNewLine": false,
     "html": {
      "nl": "<h3>Plan jouw digitale groei met Pillars </h3>\n<p>Deze vragenlijst geeft leraren inzicht in alle onderdelen van digitale deskundigheid in het onderwijs. De vragen zijn een mix van zelfbeoordelingen en kennisvragen.</p>\n<p>Na het invullen van de vragen krijg je een overzicht van jouw score op ieder deelgebied. Je kunt met deze uitslag direct een plan van aanpak opstellen.</p>\n<p>Het invullen van deze vragenlijst duurt ongeveer 30 minuten. Je kunt tussendoor stoppen en op een later moment verdergaan.</p>"
     }
    }
   ],
   "title": {
    "nl": "Welkom"
   }
  },
  {
   "name": "PROFILE1",
   "elements": [
    {
     "type": "text",
     "name": "firstName",
     "title": {
      "nl": "Voornaam"
     },
     "isRequired": true,
     "isprofilequestion": true
    },
    {
     "type": "text",
     "name": "lastName",
     "startWithNewLine": false,
     "title": {
      "nl": "Achternaam"
     },
     "isRequired": true,
     "isprofilequestion": true
    },
    {
     "type": "text",
     "name": "username",
     "title": {
      "nl": "Email"
     },
     "isRequired": true,
     "isprofilequestion": true,
     "inputType": "email"
    },
    {
     "type": "text",
     "name": "job",
     "startWithNewLine": false,
     "title": {
      "nl": "Functie"
     },
     "isRequired": true,
     "isprofilequestion": true
    },
    {
     "type": "boolean",
     "name": "isSecondarySchool",
     "title": {
      "nl": "Type onderwijs?"
     },
     "defaultValue": "false",
     "isRequired": true,
     "labelTrue": {
      "nl": "Voortgezet Onderwijs"
     },
     "labelFalse": {
      "nl": "Primair Onderwijs"
     },
     "valueTrue": "Middelbaar",
     "valueFalse": "Basis"
    },
    {
     "type": "boolean",
     "name": "isTeacher",
     "startWithNewLine": false,
     "title": {
      "nl": "Heb jij lesgevende taken?"
     },
     "isRequired": true,
     "isprofilequestion": true,
     "labelTrue": {
      "nl": "Ja"
     },
     "labelFalse": {
      "nl": "Nee"
     }
    },
    {
     "type": "boolean",
     "name": "publicProfile",
     "title": {
      "nl": "Ik geef schoolleiding inzage in mijn testresultaten en profielinformatie"
     },
     "description": {
      "nl": "Geen toestemming betekent dat de schoolleiding geen inzage heeft in jouw individuele testresultaten en profiel. Resultaten tellen wel mee voor totale score school/bestuur."
     },
     "defaultValue": "true",
     "isRequired": true,
     "isprofilequestion": true,
     "labelTrue": {
      "nl": "Ja"
     },
     "labelFalse": {
      "nl": "Nee"
     }
    },
    {
     "type": "boolean",
     "name": "additionalInfo",
     "startWithNewLine": false,
     "title": {
      "nl": "Extra informatie geven over jezelf"
     },
     "description": {
      "nl": "Je kunt extra informatie geven over jezelf en je voorkeuren. Dit kan de schoolleiding helpen om de resultaten te analyzeren."
     },
     "defaultValue": "true",
     "isRequired": true,
     "labelTrue": {
      "nl": "Ja"
     },
     "labelFalse": {
      "nl": "Nee"
     }
    }
   ],
   "title": {
    "nl": "Profielvragen"
   },
   "description": {
    "nl": "Profielvragen worden automatisch bijgewerkt bij bestaand account"
   }
  },
  {
   "name": "PROFILE2",
   "elements": [
    {
     "type": "checkbox",
     "name": "gradeLevelGroup",
     "title": {
      "nl": "Bouw"
     },
     "isprofilequestion": true,
     "choices": [
      "Onderbouw",
      "Middenbouw",
      "Bovenbouw"
     ]
    },
    {
     "type": "radiogroup",
     "name": "gender",
     "startWithNewLine": false,
     "title": {
      "nl": "Geslacht"
     },
     "isprofilequestion": true,
     "choices": [
      {
       "value": "M",
       "text": {
        "nl": "Man"
       }
      },
      {
       "value": "V",
       "text": {
        "nl": "Vrouw"
       }
      },
      {
       "value": "GN",
       "text": {
        "nl": "Genderneutraal"
       }
      }
     ]
    },
    {
     "type": "datepicker",
     "name": "dateOfBirth",
     "startWithNewLine": false,
     "title": {
      "nl": "Geboortedatum"
     },
     "isprofilequestion": true
    },
    {
     "type": "dropdown",
     "name": "technologyAdoption",
     "title": {
      "nl": "Digitale technologieën"
     },
     "description": {
      "nl": "Welke beschrijving is het meest op jou van toepassing bij het gebruik van nieuwe digitale technologieën (applicaties, websites, digitale tools)?"
     },
     "isprofilequestion": true,
     "choices": [
      {
       "value": "0",
       "text": {
        "nl": "Ik gebruik ze liever niet"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Ik wacht liever even af voordat ik deze technologieën ga gebruiken"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik gebruik ze alleen als ik duidelijke voordelen zie en doe dit in hetzelfde tempo als mijn collega's"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik probeer nieuwe technologieën uit zodra ik een paar keer heb gehoord dat een nieuwe tool handig is"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik volg alle ontwikkelingen, doe mee met testfases/ontwikkeling van tools, ik loop voorop in gebruik en help met het invoeren"
       }
      }
     ]
    },
    {
     "type": "dropdown",
     "name": "hardwareAdoption",
     "title": {
      "nl": "Nieuwe hardware"
     },
     "description": {
      "nl": "Welke beschrijving is het meest op jou van toepassing bij het gebruik van nieuwe hardware (mobiele telefoons, tablets, computers)?"
     },
     "isprofilequestion": true,
     "choices": [
      {
       "value": "0",
       "text": {
        "nl": "Ik gebruik liever geen (nieuwe) hardware"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Ik wacht liever even af voordat ik nieuwe hardware ga gebruiken"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik gebruik nieuwe hardware alleen als ik duidelijke voordelen zie en loop daarmee in de pas met de meeste van mijn collega's"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik gebruik vrij vaak nieuwe hardware en ik word enthousiast van nieuwe telefoons, tablets en computers"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik sta vooraan in de rij als er nieuwe mobiele telefoons, tablets of computers uitgebracht worden en ik volg alle ontwikkelingen op dit gebied"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "softwarePreference",
     "title": {
      "nl": "Voorkeur standaard kantoortoepassingen"
     },
     "description": {
      "nl": "Welke leverancier van standaard kantoortoepassingen heeft jouw voorkeur voor schoolwerk?"
     },
     "isprofilequestion": true,
     "choices": [
      {
       "value": "microsoft",
       "text": {
        "nl": "Microsoft Office365 (Word, Excel, Powerpoint)"
       }
      },
      {
       "value": "google",
       "text": {
        "nl": "Google G-Suite (Docs, Sheets, Presentaties)"
       }
      },
      {
       "value": "apple",
       "text": {
        "nl": "Apple iWorks (Pages, Numbers, Keynote)"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "hardwarePreference",
     "title": {
      "nl": "Voorkeur school device"
     },
     "description": {
      "nl": "Welk device heeft jouw voorkeur voor schoolwerk?"
     },
     "isprofilequestion": true,
     "choices": [
      {
       "value": "tablet",
       "text": {
        "nl": "Tablet"
       }
      },
      {
       "value": "chromebook",
       "text": {
        "nl": "Chromebook"
       }
      },
      {
       "value": "laptop",
       "text": {
        "nl": "Laptop"
       }
      },
      {
       "value": "desktop",
       "text": {
        "nl": "Desktop"
       }
      }
     ]
    },
    {
     "type": "matrix",
     "name": "feedbackSchool",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Beoordeel jouw school op digitaal gebied. Bij ons op school is/zijn er:\n"
     },
     "description": {
      "nl": "O = Onvoldoende, M = Matig, V = Voldoende, G = Goed"
     },
     "isRequired": true,
     "subject": "WSC",
     "topic": "DVE",
     "columns": [
      "O",
      "M",
      "V",
      "G"
     ],
     "rows": [
      {
       "value": "1",
       "text": {
        "nl": "Hardware (laptop, desktop, tablet enz)"
       }
      },
      {
       "value": "2",
       "text": {
        "nl": "Digitale leermiddelen"
       }
      },
      {
       "value": "3",
       "text": {
        "nl": "Internet"
       }
      },
      {
       "value": "4",
       "text": {
        "nl": "Wifi"
       }
      },
      {
       "value": "5",
       "text": {
        "nl": "Technische ondersteuning/hulp "
       }
      },
      {
       "value": "6",
       "text": {
        "nl": "Aandacht /tijd van leraren voor digitale technologieën"
       }
      },
      {
       "value": "7",
       "text": {
        "nl": "Digitale kennis leraren"
       }
      },
      {
       "value": "8",
       "text": {
        "nl": "Digitale kennis leerlingen"
       }
      }
     ],
     "isAllRowRequired": true
    },
    {
     "type": "comment",
     "name": "feedbackCommentSchool",
     "title": {
      "nl": "Jouw feedback op digitaal gebied op school"
     },
     "description": {
      "nl": "Geef aub aan hoe de school zich op digitaal gebied kan verbeteren"
     }
    }
   ],
   "visibleIf": "{additionalInfo} = true",
   "title": {
    "nl": "Extra informatie"
   }
  },
  {
   "name": "DGIB1",
   "elements": [
    {
     "type": "imagepicker",
     "name": "1DGIB-APPA",
     "title": {
      "default": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
      "nl": "Weet je wat deze apparaten doen en kun je ermee werken?"
     },
     "description": {
      "nl": "Beoordeel je kennis van 1 ster tot 4 sterren\n"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "IB",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Ik gebruik nooit een tekstverwerker",
        "nl": "mobiele telefoon, tablet, computer, laptop"
       },
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGIN-APPA_A.png"
      },
      {
       "value": "2",
       "text": {
        "default": "Ik kan alleen tekst schrijven",
        "nl": "+ printer, digibord, beamer, wifi router, modem"
       },
       "score": 50,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGIB-APPAv2_b-nieuw.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "+ LAN netwerk, access point, firewall "
       },
       "score": 75,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGIN-APPA_C.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "+ server, processor, SSD, RAM"
       },
       "score": 100,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGIN-APPA_D.png"
      }
     ],
     "colCount": 2,
     "imageHeight": 240,
     "imageWidth": 320,
     "showLabel": true
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (1/9)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIB2",
   "elements": [
    {
     "type": "imagepicker",
     "name": "2DGIB-TKST",
     "title": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
     "description": {
      "nl": "Beoordeel je kennis van 1 ster tot 4 sterren"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "IB",
     "minscore": 75,
     "choices": [
      {
       "value": "1",
       "text": "Ik gebruik nooit een tekstverwerker",
       "score": 0,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/2DGIB-TKST_a.png"
      },
      {
       "value": "2",
       "text": "Ik kan alleen tekst schrijven",
       "score": 50,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/2DGIB-TKST_b.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "Opgemaakte tekst schrijven (onderstreept, vet)"
       },
       "score": 75,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/2DGIB-TKST_c.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "Werkstuk maken (inhoudsopgave, tabel, afbeeldingen)"
       },
       "score": 100,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/2DGIB-TKST_d.png"
      }
     ],
     "colCount": 2,
     "imageHeight": 240,
     "imageWidth": 320,
     "showLabel": true
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (2/9)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIB3",
   "elements": [
    {
     "type": "imagepicker",
     "name": "3DGIB-SPRDSH",
     "title": {
      "default": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
      "nl": "Wat kun jij met een spreadsheet (Excel / Google sheets / Numbers)?"
     },
     "description": {
      "nl": "Beoordeel je kennis van 1 ster tot 4 sterren"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "IB",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Ik gebruik nooit een tekstverwerker",
        "nl": "Ik gebruik nooit een spreadsheet"
       },
       "score": 0,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/3DGIB-SPRDSH_a.png"
      },
      {
       "value": "2",
       "text": {
        "default": "Ik kan alleen tekst schrijven",
        "nl": "Ik kan een lijst maken in een platte tabel"
       },
       "score": 50,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/3DGIB-SPRDSH_b.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "Nette tabel met kopjes, getallen, formule SOM"
       },
       "score": 75,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/3DGIB-SPRDSH_c.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "Ik kan een draaitabel met grafiek, VLOOKUP"
       },
       "score": 100,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/3DGIB-SPRDSH_d.png"
      }
     ],
     "colCount": 2,
     "imageHeight": 240,
     "imageWidth": 320,
     "showLabel": true
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (3/9)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIB4",
   "elements": [
    {
     "type": "imagepicker",
     "name": "4DGIB-PRES",
     "title": {
      "default": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
      "nl": "Wat kun jij met een presentatie (Powerpoint / Google presentaties / Prezi)?"
     },
     "description": {
      "nl": "Beoordeel je kennis van 1 ster tot 4 sterren"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "IB",
     "minscore": 75,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Ik gebruik nooit een tekstverwerker",
        "nl": "ik gebruik nooit presentatie software"
       },
       "score": 0,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/4DGIB-PRES_a.png"
      },
      {
       "value": "2",
       "text": {
        "default": "Ik kan alleen tekst schrijven",
        "nl": "Ik kan een presentatie maken met diverse dia's met tekst"
       },
       "score": 50,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/4DGIB-PRES_b.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "Presentatie met diverse dia's met tekst, foto's en filmpjes"
       },
       "score": 75,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/4DGIB-PRES_c.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "Presentatie met overgangen, thema's en animaties"
       },
       "score": 100,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/4DGIB-PRES_d.png"
      }
     ],
     "colCount": 2,
     "imageHeight": 240,
     "imageWidth": 320,
     "showLabel": true
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (4/9)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIB5",
   "elements": [
    {
     "type": "imagepicker",
     "name": "5DGIB-DOCS",
     "title": {
      "default": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
      "nl": "Hoe goed kun jij documenten opslaan en delen?\n"
     },
     "description": {
      "nl": "Beoordeel je kennis van 1 ster tot 4 sterren"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "IB",
     "minscore": 75,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Ik gebruik nooit een tekstverwerker",
        "nl": "Ik sla niets digitaal op"
       },
       "score": 0,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/5DGIB-DOCS_a.png"
      },
      {
       "value": "2",
       "text": {
        "default": "Ik kan alleen tekst schrijven",
        "nl": "Opslaan op de computer en documenten delen via email"
       },
       "score": 50,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/5DGIB-DOCS_b.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "+ Opslaan in de cloud en delen, mappenstructuur maken"
       },
       "score": 75,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/5DGIB-DOCS_c.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "+ Toegang verlenen, samenwerken, versies beheren"
       },
       "score": 100,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/5DGIB-DOCS_d.png"
      }
     ],
     "colCount": 2,
     "imageHeight": 240,
     "imageWidth": 320,
     "showLabel": true
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (5/9)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIB6",
   "elements": [
    {
     "type": "imagepicker",
     "name": "6DGIB-WWW",
     "title": {
      "default": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
      "nl": "Wat weet jij van het World Wide Web?\n"
     },
     "description": {
      "nl": "Beoordeel je kennis van 1 ster tot 4 sterren"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "IB",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Ik gebruik nooit een tekstverwerker",
        "nl": "Ik kan een internetbrowser gebruiken"
       },
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/6DGIB-WWW_a.png"
      },
      {
       "value": "2",
       "text": {
        "default": "Ik kan alleen tekst schrijven",
        "nl": "Ik weet dat het een wereldwijd netwerk van computers is"
       },
       "score": 50,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/6DGIB-WWW_b.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "+ Bekend met IP adressen, website maken (Wordpress)"
       },
       "score": 75,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/6DGIB-WWW_c.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "+ Ik kan programmeren (Javascript/CSS/HTML)"
       },
       "score": 100,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/6DGIB-WWW_d.png"
      }
     ],
     "colCount": 2,
     "imageHeight": 240,
     "imageWidth": 320,
     "showLabel": true
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (6/9)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIB7",
   "elements": [
    {
     "type": "imagepicker",
     "name": "7DGIB-VID",
     "title": {
      "default": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
      "nl": "Wat kun jij met beeld en videomateriaal?\n"
     },
     "description": {
      "nl": "Beoordeel je kennis van 1 ster tot 4 sterren"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "IB",
     "minscore": 25,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Ik gebruik nooit een tekstverwerker",
        "nl": "Ik kan foto's en filmpjes maken op mijn mobiel"
       },
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/7DGIB-VID_a.png"
      },
      {
       "value": "2",
       "text": {
        "default": "Ik kan alleen tekst schrijven",
        "nl": "Foto's bewerken met apps zoals Snapchat, Insta, TikTok"
       },
       "score": 50,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/7DGIB-VID_b.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "+ Korte video’s maken met iMovie, video-apps"
       },
       "score": 75,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/7DGIB-VID_c.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "+ Video's editen, met geluid, publiceren op YouTube"
       },
       "score": 100,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/7DGIB-VID_d.png"
      }
     ],
     "colCount": 2,
     "imageHeight": 240,
     "imageWidth": 320,
     "showLabel": true
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (7/9)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIB8",
   "elements": [
    {
     "type": "imagepicker",
     "name": "8DGIB-EML",
     "title": {
      "default": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
      "nl": "Hoe goed kun je omgaan met email?\n\n"
     },
     "description": {
      "nl": "Beoordeel je kennis van 1 ster tot 4 sterren"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "IB",
     "minscore": 75,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Ik gebruik nooit een tekstverwerker",
        "nl": "Ik kan emails lezen, opstellen en verzenden"
       },
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/8DGIB-EML_a.png"
      },
      {
       "value": "2",
       "text": {
        "default": "Ik kan alleen tekst schrijven",
        "nl": "Bijlagen toevoegen, omgaan met CC en BCC "
       },
       "score": 50,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/8DGIB-EML_b.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "+ Berichten in mappen, handtekening instellen"
       },
       "score": 75,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/8DGIB-EML_c.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "+ Mail merge maken, mailings verzorgen (MailChimp) "
       },
       "score": 100,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/8DGIB-EML_d.png"
      }
     ],
     "colCount": 2,
     "imageHeight": 240,
     "imageWidth": 320,
     "showLabel": true
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (8/9)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIB9",
   "elements": [
    {
     "type": "imagepicker",
     "name": "9DGIB-VCONF",
     "title": {
      "default": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
      "nl": "Hoe goed kun je omgaan met video conference programma's zoals Zoom, Teams en Google Meet?\n"
     },
     "description": {
      "nl": "Beoordeel je kennis van 1 ster tot 4 sterren"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "IB",
     "minscore": 75,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Ik gebruik nooit een tekstverwerker",
        "nl": "Ik kan hier niet mee werken"
       },
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/9DGIB-VCONF_a.png"
      },
      {
       "value": "2",
       "text": {
        "default": "Ik kan alleen tekst schrijven",
        "nl": "Conference bijwonen, starten, uitnodigingen sturen"
       },
       "score": 50,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/join.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "Weergeven in grid view, scherm delen tijdens de call"
       },
       "score": 75,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/9DGIB-VCONF_c.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "Call opnemen, automatisch deelnemers registreren"
       },
       "score": 100,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/9DGIB-VCONF_d.png"
      }
     ],
     "colCount": 2,
     "imageHeight": 240,
     "imageWidth": 320,
     "showLabel": true
    }
   ],
   "title": {
    "nl": "ICT basisvaardigheden (9/9)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGMW1",
   "elements": [
    {
     "type": "imagepicker",
     "name": "1DGMW-SCLMD",
     "title": {
      "default": "Wat kun jij met een tekstverwerker (Word / Google Docs / Pages)?",
      "nl": "Ik gebruik de volgende social media kanalen"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "MW",
     "minscore": 40,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Ik gebruik nooit een tekstverwerker",
        "nl": "Facebook"
       },
       "score": 10,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_a.png"
      },
      {
       "value": "2",
       "text": {
        "nl": "Instagram"
       },
       "score": 10,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_b.png"
      },
      {
       "value": "3",
       "text": {
        "default": "Ik kan opgemaakte tekst schrijven (bijvoorbeeld onderstrepen, vet)",
        "nl": "LinkedIn"
       },
       "score": 10,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_c.png"
      },
      {
       "value": "4",
       "text": {
        "default": "Ik kan een werkstuk maken met inhoudsopgave, tabellen en afbeeldingen",
        "nl": "YouTube"
       },
       "score": 10,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_d.png"
      },
      {
       "value": "5",
       "text": {
        "nl": "website school"
       },
       "score": 20,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_e.png"
      },
      {
       "value": "6",
       "text": {
        "nl": "Snapchat"
       },
       "score": 10,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_f.png"
      },
      {
       "value": "7",
       "text": {
        "nl": "WhatsApp"
       },
       "score": 10,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_g.png"
      },
      {
       "value": "8",
       "text": {
        "nl": "TikTok"
       },
       "score": 10,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_h.png"
      },
      {
       "value": "9",
       "text": {
        "nl": "Twitter"
       },
       "score": 10,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_i.png"
      },
      {
       "value": "10",
       "text": {
        "nl": "Geen"
       },
       "score": 0,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1DGMW-SOCIALMD_j.png"
      }
     ],
     "colCount": 4,
     "imageFit": "cover",
     "imageWidth": 150,
     "showLabel": true,
     "multiSelect": true
    },
    {
     "type": "checkbox",
     "name": "2DGMW-BERN",
     "title": {
      "nl": "Hoe beoordeel jij de waarheid van berichten op jouw social media feeds? Klik 4 goede antwoorden aan."
     },
     "correctAnswer": [
      "1",
      "2",
      "4",
      "3"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "MW",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Ik kijk naar het doel van de informatie (informatie, advententie, entertainment enz)"
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik kijk naar de intenties achter het bericht (feiten, opinie of propaganda)"
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik kijk naar de objectiviteit en onpartijdigheid van de informatie"
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik kijk of er politieke, ideologische, religieuze of persoonlijke meningen worden verkondigd"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Ik kijk of het bericht van een groot en bekend bedrijf, of een bekend persoon komt"
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Ik kijk naar het aantal volgers van het bedrijf of de persoon die het bericht heeft gepost"
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    },
    {
     "type": "checkbox",
     "name": "3DGMW-RISC",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Hoe bespreek je de risico's van sociale media met jouw leerlingen? Klik 4 goede antwoorden aan."
     },
     "correctAnswer": [
      "1",
      "2",
      "3",
      "4"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "MW",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Ik verdiep me  in de sociale media waar mijn leerlingen het meest actief zijn"
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik waak over het online gedrag van mijn leerlingen in klasgerelateerde appgroepen"
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik laat mijn leerlingen reflecteren op het gedrag van anderen op sociale media "
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik reageer op veranderingen  door social media posts  in de dynamiek van de klas"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Ik voel me als leraar niet verantwoordelijk voor het social media gedrag van mijn leerlingen"
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Ik laat leerlingen zelf met vragen of hulpvragen komen met betrekking tot social media"
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    }
   ],
   "title": {
    "nl": "Mediawijsheid (1/2)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGMW2",
   "elements": [
    {
     "type": "checkbox",
     "name": "4DGMW-GGVNS",
     "minWidth": "",
     "title": {
      "nl": "Wat is van belang bij het ontvangen en verzenden van gegevens via email en social media.  Klik 4 goede antwoorden aan.\n"
     },
     "correctAnswer": [
      "1",
      "3",
      "2",
      "4"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "MW",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Terughoudend zijn met delen van persoonlijke gegevens "
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Letten op online pesten"
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Verantwoordelijk zijn voor informatie die je stuurt of doorstuurt"
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Voorzichtig omgaan met bijlagen en hyperlinks in emails"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Bijlagen of hyperlinks in emails van bekenden kan ik altijd openen"
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Mijn mailbox staat altijd open"
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    },
    {
     "type": "checkbox",
     "name": "5DGMW-VEILG",
     "title": {
      "nl": "Welke factoren zijn volgens jou van belang bij veilig online gedrag? Klik 4 goede antwoorden aan.\n"
     },
     "correctAnswer": [
      "1",
      "2",
      "3",
      "4"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "MW",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Ik maak sterke wachtwoorden en deel deze niet"
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik beveilig belangrijke bestanden"
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik installeer beveiligingssoftware "
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik zorg dat ik mijn computer vergrendel als ik er niet ben"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Ik download software die ik nodig heb"
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Pop-ups sta ik altijd toe"
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    }
   ],
   "title": {
    "nl": "Mediawijsheid (2/2)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIV1",
   "elements": [
    {
     "type": "html",
     "name": "DGIV-info",
     "html": {
      "nl": "<h2><strong>De beste artiest van dit decennium</strong></h2><br>\n\n<p><strong>Stel, er wordt jou gevraagd om te onderzoeken wie de beste artiest van dit decennium (2010-2020) is.</strong></p>\n<p><strong>Je moet dit op een zo objectief mogelijke manier doen en hier verslag van uitbrengen.</strong> </p>\n \n"
     }
    },
    {
     "type": "image",
     "name": "DGIV-ARTIST",
     "startWithNewLine": false,
     "imageLink": "https://pillars.school/wp-content/uploads/2020/07/artist-1838653_1920.jpg",
     "imageHeight": 400,
     "imageWidth": 533
    },
    {
     "type": "checkbox",
     "name": "1DGIV-ONDZK",
     "title": {
      "nl": "Hoe begin jij met het onderzoek van de beste artiest kiezen?  Klik 4 goede antwoorden aan.\n"
     },
     "correctAnswer": [
      "1",
      "2",
      "3",
      "4"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "IV",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Ik ga brainstormen en een mindmap of woordenweb maken"
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik splits de hoofdvraag op in deelvragen en ga die onderzoeken"
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik maak een indeling in hoofdstukken "
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik ga nadenken over betrouwbare bronnen van informatie"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Ik ga direct beginnen met Googelen"
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Ik maak een mooie diapresentatie"
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    },
    {
     "type": "checkbox",
     "name": "2DGIV-ZKN",
     "title": {
      "nl": "Wat zijn volgens jou goede zoekstrategieën? Klik 4 goede antwoorden aan.\n"
     },
     "correctAnswer": [
      "2",
      "1",
      "3",
      "4"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "IV",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Ik baken mijn zoekvraag duidelijk af."
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Als ik te weinig  informatie vind, vul ik de zoekwoorden aan met synoniemen en vertalingen."
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik zet woorden die bij elkaar horen tussen aanhalingstekens."
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik gebruik 'and' en 'or' om zoektermen te combineren of uit te sluiten."
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Ik klik in Google steeds door naar andere sites die interessant zijn."
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Ik begin met zoeken in wetenschappelijke databases. "
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    }
   ],
   "title": {
    "default": "Tekstverwerken",
    "nl": "Informatievaardigheden (1/2)"
   },
   "description": {
    "default": "Digitale Geletterdheid - ICT Basisvaardigheden",
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGIV2",
   "elements": [
    {
     "type": "checkbox",
     "name": "3DGIV-ACT",
     "title": {
      "nl": "Hoe beoordeel jij de actualiteit van de informatie?  Klik 4 goede antwoorden aan.\n\n"
     },
     "correctAnswer": [
      "1",
      "2",
      "4",
      "3"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "IV",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Ik kijk naar de publicatiedatum van het artikel"
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik kijk naar de publicatiedatum van de bronnen waarnaar verwezen wordt"
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik zoek wanneer het artikel of de website is bijgewerkt"
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik bekijk of het onderwerp  sterk in ontwikkeling is of niet"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Ik ga na of het artikel vaak is  gelezen en veel comments heeft"
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Ik gebruik artikelen die bovenaan in mijn Google zoekresultaten staan"
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    },
    {
     "type": "checkbox",
     "name": "4DGIV-BTRWBR",
     "title": {
      "nl": "Hoe beoordeel jij de betrouwbaarheid van informatie? Klik 4 goede antwoorden aan.\n"
     },
     "correctAnswer": [
      "1",
      "2",
      "4",
      "3"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "IV",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Ik kijk naar de autoriteit die de informatie heeft geschreven"
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik bekijk de actualiteit van de informatie"
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik kijk hoe objectief de informatie is geschreven"
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik kijk of de informatie nauwkeurig is of dat er typfouten in zitten"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Ik kijk hoe hoog de informatie staat in mijn zoekresultaten "
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Ik kijk of de website er professioneel uitziet"
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    },
    {
     "type": "checkbox",
     "name": "5DGIV-BRON",
     "title": {
      "nl": "Als je een bronnenlijst bij je onderzoek maakt, welke gegevens vermeld je dan altijd? Klik 4 goede antwoorden aan.\n"
     },
     "correctAnswer": [
      "1",
      "2",
      "4",
      "3"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "IV",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Auteur of organisatie"
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Titel"
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Jaartal"
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Plaats"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Een bronnenlijst is niet verplicht "
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "ISBN "
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    }
   ],
   "title": {
    "nl": "Informatievaardigheden (2/2)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGCT1",
   "elements": [
    {
     "type": "checkbox",
     "name": "1DGCT-GGVNS",
     "title": {
      "nl": "Welke gegevens vind jij belangrijk om te verzamelen om de beste artiest van dit decennium te vinden? Klik 4 goede antwoorden aan.\n"
     },
     "correctAnswer": [
      "1",
      "2",
      "4",
      "3"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "CT",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Aantal keer gedraaid op Spotify"
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Aantal nummer 1 hits "
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Aantal jaren actief als topartiest "
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Aantal views op YouTube "
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Geboortedatum"
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Artiest staat bovenaan Google zoekresultaten"
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    },
    {
     "type": "checkbox",
     "name": "2DGCT-ANLS",
     "title": {
      "nl": "Wat zou jij doen om de verzamelde gegevens te analyseren? Klik 4 goede antwoorden aan. \n"
     },
     "correctAnswer": [
      "1",
      "2",
      "4",
      "3"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Je moet 4 antwoorden kiezen"
       },
       "minCount": 4,
       "maxCount": 4
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "CT",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Artiesten sorteren op aantal keer gedraaid op Spotify "
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Een overzicht maken van aantal  nummer 1 hits per artiest"
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Een overzicht maken van het aantal jaren actief als artiest"
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Een overzicht maken van aantal views op YouTube per artiest"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Overzicht maken van artiesten die vooral actief zijn geweest in Nederland"
       },
       "score": -25
      },
      {
       "value": "6",
       "text": {
        "nl": "Een overzicht maken van aantal artiesten per leeftijdscategorie (20-25, 25-30, 30-35)"
       },
       "score": -25
      }
     ],
     "choicesOrder": "random"
    },
    {
     "type": "sortablelist",
     "name": "3DGCT-AUT",
     "title": {
      "nl": "Stel dat het aantal nummer 1 hits het belangrijkste is, gevolgd door het aantal YouTube views. Welke stappen moet de computer zetten om een lijst te maken van beste naar slechtste artiest? Zet de 5 goede stappen in de juiste volgorde.\n"
     },
     "correctAnswer": [
      "1",
      "2",
      "3",
      "4",
      "5"
     ],
     "isRequired": true,
     "validators": [
      {
       "type": "answercount",
       "text": {
        "nl": "Sleep 5 goede stappen in de juiste volgorde"
       },
       "minCount": 5,
       "maxCount": 5
      }
     ],
     "istestquestion": true,
     "subject": "DG",
     "topic": "CT",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Maak een complete lijst met artiest namen, aantal nummer 1 hits, en aantal YouTube views"
       },
       "score": 20
      },
      {
       "value": "2",
       "text": {
        "nl": "Laat de computer iedere artiest van de lijst checken (loop / herhalende taak)"
       },
       "score": 20
      },
      {
       "value": "3",
       "text": {
        "nl": "Laat de computer het aantal nummer 1 hits controleren"
       },
       "score": 20
      },
      {
       "value": "4",
       "text": {
        "nl": "Laat de computer het aantal YouTube views controleren"
       },
       "score": 20
      },
      {
       "value": "5",
       "text": {
        "nl": "Laat de computer een lijst uitprinten van de beste naar de slechtste artiest"
       },
       "score": 20
      },
      {
       "value": "6",
       "text": {
        "nl": "Laat de computer de lijst artiesten sorteren op alfabet "
       },
       "score": -30
      },
      {
       "value": "7",
       "text": {
        "nl": "Laat de computer het aantal verkochte platen controleren"
       },
       "score": -30
      }
     ],
     "choicesOrder": "random"
    }
   ],
   "title": {
    "nl": "Computational Thinking (1/2)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "DGCT2",
   "elements": [
    {
     "type": "radiogroup",
     "name": "4DGCT-ALG",
     "title": {
      "nl": "Kun jij computer code schrijven?\n\n"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "CT",
     "minscore": 0,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Nee dat kan ik niet"
       },
       "score": 0
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik kan formules maken in Excel en daarmee veel automatiseren"
       },
       "score": 50
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik snap eenvoudige programmeerprincipes en kan code schrijven met Scratch, Blockly, Beebot of Microbit"
       },
       "score": 75
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik kan programmeren, bijvoorbeeld met Python of Javascript"
       },
       "score": 100
      }
     ]
    },
    {
     "type": "checkbox",
     "name": "5DGCT-ONDWS",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Selecteer de onderwerpen waar aandacht aan besteedt wordt in de les\n"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "DG",
     "topic": "CT",
     "minscore": 0,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Problemen opdelen in kleine stapjes, denken in stapjes"
       },
       "score": 25
      },
      {
       "value": "2",
       "text": {
        "nl": "Filteren van informatie "
       },
       "score": 25
      },
      {
       "value": "3",
       "text": {
        "nl": "Patronen herkennen"
       },
       "score": 25
      },
      {
       "value": "4",
       "text": {
        "nl": "Algoritmes programmeren (Scratch, Microbit, Python)"
       },
       "score": 25
      },
      {
       "value": "5",
       "text": {
        "nl": "Geen van bovenstaande opties"
       },
       "score": 0
      }
     ]
    }
   ],
   "title": {
    "nl": "Computational Thinking (2/2)"
   },
   "description": {
    "nl": "Digitale Geletterdheid"
   }
  },
  {
   "name": "PDHIG",
   "elements": [
    {
     "type": "imagepicker",
     "name": "1PDHIG-FDBCKTLS",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Geef aan welke online feedback tools je gebruikt tijdens de lessen.\n"
     },
     "isRequired": true,
     "subject": "PDH",
     "topic": "IG",
     "hasComment": true,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Kahoot!"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_a.png"
      },
      {
       "value": "2",
       "text": {
        "nl": "Padlet"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_c.png"
      },
      {
       "value": "3",
       "text": {
        "nl": "Mentimeter"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_e.png"
      },
      {
       "value": "4",
       "text": {
        "nl": "Plickers"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_g.png"
      },
      {
       "value": "5",
       "text": {
        "nl": "Socrative"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_i-09.png"
      },
      {
       "value": "6",
       "text": {
        "nl": "Quizziz"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_b.png"
      },
      {
       "value": "7",
       "text": {
        "nl": "Quizlet"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_d.png"
      },
      {
       "value": "8",
       "text": {
        "nl": "Nearpod"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_f.png"
      },
      {
       "value": "9",
       "text": {
        "nl": "Snappet"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_h.png"
      },
      {
       "value": "10",
       "text": {
        "nl": "Gynzy"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_i-10.png"
      },
      {
       "value": "11",
       "text": {
        "nl": "Bingel"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_j.png"
      },
      {
       "value": "14",
       "text": {
        "nl": "GoFormative"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_j-14.png"
      },
      {
       "value": "15",
       "text": {
        "nl": "Google Forms"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_k-2.png"
      },
      {
       "value": "16",
       "text": {
        "nl": "Learnbeat"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_l-1.png"
      },
      {
       "value": "12",
       "text": {
        "nl": "Online lesmethode"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_k.png"
      }
     ],
     "colCount": 3,
     "showLabel": true,
     "multiSelect": true
    },
    {
     "type": "radiogroup",
     "name": "2PDHIG-TLSLES",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Hoe vaak zet je deze tools in tijdens je les?\n"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "PDH",
     "topic": "IG",
     "minscore": 50,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Ik gebruik deze tools (bijna) nooit  in mijn les"
       },
       "score": 0
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik gebruik deze tools elke maand  in mijn les"
       },
       "score": 50
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik gebruik deze tools wekelijks in mijn les"
       },
       "score": 75
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik gebruik deze tools dagelijks  in mijn les"
       },
       "score": 100
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "3PDHIG-VIDCONF",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Kun je video conferencing apps zoals Zoom, Teams en Google Meet effectief inzetten om instructie te geven?\n"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "PDH",
     "topic": "IG",
     "minscore": 75,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Ik kan geen instructie geven via videoconferencing"
       },
       "score": 0
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik kan online lesgeven maar vind het wel erg lastig"
       },
       "score": 50
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik kan prima online lessen geven"
       },
       "score": 75
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik kan uitstekende online lessen verzorgen"
       },
       "score": 100
      }
     ]
    }
   ],
   "visibleIf": "{isTeacher} = true",
   "title": {
    "nl": "Instructie Geven"
   },
   "description": {
    "nl": "Pedagogisch Didactisch Handelen "
   }
  },
  {
   "name": "PDHLTNL",
   "elements": [
    {
     "type": "matrix",
     "name": "1PDHLTNL-DGTL",
     "visibleIf": "{isTeacher} = true",
     "minWidth": "150px",
     "title": {
      "nl": "Hoe goed kun jij leerlingen laten leren met digitale leermiddelen?\n"
     },
     "description": {
      "nl": "O = Onvoldoende, M = Matig, V = Voldoende, G = Goed"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "PDH",
     "topic": "LTNL",
     "maxscore": 120,
     "minscore": 60,
     "columns": [
      {
       "value": "O",
       "score": 0
      },
      {
       "value": "M",
       "score": 4
      },
      {
       "value": "V",
       "score": 7
      },
      {
       "value": "G",
       "score": 10
      }
     ],
     "rows": [
      {
       "value": "1",
       "text": {
        "nl": "Ik kan leerlingen laten werken met de educatieve software die op school beschikbaar is "
       },
       "score": 1
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik kan apps downloaden, installeren, beoordelen en verwijderen"
       },
       "score": 1
      },
      {
       "value": "3",
       "text": {
        "nl": "Als we op school een nieuwe digitale methode krijgen kan ik deze snel in mijn lessen gebruiken "
       },
       "score": 1
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik ben in staat om met behulp van digitale leermiddelen te differentiëren tussen leerlingen in de klas"
       },
       "score": 1
      },
      {
       "value": "5",
       "text": {
        "nl": "Op onze school kunnen leerlingen bv dyslectie of leerstoornissen), gebruikmaken van ondersteunende technologieën"
       },
       "score": 1
      },
      {
       "value": "6",
       "text": {
        "nl": "Ik kan gebruik maken van onlinebibliotheken of -databanken met onderwijs- en leermateriaal"
       },
       "score": 1
      },
      {
       "value": "7",
       "text": {
        "nl": "Ik gebruik digitale technologieën om mijn lessen te laten aansluiten bij de individuele behoeften van leerlingen"
       },
       "score": 1
      },
      {
       "value": "8",
       "text": {
        "nl": "Ik gebruik digitale technologieën om de creativiteit van leerlingen aan te wakkeren"
       },
       "score": 1
      },
      {
       "value": "9",
       "text": {
        "nl": "Ik gebruik digitale technologieën ter ondersteuning van de samenwerking tussen leerlingen"
       },
       "score": 1
      },
      {
       "value": "10",
       "text": {
        "nl": "Ik betrek leerlingen bij het gebruik van digitale technologieën in vakoverschrijdende projecten"
       },
       "score": 1
      },
      {
       "value": "11",
       "text": {
        "nl": "Ik bied leerlingen de mogelijkheid om met behulp van digitale technologieën hun eigen leerproces te documenteren"
       },
       "score": 1
      },
      {
       "value": "12",
       "text": {
        "nl": "Ik gebruik digitale gegevens over individuele leerlingen om hun leerervaringen te verbeteren"
       },
       "score": 1
      }
     ],
     "isAllRowRequired": true
    }
   ],
   "visibleIf": "{isTeacher} = true",
   "title": {
    "nl": "Laten Leren"
   },
   "description": {
    "nl": "Pedagogisch didactisch handelen"
   }
  },
  {
   "name": "PDHTTSN",
   "elements": [
    {
     "type": "imagepicker",
     "name": "1PDHTTSN-TTSN",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Voor digitaal toetsen maak ik het liefst gebruik van de volgende tools voor digitaal toetsen.\n"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "PDH",
     "topic": "TTSN",
     "minscore": 25,
     "hasComment": true,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "GoFormative"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/2PDHLL-TTSN_d.png"
      },
      {
       "value": "2",
       "text": {
        "nl": "Google Forms"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/2PDHLL-TTSN_c.png"
      },
      {
       "value": "3",
       "text": {
        "nl": "Exam.net"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/2PDHLL-TTSN_b.png"
      },
      {
       "value": "4",
       "text": {
        "nl": "Learnbeat"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_l-1.png"
      },
      {
       "value": "5",
       "text": {
        "nl": "Cito"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_e.png"
      },
      {
       "value": "7",
       "text": {
        "nl": "Sanppet"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_h.png"
      },
      {
       "value": "8",
       "text": {
        "nl": "Gynze"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_i-10.png"
      },
      {
       "value": "9",
       "text": {
        "nl": "Bingel"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "score": 25,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1PDHIG-FDBCKTLS_j.png"
      },
      {
       "value": "10",
       "text": {
        "nl": "Geen"
       },
       "score": 0,
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/2PDHLL-TTSN_f-04.png"
      }
     ],
     "multiSelect": true
    },
    {
     "type": "matrix",
     "name": "2PDHTTSN-DGTL",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Hoe goed kun jij digitaal toetsen afnemen?"
     },
     "description": {
      "nl": "O=Onvoldoende, M=Matig, V=Voldoende, G=Goed"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "PDH",
     "topic": "TTSN",
     "maxscore": 90,
     "minscore": 40,
     "columns": [
      {
       "value": "O",
       "score": 0
      },
      {
       "value": "M",
       "score": 4
      },
      {
       "value": "V",
       "score": 7
      },
      {
       "value": "G",
       "score": 10
      }
     ],
     "rows": [
      {
       "value": "1",
       "text": {
        "nl": "Ik kan met behulp van digitale leermiddelen toetsen afnemen en de resultaten analyseren"
       },
       "score": 1
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik ben in staat om zelf digitale toetsen te maken (bijvoorbeeld met behulp van Google formulieren)"
       },
       "score": 1
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik kan de leerdoelen per leerling aanpassen met behulp van de resultaten van digitale toetsen"
       },
       "score": 1
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik kan toetsen op maat aanbieden (adaptieve toets) met behulp van digitale leermiddelen"
       },
       "score": 1
      },
      {
       "value": "5",
       "text": {
        "nl": "Onze directie ondersteunt mij bij het gebruik van digitale technologieën voor evaluaties"
       },
       "score": 1
      },
      {
       "value": "6",
       "text": {
        "nl": "Ik gebruik digitale technologieën om de vaardigheden van de leerlingen te evalueren"
       },
       "score": 1
      },
      {
       "value": "7",
       "text": {
        "nl": "Ik gebruik digitale technologieën om de leerlingen tijdig feedback te geven"
       },
       "score": 1
      },
      {
       "value": "8",
       "text": {
        "nl": "Ik gebruik digitale technologieën om leerlingen toe te laten zelf te reflecteren op hun leerproces"
       },
       "score": 1
      },
      {
       "value": "9",
       "text": {
        "nl": "Ik gebruik digitale technologieën om leerlingen elkaars werk te laten beoordelen"
       },
       "score": 1
      }
     ],
     "isAllRowRequired": true
    }
   ],
   "visibleIf": "{isTeacher} = true",
   "title": {
    "nl": "Toetsen"
   },
   "description": {
    "nl": "Pedagogisch DIdactisch Handelen "
   }
  },
  {
   "name": "POOVVG",
   "elements": [
    {
     "type": "matrix",
     "name": "1POOVVG-PO",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Welke beschrijving is het meest op jou van toepassing in verband met het volgen van ontwikkelingen?\n"
     },
     "description": {
      "nl": "N=Nee, S=Soms, R=Regelmatig, V=Vaak"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "PO",
     "topic": "OVVG",
     "maxscore": 70,
     "minscore": 35,
     "columns": [
      {
       "value": "N",
       "score": 0
      },
      {
       "value": "S",
       "score": 4
      },
      {
       "value": "R",
       "score": 7
      },
      {
       "value": "V",
       "score": 10
      }
     ],
     "rows": [
      {
       "value": "1",
       "text": {
        "nl": "Ik ben actief op zoek naar nieuwe educatieve toepassingen en zet deze in binnen het onderwijs "
       },
       "score": 1
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik volg onderwijs gerelateerde thema's online (bijvoorbeeld via een interessegroep op LinkedIn of via nieuwsbrieven)"
       },
       "score": 1
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik ben door middel van discussie, toevoegingen, e.d. bij minimaal 1 online thema over onderwijs online betrokken"
       },
       "score": 1
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik ben van minimaal 1 online thema over onderwijs de moderator (= beheerder van het forum of onderwerp)"
       },
       "score": 1
      },
      {
       "value": "5",
       "text": {
        "nl": "Ik volg de ontwikkelingen in mijn vakgebied op Kennnisnet, PO- of VO-Raad"
       },
       "score": 1
      },
      {
       "value": "6",
       "text": {
        "nl": "Onze directie overlegt met ons over onze behoefte aan nascholing in het lesgeven met digitale technologieën"
       },
       "score": 1
      },
      {
       "value": "7",
       "text": {
        "nl": "Ik heb mogelijkheden om deel te nemen aan nascholing in het onderwijzen en leren met digitale technologieën"
       },
       "score": 1
      }
     ],
     "isAllRowRequired": true
    }
   ],
   "title": {
    "nl": "Ontwikkelingen volgen in vakgebied"
   },
   "description": {
    "nl": "Persoonlijke ontwikkeling"
   }
  },
  {
   "name": "PODVE",
   "elements": [
    {
     "type": "matrix",
     "name": "1PODVE-DLN",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Welke beschrijving is het meest op jou van toepassing in verband met het delen van ervaring?\n"
     },
     "description": {
      "nl": "N=Nee, S=Soms, R=Regelmatig, V=Vaak"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "PO",
     "topic": "DVE",
     "minscore": 50,
     "columns": [
      {
       "value": "N",
       "score": 0
      },
      {
       "value": "S",
       "score": 4
      },
      {
       "value": "R",
       "score": 7
      },
      {
       "value": "V",
       "score": 10
      }
     ],
     "rows": [
      {
       "value": "1",
       "text": {
        "nl": "Ik deel mijn eigen ervaringen (bijvoorbeeld via een blog of bijeenkomst) en inspireer zo collega’s en vakgenoten"
       },
       "score": 2
      },
      {
       "value": "2",
       "text": {
        "nl": "Ik deel wel eens digitale content die ik zelf heb gemaakt voor in mijn lessen met collega's (bv op wikiwijs)"
       },
       "score": 2
      },
      {
       "value": "3",
       "text": {
        "nl": "Ik ben aangesloten bij een vereniging, waarbij ik kennis deel met vakgenoten"
       },
       "score": 2
      },
      {
       "value": "4",
       "text": {
        "nl": "Ik ga regelmatig naar conferenties of bijeenkomsten om kennis en ervaring te delen met vakgenoten"
       },
       "score": 2
      },
      {
       "value": "5",
       "text": {
        "nl": "Onze directie moedigt ons aan om ervaringen omtrent lesgeven met digitale technologieën met anderen in de school te delen"
       },
       "score": 2
      }
     ],
     "isAllRowRequired": true
    }
   ],
   "title": {
    "nl": "Delen van ervaringen"
   },
   "description": {
    "nl": "Persoonlijke Ontwikkeling"
   }
  },
  {
   "name": "WSCRE",
   "elements": [
    {
     "type": "imagepicker",
     "name": "1WSCRE-LLSYST",
     "visibleIf": "{isTeacher} = true",
     "title": {
      "nl": "Welk systeem gebruik je voor het volgen van leerlingen?\n"
     },
     "isRequired": true,
     "hasComment": true,
     "choices": [
      {
       "value": "1",
       "text": {
        "nl": "Esis"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_a.png"
      },
      {
       "value": "2",
       "text": {
        "nl": "Parnassys"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_c.png"
      },
      {
       "value": "3",
       "text": {
        "nl": "Cito"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_e.png"
      },
      {
       "value": "4",
       "text": {
        "nl": "IEP"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_g.png"
      },
      {
       "value": "5",
       "text": {
        "nl": "Boom"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_i.png"
      },
      {
       "value": "6",
       "text": {
        "nl": "Dia"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_b.png"
      },
      {
       "value": "7",
       "text": {
        "nl": "Magister"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_d.png"
      },
      {
       "value": "8",
       "text": {
        "nl": "Somtoday"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_f.png"
      },
      {
       "value": "9",
       "text": {
        "nl": "Geen"
       },
       "imageLink": "https://pillars.school/wp-content/uploads/2020/07/1WSCRE-LLSYST_h.png"
      }
     ],
     "showLabel": true
    },
    {
     "type": "matrix",
     "name": "2WSCRE-SYSTKNNS",
     "visibleIf": "{1WSCRE-LLSYST} notempty and {1WSCRE-LLSYST} <> 9",
     "title": {
      "nl": "In {1WSCRE-LLSYST} kan ik "
     },
     "description": {
      "nl": "O=Onvoldoende, M=Matig, V=Voldoende, G=Goed"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "WSC",
     "topic": "RE",
     "maxscore": 80,
     "minscore": 40,
     "columns": [
      {
       "value": "O",
       "score": 0
      },
      {
       "value": "M",
       "score": 4
      },
      {
       "value": "V",
       "score": 7
      },
      {
       "value": "G",
       "score": 10
      }
     ],
     "rows": [
      {
       "value": "1",
       "text": {
        "nl": "een absentie en cijferregistratie invoeren"
       },
       "score": 2
      },
      {
       "value": "2",
       "text": {
        "nl": "dossiers aanleggen van leerlingen en deze gegevens met collegas delen"
       },
       "score": 2
      },
      {
       "value": "3",
       "text": {
        "nl": "een leerlingenrapport maken "
       },
       "score": 2
      },
      {
       "value": "4",
       "text": {
        "nl": "resultaten van leerlingen analyseren en interpreteren"
       },
       "score": 2
      }
     ],
     "isAllRowRequired": true
    }
   ],
   "title": {
    "nl": "Registreren"
   },
   "description": {
    "nl": "Werken in de schoolcontext"
   }
  },
  {
   "name": "WSCVEV",
   "elements": [
    {
     "type": "matrix",
     "name": "WSCVEV-VOLG",
     "visibleIf": "{1WSCRE-LLSYST} notempty and {1WSCRE-LLSYST} <> 9",
     "title": {
      "nl": "In {1WSCRE-LLSYST} kan ik \n\n\n"
     },
     "description": {
      "nl": "O=Onvoldoende, M=Matig, V=Voldoende, G=Goed"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "WSC",
     "topic": "VEV",
     "maxscore": 80,
     "minscore": 40,
     "columns": [
      {
       "value": "O",
       "score": 0
      },
      {
       "value": "M",
       "score": 4
      },
      {
       "value": "V",
       "score": 7
      },
      {
       "value": "G",
       "score": 10
      }
     ],
     "rows": [
      {
       "value": "1",
       "text": {
        "nl": "een handelings of groepsplan opstellen "
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "score": 2
      },
      {
       "value": "2",
       "text": {
        "nl": "een studiewijzer maken "
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "score": 2
      },
      {
       "value": "3",
       "text": {
        "nl": "leerlingen laten werken op eigen niveau en tempo"
       },
       "score": 2
      },
      {
       "value": "4",
       "text": {
        "nl": "opdrachten klaarzetten voor leerlingen"
       },
       "score": 2
      },
      {
       "value": "5",
       "text": {
        "nl": "plagiaatcontrole uitvoeren"
       },
       "visibleIf": "{isSecondarySchool} = 'Middelbaar'",
       "score": 2
      },
      {
       "value": "6",
       "text": {
        "nl": "digitale toetsen afnemen"
       },
       "visibleIf": "{isSecondarySchool} = 'Basis'",
       "score": 2
      }
     ],
     "isAllRowRequired": true
    }
   ],
   "visibleIf": "{isTeacher} = true",
   "title": {
    "nl": "Volgen en verantwoorden"
   },
   "description": {
    "nl": "Werken in de schoolcontext"
   }
  },
  {
   "name": "WSCCOM",
   "elements": [
    {
     "type": "matrix",
     "name": "WCSCOM-COM",
     "title": {
      "nl": "Hoe goed communiceer jij?"
     },
     "description": {
      "nl": "O = Onvoldoende, M = Matig, V = Voldoende, G = Goed"
     },
     "isRequired": true,
     "istestquestion": true,
     "subject": "WSC",
     "topic": "COM",
     "minscore": 50,
     "columns": [
      {
       "value": "O",
       "score": 0
      },
      {
       "value": "M",
       "score": 4
      },
      {
       "value": "V",
       "score": 7
      },
      {
       "value": "G",
       "score": 10
      }
     ],
     "rows": [
      {
       "value": "1",
       "text": {
        "nl": "Effectief communiceren met leerlingen"
       },
       "score": 2
      },
      {
       "value": "2",
       "text": {
        "nl": "Informatie uitwisselen met ouders"
       },
       "score": 2
      },
      {
       "value": "3",
       "text": {
        "nl": "Binnen- en buitenschools leren afstemmen (bijvoorbeeld opdrachten, excursies, stages)"
       },
       "score": 2
      },
      {
       "value": "4",
       "text": {
        "nl": "Doelmatig contact binnen het team"
       },
       "score": 2
      },
      {
       "value": "5",
       "text": {
        "nl": "Effectief communiceren met de schoolleiding"
       },
       "score": 2
      }
     ],
     "isAllRowRequired": true
    }
   ],
   "title": {
    "nl": "Communiceren"
   },
   "description": {
    "nl": "Werken in de schoolcontext"
   }
  },
  {
   "name": "ADVISE",
   "elements": [
    {
     "type": "html",
     "name": "advice"
    }
   ],
   "title": {
    "nl": "Aandachtspunten"
   }
  },
  {
   "name": "ACTIONS",
   "elements": [
    {
     "type": "matrixdropdown",
     "name": "actionPlan",
     "title": {
      "nl": "Wil je je verder ontwikkelen op de volgende onderdelen?"
     },
     "description": {
      "nl": "J = Ja, N = Nee, T = Twijfel, L = Later"
     },
     "isRequired": true,
     "columns": [
      {
       "name": "develop",
       "title": {
        "nl": "Opnemen in plan"
       },
       "cellType": "radiogroup",
       "isRequired": true,
       "choices": [
        "J",
        "N",
        "T",
        "L"
       ]
      },
      {
       "name": "action",
       "title": {
        "nl": "Actie"
       },
       "cellType": "dropdown",
       "choices": [
        "Teamtraining",
        "Externe training",
        "Zelfstudie",
        "Online training",
        "Advies gewenst"
       ],
       "hasOther": true
      },
      {
       "name": "comment",
       "title": {
        "nl": "Toelichting (optioneel)"
       },
       "cellType": "text"
      }
     ],
     "choices": [
      "Teamtraining",
      "Externe training",
      "Zelfstudie",
      "Online studie",
      "Advies gewensd"
     ],
     "rows": [
      {
       "value": "IB",
       "text": {
        "nl": "Digitale Geletterdheid - ICT basisvaardigheden"
       }
      },
      {
       "value": "MW",
       "text": {
        "nl": "Digitale Geletterdheid - Mediawijsheid"
       }
      },
      {
       "value": "IV",
       "text": {
        "nl": "Digitale Geletterdheid - Informatievaardigheden"
       }
      },
      {
       "value": "CT",
       "text": {
        "nl": "Digitale Geletterdheid - Computational Thinking"
       }
      },
      {
       "value": "IG",
       "text": {
        "nl": "Pedagogisch didactisch handelen - Instructie geven"
       },
       "visibleIf": "{isTeacher} = true"
      },
      {
       "value": "LTNL",
       "text": {
        "nl": "Pedagogisch didactisch handelen - Laten leren"
       },
       "visibleIf": "{isTeacher} = true"
      },
      {
       "value": "TTSN",
       "text": {
        "nl": "Pedagogisch didactisch handelen - Toetsen"
       },
       "visibleIf": "{isTeacher} = true"
      },
      {
       "value": "OVVG",
       "text": {
        "nl": "Persoonlijke ontwikkeling - Ontwikkelingen volgen in vakgebied"
       }
      },
      {
       "value": "DVE",
       "text": {
        "nl": "Persoonlijke ontwikkeling - Delen van ervaringen"
       }
      },
      {
       "value": "RE",
       "text": {
        "nl": "Werken in de schoolcontext - Registreren"
       },
       "visibleIf": "{isTeacher} = true"
      },
      {
       "value": "VEV",
       "text": {
        "nl": "Werken in de schoolcontext - Volgen en verantwoorden"
       },
       "visibleIf": "{isTeacher} = true"
      },
      {
       "value": "COM",
       "text": {
        "nl": "Werken in de schoolcontext - Communiceren"
       },
       "visibleIf": "{isTeacher} = true"
      }
     ]
    }
   ],
   "title": {
    "nl": "Actieplan"
   }
  },
  {
   "name": "FEEDBACK",
   "elements": [
    {
     "type": "rating",
     "name": "ratingPillars",
     "title": {
      "nl": "Beoordeling Pillars Overzicht Deskundigheid"
     },
     "description": {
      "nl": "Beoordeel deze tool met een cijfer tussen de 1 en 10"
     },
     "rateMax": 10
    },
    {
     "type": "comment",
     "name": "feedbackCommentPillars",
     "title": {
      "nl": "Jouw feedback op Pillars tool"
     },
     "description": {
      "nl": "Geef aub aan hoe deze tool kan worden verbeterd"
     }
    }
   ],
   "title": {
    "nl": "Feedback geven"
   }
  }
 ],
 "showPageTitles": false,
 "showQuestionNumbers": "off",
 "showProgressBar": "bottom",
 "firstPageIsStarted": true
};

module.exports = survey;