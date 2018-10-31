//Definition of global variables

var global = {};

// Types of Hardware: enkelvoud en meervoud
global.hardwareTypes = [
        {
            enkelvoud: "Desktop",
            meervoud: "Desktops",
            bijhouden: true
        },
        {
            enkelvoud: "Multipoint computer",
            meervoud: "Multipoint computers",
            bijhouden: true
        },
        {
            enkelvoud: "Laptop",
            meervoud: "Laptops",
            bijhouden: true
        },
        {
            enkelvoud: "Digitaal schoolbord",
            meervoud: "Digitale schoolborden",
            bijhouden: true
        },
        {
            enkelvoud: "Tablet",
            meervoud: "Tablets",
            bijhouden: true
        },
        {
            enkelvoud: "Chromebook",
            meervoud: "Chromebooks",
            bijhouden: true
        },
        {
            enkelvoud: "Telefoon",
            meervoud: "Telefoons",
            bijhouden: false
        },
        {
            enkelvoud: "Kopieermachine",
            meervoud: "Kopieermachines",
            bijhouden: false
        },
        {
            enkelvoud: "Printer",
            meervoud: "Printers",
            bijhouden: false
        },
        {
            enkelvoud: "Access Point",
            meervoud: "Access Points",
            bijhouden: false
        },
        {
            enkelvoud: "Robotica",
            meervoud: "Robotica",
            bijhouden: false
        },
        {
            enkelvoud: "Beamer",
            meervoud: "Beamers",
            bijhouden: false
        },
        {
            enkelvoud: "Monitor",
            meervoud: "Monitoren",
            bijhouden: false
        },
        {
            enkelvoud: "Switch",
            meervoud: "Switches",
            bijhouden: false
        }
];

global.software = {
        "Rekenen":              ["Rekenen"],
        "Technisch lezen":      ["Technisch lezen"],
        "Begrijpend lezen":     ["Begrijpend lezen"],
        "Spelling":             ["Spelling"],
        "Taal":                 ["Taal"],
        "Overige": 
                                [
                                    "Aardrijkskunde",
                                    "Biologie",
									"Duits",
									"Economie",
									"Engels",
                                    "Frans",
                                    "Geschiedenis",
                                    "Godsdienst of Levensbeschouwing",
                                    "Grieks",
                                    "Latijn",
                                    "Lichamelijke opvoeding",
                                    "Maatschappijleer",
                                    "Muziek",
                                    "Natuur",
                                    "Natuurkunde",
                                    "Scheikunde",
                                    "Seksuele voorlichting",
                                    "Staatsinrichting",
                                    "Spaans",
                                    "Techniek",
                                    "Verkeer",
   	                                "Website",                               
                                    "Wiskunde"       
                                ],
        "ICT Geletterdheid": 
                                [
                                    "Toetsenbordvaardigheid",
                                    "Programmeren",
                                    "Mediawijsheid"
                                ]
        };

global.softwareFuncties = [
                                "Instructie", 
                                "Oefenen", 
                                "Toets"
                                ];

global.softwareKwaliteiten = [
                                "Sluit goed aan op leerdoelen", 
                                "Is aantrekkelijk en gebruiksvriendelijk", 
                                "Toont resultaten van leerlingen", 
                                "Is adaptief", 
                                "Leerlingen kunnen thuis oefenen"
                                ];

// NORMERING
    //NORMEN 1. HARDWARE
            //NORM 1.1: AANTAL COMPUTERS PER LEERLING
global.hardwareTypesCountedAsComputer = [
                                global.hardwareTypes[0].enkelvoud,
                                global.hardwareTypes[1].enkelvoud,
                                global.hardwareTypes[2].enkelvoud
                            ];

global.minRAM = 4;                          //werkgeheugen minimaal 4 GB

global.minYear = new Date().getFullYear() - 5;    //jaar van ingebruikname hoogstens 5 jaar oud

global.computersPerLeerling = 0.2;          //1 computer per 5 leerlingen

global.maxScoreComputersPerLeerling = 1.5;  //maximale score voor computers per leerling

        //NORM 1.2: AANTAL DIGITALE BORDEN PER KLASLOKAAL

global.isTouchscreen = true;

global.digibordenPerKlaslokaal = 1;          //1 digitaal schoolbord per klaslokaal

global.maxScoreDigibordenPerKlaslokaal = 1.5; // maximale score voor digiborden per klaslokaal

        //NORM 1.3: GOED NETWERK
    
global.maxScoreNetwerk = 1;

        //NORM 1.4: AANTAL DRAAGBARE COMPUTERS PER SCHOOL
        
