var survey = {};

competenceCategories = [
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

];

survey.competenceCategories = competenceCategories;

survey.calculateStatistics = function(survey, surveyResults){
	var statistics = [];
	var index = competenceCategories.findIndex(cat => cat.identifier == survey.competenceStandardKey);
	if(index>-1){
    var generalStatistic = {
      name: competenceCategories[index].identifier,
      title: competenceCategories[index].title,
      statistics: [],
    }
    statistics.push(generalStatistic);
		competenceCategories[index].categories.forEach(function(category){
			var newStatistic = {
				name: category.name,
				title: category.title,
				statistics: [],
			}
			statistics.push(newStatistic);
		});
		surveyResults.forEach(function(surveyResult){
     statistics.forEach(function(stat, statIndex){
       var questions = 0;
       var total = 0;
       Object.keys(surveyResult.result).forEach(function(key){

          var value = surveyResult.result[key];
          if(typeof value == 'string'){
            value = parseFloat(value);
          } else if(typeof value == 'boolean'){
            value = value ? 1 : 0;
          }

          if(statIndex == 0) {
             //this is the general statistics
             questions += 1;
             total += value;
          }

          var name = key.substring(0,key.indexOf("-"));
          if(name == stat.name){
             questions += 1;
             total += value;            
          }
        });
        var result = Math.round(total / questions * 100);
        stat.statistics.push(result);
     });
		});
	} 
	return statistics;
}


