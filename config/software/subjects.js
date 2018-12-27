var subjects  = {};

subjects.noncore = "Overige"; //non-core subjects are grouped under this topic
subjects.ict = "ICT Geletterdheid"; //ict subjects are grouped under this topic

subjects.primary = 
[
    {
        key: 'math',
        topic: 'Rekenen',
        subject: 'Rekenen',
        isCore: true,
        isICT: false,
        maxScore: 1,
        minRating: 0.75,
        gradeLevels: ["Groep 1", "Groep 2", "Groep 3", "Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'functionalReading',
        topic: 'Technisch lezen',
        subject: 'Technisch lezen',
        isCore: true,
        isICT: false,
        maxScore: 1,
        minRating: 0.75,
        gradeLevels: ["Groep 3", "Groep 4", "Groep 5", "Groep 6"],
        functionalities: ["Instructie", "Oefenen", "Toets"]
    },
    {
        key: 'receptiveReading',
        topic: 'Begrijpend lezen',
        subject: 'Begrijpend lezen',
        isCore: true,
        isICT: false,
        maxScore: 1,
        minRating: 0.75,
        gradeLevels: ["Groep 5", "Groep 6", "Groep 7", "Groep 8"],
        functionalities: ["Instructie", "Oefenen", "Toets"]
    },
    {
        key: 'orthography',
        topic: 'Spelling',
        subject: 'Spelling',
        isCore: true,
        isICT: false,
        maxScore: 0.5,
        minRating: 0.75,
        gradeLevels: ["Groep 3", "Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"],
        functionalities: ["Instructie", "Oefenen", "Toets"]
    },
    {
        key: 'language',
        topic: 'Taal',
        subject: 'Taal',
        isCore: true,
        isICT: false,
        maxScore: 0.5,
        minRating: 0.75,
        gradeLevels: ["Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"],
        functionalities: ["Instructie", "Oefenen", "Toets"]
    },
    {
        key: 'keyboardSkills',
        topic: 'ICT Geletterdheid',
        subject: 'Toetsenbordvaardigheid',
        isCore: true,
        isICT: true,
        maxScore: 0.33,
        minRating: 0.75,
        gradeLevels: ["Groep 7", "Groep 8"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'programming',
        topic: 'ICT Geletterdheid',
        subject: 'Programmeren',
        isCore: true,
        isICT: true,
        maxScore: 0.33,
        minRating: 0.75,
        gradeLevels: ["Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'mediaLiteracy',
        topic: 'ICT Geletterdheid',
        subject: 'Mediawijsheid',
        isCore: true,
        isICT: true,
        maxScore: 0.33,
        minRating: 0.75,
        gradeLevels: ["Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        topic: 'Overige',
        subject: 'Aardrijkskunde',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Engels',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Geschiedenis',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Godsdienst of Levensbeschouwing',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Lichamelijke opvoeding',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Maatschappijleer',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Muziek',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Seksuele voorlichting',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Staatsinrichting',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Techniek',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Verkeer',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Website',
        isCore: false
    }
]

//core subjects in primary school
subjects.primary.core = subjects.primary.filter(subject => subject.isCore);
//ict skill subjects in primary school
subjects.primary.ict = subjects.primary.filter(subject => subject.isICT);

subjects.primary.schoolConfig = function(){
    var schoolConfig = {};
    subjects.primary.forEach(function(subject){
        var newSubject = subject.subject;
        if(!schoolConfig[subject.topic]){
            schoolConfig[subject.topic] = [];    
        }
        schoolConfig[subject.topic].push(newSubject);
    });
    return schoolConfig;
}

subjects.secondary =
[
    {
        key: 'mathematics',
        topic: 'Wiskunde',
        subject: 'Wiskunde',
        isCore: true,
        isICT: false,
        maxScore: 1,
        minRating: 0.75,
        gradeLevels: ["Klas 1", "Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'dutch',
        topic: 'Nederlands',
        subject: 'Nederlands',
        isCore: true,
        isICT: false,
        maxScore: 1,
        minRating: 0.75,
        gradeLevels: ["Klas 1", "Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'english',
        topic: 'Engels',
        subject: 'Engels',
        isCore: true,
        isICT: false,
        maxScore: 1,
        minRating: 0.75,
        gradeLevels: ["Klas 1", "Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'geography',
        topic: 'Aardrijkskunde',
        subject: 'Aardrijkskunde',
        isCore: true,
        isICT: false,
        maxScore: 0.25,
        minRating: 0.75,
        gradeLevels: ["Klas 1", "Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'history',
        topic: 'Geschiedenis',
        subject: 'Geschiedenis',
        isCore: true,
        isICT: false,
        maxScore: 0.25,
        minRating: 0.75,
        gradeLevels: ["Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'biology',
        topic: 'Biologie',
        subject: 'Biologie',
        isCore: true,
        isICT: false,
        maxScore: 0.25,
        minRating: 0.75,
        gradeLevels: ["Klas 1", "Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'physics',
        topic: 'Natuurkunde',
        subject: 'Natuurkunde',
        isCore: true,
        isICT: false,
        maxScore: 0.25,
        minRating: 0.75,
        gradeLevels: ["Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'chemistry',
        topic: 'Scheikunde',
        subject: 'Scheikunde',
        isCore: true,
        isICT: false,
        maxScore: 0.25,
        minRating: 0.75,
        gradeLevels: ["Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'french',
        topic: 'Frans',
        subject: 'Frans',
        isCore: true,
        isICT: false,
        maxScore: 0.25,
        minRating: 0.75,
        gradeLevels: ["Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'german',
        topic: 'Duits',
        subject: 'Duits',
        isCore: true,
        isICT: false,
        maxScore: 0.25,
        minRating: 0.75,
        gradeLevels: ["Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        key: 'economy',
        topic: 'Economie',
        subject: 'Economie',
        isCore: true,
        isICT: false,
        maxScore: 0.25,
        minRating: 0.75,
        gradeLevels: ["Klas 2", "Klas 3", "Klas 4"],
        functionalities: ["Instructie", "Oefenen"]
    },
    {
        topic: 'Overige',
        subject: 'Beeldende vorming',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Godsdienst of Levensbeschouwing',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Grieks',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Latijn',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Lichamelijke opvoeding',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Maatschappijleer',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Muziek',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Seksuele voorlichting',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Staatsinrichting',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Spaans',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Techniek',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Verkeer',
        isCore: false
    },
    {
        topic: 'Overige',
        subject: 'Website',
        isCore: false
    }
]
//subjects in secondary school
subjects.secondary.core = subjects.secondary.filter(subject => subject.isCore);

subjects.secondary.schoolConfig = function(){
    var schoolConfig = {};
    subjects.secondary.forEach(function(subject){
        var newSubject = subject.subject;
        if(!schoolConfig[subject.topic]){
            schoolConfig[subject.topic] = [];    
        }
        schoolConfig[subject.topic].push(newSubject);
    });
    return schoolConfig;
}

module.exports = subjects;