global.hardwareTypesCountedAsPortableComputer = [
                                                global.hardwareTypes[2].enkelvoud,
                                                global.hardwareTypes[4].enkelvoud,
                                                global.hardwareTypes[5].enkelvoud    
                                            ];

global.portableComputersPerSchool = 30;         //school heeft minimaal 30 draagbare computers zodat een klas in 1 keer een toets kan doen

global.maxScorePortableComputersPerSchool = 1;  //maximale score voor aantal draagbare computers per school

	//NORMEN DIGITALE LEERMIDDELEN

global.kwaliteiten = 0.75;
		//NORM 2.1: 

global.groepenRekenen = ["Groep 1", "Groep 2", "Groep 3", "Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"];

global.functiesRekenen = ["Instructie", "Oefenen"];

global.maxScoreRekenen = 1;

		//NORM 2.2:
		
global.groepenTechnischLezen = ["Groep 3", "Groep 4", "Groep 5", "Groep 6"];

global.functiesTechnischLezen = ["Instructie", "Oefenen", "Toets"];

global.maxScoreTechnischLezen = 1;		

		//NORM 2.3:

global.groepenBegrijpendLezen = ["Groep 5", "Groep 6", "Groep 7", "Groep 8"];

global.functiesBegrijpendLezen = ["Instructie", "Oefenen", "Toets"];

global.maxScoreBegrijpendLezen = 1;	

		//NORM 2.4:

global.groepenSpelling = ["Groep 3", "Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"];

global.functiesSpelling = ["Instructie", "Oefenen", "Toets"];

global.maxScoreSpelling = 0.5;	

		//NORM 2.5:

global.groepenTaal = ["Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"];

global.functiesTaal = ["Instructie", "Oefenen", "Toets"];

global.maxScoreTaal = 0.5;	

		//NORM 2.6:

global.groepenToetsenbordvaardigheid = ["Groep 7", "Groep 8"];

global.functiesToetsenbordvaardigheid = ["Instructie", "Oefenen"];

global.maxScoreToetsenbordvaardigheid = 0.33;	

		//NORM 2.7
		
global.groepenProgrammeren = ["Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"];

global.functiesProgrammeren = ["Instructie", "Oefenen"];

global.maxScoreProgrammeren = 0.33;			

		//NORM 2.8

global.groepenMediawijsheid = ["Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"];

global.functiesMediawijsheid = ["Instructie", "Oefenen"];

global.maxScoreMediawijsheid = 0.33;	

//NORM 3. DESKUNDIGHEID
		//NORM 3.1 BEOORDEELDE DESKUNDIGHEID

global.minBeoordeeldeDeskundigheid = 5;

global.maxScoreBeoordeeldeDeskundigheid = 1;

		//NORM 3.2 GEMIDDELDE EFFECTIVITEIT DIGITALE LEERMIDDELEN

global.gemEffectiviteitDigitaleLeermiddelen = 5;

global.maxScoreGemEffectiviteitDigitaleLeermiddelen = 0.5;

		//NORM 3.3 ONDERSTEUNING EN/OF TRAINING NODIG

global.ondersteuningNodig = false;

global.maxScoreOndersteuningNodig = 0.5;

		//NORM 3.4 ICT GELETTERDHEID
global.maxScoreICTGeletterdheid = 1;

		//NORM 3.5 PEDAGOGISCH DIDACTISCH HANDELEN
global.maxScorePedagogischDidactischHandelen = 1;
		
		//NORM 3.6 WERKEN IN DE SCHOOLCONTEXT
global.maxScoreWerkenSchoolcontext = 0.5;
		
		//NORM 3.7 PERSOONLIJKE ONTWIKKELING
global.maxScorePersoonlijkeOntwikkeling = 0.5;

	//NORMEN ORGANISATIE
		//NORM 4.1 ORGANISATORISCHE OVEREENSTEMMING
global.maxScoreOvereenstemming = 1;
		
		//NORM 4.2 NETWERKBEHEER
global.maxScoreNetwerkbeheer = 1;

		//NORM 4.3 ICT INCIDENTMELDER
global.urenICTIncidentmelder = 100;
global.extraUrenICTIncidentmelder = 20;
global.maxScoreICTIncidentmelder = 1;
		
		//NORM 4.4 ONDERWIJSKUNDIG ICTER
global.urenOnderwijskundigICTer = 80;
global.extraUrenOnderwijskundigICTer = 20;
global.maxScoreOnderwijskundigICTer = 1;

		//NORM 4.5 ICT INKOPER
global.urenICTInkoper = 10;
global.extraUrenICTInkoper = 5;
global.maxScoreICTInkoper = 1;

//PROFIEL VRAGEN

global.profiel = 

		{ 
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
									"b - Informievaardigheden":
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

global.versnellingsvraagProfiel = {
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

module.exports = global;