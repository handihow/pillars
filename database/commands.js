db.schools.updateMany({}, { $rename: { 
    'brin': 'schoolIdNumber',
    'vestigingsnummer': 'schoolLocationIdNumber',
    'instellingsnaam': 'name', 
    'straatnaam': 'streetName', 
    'huisnummer': 'houseNumber', 
    'postcode': 'postalCode',
    'plaatsnaam': 'city',
    'bevoegdGezag': 'organisationIdNumber',   
    'aantalLeerlingen': 'countStudents',
    'aantalKlaslokalen': 'countClassrooms',
    'heeftGoedBedraadNetwerk': 'network.wired',
    'heeftGoedWirelessNetwerk': 'network.wireless',
    'instellingenHardwareTypes': 'settings.hardware',
    'instellingenSoftware': 'settings.software.courses',
    'instellingenSoftwareFuncties': 'settings.software.functionality',
    'instellingenSoftwareKwaliteiten': 'settings.software.ratings',
    'deskLeerkrachten': 'competence.teachers',
    'deskOndersteuning': 'competence.support',
    'deskEffectiviteit': 'competence.effectiveness',
    'heeftOrganisatorischeOvereenstemming': 'management.agreement',
    'heeftGoedeNetwerkAanpassing': 'management.networkAdjustment',
    'heeftGoedeNetwerkProbleemOplossing': 'management.networkProblemSolving',
    'heeftGoedeIncidentMelding': 'management.incidentReporting'}}) 


db.hardwares.updateMany({}, { $rename: { 
    'naam': 'name',
    'merk': 'brand',
    'werkgeheugen': 'memory',
    'jaarIngebruikname': 'deploymentYear',
    'aantalWerkplekkenMultipoint': 'numberWorkPlacesMultipoint',
    'schermgrootteDigibord': 'screensizeDigibord',
    'leverancier': 'supplier',
    'garantievorm': 'warranty',
    'isVerouderd': 'isDepreciated',
    'waarschuwing': 'warning' }}) 

db.schools.find({ 'settings.hardware.0.enkelvoud': { $exists: true } }).snapshot().forEach(function(item)
{      
    for(i = 0; i != item.settings.hardware.length; ++i)
    {
        if(item.settings.hardware[i].enkelvoud){
            item.settings.hardware[i].singular = item.settings.hardware[i].enkelvoud; 
            item.settings.hardware[i].plural = item.settings.hardware[i].meervoud;
            item.settings.hardware[i].track = item.settings.hardware[i].bijhouden;
            delete item.settings.hardware[i].enkelvoud;
            delete item.settings.hardware[i].meervoud;
            delete item.settings.hardware[i].bijhouden
        }
    }
    db.schools.update({_id: item._id}, item);
});

db.schools.find({ 'name': { $exists: true } }).snapshot().forEach(function(item){
    if(!item.management){
        item.management = {}
    }
    item.management.roles = [];
    //incident reporter
    let incidentReporter = {
        key: 'incidentReporter',
        role: "ICT Incidentmelder",
        name: item.orgICTIncidentMelder ? item.orgICTIncidentMelder : '-',
        hoursPerYear: item["ICT Incidentmelder"],
        isKnownByTeamMembers: item.isBekendICTIncidentMelder ? "1" : "0"
    }
    item.management.roles.push(incidentReporter);
    if(item.orgICTIncidentMelder){delete item.orgICTIncidentMelder};
    delete item["ICT Incidentmelder"];
    if(item.isBekendICTIncidentMelder){delete item.isBekendICTIncidentMelder};
    //ict educational content manager
    let ictEducationalContentManager = {
        key: 'ictEducationalContentManager',
        role: "Onderwijskundig ICT'er",
        name: item.orgOnderwijskundigICTer ? item.orgOnderwijskundigICTer : '-',
        hoursPerYear: item["Onderwijskundig ICTer"],
        isKnownByTeamMembers: item.isBekendOnderwijskundigICTer ? "1" : "0"
    }
    item.management.roles.push(ictEducationalContentManager);
    if(item.orgOnderwijskundigICTer){delete item.orgOnderwijskundigICTer};
    delete item["Onderwijskundig ICTer"];
    if(item.isBekendOnderwijskundigICTer){delete item.isBekendOnderwijskundigICTer};
    //ict purchaser
    let ictPurchaser = {
        key: 'ictPurchaser',
        role: "ICT Inkoper",
        name: item.orgICTInkoper ? item.orgICTInkoper : '-',
        hoursPerYear: item["ICT Inkoper"],
        isKnownByTeamMembers: item.isBekendICTInkoper ? "1" : "0"
    }
    item.management.roles.push(ictPurchaser);
    if(item.orgICTInkoper){delete item.orgICTInkoper};
    delete item["ICT Inkoper"];
    if(item.isBekendICTInkoper){delete item.isBekendICTInkoper};
    //system administrator
    let systemAdministrator = {
        key:'systemAdministrator',
        role: "Systeembeheerder",
        name: "-",
        hoursPerYear: 0,
        isKnownByTeamMembers: "0"
    }
    item.management.roles.push(systemAdministrator);
    db.schools.update({_id: item._id}, item);
});