survey.ictSkills = {
 locale: "nl",
 title: {
  nl: "ICT Geletterdheid"
 },
 showTitle: false,
 pages: [
  {
   name: "basicSkills",
   elements: [
    {
     type: "boolean",
     name: "basicSkills-question1",
     title: {
      nl: "Ik weet welke ICT voorzieningen (hard- en software) er bij ons op school beschikbaar zijn"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "basicSkills-question2",
     title: {
      nl: "Ik gebruik de ICT voorzieningen met gemak"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "basicSkills-question3",
     title: {
      nl: "Ik ben in staat om meerdere types (mobiele) devices in te zetten (denk aan: smartphone, tablet, chromebook e.d.)"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "basicSkills-question4",
     title: {
      nl: "Ik kan mij zonder veel moeite een nieuw device eigen maken en gebruiken voor educatieve toepassingen"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "basicSkills-question5",
     title: {
      nl: "Ik sla mijn mappen en bestanden steeds vaker op in de cloud (Google Drive, OneDrive, Dropbox) en snap hoe ik daarmee documenten kan beheren en delen"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "basicSkills-question6",
     title: {
      nl: "Ik maak snelkoppelingen naar veelgebruikte mappen of internetpagina's op mijn desktop"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "basicSkills-question7",
     title: {
      nl: "Ik kan met verschillende bestandstypen en omgaan met bestanden (opslaan/terugvinden, kopiëren/verwijderen, verzenden/ontvangen, delen) op verschillende opslagmedia"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "basicSkills-question8",
     title: {
      nl: "Ik creëer informatie en gebruik het internet voor de publicatie (website, blog, etc.)"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "basicSkills-question9",
     title: {
      nl: "Ik ben op de hoogte van de mogelijkheden van YouTube, kan filmpjes toevoegen of een afspeellijst samenstellen"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "basicSkills-question10",
     title: {
      nl: "Ik maak zelf wel eens filmpjes om mijn boodschap goed over te brengen"
     },
     defaultValue: "false",
     isRequired: true
    }
   ],
   title: {
    nl: "ICT Basisvaardigheden"
   }
  },
  {
   name: "informationSkills",
   elements: [
    {
     type: "boolean",
     name: "informationSkills-question1",
     title: {
      nl: "Informatie die ik vind op internet kan ik makkelijk integreren in presentaties of opdrachten, zonder dat ik daar veel werk aan heb (bijvoorbeeld knippen en plakken, of integreren van filmpjes in een presentatie)"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "informationSkills-question2",
     title: {
      nl: "Als mijn zoekopdrachten onvoldoende resultaat opleveren, probeer ik mijn zoektermen aan te passen om toch de informatie te vinden die ik zoek"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "informationSkills-question3",
     title: {
      nl: "Ik controleer over het algemeen de juistheid en actualiteit van de websites of andere plekken waar ik mijn informatie vandaan haal"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "informationSkills-question4",
     title: {
      nl: "Ik gebruik een internetbrowser met favorieten zodat ik snel op mijn meest gebruikte pagina's terecht kan"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "informationSkills-question5",
     title: {
      nl: "Ik kan goed uit de voeten met zoekvelden, filters en sorteerfuncties"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "informationSkills-question6",
     title: {
      nl: "Als ik (leer)materiaal maak met informatie die ik op internet vind, vermeld ik altijd de bron en ik weet welke regels hiervoor gelden"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "informationSkills-question7",
     title: {
      nl: "Ik weet hoe ik de betrouwbaarheid van educatieve software en websites kan controleren"
     },
     defaultValue: "false",
     isRequired: true
    }
   ],
   title: {
    nl: "ICT Basisvaardigheden"
   }
  },
  {
   name: "mediaSkills",
   elements: [
    {
     type: "boolean",
     name: "mediaSkills-question1",
     title: {
      nl: "Ik weet hoe ik filmpjes of afbeeldingen kan bewerken (bijvoorbeeld inkorten of tekst toevoegen) en doe dat soms ook om de les er beter van te maken"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question2",
     title: {
      nl: "Ik lees jaarlijks meer dan 3 artikelen over het gebruik van ICT in het onderwijs"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question3",
     title: {
      nl: "Ik gebruik dagelijks ICT toepassingen in mijn onderwijs"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question4",
     title: {
      nl: "Ik waak over de nettiquette binnen sociale netwerken"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question5",
     title: {
      nl: "Ik probeer regelmatig nieuwe ICT toepassingen uit in mijn lessen"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question6",
     title: {
      nl: "Ik kan een overzicht geven van gebruikte sociale netwerken zoals Facebook, LinkedIn e.d."
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question7",
     title: {
      nl: "Ik snap goed welke risico's internet en sociale media met zich meebrengen en wat dit voor invloed heeft op de dynamiek in de klas"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question8",
     title: {
      nl: "Ik verbeter me in de mediavaardigheden die ik zelf nodig heb om in deze digitale samenleving goed te functioneren"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question9",
     title: {
      nl: "Ik probeer de risico's van sociale media te bespreken in mijn klas, door dit bijvoorbeeld te verwerken in een reflectie van een opdracht"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question10",
     title: {
      nl: "Ik leer mijn klas 21e eeuwse vaardigheden zoals kritisch denken, oplossend vermogen en digitale vaardigheden door deze in te passen in de standaard methoden"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "mediaSkills-question11",
     title: {
      nl: "Ik heb met mijn klas regelmatig gesprekken over wat er gebeurt op sociale media zoals WhatsApp, Instagram en SnapChat (bijvoorbeeld roddelen of pesten) en hoe ze daarmee om (kunnen) gaan"
     },
     defaultValue: "false",
     isRequired: true
    }
   ],
   title: {
    nl: "Mediawijsheid"
   }
  },
  {
   name: "computationalThinking",
   elements: [
    {
     type: "boolean",
     name: "computationalThinking-question1",
     title: {
      nl: "Ik kan informatie weergeven in relevante grafieken, tabellen, woorden en plaatjes"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "computationalThinking-question2",
     title: {
      nl: "Ik snap eenvoudige programeerprincipes en kan deze toepassen op websites zoals Scratch of Microbit"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "computationalThinking-question3",
     title: {
      nl: "Ik kan een computerprogramma schrijven in een omgeving voor kinderen (Microbit / Scratch) of zelfs in een programeertaal zoals Python of C#"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "computationalThinking-question4",
     title: {
      nl: "Ik kan repetitieve taken laten uitvoeren door computers, bijvoorbeeld het laten uitrekenen van cellen in Excel of het automatisch vullen van brieven in Word"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "computationalThinking-question5",
     title: {
      nl: "Ik kan een probleem oplossen door het te automatiseren met behulp van bestaande programma's of websites, bijvoorbeeld met behulp van If This Then That"
     },
     defaultValue: "false",
     isRequired: true
    },
    {
     type: "boolean",
     name: "computationalThinking-question6",
     title: {
      nl: "Ik kan de Voice Assistent van mijn telefoon gebruiken om sneller taken uit te voeren op mijn telefoon"
     },
     defaultValue: "false",
     isRequired: true
    }
   ],
   title: {
    nl: "Computational Thinking"
   }
  }
 ]
};

survey.pedagogicalDidacticalSkills = {
    "locale": "nl",
    "title": {
      "nl": "Pedagogisch Didactisch Handelen"
    },
    "showTitle": false,
    "pages": [
      {
        "name": "instructing",
        "title": {
          "nl": "Instructie geven"
        },
        "elements": [
          {
            "type": "boolean",
            "name": "instructing-question1",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan op eigen initiatief geschikte toepassingen inzetten bij het leerproces"
            }
          },
          {
            "type": "boolean",
            "name": "instructing-question2",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik ben actief op zoek naar nieuwe educatieve toepassingen en zet deze in binnen het onderwijs"
            }
          },
          {
            "type": "boolean",
            "name": "instructing-question3",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik gebruik wel eens tools als Kahoot!, Padlet, Mentimeter en Quizlet om mijn lessen te verrijken"
            }
          },
          {
            "type": "boolean",
            "name": "instructing-question4",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan een connectie tot stand brengen tussen (leerling-) devices en het digitale bord t.b.v. een interactieve manier van lesgeven"
            }
          },
          {
            "type": "boolean",
            "name": "instructing-question5",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan het aanwezige digibord functioneel en interactief inzetten in mijn lessen"
            }
          },
          {
            "type": "boolean",
            "name": "instructing-question6",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik ben bekend met video conferencing apps zoals Skype en FaceTime en kan daarmee op afstand instructie geven"
            }
          }
        ]
      },
      {
        "name": "learning",
        "title": {
          "nl": "Laten leren"
        },
        "elements": [
          {
            "type": "boolean",
            "name": "learning-question1",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan leerlingen laten werken met educatieve programmas"
            }
          },
          {
            "type": "boolean",
            "name": "learning-question2",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan apps downloaden, installeren, beoordelen en verwijderen"
            }
          },
          {
            "type": "boolean",
            "name": "learning-question3",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik gebruik een online omgeving en/of elo die voor het onderwijs op onze school aanwezig is"
            }
          },
          {
            "type": "boolean",
            "name": "learning-question4",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik weet hoe ik de online omgeving en/of elo vanaf verschillende devices kan benaderen"
            }
          },
          {
            "type": "boolean",
            "name": "learning-question5",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Voor de op onderwijs gerichte online en/of elo omgeving weet ik hoe leerlingen toegevoegd of verwijderd moeten worden"
            }
          },
          {
            "type": "boolean",
            "name": "learning-question6",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Als we op school een nieuwe digitale methode krijgen kan ik deze snel in mijn lessen gebruiken"
            }
          },
          {
            "type": "boolean",
            "name": "learning-question7",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik zet op basis van onderzoek media bewust en systematisch in om het eigen onderwijs te verrijken en leerlingen optimaal te laten leren"
            }
          },
          {
            "type": "boolean",
            "name": "learning-question8",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik ben in staat om met behulp van digitale leermiddelen leerlingen met uiteenlopende zorgbehoeften te ondersteunen"
            }
          }
        ]
      },
      {
        "name": "testing",
        "title": {
          "nl": "Toetsen"
        },
        "elements": [
          {
            "type": "boolean",
            "name": "testing-question1",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan met behulp van digitale leermiddelen toetsen afnemen en de resultaten analyseren"
            }
          },
          {
            "type": "boolean",
            "name": "testing-question2",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik ben in staat om zelf digitale toetsen te maken (bijvoorbeeld met behulp van Google formulieren)"
            }
          },
          {
            "type": "boolean",
            "name": "testing-question3",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan de leerdoelen per leerling aanpassen met behulp van de resultaten van digitale toetsen"
            }
          },
          {
            "type": "boolean",
            "name": "testing-question4",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan toetsen op maat aanbieden (adaptieve toets) met behulp van digitale leermiddelen"
            }
          }
        ]
      }
    ]
  };

survey.workInSchoolContext = {
    "locale": "nl",
    "title": {
      "nl": "Werken in de schoolcontext"
    },
    "showTitle": false,
    "pages": [
      {
        "name": "registration",
        "title": {
          "nl": "Registreren"
        },
        "elements": [
          {
            "type": "boolean",
            "name": "registration-question1",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan een absentie en cijferregistratie invoeren"
            }
          },
          {
            "type": "boolean",
            "name": "registration-question2",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan dossiers aanleggen van leerlingen en deze gegevens met collegas delen"
            }
          },
          {
            "type": "boolean",
            "name": "registration-question3",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan mijn administratie (bijvoorbeeld het opstellen van handelingsplannen of het schrijven van een rapportage) op afstand invoeren"
            }
          }
        ]
      },
      {
        "name": "justification",
        "title": {
          "nl": "Volgen en verantwoorden"
        },
        "elements": [
          {
            "type": "boolean",
            "name": "justification-question1",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan een leerlingenrapport maken met behulp van de beschikbare software"
            }
          },
          {
            "type": "boolean",
            "name": "justification-question2",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan een handelings of groepsplan opstellen met behulp van tekstverwerkers of spreadsheets"
            }
          },
          {
            "type": "boolean",
            "name": "justification-question3",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan overzichten van resultaten maken en deze verwerken in presentaties"
            }
          },
          {
            "type": "boolean",
            "name": "justification-question4",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan resultaten van leerlingen uit digitale leermiddelen analyseren en interpreteren"
            }
          }
        ]
      },
      {
        "name": "communication",
        "title": {
          "nl": "Communiceren"
        },
        "elements": [
          {
            "type": "boolean",
            "name": "communication-question1",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan communiceren met anderen via e-mail of ander communicatieprogramma of app"
            }
          },
          {
            "type": "boolean",
            "name": "communication-question2",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik gebruik sociale netwerken om het publiek (ouders, betrokken professionals e.d.) te informeren over relevante schoolse zaken"
            }
          },
          {
            "type": "boolean",
            "name": "communication-question3",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik weet de kwaliteiten en verdiensten van het eigen onderwijs, de leerlingen en de school naar buiten toe te belichten"
            }
          }
        ]
      }
    ]
  };

survey.personalDevelopment = {
    "locale": "nl",
    "title": {
      "nl": "Persoonlijke Ontwikkeling"
    },
    showTitle: false,
    "pages": [
      {
        "name": "developing",
        "title": {
          "nl": "Ontwikkelingen volgen in vakgebied"
        },
        "elements": [
          {
            "type": "boolean",
            "name": "developing-question1",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan sociale netwerken professioneel gebruiken. Denk aan een WhatsApp-groep met collega's"
            }
          },
          {
            "type": "boolean",
            "name": "developing-question2",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik kan een beschrijving geven van minimaal 3 onderwijs gerelateerde thema's per jaar die ik online volg (bijvoorbeeld via een interessegroep op LinkedIn of via nieuwsbrieven)"
            }
          },
          {
            "type": "boolean",
            "name": "developing-question3",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik ben door middel van discussie, toevoegingen, e.d. bij minimaal 1 online thema over onderwijs online betrokken"
            }
          },
          {
            "type": "boolean",
            "name": "developing-question4",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik ben van minimaal 1 online thema over onderwijs de moderator (= beheerder van het forum of onderwerp)"
            }
          }
        ]
      },
      {
        "name": "sharing",
        "title": {
          "nl": "Delen van ervaring"
        },
        "elements": [
          {
            "type": "boolean",
            "name": "sharing-question1",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik deel mijn eigen ervaringen (bijvoorbeeld via een blog) en inspireer zo collega’s en vakgenoten"
            }
          },
          {
            "type": "boolean",
            "name": "sharing-question2",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik deel wel eens digitale content die ik zelf heb gemaakt voor in mijn lessen met collega's (bv op wikiwijs)"
            }
          },
          {
            "type": "boolean",
            "name": "sharing-question3",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik plaats wel een foto's of video's van de school, om ouders te informeren over het onderwijs in mijn klas"
            }
          },
          {
            "type": "boolean",
            "name": "sharing-question4",
            "defaultValue": "false",
            "isRequired": true,
            "title": {
              "nl": "Ik stimuleer de interactie tussen leerlingen en/of collega’s en vakgenoten"
            }
          }
        ]
      }
    ]
  };

