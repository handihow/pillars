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
				title: "ICT Basisvaardigheden",
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
	}
];

var surveyObject = {
	"1 - Instrumentele vaardigheden" : {
		"a - Kennis van ICT voorzieningen": [
			"Ik weet welke ict-voorzieningen (hard- én software) er bij ons op school beschikbaar zijn.",
			"Ik gebruik de ict-voorzieningen met gemak",
			"Ik kan aangeven hoe ik de ict-omgeving van de school inzet.",
			"Ik houd mij op de hoogte van het beschikbaar komen van nieuwe ict toepassingen voor het onderwijs.",
			"Als er een nieuw softwareprogramma of app bij ons wordt geïntroduceerd, vind ik daarin gemakkelijk mijn weg.",
			"Als ik ict in de les wil gebruiken, kan ik goed beoordelen wat de voor- en nadelen van specifieke digitale leermiddelen zijn.",
			"Ik kan benoemen welke didactische ict-toepassingen ik gebruik in mijn lessen.",
			"Ik kan benoemen welke ict- voorzieningen wel en welke niet goed werken in het gebruik voor leren en lesgeven.",
			"Ik kan het aanwezige digibord functioneel en interactief inzetten tijdens mijn lessen."
		],
		"b - Gebruik van ICT voorzieningen": [
			"Ik ben in staat om meerdere types (mobiele) devices in te zetten (denk aan: smartphone, tablet, chromebook e.d.)",
			"Ik kan mij zonder veel moeite een nieuw device eigen maken en gebruiken voor educatieve toepassingen",
			"Ik gebruik de online omgeving en/of elo die voor het onderwijs op onze school aanwezig is",
			"Ik gebruik de ondersteunende systemen (LVS) voor het onderwijs op onze school met gemak",
			"Ik weet hoe ik de online omgeving en/of elo vanaf verschillende devices kan benaderen",
			"Voor de op onderwijs gerichte online en/of elo omgeving weet ik hoe leerlingen toegevoegd of verwijderd moeten worden",
			"Ik kan een connectie tot stand brengen tussen (leerling-) devices en het digitale bord t.b.v. een interactieve manier van lesgeven",
			"Als we op school een nieuwe digitale methode krijgen, kan ik deze snel in mijn lessen gebruiken",
			"Ik gebruik wel eens tools als kahoot!, Padlet en Quizlet om mijn lessen te verrijken"
		],
		"c - Volgen van ICT ontwikkelingen": [
			"Ik lees jaarlijks meer dan 3 artikelen over het gebruik van ict in het onderwijs",
			"Ik ga jaarlijks naar minimaal 1 ict-gerelateerde bijeenkomst waarin ik word geïnformeerd over nieuwe ontwikkelingen of toepassingen",
			"Ik volg online scholingen/cursussen of heb deze gevolgd",
			"Ik gebruik dagelijks ict toepassingen in mijn onderwijs",
			"Ik probeer regelmatig nieuwe toepassingen uit in mijn lessen"
		],
		"d - Sociale Media": [
			"Ik kan een overzicht geven van gebruikte sociale netwerken zoals Facebook, LinkedIn e.d.",
			"Ik kan van deze netwerken aangeven op welke wijze ik ze ook professioneel gebruik. Denk aan WhatsAppgroep met collega's",
			"Ik kan een beschrijving geven van minimaal 3 onderwijs gerelateerde thema's per jaar die ik online volg (bijvoorbeeld via een interessegroep op LinkedIn, of via nieuwsbrieven)",
			"Ik ben door middel van discussie, toevoegingen, e.d. bij minimaal 1 online thema over onderwijs online betrokken",
			"Ik ben van minimaal 1 online thema over onderwijs de moderator (= beheerder van het forum of onderwerp)"
		],
		"e - Creëren van content": [
			"Ik ben op de hoogte van de mogelijkheden van YouTube, kan filmpjes toevoegen of een afspeellijst samenstellen",
			"Ik maak wel eens zelf filmpjes om mijn boodschap goed over te kunnen brengen",
			"Ik zoek vaak filmpjes of afbeeldingen op internet om aan mijn klas te laten zien, zodat ze de lesstof beter snappen",
			"Ik weet hoe ik filmpjes of afbeeldingen kan bewerken (bijvoorbeeld inkorten, of tekst toevoegen) en doe dat soms ook om de les er beter van te maken",
			"Ik deel wel eens digitale content die ik zelf heb gemaakt voor in mijn lessen met collega's (bv op wikiwijs)",
			"Ik plaats wel eens foto’s of video’s op de website en/of facebookpagina van de school, om ouders te informeren over het onderwijs in mijn klas"
		]
	},
	"2 - Informatievaardigheden": {
		"a - Zoeken van informatie": [
			"Als mijn zoekopdrachten onvoldoende resultaat opleveren, probeer ik mijn zoektermen aan te passen om toch de informatie te vinden die ik zoek",
			"Ik controleer over het algemeen de juistheid en actualiteit van de websites of andere plekken waar ik mijn informatie vandaan haal",
			"Ik gebruik een internetbrowser met favorieten zodat ik snel op mijn meest gebruikte pagina's terecht kan",
			"Ik ga regelmatig op zoek naar digitaal (leer)materiaal, buiten de kanalen die ik al ken",
			"Ik zoek vaak naar nieuw digitaal (leer)materiaal op wikiwijs.nl of vergelijkbare platforms",
			"Als ik informatie moet zoeken in ons administratiesysteem, lukt me dat over het algemeen goed",
			"Ik kan goed uit de voeten met zoekvelden, filters en sorteerfuncties"
		],
		"b - Beheren van informatie": [
			"Informatie die ik vind op internet kan ik makkelijk integreren in presentaties of opdrachten, zonder dat ik daar te veel werk aan heb (bijvoorbeeld knippen en plakken, of integreren van filmpjes in een presentatie)",
			"Ik maak gebruik van mappen om mijn bestanden te structureren. Indien nodig pas ik die structuur aan",
			"Ik sla mijn mappen en bestanden steeds vaker op in de cloud (Google Drive, OneDrive, Dropbox) en snap hoe ik daarmee documenten kan beheren en delen",
			"Ik maak snelkoppelingen naar veelgebruikte mappen op mijn desktop, of ik hang ze aan 'snelle toegang'",
			"Als ik (leer)materiaal maak met informatie die ik op internet vind, vermeld ik altijd de bron en ik weet welke regels hiervoor gelden",
			"Ik word er soms wel eens op gewezen dat de informatie in mijn lessen niet klopt, of dat mijn leerlingen tegenstrijdige informatie hebben gevonden op internet",
			"Als mijn leerlingen een opdracht inleveren, valt mij snel op of ze iets van internet hebben gekopieerd en ik weet hoe ik dit makkelijk kan controleren"
		]
	},
	"3 - Mediavaardigheden": {
		"a - Eigen vaardigheden": [
			"Ik bespreek regelmatig (minstens 1x per maand) met mijn team of leidinggevende hoe wij actuele media gebruiken op school",
			"Ik snap goed welke risico's internet en sociale media met zich meebrengen en wat dit voor invloed heeft op de dynamiek in de klas",
			"Ik verbeter me in de mediavaardigheden die ik zelf nodig heb om in deze digitale samenleving goed te functioneren",
			"Ik leer mijn klas 21e eeuwse vaardigheden zoals kritisch denken, oplossend vermogen en digitale vaardigheden door deze in te passen in de standaard methoden",
			"Ik weet hoe ik de betrouwbaarheid van educatieve software en websites kan controleren"
		],
		"b - Lesgeven in de mediawijsheid": [
			"Bij het voorbereiden van mijn lessen bedenk ik regelmatig (minstens 1x per maand) of ik sociale media kan inpassen in de les",
			"Ik probeer de risico's van sociale media en internet te bespreken in mijn klas, door dit bijvoorbeeld te werken in een reflectie van een opdracht",
			"Ik begrijp dat sommige mediaboodschappen bedoeld zijn om kinderen tot (soms negatief) gedrag aan te zetten en houdt hier rekening mee als ik voor de klas sta",
			"Ik begrijp wat voor invloed media(uitingen) op mijn leerlingen kunnen hebben en ga hierover regelmatig met hen in gesprek, door het bijvoorbeeld te verwerken in opdrachten",
			"Ik heb met mijn klas regelmatig gesprekken over wat gebeurt op sociale media zoals whatsapp, instagram en snapchat (bijvoorbeeld roddelen of pesten) en hoe ze daarmee om (kunnen) gaan"
		]
	}
}

