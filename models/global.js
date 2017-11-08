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
                                    "Natuur",
                                    "Geschiedenis",
                                    "Verkeer",
                                    "Muziek",
                                    "Godsdienst of Levensbeschouwing",
                                    "Staatsinrichting",
                                    "Seksuele voorlichting",
                                    "Engels",
                                    "Techniek"
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


//PROFIEL VRAGEN

global.profiel = 

		{ 
					"ICT Geletterdheid":
								{
									"ICT Basisvaardigheden":
													[
														"Ik heb een beeld bij veel voorkomende termen in relatie tot computer (zoals netwerk, wifi, router, modem, cloud)",
														"Ik kan gebruik maken van digitale apparaten, software en toepassingen",
														"Ik kan met verschillende bestandstypen en omgaan met bestanden (opslaan/terugvinden, kopiëren/verwijderen, verzenden/ontvangen, delen) op verschillende opslagmedia",
														"Ik creeer en publiceer een presentatie of eigen content (bijvoorbeeld een videomontage op YouTube) en plaats dit via het meest geschikte medium voor het bepaalde doel",
														"Ik creëer informatie en gebruik het internet voor de publicatie (website, blog, etc.)"
													]
									,
									"Informievaardigheden":
													[
														"Ik kan een zoekvraag formuleren vanuit een informatiebehoefte en relevante zoekterm(en) bepalen bij een zoekvraag",
														"Ik kan de gevonden informatie beoordelen op bruikbaarheid, betrouwbaarheid en representativiteit en de gevonden informatie analyseren, interpreteren en ordenen",
														"Ik kan de zoekvraag en het antwoord hierop op een passende wijze verwerken en presenteren",
														"Ik kan het gevonden resultaat als antwoord op de informatiebehoefte evalueren",
														"Ik kan het proces van informatieverwerving en verwerking evalueren"
													]
									,
									"Mediawijsheid":
													[
														"Ik volg technologische ontwikkelingen op de voet en probeer de nieuwste technologieën uit",
														"Ik switch trefzeker van de ene naar de andere toepassing en tussen apparaten",
														"Ik waak over de nettiquette binnen sociale netwerken",
														"Ik weet wanneer welke mediatoepassingen het meest effectief zijn en zet deze op basis daarvan effectief in",
														"Ik inspireer leerlingen om nieuwe en sociale media te gebruiken om relevante kennis en ervaringen uit te wisselen en elkaars leren te versterken"
													]				
									,"Computational Thinking":
													[
														"Ik kan informatie weergeven in relevante grafieken, tabellen, woorden en plaatjes",
														"Ik kan oplossingen automatiseren door middel van algoritmisch denken",
														"Ik kan een computerprogramma schrijven in code",
														"Ik kan repetitieve taken laten uitvoeren door computers",
														"Ik kan complexiteit reduceren en algemene concepten overbrengen"
													]				
								},		
					"Pedagogisch Didactisch Handelen":
								{
									"Instructie geven": 
													[
														"Ik kan op eigen initiatief geschikte toepassingen inzetten bij het leerproces",
														"Ik ben actief op zoek naar nieuwe educatieve toepassingen en zet deze in binnen het onderwijs",
														"Ik creëer met deze toepassingen hoogwaardige content om de onderwijspraktijk te verrijken",
														"Ik innoveer het onderwijs door gebruik te maken van innovatieve toepassingen en applicaties",
														"Ik gebruik het digitale schoolbord effectief bij de instructie",
														"Ik ben bekend met video conferencing apps zoals Skype en FaceTime en kan daarmee op afstand instructie geven"
													]
									,
									"Laten leren":
													[
														"Ik kan leerlingen laten werken met educatieve programmas",
														"Ik kan apps downloaden, installeren, beoordelen en verwijderen",
														"Ik weet wanneer welke toepassingen het meest geschikt zijn om didactisch in te zetten",
														"Ik weet diverse zelf geproduceerde multimedia content effectief in te zetten om leerlingen te inspireren en het leren te bevorderen",
														"Ik creëer met behulp van multimedia- tools rijke en krachtige digitale leeromgevingen voor de eigen leerlingen",
														"Ik ben op de hoogte van recente onderzoeksresultaten over nut en beperkingen van de inzet van traditionele, nieuwe en sociale media binnen educatieve contexten",
														"Ik zet op basis van deze inzichten diverse media bewust en systematisch in om het eigen onderwijs te verrijken en leerlingen optimaal te laten leren",
														"Ik ben in staat om met behulp van digitale leermiddelen leerlingen met uiteenlopende zorgbehoeften te ondersteunen"
													]
									,
									"Toetsen":
													[
														"Ik kan met behulp van digitale leermiddelen toetsen afnemen en de resultaten analyseren",
														"Ik ben in staat om zelf digitale toetsen te maken (bijvoorbeeld met behulp van Google formulieren)",
														"Ik kan de leerdoelen per leerling aanpassen met behulp van de resultaten van digitale toetsen",
														"Ik kan toetsen op maat aanbieden (adaptieve toets) met behulp van digitale leermiddelen"
													]							
								},
					"Werken in de schoolcontext":
								{
									"Registreren": 
													[
														"Ik kan een absentie en cijferregistratie invoeren",
														"Ik kan dossiers aanleggen van leerlingen en deze gegevens met collegas delen",
														"Ik kan mijn administratie (bijvoorbeeld het opstellen van handelingsplannen of het schrijven van een rapportage) op afstand invoeren"
													]
									,
									"Volgen en verantwoorden":
													[
														"Ik kan een leerlingenrapport maken met behulp van de beschikbare software",
														"Ik kan een handelings of groepsplan opstellen met behulp van tekstverwerkers of spreadsheets",
														"Ik kan overzichten van resultaten maken en deze verwerken in presentaties",
														"Ik kan resultaten van leerlingen uit digitale leermiddelen analyseren en interpreteren"
													]
									,
									"Communiceren": [
														"Ik kan communiceren met anderen via e-mail of ander communicatieprogramma of app",
														"Ik gebruik sociale netwerken om het publiek (ouders, betrokken professionals e.d.) te informeren over relevante schoolse zaken",
														"Ik weet de kwaliteiten en verdiensten van het eigen onderwijs, de leerlingen en de school naar buiten toe te belichten"
													]
								},
					"Persoonlijke Ontwikkeling":
								{
									"Ontwikkelingen volgen in vakgebied":
													[
														"Ik heb een persoonlijke strategie om via diverse nieuwe mediatoepassingen en sociale netwerken vakinhoudelijke en educatief relevante informatie optimaal tot me te laten komen",
														"Ik weet deze informatie systematisch te beheren",
														"Ik volg de ontwikkelingen op het gebied van de inzet van (nieuwe en sociale) media in het onderwijs actief. Ik laat me inspireren door innovatieve best practices van collega’s in binnen- en buitenland",
														"Ik benut in alle facetten van het eigen professionele functioneren de mogelijkheden die traditionele, nieuwe en sociale media bieden"
													]
									,
									"Delen van ervaring":
													[
														"Ik deel mijn eigen ervaringen (bijvoorbeeld via een blog) en inspireer zo collega’s en vakgenoten",
														"Ik deel deze informatie (wanneer wenselijk) en kiest daarbij voor verschillende doelgroepen (leerlingen, naaste collega’s, vakgenoten, ouders, etc.) telkens het juiste medium",
														"Ik inspireer anderen over de mogelijkheden van sociale netwerken voor kennisdeling en co- creatie en benut deze optimaal",
														"Ik stimuleer de interactie tussen leerlingen en/of collega’s en vakgenoten",
														"Ik deel expertise met vakgenoten en collega’s om ook hun mediastrategie te optimaliseren"
													]
								}
		};

module.exports = global;