var columns = [ 
	{
		id: 'name', 
		description: "Naam klas",
		short: "Klas",
		data: 'tekstveld',
		hidden: false,
		required: true
	},
	{
		id: 'numberStudents', 
		description: "Aantal leerlingen",
		short: "Leerlingen",
		data: 'geheel getal',
		hidden: false,
		required: true
	},
	{
		id: 'level', 
		description: 'Niveau',
		short: "Niveau",
		data: 'tekstveld',
		hidden: false,
		hasStandardValue: true,
		required: true,
		standardValue: 'Bovenbouw basisschool',
		standardValueFieldType: 'select',
		standardValueOptions: ['Onderbouw basisschool', 'Middenbouw basisschool', 'Bovenbouw basisschool', 'Onderbouw middelbare school VMBO BK', 'Onderbouw middelbare school VMBO GT', 'Onderbouw middelbare school HAVO/VWO', 'Bovenbouw middelbare school VMBO BK', 'Bovenbouw middelbare school VMBO GT', 'Bovenbouw middelbare school HAVO/VWO']
	},
	{
		id: 'description', 
		description: 'Opmerking (optioneel)',
		short: "Opmerking",
		data: "tekstveld",
		hidden: false,
		required: false
	}, 
];

module.exports = columns;