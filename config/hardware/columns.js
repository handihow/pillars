var types = require('./types');

var columns = [ 
	{
		id: 'type', 
		description: 'Type hardware',
		short: 'Type',
		data: 'tekstveld',
		hidden: false,
		required: true,
		hasStandardValue: true,
		standardValueFieldType: 'select',
		standardValue: 'Desktop',
		standardValueOptions: types.types.map(t => t.singular)
	}, 
	{
		id: 'name', 
		description: "Naam hardware",
		short: 'Naam',
		data: 'tekstveld',
		hidden: false,
		required: true,
		hasStandardValue: true,
		standardValueFieldType: 'input',
		standardValue: 'Nieuwe hardware',
	}, 
	{
		id: 'brand', 
		description: "Merk",
		short: "Merk",
		data: 'tekstveld',
		hidden: false
	}, 
	{
		id: 'model', 
		description: 'Model',
		short: "Model",
		data: 'tekstveld',
		hidden: true
	}, 
	{
		id: 'serialTag', 
		description: 'Serial/Tag nummer',
		short: "Tag",
		data: 'tekstveld',
		hidden: false
	}, 
	{
		id: 'processor', 
		description: 'Processor',
		short: "Processor",
		data: "tekstveld",
		hidden: false
	}, 
	{
		id: 'memory', 
		description: 'Werkgeheugen (GB)',
		short: "Geheugen (GB)",
		data: "geheel getal",
		unit: 'GB',
		hidden: false,
		conditionallyRequired: true,
		condition: 'computers'
	}, 
	{
		id: 'deploymentYear', 
		description: 'Jaar ingebruikname',
		short: "Jaar",
		data: "geheel getal",
		hidden: false,
		required: true,
		hasStandardValue: true,
		standardValueFieldType: 'input',
		standardValue: new Date().getFullYear().toString(),
	}, 
	{
		id: 'operatingSystem', 
		description: 'Besturingssysteem',
		short: "Besturingssysteem",
		data: "tekstveld",
		hidden: true,
		hasStandardValue: true,
		standardValueFieldType: 'select',
		standardValue: '-',
		standardValueOptions: ['Microsoft Windows', 'Apple iOS', "Google's Android OS", "Apple macOS", "Chrome OS", "Linux Operating System", "-", "Anders, nl."]
	},
	{
		id: 'supplier', 
		description: 'Leverancier',
		short: "Leverancier",
		data: "tekstveld",
		hidden: true
	}, 
	{
		id: 'warranty', 
		description: 'Garantievorm',
		short: "Garantie",
		data: "tekstveld",
		hidden: true
	}, 
	{
		id: 'location', 
		description: 'Vaste locatie',
		short: "Locatie",
		data: "tekstveld",
		hidden: true
	}, 
	{
		id: 'cost', 
		description: 'Kosten',
		short: "Kosten",
		data: "geheel getal",
		unit: 'euro',
		hidden: false
	}, 
	{
		id: 'depreciationPeriod', 
		description: 'Afschrijvingsperiode',
		short: "Afschrijving",
		data: "geheel getal",
		unit: 'jaar',
		hidden: false,
		hasStandardValue: true,
		standardValueFieldType: 'input',
		standardValue: '5',
	},
	{
		id: 'numberWorkPlacesMultipoint',
		description: 'Aantal werkplekken multipoint',
		short: 'Werkplekken multipoint',
		data: 'geheel getal',
		hidden: true,
		hasStandardValue: true,
		standardValueFieldType: 'input',
		standardValue: '1',
	},
	{
		id: 'isTouchscreenDigibord',
		description: 'Is touchscreen digibord',
		short: 'Touchscreen',
		data: 'ja/nee',
		hidden: true,
		hasStandardValue: true,
		standardValueFieldType: 'select',
		standardValue: 'false',
		standardValueOptions: ['true', 'false']
	},
	{
		id: 'screensizeDigibord',
		description: 'Scherm diagonaal digibord',
		short: "Scherm diagonaal",
		data: 'geheel getal',
		unit: 'inch',
		hidden: true
	},
	{
		id: 'functionsAs', 
		description: 'Functie device',
		short: "Functie device",
		data: "tekstveld",
		hidden: true,
		hasStandardValue: true,
		standardValueFieldType: 'select',
		standardValue: 'Leerling device',
		standardValueOptions: ['Leerling device', 'Medewerker device', "Directie device"]
	},
];

module.exports = columns;