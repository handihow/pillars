var columns = [ 
	{
		id: 'username', 
		description: "Email",
		short: "Email",
		data: 'tekstveld',
		hidden: false,
		required: true
	}, 
	{
		id: 'role', 
		description: 'Rol',
		short: "Rol",
		data: "tekstveld",
		hidden: false,
		hasStandardValue: true,
		required: true,
		standardValueFieldType: 'select',
		standardValue: 'Medewerker',
		standardValueOptions: ['Medewerker', 'Admin']
	}, 
	{
		id: 'firstName', 
		description: 'Voornaam',
		short: "Voornaam",
		data: 'tekstveld',
		hidden: false,
		required: true
	}, 
	{
		id: 'lastName', 
		description: 'Achternaam',
		short: "Achternaam",
		data: 'tekstveld',
		hidden: false,
		required: true
	},
	{
		id: 'password', 
		description: 'Wachtwoord',
		short: "Wachtwoord",
		data: 'tekstveld',
		hidden: true
	}
];

module.exports = columns;