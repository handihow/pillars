var columns = [ 
	{
		id: 'schoolIdNumber', 
		description: 'BRIN',
		short: 'BRIN',
		data: 'tekstveld',
		hidden: false,
		required: true
	},
	{
		id: 'name', 
		description: 'Naam school',
		short: 'Naam',
		data: 'tekstveld',
		hidden: false,
		required: true
	}, 
	{
		id: 'streetName', 
		description: "Straatnaam",
		short: 'Straatnaam',
		data: 'tekstveld',
		hidden: false,
		required: false
	}, 
	{
		id: 'houseNumber', 
		description: "Huisnummer",
		short: "Huisnummer",
		data: 'tekstveld',
		hidden: false
	}, 
	{
		id: 'postalCode', 
		description: 'Postcode',
		short: "Postcode",
		data: 'tekstveld',
		hidden: false
	}, 
	{
		id: 'city', 
		description: 'Plaatsnaam',
		short: "Plaatsnaam",
		data: 'tekstveld',
		hidden: false
	}, 
	{
		id: 'countStudents', 
		description: 'Aantal leerlingen',
		short: "Leerlingen",
		data: "geheel getal",
		hidden: false
	}, 
	{
		id: 'countClassrooms', 
		description: 'Aantal lokalen',
		short: "Lokalen",
		data: "geheel getal",
		hidden: false
	},
	{
		id: 'schoolLocationIdNumber', 
		description: "Vestigingsnummer",
		short: 'Vestigingsnummer',
		data: 'tekstveld',
		hidden: true,
		required: false
	}, 
	{
		id: 'organisationIdNumber', 
		description: "Bevoegd Gezag nummer",
		short: 'BG nummer',
		data: 'tekstveld',
		hidden: true,
		required: false
	}, 
];

module.exports = columns;

