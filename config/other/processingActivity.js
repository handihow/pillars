var processingActivity = {};

processingActivity.categoriesOfData = [
        "A. Identificatiegegevens",
        "B. Financiële bijzonderheden",
        "C. Persoonlijke kenmerken",
        "D. Fysieke gegevens",
        "E. Leefgewoonten",
        "F. Psychische gegevens",
        "G. Samenstelling van het gezin",
        "H. Vrijetijdsbesteding en interesses",
        "I. Lidmaatschappen",
        "J. Gerechtelijke gegevens",
        "K. Consumptiegewoonten",
        "L. Woningkenmerken",
        "M. Gezondheidsgegevens",
        "N. Opleiding en training",
        "O. Beroep en betrekking",
        "P. Burger Service Nummer / Identificatienummer",
        "Q. Raciale of etnische gegevens",
        "R. Gegevens over sexuele voorkeur",
        "S. Politieke opvattingen",
        "T. Lidmaatschap van een vakbond",
        "U. Filosofische of religieuze overtuigingen",
        "V. Beeldopnamen",
        "W. Geluidsopnamen",
        "X. Genetische gegevens",
        "Y. Biometrische gegevens",
        "Z. Locatiegegevens"
    ];

processingActivity.legalJustification = [
    "Toestemming",
    "Contractuele overeenkomst",
    "Wettelijke verplichting",
    "Vitaal belang",
    "Taak van algemeen belang",
    "Gerechtvaardigd belang"
];

processingActivity.securityMeasures = [
    "Encryptie",
    "Pseudonimisering",
    "Verwerkersovereenkomst",
    "Fysieke toegangscontrole",
    "Incident- en datalekmanagement",
    "Anders"
]

processingActivity.categoriesOfGoals = [
    "Organiseren of het geven van onderwijs (onderwijsovereenkomst) - Wettelijk en overeenkomst",
    "Berekenen, vastleggen en innen van ‘gelden’ - Overeenkomst, gerechtvaardigd belang",
    "Verantwoorden aan DUO, onderwijsinspectie en accountant - Wettelijke verplichting en overeenkomst",
    "Verstrekken van (digitale) leermiddelen - Overeenkomst, gerechtvaardigd belang", 
    "Begeleiding leerlingen (pedagogisch dossier) en studieadvies - Wettelijk en overeenkomst",
    "Onderzoek - Overeenkomst, gerechtvaardigd belang",
    "Uitvoering of toepassing van een andere wet of taak van algemeen belang - Wettelijk, overeenkomst, publieke taak"
];

processingActivity.dataRetentionCategories = [
    "Gegevens over in- en uitschrijving - 5 jaar",
    "Gegevens over verzuim en afwezigheid - minimaal 5 jaar",
    "Gegevens die nodig zijn om de bekostiging te berekenen - minimaal 7 jaar",
    "Gegevens leerling na overstap naar speciaal onderwijs - 3 jaar",
    "Camera en videobeelden - maximaal 4 weken, dan wel na afhandeling van geconstateerde incidenten",
    "Het onderwijskundig dossier - maximaal 2 jaar",
    "Gezondheidsgegevens die nodig zijn voor speciale begeleiding of voorzieningen - maximaal 2 jaar",
    "Adresgegevens - maximaal 2 jaar",
    "Werk centraal examen + cijferlijst - minimaal 6 maanden",
    "Schoolexamens - maximaal 2 jaar"
];

processingActivity.categoriesOfConcerned = [
    "Leerlingen po of vo (waaronder ook gegevens van ouders en voogd vallen)",
    "Medewerkers in loondienst",
    "Medewerkers niet in loondienst (ook externe begeleiders)",
    "Relaties (alumni, belangstellenden, sollicitanten)",
    "Anders nl."
];

processingActivity.riskClassificationsAvailability = [
    "Niveau 1: Laag (Beschikbaarheid is onbelangrijk)",
    "Niveau 2: Midden (Beschikbaarheid is belangrijk)",
    "Niveau 3: Hoog (Beschikbaarheid is noodzakelijk)"
];

processingActivity.riskClassificationsIntegrity = [
    "Niveau 1: Laag (Integriteit is onbelangrijk)",
    "Niveau 2: Midden (Integriteit is beschermd)",
    "Niveau 3: Hoog (Integriteit is noodzakelijk)"
];

processingActivity.riskClassificationsConfidentiality = [
    "Niveau 1: Laag (Informatie is voor intern gebruik)",
    "Niveau 2: Midden (Informatie is vertrouwelijk)",
    "Niveau 3: Hoog (Informatie is geheim)"
];

module.exports = processingActivity;