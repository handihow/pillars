var functionality = require('../software/functionality'); 
var ratings = require('../software/ratings');
var subjects = require('../software/subjects');
var classrooms = ['Groep 1', 'Groep 2', 'Groep 3', 'Groep 4', 'Groep 5', 'Groep 6', 'Groep 7', 'Groep 8'];
var standardClassrooms = classrooms.slice(3);

var columns = [ 
	{
		id: 'subject', 
		description: 'Vak',
		short: 'Vak',
		data: 'tekstveld',
		hidden: false,
		required: true,
		standardValueFieldType: 'select',
		standardValueOptions: subjects.primary.map(s => s.subject)
	},
	{
		id: 'name', 
		description: 'Naam methode',
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
		hidden: false,
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
		hidden: false,
		hasStandardValue: true,
		standardValueFieldType: 'select',
		multiselect: true,
		standardValue: standardClassrooms,
		standardValueOptions: classrooms
	},
	{
		id: 'ratings', 
		description: 'Kwaliteitsnormen',
		short: "Kwaliteitsnormen",
		data: 'tekstveld',
		hidden: false,
		hasStandardValue: true,
		standardValueFieldType: 'select',
		multiselect: true,
		standardValue: ratings,
		standardValueOptions: ratings
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
	}, 
];


module.exports = columns;

