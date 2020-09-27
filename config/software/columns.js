var functionality = require('../software/functionality'); 
var ratings = require('../software/ratings');
var subjects = require('../software/subjects');
var classroomsPrimary = ['Groep 1', 'Groep 2', 'Groep 3', 'Groep 4', 'Groep 5', 'Groep 6', 'Groep 7', 'Groep 8'];
var classroomsSecondary = ['Klas 1', 'Klas 2', 'Klas 3', 'Klas 4', 'Klas 5', 'Klas 6'];

var columns = (isSecondarySchool) => {

	return [ 
		{
			id: 'subject', 
			description: 'Vak',
			short: 'Vak',
			data: 'tekstveld',
			hidden: false,
			required: true,
			standardValueFieldType: 'select',
			standardValueOptions: isSecondarySchool ? subjects.secondary.map(s => s.subject) : subjects.primary.map(s => s.subject) 
		},
		{
			id: 'name', 
			description: 'Naam leermiddel',
			short: 'Naam',
			data: 'tekstveld',
			hidden: false,
			required: true
		}, 
		{
			id: 'functionalities', 
			description: 'Software functies',
			short: "Functies",
			data: 'tekstveld',
			hidden: true,
			hasStandardValue: true,
			standardValueFieldType: 'select',
			multiselect: true,
			standardValue: functionality,
			standardValueOptions: functionality
		}, 
		{
			id: 'gradeLevels', 
			description: 'Lesgroepen',
			short: "Lesgroepen",
			data: 'tekstveld',
			hidden: true,
			hasStandardValue: false,
			standardValueFieldType: 'select',
			multiselect: true,
			standardValueOptions: isSecondarySchool ? classroomsSecondary : classroomsPrimary 
		},
		{
			id: 'ratings', 
			description: 'Kwaliteitsnormen',
			short: "Kwaliteitsnormen",
			data: 'tekstveld',
			hidden: true,
			hasStandardValue: true,
			standardValueFieldType: 'select',
			multiselect: true,
			standardValue: ratings,
			standardValueOptions: ratings
		},
		{
			id: 'effectiveness', 
			description: 'Effectiviteit',
			short: 'Effectiviteit',
			data: 'geheel getal',
			hidden: true,
		},
		{
			id: 'licences', 
			description: 'Licenties',
			short: 'Licenties',
			data: 'geheel getal',
			hidden: false,
		},
		{
			id: 'cost', 
			description: 'Kosten',
			short: "Kosten per licentie",
			data: "geheel getal",
			unit: 'euro',
			hidden: false
		},
		{
			id: 'supplier', 
			description: 'Leverancier',
			short: 'Leverancier',
			data: 'tekstveld',
			hidden: false,
			required: true
		},
		{
			id: 'typeOfSoftware', 
			description: 'Type leermiddel',
			short: 'Type',
			data: 'tekstveld',
			hidden: false,
			required: true,
			hasStandardValue: true,
			standardValueFieldType: 'select',
			standardValue: 'Digitaal',
			standardValueOptions: ['Digitaal', 'Niet digitaal', 'Beide']
		}
	];
} 

module.exports = columns;

