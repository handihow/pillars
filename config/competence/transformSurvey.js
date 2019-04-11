let competenceCategories = [
	{
		identifier: 'ictSkills',
		title: "ICT Geletterdheid",
		previousTitle: "1 - ICT Geletterdheid",
		surveyOption: "pillars",
		type: "boolean",
		categories: [
			{
				name: "basicSkills",
				title: "ICT Basisvaardigheden",
				previousIdentifier: "a - ICT Basisvaardigheden"
			},
			{
				name: "informationSkills",
				title: "ICT Basisvaardigheden",
				previousIdentifier: "b - Informatievaardigheden",
				alternateIdentifier: "b - Informievaardigheden",
			},
			{
				name: "mediaSkills",
				title: "Mediawijsheid",
				previousIdentifier: "c - Mediawijsheid"
			},
			{
				name: "computationalThinking",
				title: "Computational Thinking",
				previousIdentifier: "d - Computational Thinking"
			}
		],
	},
	{
		identifier: 'pedagogicalDidacticalSkills',
		title: "Pedagogisch Didactisch Handelen",
		previousTitle: "2 - Pedagogisch Didactisch Handelen",
		surveyOption: "pillars",
		type: "boolean",
		categories: [
			{
				name: "instructing",
				title: "Instructie geven",
				previousIdentifier: "a - Instructie geven"
			},
			{
				name: "learning",
				title: "Laten leren",
				previousIdentifier: "b - Laten leren"
			},
			{
				name: "testing",
				title: "Toetsen",
				previousIdentifier: "c - Toetsen"
			}
		],
	},
	{
		identifier: 'workInSchoolContext',
		title: "Werken in de schoolcontext",
		previousTitle: "3 - Werken in de schoolcontext",
		surveyOption: "pillars",
		type: "boolean",
		categories: [
			{
				name: "registration",
				title: "Registreren",
				previousIdentifier: "a - Registreren"
			},
			{
				name: "justification",
				title: "Volgen en verantwoorden",
				previousIdentifier: "b - Volgen en verantwoorden"
			},
			{
				name: "communication",
				title: "Communiceren",
				previousIdentifier: "c - Communiceren"
			}
		],
	},
	{
		identifier: 'personalDevelopment',
		title: "Persoonlijke Ontwikkeling",
		previousTitle: "4 - Persoonlijke Ontwikkeling",
		surveyOption: "pillars",
		type: "boolean",
		categories: [
			{
				name: "developing",
				title: "Ontwikkelingen volgen in vakgebied",
				previousIdentifier: "a - Ontwikkelingen volgen in vakgebied"
			},
			{
				name: "sharing",
				title: "Delen van ervaring",
				previousIdentifier: "b - Delen van ervaring"
			}
		]
	},
	{
		identifier: 'instrumentalSkills',
		title: "Instrumentele vaardigheden",
		previousTitle: "1 - Instrumentele vaardigheden",
		surveyOption: "alpha",
		type: "rating",
		categories: [
			{
				name: "ictKnowledge",
				title: "Kennis van ICT voorzieningen",
				previousIdentifier: "a - Kennis van ICT voorzieningen"
			},
			{
				name: "ictUsage",
				title: "Gebruik van ICT voorzieningen",
				previousIdentifier: "b - Gebruik van ICT voorzieningen"
			},
			{
				name: "ictDevelopment",
				title: "Volgen van ICT ontwikkelingen",
				previousIdentifier: "c - Volgen van ICT ontwikkelingen"
			},
			{
				name: "socialMedia",
				title: "Sociale Media",
				previousIdentifier: "d - Sociale Media"
			},
			{
				name: "contentCreation",
				title: "Creëren van content",
				previousIdentifier: "e - Creëren van content"
			}
		]
	},
	{
		identifier: 'informationSkills',
		title: "Informatievaardigheden",
		previousTitle: "2 - Informatievaardigheden",
		surveyOption: "alpha",
		type: "rating",
		categories: [
			{
				name: "searchInformation",
				title: "Zoeken van informatie",
				previousIdentifier: "a - Zoeken van informatie"
			},
			{
				name: "administerInformation",
				title: "Beheren van informatie",
				previousIdentifier: "b - Beheren van informatie"
			}
		]
	},
	{
		identifier: 'mediaSkills',
		title: "Mediavaardigheden",
		previousTitle: "3 - Mediavaardigheden",
		surveyOption: "alpha",
		type: "rating",
		categories: [
			{
				name: "personalSkills",
				title: "Eigen vaardigheden",
				previousIdentifier: "a - Eigen vaardigheden"
			},
			{
				name: "teachingMediaSkills",
				title: "Lesgeven in de mediawijsheid",
				previousIdentifier: "b - Lesgeven in de mediawijsheid"
			}
		]
	}
];

