module.exports = [  
	{
		id: 'name', 
		description: "Naam vragenlijst",
		short: 'Naam',
		data: 'tekstveld',
		hidden: false,
		required: true,
		hasStandardValue: true,
		standardValueFieldType: 'input',
		standardValue: 'Nieuwe vragenlijst',
	}, 
	{
		id: 'purpose', 
		description: 'Doel van de vragenlijst',
		short: "Doel",
		data: "tekstveld",
		hidden: false,
		required: true,
		hasStandardValue: true,
		standardValueFieldType: 'select',
		standardValue: 'Deskundigheid',
		standardValueOptions: ['Deskundigheid', 'Software', 'Functioneel', "Anders, nl."]
	},
	{
		id: 'version',
		description: 'Versienummer',
		short: 'Versie',
		data: 'tekstveld',
		hidden: false,
		required: true
	},
	{
		id: 'comment',
		description: 'Versie aantekeningen',
		short: 'Aantekeningen',
		data: 'tekstveld',
		hidden: false,
		required: true
	}
];