function transformSurvey(surveyObject, competenceCategories){
	var newSurveys = [];
	Object.keys(surveyObject).forEach(function(surveyKey){
		var index = competenceCategories.findIndex(cat => cat.previousTitle == surveyKey);
		var newSurvey = {}
		if(index > -1){
			newSurvey = createNewSurvey(competenceCategories, index);
			newSurvey.pages = createPages(competenceCategories, index);
			newSurvey.pages.forEach(function(page, pageIndex){
				page.elements = createElements(competenceCategories, index, pageIndex, surveyObject);
			})
			newSurveys.push(newSurvey);
		} else {
			console.log("title not found in categories")
		}
	})
	return newSurveys;
}


function createNewSurvey(competenceCategories, index){
	return {
				"locale": "nl",
				"title": {
				  "nl": competenceCategories[index].title
				 },
				 "showTitle": false
			}
}

function createPages(competenceCategories, index){
	var newPages = [];
	competenceCategories[index].categories.forEach(function(category){
		var newPage = {
			"name": category.name,
			"title": {
				"nl": category.title
			}
		};
		newPages.push(newPage);
	});
	return newPages;
}

function createElements(competenceCategories, index, pageIndex, surveyObject){
	var newElements = [];
	var previousTitle = competenceCategories[index].previousTitle;
	var previousIdentifier = competenceCategories[index].categories[pageIndex].previousIdentifier;
	var type = competenceCategories[index].type;
	surveyObject[previousTitle][previousIdentifier].forEach(function(element, elementIndex){
		var newElement = {
	     type: type,
	     name: competenceCategories[index].categories[pageIndex].name+ "-question" + (elementIndex+1),
	     defaultValue: competenceCategories[index].type == 'boolean' ? "false" : null,
	     isRequired: true,
	     title: {
	    		"nl": element
	    	}
	    }
	    if(type == 'rating'){
	    	newElement.rateValues = [
		      {
		       value: "0",
		       text: {
		        nl: "Nee"
		       }
		      },
		      {
		       value: "0.25",
		       text: {
		        nl: "Oneens"
		       }
		      },
		      {
		       value: "0.5",
		       text: {
		        nl: "Eens"
		       }
		      },
		      {
		       value: "0.75",
		       text: {
		        nl: "Meer eens"
		       }
		      },
		      {
		       value: "1",
		       text: {
		        nl: "Helemaal mee eens"
		       }
		      }
		     ]
	    }
	    newElements.push(newElement);
	});
	return newElements;
}

console.log(JSON.stringify(transformSurvey(surveyObject, competenceCategories)));