survey.instrumentalSkills = {
    "locale": "nl",
    "title": {
      "nl": "Instrumentele vaardigheden"
    },
    showTitle: false,
    "pages": [
      {
        "name": "ictKnowledge",
        "title": {
          "nl": "Kennis van ICT voorzieningen"
        },
        "elements": [
          {
            "type": "rating",
            "name": "ictKnowledge-question1",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik weet welke ict-voorzieningen (hard- én software) er bij ons op school beschikbaar zijn."
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik gebruik de ict-voorzieningen met gemak"
            },
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
            "name": "ictKnowledge-question3",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan aangeven hoe ik de ict-omgeving van de school inzet."
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik houd mij op de hoogte van het beschikbaar komen van nieuwe ict toepassingen voor het onderwijs."
            },
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
            "name": "ictKnowledge-question5",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Als er een nieuw softwareprogramma of app bij ons wordt geïntroduceerd, vind ik daarin gemakkelijk mijn weg."
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Als ik ict in de les wil gebruiken, kan ik goed beoordelen wat de voor- en nadelen van specifieke digitale leermiddelen zijn."
            },
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
            "name": "ictKnowledge-question7",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan benoemen welke didactische ict-toepassingen ik gebruik in mijn lessen."
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan benoemen welke ict- voorzieningen wel en welke niet goed werken in het gebruik voor leren en lesgeven."
            },
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
            "name": "ictKnowledge-question9",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan het aanwezige digibord functioneel en interactief inzetten tijdens mijn lessen."
            },
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
        ]
      },
      {
        "name": "ictUsage",
        "title": {
          "nl": "Gebruik van ICT voorzieningen"
        },
        "elements": [
          {
            "type": "rating",
            "name": "ictUsage-question1",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik ben in staat om meerdere types (mobiele) devices in te zetten (denk aan: smartphone, tablet, chromebook e.d.)"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan mij zonder veel moeite een nieuw device eigen maken en gebruiken voor educatieve toepassingen"
            },
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
            "name": "ictUsage-question3",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik gebruik de online omgeving en/of elo die voor het onderwijs op onze school aanwezig is"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik gebruik de ondersteunende systemen (LVS) voor het onderwijs op onze school met gemak"
            },
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
            "name": "ictUsage-question5",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik weet hoe ik de online omgeving en/of elo vanaf verschillende devices kan benaderen"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Voor de op onderwijs gerichte online en/of elo omgeving weet ik hoe leerlingen toegevoegd of verwijderd moeten worden"
            },
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
            "name": "ictUsage-question7",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan een connectie tot stand brengen tussen (leerling-) devices en het digitale bord t.b.v. een interactieve manier van lesgeven"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Als we op school een nieuwe digitale methode krijgen, kan ik deze snel in mijn lessen gebruiken"
            },
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
            "name": "ictUsage-question9",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik gebruik wel eens tools als kahoot!, Padlet en Quizlet om mijn lessen te verrijken"
            },
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
        ]
      },
      {
        "name": "ictDevelopment",
        "title": {
          "nl": "Volgen van ICT ontwikkelingen"
        },
        "elements": [
          {
            "type": "rating",
            "name": "ictDevelopment-question1",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik lees jaarlijks meer dan 3 artikelen over het gebruik van ict in het onderwijs"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik ga jaarlijks naar minimaal 1 ict-gerelateerde bijeenkomst waarin ik word geïnformeerd over nieuwe ontwikkelingen of toepassingen"
            },
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
            "name": "ictDevelopment-question3",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik volg online scholingen/cursussen of heb deze gevolgd"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik gebruik dagelijks ict toepassingen in mijn onderwijs"
            },
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
            "name": "ictDevelopment-question5",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik probeer regelmatig nieuwe toepassingen uit in mijn lessen"
            },
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
        ]
      },
      {
        "name": "socialMedia",
        "title": {
          "nl": "Sociale Media"
        },
        "elements": [
          {
            "type": "rating",
            "name": "socialMedia-question1",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan een overzicht geven van gebruikte sociale netwerken zoals Facebook, LinkedIn e.d."
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan van deze netwerken aangeven op welke wijze ik ze ook professioneel gebruik. Denk aan WhatsAppgroep met collega's"
            },
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
            "name": "socialMedia-question3",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan een beschrijving geven van minimaal 3 onderwijs gerelateerde thema's per jaar die ik online volg (bijvoorbeeld via een interessegroep op LinkedIn, of via nieuwsbrieven)"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik ben door middel van discussie, toevoegingen, e.d. bij minimaal 1 online thema over onderwijs online betrokken"
            },
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
            "name": "socialMedia-question5",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik ben van minimaal 1 online thema over onderwijs de moderator (= beheerder van het forum of onderwerp)"
            },
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
        ]
      },
      {
        "name": "contentCreation",
        "title": {
          "nl": "Creëren van content"
        },
        "elements": [
          {
            "type": "rating",
            "name": "contentCreation-question1",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik ben op de hoogte van de mogelijkheden van YouTube, kan filmpjes toevoegen of een afspeellijst samenstellen"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik maak wel eens zelf filmpjes om mijn boodschap goed over te kunnen brengen"
            },
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
            "name": "contentCreation-question3",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik zoek vaak filmpjes of afbeeldingen op internet om aan mijn klas te laten zien, zodat ze de lesstof beter snappen"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik weet hoe ik filmpjes of afbeeldingen kan bewerken (bijvoorbeeld inkorten, of tekst toevoegen) en doe dat soms ook om de les er beter van te maken"
            },
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
            "name": "contentCreation-question5",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik deel wel eens digitale content die ik zelf heb gemaakt voor in mijn lessen met collega's (bv op wikiwijs)"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik plaats wel eens foto’s of video’s op de website en/of facebookpagina van de school, om ouders te informeren over het onderwijs in mijn klas"
            },
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
        ]
      }
    ]
  };

  survey.informationSkills = {
    "locale": "nl",
    "title": {
      "nl": "Informatievaardigheden"
    },
    showTitle: false,
    "pages": [
      {
        "name": "searchInformation",
        "title": {
          "nl": "Zoeken van informatie"
        },
        "elements": [
          {
            "type": "rating",
            "name": "searchInformation-question1",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Als mijn zoekopdrachten onvoldoende resultaat opleveren, probeer ik mijn zoektermen aan te passen om toch de informatie te vinden die ik zoek"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik controleer over het algemeen de juistheid en actualiteit van de websites of andere plekken waar ik mijn informatie vandaan haal"
            },
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
            "name": "searchInformation-question3",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik gebruik een internetbrowser met favorieten zodat ik snel op mijn meest gebruikte pagina's terecht kan"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik ga regelmatig op zoek naar digitaal (leer)materiaal, buiten de kanalen die ik al ken"
            },
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
            "name": "searchInformation-question5",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik zoek vaak naar nieuw digitaal (leer)materiaal op wikiwijs.nl of vergelijkbare platforms"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Als ik informatie moet zoeken in ons administratiesysteem, lukt me dat over het algemeen goed"
            },
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
            "name": "searchInformation-question7",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik kan goed uit de voeten met zoekvelden, filters en sorteerfuncties"
            },
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
        ]
      },
      {
        "name": "administerInformation",
        "title": {
          "nl": "Beheren van informatie"
        },
        "elements": [
          {
            "type": "rating",
            "name": "administerInformation-question1",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Informatie die ik vind op internet kan ik makkelijk integreren in presentaties of opdrachten, zonder dat ik daar te veel werk aan heb (bijvoorbeeld knippen en plakken, of integreren van filmpjes in een presentatie)"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik maak gebruik van mappen om mijn bestanden te structureren. Indien nodig pas ik die structuur aan"
            },
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
            "name": "administerInformation-question3",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik sla mijn mappen en bestanden steeds vaker op in de cloud (Google Drive, OneDrive, Dropbox) en snap hoe ik daarmee documenten kan beheren en delen"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik maak snelkoppelingen naar veelgebruikte mappen op mijn desktop, of ik hang ze aan 'snelle toegang'"
            },
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
            "name": "administerInformation-question5",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Als ik (leer)materiaal maak met informatie die ik op internet vind, vermeld ik altijd de bron en ik weet welke regels hiervoor gelden"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik word er soms wel eens op gewezen dat de informatie in mijn lessen niet klopt, of dat mijn leerlingen tegenstrijdige informatie hebben gevonden op internet"
            },
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
            "name": "administerInformation-question7",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Als mijn leerlingen een opdracht inleveren, valt mij snel op of ze iets van internet hebben gekopieerd en ik weet hoe ik dit makkelijk kan controleren"
            },
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
        ]
      }
    ]
  };

  survey.mediaSkills = {
    "locale": "nl",
    "title": {
      "nl": "Mediavaardigheden"
    },
    showTitle: false,
    "pages": [
      {
        "name": "personalSkills",
        "title": {
          "nl": "Eigen vaardigheden"
        },
        "elements": [
          {
            "type": "rating",
            "name": "personalSkills-question1",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik bespreek regelmatig (minstens 1x per maand) met mijn team of leidinggevende hoe wij actuele media gebruiken op school"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik snap goed welke risico's internet en sociale media met zich meebrengen en wat dit voor invloed heeft op de dynamiek in de klas"
            },
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
            "name": "personalSkills-question3",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik verbeter me in de mediavaardigheden die ik zelf nodig heb om in deze digitale samenleving goed te functioneren"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik leer mijn klas 21e eeuwse vaardigheden zoals kritisch denken, oplossend vermogen en digitale vaardigheden door deze in te passen in de standaard methoden"
            },
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
            "name": "personalSkills-question5",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik weet hoe ik de betrouwbaarheid van educatieve software en websites kan controleren"
            },
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
        ]
      },
      {
        "name": "teachingMediaSkills",
        "title": {
          "nl": "Lesgeven in de mediawijsheid"
        },
        "elements": [
          {
            "type": "rating",
            "name": "teachingMediaSkills-question1",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Bij het voorbereiden van mijn lessen bedenk ik regelmatig (minstens 1x per maand) of ik sociale media kan inpassen in de les"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik probeer de risico's van sociale media en internet te bespreken in mijn klas, door dit bijvoorbeeld te werken in een reflectie van een opdracht"
            },
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
            "name": "teachingMediaSkills-question3",
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik begrijp dat sommige mediaboodschappen bedoeld zijn om kinderen tot (soms negatief) gedrag aan te zetten en houdt hier rekening mee als ik voor de klas sta"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik begrijp wat voor invloed media(uitingen) op mijn leerlingen kunnen hebben en ga hierover regelmatig met hen in gesprek, door het bijvoorbeeld te verwerken in opdrachten"
            },
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
            "defaultValue": null,
            "isRequired": true,
            "title": {
              "nl": "Ik heb met mijn klas regelmatig gesprekken over wat gebeurt op sociale media zoals whatsapp, instagram en snapchat (bijvoorbeeld roddelen of pesten) en hoe ze daarmee om (kunnen) gaan"
            },
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
        ]
      }
    ]
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
 "showTitle": false
}


module.exports = survey;