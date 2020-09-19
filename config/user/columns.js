var columns = (schoolLevel, csvImport) => {
	var returnedColumns = [ 
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
			standardValueOptions: 
				csvImport ? 
					[
						'Medewerker', 
						'Admin'
					] 
				:
				schoolLevel ?
					[
						{label: 'Leerling', value: 'student'},
						{label: 'School medewerker', value: 'suser'}, 
						{label: 'School admin', value: 'sadmin'}
					]
				:
					[
						{label: 'Leerling', value: 'student'},
						{label: 'School medewerker', value: 'suser'}, 
						{label: 'School admin', value: 'sadmin'},
						{label: 'Bestuur medewerker', value: 'buser'},
						{label: 'Bestuur admin', value: 'badmin'}
					]
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
		}
	];

	if(csvImport){
		returnedColumns.push(
			{
				id: 'password', 
				description: 'Wachtwoord',
				short: "Wachtwoord",
				data: 'tekstveld',
				hidden: true
			}
		)
	} else {
		returnedColumns.push(
			{
				id: 'numberOfSurveyResults',
				description: 'Aantal tests',
				short: "Tests"
			}
		)
	}

	return returnedColumns;

} 

module.exports = columns;