var questionnaire = {};

questionnaire.competenceCategories = [
	{
		identifier: 'ictSkills',
		title: "ICT Geletterdheid",
		surveyOption: "pillars",
		categories: [
			{
				name: "basicSkills",
				title: "ICT Basisvaardigheden"
			},
			{
				name: "informationSkills",
				title: "ICT Basisvaardigheden"
			},
			{
				name: "mediaSkills",
				title: "Mediawijsheid"
			},
			{
				name: "computationalThinking",
				title: "Computational Thinking"
			}
		],
	},
	{
		identifier: 'pedagogicalDidacticalSkills',
		title: "Pedagogisch Didactisch Handelen",
		surveyOption: "pillars",
		categories: [
			{
				name: "instructing",
				title: "Instructie geven"
			},
			{
				name: "learning",
				title: "Laten leren"
			},
			{
				name: "testing",
				title: "Toetsen"
			}
		],
	},
	{
		identifier: 'workInSchoolContext',
		title: "Werken in de schoolcontext",
		surveyOption: "pillars",
		categories: [
			{
				name: "registration",
				title: "Registreren"
			},
			{
				name: "justification",
				title: "Volgen en verantwoorden"
			},
			{
				name: "communication",
				title: "Communiceren"
			}
		],
	},
	{
		identifier: 'personalDevelopment',
		title: "Persoonlijke Ontwikkeling",
		surveyOption: "pillars",
		categories: [
			{
				name: "developing",
				title: "Ontwikkelingen volgen in vakgebied"
			},
			{
				name: "sharing",
				title: "Delen van ervaring"
			}
		]
	},
	{
		identifier: 'instrumentalSkills',
		title: "Instrumentele vaardigheden",
		surveyOption: "alpha",
	},
	{
		identifier: 'informationSkills',
		title: "Informatievaardigheden",
		surveyOption: "alpha",
	},
	{
		identifier: 'mediaSkills',
		title: "Mediavaardigheden",
		surveyOption: "alpha",
	}
];