function transformSurvey(surveyObject, competenceCategories){
	print(surveyObject.name);
	var newSurveys = [];
	Object.keys(surveyObject).forEach(function(surveyKey){
		var index = competenceCategories.findIndex(cat => cat.previousTitle == surveyKey);
		var newSurvey = {};
		if(index > -1){
			newSurvey = createNewSurvey(competenceCategories, index);
			newSurvey.pages = createPages(competenceCategories, index);
			newSurvey.pages.forEach(function(page, pageIndex){
				page.elements = createElements(competenceCategories, index, pageIndex, surveyObject);
			});
			newMetadata = {
				name: competenceCategories[index].title + " 2018/2019",
				identifier: competenceCategories[index].identifier,
				title:  competenceCategories[index].title,
				surveyOption: competenceCategories[index].surveyOption
			}
			newSurveys.push({
				survey: newSurvey,
				metadata: newMetadata
			});
		} else {
			console.log("title not found in categories")
		}
	})
	return newSurveys;
}


function createNewSurvey(competenceCategories, index){
	return {
				"locale": "nl",
				"title": {
				  "nl": competenceCategories[index].title
				 },
				 "showTitle": false
			}
}

function createPages(competenceCategories, index){
	var newPages = [];
	competenceCategories[index].categories.forEach(function(category){
		var newPage = {
			"name": category.name,
			"title": {
				"nl": category.title
			}
		};
		newPages.push(newPage);
	});
	return newPages;
}

function createElements(competenceCategories, index, pageIndex, surveyObject){
	var newElements = [];
	var previousTitle = JSON.parse(JSON.stringify(competenceCategories[index].previousTitle));
	var previousIdentifier = JSON.parse(JSON.stringify(competenceCategories[index].categories[pageIndex].previousIdentifier));
	if(!previousIdentifier){
		previousIdentifier = JSON.parse(JSON.stringify(competenceCategories[index].categories[pageIndex].alternateIdentifier));
	}
	print(previousTitle);
	print(previousIdentifier);
	var type = JSON.parse(JSON.stringify(competenceCategories[index].type));
	surveyObject[previousTitle][previousIdentifier].forEach(function(element, elementIndex){
		var newElement = {
	     type: type,
	     name: competenceCategories[index].categories[pageIndex].name+ "-question" + (elementIndex+1),
	     defaultValue: competenceCategories[index].type == 'boolean' ? "false" : null,
	     isRequired: true,
	     title: {
	    		"nl": element
	    	}
	    }
	    if(type == 'rating'){
	    	newElement.rateValues = [
		      {
		       value: "0",
		       text: {
		        nl: "Nee"
		       }
		      },
		      {
		       value: "0.25",
		       text: {
		        nl: "Oneens"
		       }
		      },
		      {
		       value: "0.5",
		       text: {
		        nl: "Eens"
		       }
		      },
		      {
		       value: "0.75",
		       text: {
		        nl: "Meer eens"
		       }
		      },
		      {
		       value: "1",
		       text: {
		        nl: "Helemaal mee eens"
		       }
		      }
		     ]
	    }
	    newElements.push(newElement);
	});
	return newElements;
}


var count = 0;