// db.schools.find({ 'name': { $exists: true } }).snapshot().forEach(function(item){
//     let keys = ['incidentReporter','ictEducationalContentManager', 'ictPurchaser', 'systemAdministrator'];
//     item.management.roles.forEach(function(role, index){
//         role.key = keys[index];
//     })
//     db.schools.update({_id: item._id}, item);
// });

db.softwares.updateMany({}, { $rename: { 
    'vak': 'subject',
    'naam': 'name',
    'functie': 'functionalities',
    'groep': 'gradeLevels',
    'kwaliteit': 'ratings',
    'effectiviteit': 'effectiveness',
    'licenties': 'licences',
    'leverancier': 'supplier'}});

db.profiels.renameCollection("questionnaires");

db.questionnaires.updateMany({}, { $rename: { 
    'profiel': 'questionnaire',
    'isActueel': 'isActual'}});

db.normerings.renameCollection("standards");

db.standards.updateMany({}, { $rename: {
    'naam': 'name',
    'minRAM': 'hardware.computersPerStudent.minRAM',
    'minYear': 'hardware.computersPerStudent.maxYear',
    'hardwareTypesCountedAsComputer': 'hardware.computersPerStudent.isComputer',
    'computersPerLeerling': 'hardware.computersPerStudent.standard',
    'isTouchscreen': 'hardware.digitalSchoolbordsPerClassroom.isTouchscreen',
    'digibordenPerKlaslokaal': 'hardware.digitalSchoolbordsPerClassroom.standard',
    'hardwareTypesCountedAsPortableComputer': 'hardware.laptopsPerSchool.isLaptop',
    'portableComputersPerSchool': 'hardware.laptopsPerSchool.standard',
    'maxScoreComputersPerLeerling': 'hardware.computersPerStudent.maxScore',
    'maxScoreDigibordenPerKlaslokaal': 'hardware.digitalSchoolbordsPerClassroom.maxScore',
    'maxScoreNetwerk': 'hardware.network.maxScore',
    'maxScorePortableComputersPerSchool': 'hardware.laptopsPerSchool.maxScore',
    'minBeoordeeldeDeskundigheid': 'competence.competenceRating.standard',
    'gemEffectiviteitDigitaleLeermiddelen': 'competence.softwareRating.standard',
    'maxScoreBeoordeeldeDeskundigheid': 'competence.competenceRating.maxScore',
    'maxScoreGemEffectiviteitDigitaleLeermiddelen': 'competence.softwareRating.maxScore',
    'maxScoreOndersteuningNodig': 'competence.support.maxScore',
    'maxScoreICTGeletterdheid': 'competence.ictSkills.maxScore',
    'maxScorePedagogischDidactischHandelen': 'competence.pedagogicalDidacticalSkills.maxScore',
    'maxScoreWerkenSchoolcontext': 'competence.workInSchoolContext.maxScore',
    'maxScorePersoonlijkeOntwikkeling': 'competence.personalDevelopment.maxScore',
    'maxScoreInstrumenteleVaardigheden': 'competence.instrumentalSkills.maxScore',
    'maxScoreInformatieVaardigheden': 'competence.informationSkills.maxScore',
    'maxScoreMediavaardigheden': 'competence.mediaSkills.maxScore',
    'maxScoreOvereenstemming': 'management.agreement.maxScore',
    'maxScoreNetwerkbeheer': 'management.network.maxScore',
    'Aardrijkskunde.groepen': 'software.geography.gradeLevels',
    'Aardrijkskunde.functies': 'software.geography.functionalities',
    'Aardrijkskunde.kwaliteiten': 'software.geography.minRating',
    'Aardrijkskunde.maxScore': 'software.geography.maxScore',
    'Biologie.groepen': 'software.biology.gradeLevels',
    'Biologie.functies': 'software.biology.functionalities',
    'Biologie.kwaliteiten': 'software.biology.minRating',
    'Biologie.maxScore': 'software.biology.maxScore',
    'Duits.groepen': 'software.german.gradeLevels',
    'Duits.functies': 'software.german.functionalities',
    'Duits.kwaliteiten': 'software.german.minRating',
    'Duits.maxScore': 'software.german.maxScore',
    'Economie.groepen': 'software.economy.gradeLevels',
    'Economie.functies': 'software.economy.functionalities',
    'Economie.kwaliteiten': 'software.economy.minRating',
    'Economie.maxScore': 'software.economy.maxScore',
    'Frans.groepen': 'software.french.gradeLevels',
    'Frans.functies': 'software.french.functionalities',
    'Frans.kwaliteiten': 'software.french.minRating',
    'Frans.maxScore': 'software.french.maxScore',
    'Geschiedenis.groepen': 'software.history.gradeLevels',
    'Geschiedenis.functies': 'software.history.functionalities',
    'Geschiedenis.kwaliteiten': 'software.history.minRating',
    'Geschiedenis.maxScore': 'software.history.maxScore',
    'Natuurkunde.groepen': 'software.physics.gradeLevels',
    'Natuurkunde.functies': 'software.physics.functionalities',
    'Natuurkunde.kwaliteiten': 'software.physics.minRating',
    'Natuurkunde.maxScore': 'software.physics.maxScore',
    'Nederlands.groepen': 'software.dutch.gradeLevels',
    'Nederlands.functies': 'software.dutch.functionalities',
    'Nederlands.kwaliteiten': 'software.dutch.minRating',
    'Nederlands.maxScore': 'software.dutch.maxScore',
    'Scheikunde.groepen': 'software.chemistry.gradeLevels',
    'Scheikunde.functies': 'software.chemistry.functionalities',
    'Scheikunde.kwaliteiten': 'software.chemistry.minRating',
    'Scheikunde.maxScore': 'software.chemistry.maxScore',
    'Wiskunde.groepen': 'software.mathematics.gradeLevels',
    'Wiskunde.functies': 'software.mathematics.functionalities',
    'Wiskunde.kwaliteiten': 'software.mathematics.minRating',
    'Wiskunde.maxScore': 'software.mathematics.maxScore',
    'Rekenen.groepen': 'software.math.gradeLevels',
    'Rekenen.functies': 'software.math.functionalities',
    'Rekenen.kwaliteiten': 'software.math.minRating',
    'Rekenen.maxScore': 'software.math.maxScore',
    'Technisch lezen.groepen': 'software.functionalReading.gradeLevels',
    'Technisch lezen.functies': 'software.functionalReading.functionalities',
    'Technisch lezen.kwaliteiten': 'software.functionalReading.minRating',
    'Technisch lezen.maxScore': 'software.functionalReading.maxScore',
    'Begrijpend lezen.groepen': 'software.receptiveReading.gradeLevels',
    'Begrijpend lezen.functies': 'software.receptiveReading.functionalities',
    'Begrijpend lezen.kwaliteiten': 'software.receptiveReading.minRating',
    'Begrijpend lezen.maxScore': 'software.receptiveReading.maxScore',
    'Spelling.groepen': 'software.orthography.gradeLevels',
    'Spelling.functies': 'software.orthography.functionalities',
    'Spelling.kwaliteiten': 'software.orthography.minRating',
    'Spelling.maxScore': 'software.orthography.maxScore',
    'Taal.groepen': 'software.language.gradeLevels',
    'Taal.functies': 'software.language.functionalities',
    'Taal.kwaliteiten': 'software.language.minRating',
    'Taal.maxScore': 'software.language.maxScore',
    'Toetsenbordvaardigheid.groepen': 'software.keyboardSkills.gradeLevels',
    'Toetsenbordvaardigheid.functies': 'software.keyboardSkills.functionalities',
    'Toetsenbordvaardigheid.kwaliteiten': 'software.keyboardSkills.minRating',
    'Toetsenbordvaardigheid.maxScore': 'software.keyboardSkills.maxScore',
    'Programmeren.groepen': 'software.programming.gradeLevels',
    'Programmeren.functies': 'software.programming.functionalities',
    'Programmeren.kwaliteiten': 'software.programming.minRating',
    'Programmeren.maxScore': 'software.programming.maxScore',
    'Mediawijsheid.groepen': 'software.mediaLiteracy.gradeLevels',
    'Mediawijsheid.functies': 'software.mediaLiteracy.functionalities',
    'Mediawijsheid.kwaliteiten': 'software.mediaLiteracy.minRating',
    'Mediawijsheid.maxScore': 'software.mediaLiteracy.maxScore',
    'ICT Incidentmelder.normjaartaakuren': 'management.incidentReporter.hoursPerYear',
    'ICT Incidentmelder.extraUren': 'management.incidentReporter.additionalHoursPerYear',
    'ICT Incidentmelder.maxScore': 'management.incidentReporter.maxScore',
    'Onderwijskundig ICTer.normjaartaakuren': 'management.ictEducationalContentManager.hoursPerYear',
    'Onderwijskundig ICTer.extraUren': 'management.ictEducationalContentManager.additionalHoursPerYear',
    'Onderwijskundig ICTer.maxScore': 'management.ictEducationalContentManager.maxScore',
    'ICT Inkoper.normjaartaakuren': 'management.ictPurchaser.hoursPerYear',
    'ICT Inkoper.extraUren': 'management.ictPurchaser.additionalHoursPerYear',
    'ICT Inkoper.maxScore': 'management.ictPurchaser.maxScore',
}});


db.standards.find().snapshot().forEach(function(item){
    item.hardware.computersPerStudent.maxYear = 5;
    item.hardware.laptopsPerSchool.maxYear = 5;
    item.management.systemAdministrator = {};
    item.management.systemAdministrator.hoursPerYear = 0;
    item.management.systemAdministrator.additionalHoursPerYear = 0;
    item.management.systemAdministrator.maxScore = 0;
    db.standards.update({_id: item._id}, item);
});

db.users.updateMany({}, { $rename: { 
    'geboorteDatum': 'dateOfBirth',
    'geslacht': 'gender',
    'bouw': 'gradeLevelGroup'}});