questionnaire.standard = { 
	"1 - ICT Geletterdheid":
	{
		"a - ICT Basisvaardigheden":
		[
		"Ik weet welke ICT voorzieningen (hard- en software) er bij ons op school beschikbaar zijn",
		"Ik gebruik de ICT voorzieningen met gemak",
		"Ik ben in staat om meerdere types (mobiele) devices in te zetten (denk aan: smartphone, tablet, chromebook e.d.)",
		"Ik kan mij zonder veel moeite een nieuw device eigen maken en gebruiken voor educatieve toepassingen",
		"Ik sla mijn mappen en bestanden steeds vaker op in de cloud (Google Drive, OneDrive, Dropbox) en snap hoe ik daarmee documenten kan beheren en delen",
		"Ik maak snelkoppelingen naar veelgebruikte mappen of internetpagina's op mijn desktop",
		"Ik kan met verschillende bestandstypen en omgaan met bestanden (opslaan/terugvinden, kopiëren/verwijderen, verzenden/ontvangen, delen) op verschillende opslagmedia",
		"Ik creëer informatie en gebruik het internet voor de publicatie (website, blog, etc.)",
		"Ik ben op de hoogte van de mogelijkheden van YouTube, kan filmpjes toevoegen of een afspeellijst samenstellen",
		"Ik maak zelf wel eens filmpjes om mijn boodschap goed over te brengen"
		]
		,
		"b - Informatievaardigheden":
		[
		"Informatie die ik vind op internet kan ik makkelijk integreren in presentaties of opdrachten, zonder dat ik daar veel werk aan heb (bijvoorbeeld knippen en plakken, of integreren van filmpjes in een presentatie)",
		"Als mijn zoekopdrachten onvoldoende resultaat opleveren, probeer ik mijn zoektermen aan te passen om toch de informatie te vinden die ik zoek",
		"Ik controleer over het algemeen de juistheid en actualiteit van de websites of andere plekken waar ik mijn informatie vandaan haal",
		"Ik gebruik een internetbrowser met favorieten zodat ik snel op mijn meest gebruikte pagina's terecht kan",
		"Ik kan goed uit de voeten met zoekvelden, filters en sorteerfuncties",
		"Als ik (leer)materiaal maak met informatie die ik op internet vind, vermeld ik altijd de bron en ik weet welke regels hiervoor gelden",
		"Ik weet hoe ik de betrouwbaarheid van educatieve software en websites kan controleren"
		]
		,
		"c - Mediawijsheid":
		[
		"Ik weet hoe ik filmpjes of afbeeldingen kan bewerken (bijvoorbeeld inkorten of tekst toevoegen) en doe dat soms ook om de les er beter van te maken",
		"Ik lees jaarlijks meer dan 3 artikelen over het gebruik van ICT in het onderwijs",
		"Ik gebruik dagelijks ICT toepassingen in mijn onderwijs",
		"Ik waak over de nettiquette binnen sociale netwerken",
		"Ik probeer regelmatig nieuwe ICT toepassingen uit in mijn lessen",
		"Ik kan een overzicht geven van gebruikte sociale netwerken zoals Facebook, LinkedIn e.d.",
		"Ik snap goed welke risico's internet en sociale media met zich meebrengen en wat dit voor invloed heeft op de dynamiek in de klas",
		"Ik verbeter me in de mediavaardigheden die ik zelf nodig heb om in deze digitale samenleving goed te functioneren",
		"Ik probeer de risico's van sociale media te bespreken in mijn klas, door dit bijvoorbeeld te verwerken in een reflectie van een opdracht",
		"Ik leer mijn klas 21e eeuwse vaardigheden zoals kritisch denken, oplossend vermogen en digitale vaardigheden door deze in te passen in de standaard methoden",
		"Ik heb met mijn klas regelmatig gesprekken over wat er gebeurt op sociale media zoals WhatsApp, Instagram en SnapChat (bijvoorbeeld roddelen of pesten) en hoe ze daarmee om (kunnen) gaan"
		]				
		,"d - Computational Thinking":
		[
		"Ik kan informatie weergeven in relevante grafieken, tabellen, woorden en plaatjes",
		"Ik snap eenvoudige programeerprincipes en kan deze toepassen op websites zoals Scratch of Microbit",
		"Ik kan een computerprogramma schrijven in een omgeving voor kinderen (Microbit / Scratch) of zelfs in een programeertaal zoals Python of C#",
		"Ik kan repetitieve taken laten uitvoeren door computers, bijvoorbeeld het laten uitrekenen van cellen in Excel of het automatisch vullen van brieven in Word",
		"Ik kan een probleem oplossen door het te automatiseren met behulp van bestaande programma's of websites, bijvoorbeeld met behulp van If This Then That",
		"Ik kan de Voice Assistent van mijn telefoon gebruiken om sneller taken uit te voeren op mijn telefoon"
		]				
	},		
	"2 - Pedagogisch Didactisch Handelen":
	{
		"a - Instructie geven": 
		[
		"Ik kan op eigen initiatief geschikte toepassingen inzetten bij het leerproces",
		"Ik ben actief op zoek naar nieuwe educatieve toepassingen en zet deze in binnen het onderwijs",
		"Ik gebruik wel eens tools als Kahoot!, Padlet, Mentimeter en Quizlet om mijn lessen te verrijken",
		"Ik kan een connectie tot stand brengen tussen (leerling-) devices en het digitale bord t.b.v. een interactieve manier van lesgeven",
		"Ik kan het aanwezige digibord functioneel en interactief inzetten in mijn lessen",
		"Ik ben bekend met video conferencing apps zoals Skype en FaceTime en kan daarmee op afstand instructie geven"
		]
		,
		"b - Laten leren":
		[
		"Ik kan leerlingen laten werken met educatieve programmas",
		"Ik kan apps downloaden, installeren, beoordelen en verwijderen",
		"Ik gebruik een online omgeving en/of elo die voor het onderwijs op onze school aanwezig is",
		"Ik weet hoe ik de online omgeving en/of elo vanaf verschillende devices kan benaderen",
		"Voor de op onderwijs gerichte online en/of elo omgeving weet ik hoe leerlingen toegevoegd of verwijderd moeten worden",
		"Als we op school een nieuwe digitale methode krijgen kan ik deze snel in mijn lessen gebruiken",
		"Ik zet op basis van onderzoek media bewust en systematisch in om het eigen onderwijs te verrijken en leerlingen optimaal te laten leren",
		"Ik ben in staat om met behulp van digitale leermiddelen leerlingen met uiteenlopende zorgbehoeften te ondersteunen"
		]
		,
		"c - Toetsen":
		[
		"Ik kan met behulp van digitale leermiddelen toetsen afnemen en de resultaten analyseren",
		"Ik ben in staat om zelf digitale toetsen te maken (bijvoorbeeld met behulp van Google formulieren)",
		"Ik kan de leerdoelen per leerling aanpassen met behulp van de resultaten van digitale toetsen",
		"Ik kan toetsen op maat aanbieden (adaptieve toets) met behulp van digitale leermiddelen"
		]							
	},
	"3 - Werken in de schoolcontext":
	{
		"a - Registreren": 
		[
		"Ik kan een absentie en cijferregistratie invoeren",
		"Ik kan dossiers aanleggen van leerlingen en deze gegevens met collegas delen",
		"Ik kan mijn administratie (bijvoorbeeld het opstellen van handelingsplannen of het schrijven van een rapportage) op afstand invoeren"
		]
		,
		"b - Volgen en verantwoorden":
		[
		"Ik kan een leerlingenrapport maken met behulp van de beschikbare software",
		"Ik kan een handelings of groepsplan opstellen met behulp van tekstverwerkers of spreadsheets",
		"Ik kan overzichten van resultaten maken en deze verwerken in presentaties",
		"Ik kan resultaten van leerlingen uit digitale leermiddelen analyseren en interpreteren"
		]
		,
		"c - Communiceren": [
		"Ik kan communiceren met anderen via e-mail of ander communicatieprogramma of app",
		"Ik gebruik sociale netwerken om het publiek (ouders, betrokken professionals e.d.) te informeren over relevante schoolse zaken",
		"Ik weet de kwaliteiten en verdiensten van het eigen onderwijs, de leerlingen en de school naar buiten toe te belichten"
		]
	},
	"4 - Persoonlijke Ontwikkeling":
	{
		"a - Ontwikkelingen volgen in vakgebied":
		[
		"Ik kan sociale netwerken professioneel gebruiken. Denk aan een WhatsApp-groep met collega's",
		"Ik kan een beschrijving geven van minimaal 3 onderwijs gerelateerde thema's per jaar die ik online volg (bijvoorbeeld via een interessegroep op LinkedIn of via nieuwsbrieven)",
		"Ik ben door middel van discussie, toevoegingen, e.d. bij minimaal 1 online thema over onderwijs online betrokken",
		"Ik ben van minimaal 1 online thema over onderwijs de moderator (= beheerder van het forum of onderwerp)"
		]
		,
		"b - Delen van ervaring":
		[
		"Ik deel mijn eigen ervaringen (bijvoorbeeld via een blog) en inspireer zo collega’s en vakgenoten",
		"Ik deel wel eens digitale content die ik zelf heb gemaakt voor in mijn lessen met collega's (bv op wikiwijs)",
		"Ik plaats wel een foto's of video's van de school, om ouders te informeren over het onderwijs in mijn klas",
		"Ik stimuleer de interactie tussen leerlingen en/of collega’s en vakgenoten"
		]
	}
};

questionnaire.alternative = {
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

questionnaire.topics = [
	{
		key: "ictSkills",
		topic: "1 - ICT Geletterdheid"
	},
	{
		key: "pedagogicalDidacticalSkills",
		topic: "2 - Pedagogisch Didactisch Handelen"
	},
	{
		key: "workInSchoolContext",
		topic: "3 - Werken in de schoolcontext"
	},
	{
		key: "personalDevelopment",
		topic: "4 - Persoonlijke Ontwikkeling"
	},
	{
		key: "instrumentalSkills",
		topic: "1 - Instrumentele vaardigheden"
	},
	{
		key: "informationSkills",
		topic: "2 - Informatievaardigheden"
	},
	{
		key: "mediaSkills",
		topic: "3 - Mediavaardigheden"
	},
];

questionnaire.ictSkills = {
 locale: "nl",
 title: "ICT Geletterdheid",
 pages: [
  {
   name: "basicSkills",
   elements: [
    {
     type: "boolean",
     name: "ict-voorzieningen",
     title: {
      nl: "ICT voorzieningen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik weet welke ICT voorzieningen (hard- en software) er bij ons op school beschikbaar zijn"
     }
    },
    {
     type: "boolean",
     name: "ict-gemak",
     title: {
      nl: "Gebruiksgemak ICT"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik gebruik de ICT voorzieningen met gemak"
     }
    },
    {
     type: "boolean",
     name: "devices",
     title: {
      nl: "Devices"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik ben in staat om meerdere types (mobiele) devices in te zetten (denk aan: smartphone, tablet, chromebook e.d.)"
     }
    },
    {
     type: "boolean",
     name: "nieuw-device",
     title: {
      nl: "Nieuw device"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan mij zonder veel moeite een nieuw device eigen maken en gebruiken voor educatieve toepassingen"
     }
    },
    {
     type: "boolean",
     name: "cloud-gebruik",
     title: {
      nl: "Cloud gebruik"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik sla mijn mappen en bestanden steeds vaker op in de cloud (Google Drive, OneDrive, Dropbox) en snap hoe ik daarmee documenten kan beheren en delen"
     }
    },
    {
     type: "boolean",
     name: "snelkoppelingen",
     title: {
      nl: "Snelkoppelingen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik maak snelkoppelingen naar veelgebruikte mappen of internetpagina's op mijn desktop"
     }
    },
    {
     type: "boolean",
     name: "bestand-opslag",
     title: {
      nl: "Bestandopslag"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan met verschillende bestandstypen en omgaan met bestanden (opslaan/terugvinden, kopiëren/verwijderen, verzenden/ontvangen, delen) op verschillende opslagmedia"
     }
    },
    {
     type: "boolean",
     name: "internet",
     title: {
      nl: "Internet gebruik"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik creëer informatie en gebruik het internet voor de publicatie (website, blog, etc.)"
     }
    },
    {
     type: "boolean",
     name: "youtube",
     title: {
      nl: "YouTube"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik ben op de hoogte van de mogelijkheden van YouTube, kan filmpjes toevoegen of een afspeellijst samenstellen"
     }
    },
    {
     type: "boolean",
     name: "filmen",
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
     name: "informatie-integratie",
     title: {
      nl: "Integreren informatie"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Informatie die ik vind op internet kan ik makkelijk integreren in presentaties of opdrachten, zonder dat ik daar veel werk aan heb (bijvoorbeeld knippen en plakken, of integreren van filmpjes in een presentatie)"
     }
    },
    {
     type: "boolean",
     name: "zoeken",
     title: {
      nl: "Zoekopdrachten"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Als mijn zoekopdrachten onvoldoende resultaat opleveren, probeer ik mijn zoektermen aan te passen om toch de informatie te vinden die ik zoek"
     }
    },
    {
     type: "boolean",
     name: "actualiteit",
     title: {
      nl: "Juistheid en actualiteit"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik controleer over het algemeen de juistheid en actualiteit van de websites of andere plekken waar ik mijn informatie vandaan haal"
     }
    },
    {
     type: "boolean",
     name: "favorieten",
     title: {
      nl: "Favorieten"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik gebruik een internetbrowser met favorieten zodat ik snel op mijn meest gebruikte pagina's terecht kan"
     }
    },
    {
     type: "boolean",
     name: "filteren",
     title: {
      nl: "Zoeken en sorteren"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan goed uit de voeten met zoekvelden, filters en sorteerfuncties"
     }
    },
    {
     type: "boolean",
     name: "leermateriaal",
     title: {
      nl: "Leermateriaal"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Als ik (leer)materiaal maak met informatie die ik op internet vind, vermeld ik altijd de bron en ik weet welke regels hiervoor gelden"
     }
    },
    {
     type: "boolean",
     name: "betrouwbaarheid",
     title: {
      nl: "Ik weet hoe ik de betrouwbaarheid van educatieve software en websites kan controleren"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Betrouwbaarheid controleren"
     }
    }
   ],
   title: {
    nl: "Informatievaardigheden"
   }
  },
  {
   name: "mediaSkills",
   elements: [
    {
     type: "boolean",
     name: "bewerken",
     title: {
      nl: "Bewerken"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik weet hoe ik filmpjes of afbeeldingen kan bewerken (bijvoorbeeld inkorten of tekst toevoegen) en doe dat soms ook om de les er beter van te maken"
     }
    },
    {
     type: "boolean",
     name: "artikelen",
     title: {
      nl: "Artikelen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik lees jaarlijks meer dan 3 artikelen over het gebruik van ICT in het onderwijs"
     }
    },
    {
     type: "boolean",
     name: "veelvuldig",
     title: {
      nl: "Veelvuldig gebruik"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik gebruik dagelijks ICT toepassingen in mijn onderwijs"
     }
    },
    {
     type: "boolean",
     name: "nettiquette",
     title: {
      nl: "Nettiquette"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik waak over de nettiquette binnen sociale netwerken"
     }
    },
    {
     type: "boolean",
     name: "toepassen",
     title: {
      nl: "Toepassen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik probeer regelmatig nieuwe ICT toepassingen uit in mijn lessen"
     }
    },
    {
     type: "boolean",
     name: "sociale-netwerken",
     title: {
      nl: "Sociale netwerken"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan een overzicht geven van gebruikte sociale netwerken zoals Facebook, LinkedIn e.d."
     }
    },
    {
     type: "boolean",
     name: "risicos",
     title: {
      nl: "Risico's"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik snap goed welke risico's internet en sociale media met zich meebrengen en wat dit voor invloed heeft op de dynamiek in de klas"
     }
    },
    {
     type: "boolean",
     name: "mediavaardigheden",
     title: {
      nl: "Mediavaardigheden"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik verbeter me in de mediavaardigheden die ik zelf nodig heb om in deze digitale samenleving goed te functioneren"
     }
    },
    {
     type: "boolean",
     name: "bespreken",
     title: {
      nl: "Bespreken"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik probeer de risico's van sociale media te bespreken in mijn klas, door dit bijvoorbeeld te verwerken in een reflectie van een opdracht"
     }
    },
    {
     type: "boolean",
     name: "kritisch-denken",
     title: {
      nl: "Kritisch denken"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik leer mijn klas 21e eeuwse vaardigheden zoals kritisch denken, oplossend vermogen en digitale vaardigheden door deze in te passen in de standaard methoden"
     }
    },
    {
     type: "boolean",
     name: "gesprekken",
     title: {
      nl: "Gesprekken"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik heb met mijn klas regelmatig gesprekken over wat er gebeurt op sociale media zoals WhatsApp, Instagram en SnapChat (bijvoorbeeld roddelen of pesten) en hoe ze daarmee om (kunnen) gaan"
     }
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
     name: "grafieken",
     title: {
      nl: "Grafieken"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan informatie weergeven in relevante grafieken, tabellen, woorden en plaatjes"
     }
    },
    {
     type: "boolean",
     name: "scratch",
     title: {
      nl: "Scratch"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik snap eenvoudige programmeer principes en kan deze toepassen op websites zoals Scratch of Microbit"
     }
    },
    {
     type: "boolean",
     name: "programmeren",
     title: {
      nl: "Programmeren"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan een computerprogramma schrijven in een omgeving voor kinderen (Microbit / Scratch) of zelfs in een programmeertaal zoals Python of C#"
     }
    },
    {
     type: "boolean",
     name: "repetitief",
     title: {
      nl: "Repetitieve taken"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan repetitieve taken laten uitvoeren door computers, bijvoorbeeld het laten uitrekenen van cellen in Excel of het automatisch vullen van brieven in Word"
     }
    },
    {
     type: "boolean",
     name: "automatiseren",
     title: {
      nl: "Automatiseren"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan een probleem oplossen door het te automatiseren met behulp van bestaande programma's of websites, bijvoorbeeld met behulp van If This Then That"
     }
    },
    {
     type: "boolean",
     name: "voice-assistent",
     title: {
      nl: "Voice Assistent"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan de Voice Assistent van mijn telefoon gebruiken om sneller taken uit te voeren op mijn telefoon"
     }
    }
   ],
   title: {
    nl: "Computational Thinking"
   }
  }
 ],
 showTitle: false
};

questionnaire.pedagogicalDidacticalSkills = {
 locale: "nl",
 title: {
  default: "ICT Geletterdheid",
  nl: "Pedagogisch Didactisch Handelen"
 },
 pages: [
  {
   name: "instructing",
   elements: [
    {
     type: "boolean",
     name: "toepassingen",
     title: {
      nl: "Toepassingen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan op eigen initiatief geschikte toepassingen inzetten bij het leerproces"
     }
    },
    {
     type: "boolean",
     name: "actief",
     title: {
      nl: "Actief zoeken"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik ben actief op zoek naar nieuwe educatieve toepassingen en zet deze in binnen het onderwijs"
     }
    },
    {
     type: "boolean",
     name: "tools",
     title: {
      nl: "Tools"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik gebruik wel eens tools als Kahoot!, Padlet, Mentimeter en Quizlet om mijn lessen te verrijken"
     }
    },
    {
     type: "boolean",
     name: "connection",
     title: {
      nl: "Digitale bord"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan een connectie tot stand brengen tussen (leerling-) devices en het digitale bord t.b.v. een interactieve manier van lesgeven"
     }
    },
    {
     type: "boolean",
     name: "schoolbord1",
     title: {
      nl: "Digitaal bord"
     },
     defaultValue: "false",
     label: {
      nl: "Ik kan het aanwezige digibord functioneel en interactief inzetten in mijn lessen"
     }
    },
    {
     type: "boolean",
     name: "videoconferencing",
     title: {
      nl: "Video Conferencing"
     },
     defaultValue: "false",
     label: {
      nl: "Ik ben bekend met video conferencing apps zoals Skype en FaceTime en kan daarmee op afstand instructie geven"
     }
    }
   ],
   title: {
    nl: "Instructie geven"
   }
  },
  {
   name: "learning",
   elements: [
    {
     type: "boolean",
     name: "programs",
     title: {
      nl: "Educatieve programma's"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan leerlingen laten werken met educatieve programma's"
     }
    },
    {
     type: "boolean",
     name: "apps",
     title: {
      nl: "Apps"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan apps downloaden, installeren, beoordelen en verwijderen"
     }
    },
    {
     type: "boolean",
     name: "online",
     title: {
      nl: "Online omgeving"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik gebruik een online omgeving en/of elo die voor het onderwijs op onze school aanwezig is"
     }
    },
    {
     type: "boolean",
     name: "elo",
     title: {
      nl: "Elektronische Leeromgeving"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik weet hoe ik de online omgeving en/of elo vanaf verschillende devices kan benaderen"
     }
    },
    {
     type: "boolean",
     name: "students",
     title: {
      nl: "ELO leerlingen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Voor de op onderwijs gerichte online en/of elo omgeving weet ik hoe leerlingen toegevoegd of verwijderd moeten worden"
     }
    },
    {
     type: "boolean",
     name: "methode",
     title: {
      nl: "Digitale methode"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Als we op school een nieuwe digitale methode krijgen kan ik deze snel in mijn lessen gebruiken"
     }
    },
    {
     type: "boolean",
     name: "onderwijs",
     title: {
      nl: "Onderwijs"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik zet op basis van onderzoek media bewust en systematisch in om het eigen onderwijs te verrijken en leerlingen optimaal te laten leren"
     }
    },
    {
     type: "boolean",
     name: "zorgbehoefte",
     title: {
      nl: "Zorgbehoeften"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik ben in staat om met behulp van digitale leermiddelen leerlingen met uiteenlopende zorgbehoeften te ondersteunen"
     }
    }
   ],
   title: {
    nl: "Laten leren"
   }
  },
  {
   name: "testing",
   elements: [
    {
     type: "boolean",
     name: "digital",
     title: {
      nl: "Digitaal toetsen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan met behulp van digitale leermiddelen toetsen afnemen en de resultaten analyseren"
     }
    },
    {
     type: "boolean",
     name: "forms",
     title: {
      nl: "Google Forms"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik ben in staat om zelf digitale toetsen te maken (bijvoorbeeld met behulp van Google formulieren)"
     }
    },
    {
     type: "boolean",
     name: "leerdoelen",
     title: {
      nl: "Leerdoelen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan de leerdoelen per leerling aanpassen met behulp van de resultaten van digitale toetsen"
     }
    },
    {
     type: "boolean",
     name: "adaptief",
     title: {
      nl: "Adaptieve toets"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan toetsen op maat aanbieden (adaptieve toets) met behulp van digitale leermiddelen"
     }
    }
   ],
   title: {
    nl: "Toetsen"
   }
  }
 ],
 showTitle: false
};

questionnaire.workInSchoolContext = {
 locale: "nl",
 title: {
  default: "ICT Geletterdheid",
  nl: "Werken in de schoolcontext"
 },
 pages: [
  {
   name: "registration",
   elements: [
    {
     type: "boolean",
     name: "registratie",
     title: {
      nl: "ELO registratie"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan een absentie en cijferregistratie invoeren"
     }
    },
    {
     type: "boolean",
     name: "dossiers",
     title: {
      nl: "Dossiers"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan dossiers aanleggen van leerlingen en deze gegevens met collega's delen"
     }
    },
    {
     type: "boolean",
     name: "administratie",
     title: {
      nl: "Administratie"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan mijn administratie (bijvoorbeeld het opstellen van handelingsplannen of het schrijven van een rapportage) op afstand invoeren\n"
     }
    }
   ],
   title: {
    nl: "Registreren"
   }
  },
  {
   name: "justification",
   elements: [
    {
     type: "boolean",
     name: "rapport",
     title: {
      nl: "Leerlingen rapport"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan een leerlingen rapport maken met behulp van de beschikbare software"
     }
    },
    {
     type: "boolean",
     name: "plannen",
     title: {
      nl: "Plannen opstellen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan een handelings- of groepsplan opstellen met behulp van tekstverwerkers of spreadsheets"
     }
    },
    {
     type: "boolean",
     name: "overzichten",
     title: {
      nl: "Overzichten"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan overzichten van resultaten maken en deze verwerken in presentaties"
     }
    },
    {
     type: "boolean",
     name: "resultaten",
     title: {
      nl: "Resultaten"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan resultaten van leerlingen uit digitale leermiddelen analyseren en interpreteren"
     }
    }
   ],
   title: {
    nl: "Volgen en verantwoorden"
   }
  },
  {
   name: "communication",
   elements: [
    {
     type: "boolean",
     name: "communiceren",
     title: {
      nl: "Communiceren"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan communiceren met anderen via e-mail of ander communicatieprogramma of app"
     }
    },
    {
     type: "boolean",
     name: "netwerken",
     title: {
      nl: "Sociale netwerken"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik gebruik sociale netwerken om het publiek (ouders, betrokken professionals e.d.) te informeren over relevante schoolse zaken"
     }
    },
    {
     type: "boolean",
     name: "visibiliteit",
     title: {
      nl: "Visibiliteit"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik weet de kwaliteiten en verdiensten van het eigen onderwijs, de leerlingen en de school naar buiten toe te belichten"
     }
    }
   ],
   title: {
    nl: "Communiceren"
   }
  }
 ],
 showTitle: false
};

questionnaire.personalDevelopment = {
 locale: "nl",
 title: {
  default: "ICT Geletterdheid",
  nl: "Persoonlijke Ontwikkeling"
 },
 pages: [
  {
   name: "developing",
   elements: [
    {
     type: "boolean",
     name: "whatsapp",
     title: {
      nl: "WhatsApp"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan sociale netwerken professioneel gebruiken. Denk aan een WhatsApp-groep met collega's"
     }
    },
    {
     type: "boolean",
     name: "linkedin",
     title: {
      nl: "LinkedIn"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik kan een beschrijving geven van minimaal 3 onderwijs gerelateerde thema's per jaar die ik online volg (bijvoorbeeld via een interessegroep op LinkedIn of via nieuwsbrieven)"
     }
    },
    {
     type: "boolean",
     name: "discussies",
     title: {
      nl: "Online discussies"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik ben door middel van discussie, toevoegingen, e.d. bij minimaal 1 online thema over onderwijs online betrokken"
     }
    },
    {
     type: "boolean",
     name: "moderator",
     title: {
      nl: "Moderator"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik ben van minimaal 1 online thema over onderwijs de moderator (= beheerder van het forum of onderwerp)"
     }
    }
   ],
   title: {
    nl: "Ontwikkelingen volgen in vakgebied"
   }
  },
  {
   name: "sharing",
   elements: [
    {
     type: "boolean",
     name: "ervaringen",
     title: {
      nl: "Ervaringen delen"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik deel mijn eigen ervaringen (bijvoorbeeld via een blog) en inspireer zo collega’s en vakgenoten"
     }
    },
    {
     type: "boolean",
     name: "content",
     title: {
      nl: "Digitale content"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik deel wel eens digitale content die ik zelf heb gemaakt voor in mijn lessen met collega's (bv op wikiwijs)"
     }
    },
    {
     type: "boolean",
     name: "informeren",
     title: {
      nl: "Informeren"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik plaats wel een foto's of video's van de school, om ouders te informeren over het onderwijs in mijn klas"
     }
    },
    {
     type: "boolean",
     name: "stimuleren",
     title: {
      nl: "Stimuleren"
     },
     defaultValue: "false",
     isRequired: true,
     label: {
      nl: "Ik stimuleer de interactie tussen leerlingen en/of collega’s en vakgenoten"
     }
    }
   ],
   title: {
    nl: "Delen van ervaring"
   }
  }
 ],
 showTitle: false
};

module.exports = questionnaire;