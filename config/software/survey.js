var subjects = require('./subjects');
var survey = {}

//https://www.kennisnet.nl/artikel/kiezen-voor-het-juiste-digitale-leermiddel-stel-vragen/
//https://educationaltechnologyjournal.springeropen.com/articles/10.1186/s41239-016-0002-5

survey.assessmentCategories = [
  {
    identifier: 'kennisnet',
    title: "Beoordeling (digitale) leermiddelen",
    surveyOption: "pillars",
    type: "rating",
    categories: [
      {
        name: "content",
        title: "Vakinhoudelijke kwaliteit",
      },
      {
        name: "quality",
        title: "Kwaliteit van het leermiddel",
      },
      {
        name: "learningManagementSystem",
        title: "Integratie met Educatieve Leeromgeving ELO",
      },
      {
        name: "frequencyNecessity",
        title: "Noodzaak en frequentie",
      },
      {
        name: "privacy",
        title: "Privacy",
      }
    ],
  },
];

survey.calculateBubbles = function(survey, surveyResults){
  //exit the function if there are no survey results
  if(surveyResults.length == 0) {
    return;
  }
  //define the results variable to return from the function
  var results = {
    x: [],
    y: [],
    text: [],
    color: [],
    size: []
  };
  subjects.allSubjects.forEach(function(subject){
    var subjectResults = surveyResults.filter(o => o.result.course == subject);
    var subjectAverages = []; var subjectFrequencies = []; var subjectNecessities = [];
    subjectResults.forEach(function(result){
      const arr = Object.keys(result.result)
      .filter(key => ['content', 'quality', 'learningManagementSystem'].includes(key.substring(0,key.indexOf("-"))))
      .reduce((obj, key) => {
        obj[key] = parseFloat(result.result[key]);
        return Object.values(obj);
      }, {});
      var sum, avg = 0;
      if (arr.length) {
          sum = arr.reduce(function(a, b) { return a + b; });
          avg = sum / arr.length;
      }
      subjectAverages.push(avg * 100);
      subjectNecessities.push(parseFloat(result.result["frequencyNecessity-question1"]));
      subjectFrequencies.push(parseFloat(result.result["frequencyNecessity-question2"]));
    });
    var subjectAvg, subjectFrequency, subjectNecessity = 0;
    if(subjectAverages.length){
       subjectAvg  = subjectAverages.reduce(function(a, b) { return a + b; }) / subjectAverages.length;
       subjectNecessity = subjectNecessities.reduce(function(a, b) { return a + b; }) / subjectAverages.length;
       subjectFrequency = subjectFrequencies.reduce(function(a, b) { return a + b; }) / subjectAverages.length;
       results.x.push(subjectFrequency);
       results.y.push(subjectNecessity);
       results.text.push(subject);
       results.size.push(subjectAvg);
       results.color.push(getRandomRgb());
    }
  });
  return results;
}

function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

survey.kennisnet =
{
 "locale": "nl",
 "title": {
  "nl": "Beoordeling (digitaal) leermiddel"
 },
 "pages": [
  {
   "name": "general",
   "elements": [
    {
     "type": "text",
     "name": "course",
     "title": {
      "nl": "Vak"
     },
     "isRequired": true,
     "readOnly": true
    },
    {
     "type": "text",
     "name": "name",
     "title": {
      "nl": "Naam"
     },
     "isRequired": true,
     "readOnly": true
    },
    {
     "type": "text",
     "name": "gradeLevels",
     "title": {
      "nl": "Klassen"
     },
     "isRequired": true,
     "readOnly": true
    },
    {
     "type": "text",
     "name": "supplier",
     "title": {
      "nl": "Leverancier"
     },
     "isRequired": true,
     "readOnly": true
    },
    {
     "type": "text",
     "name": "type",
     "title": {
      "nl": "Type leermiddel"
     },
     "isRequired": true,
     "readOnly": true
    },
    {
     "type": "text",
     "name": "school",
     "title": {
      "nl": "School"
     },
     "isRequired": true,
     "readOnly": true
    },
    {
     "type": "text",
     "name": "softwareId",
     "title": {
      "nl": "Identificatienummer Pillars"
     },
     "isRequired": true,
     "readOnly": true
    }
   ],
   "title": {
    "nl": "Algemene informatie"
   },
   "description": {
    "nl": "Deze gegevens zijn automatisch overgenomen en worden opgeslagen bij deze beoordeling. Ga naar de volgende pagina."
   }
  },
  {
   "name": "content",
   "elements": [
    {
     "type": "rating",
     "name": "content-question1",
     "title": {
      "nl": "De inhoud van het leermiddel is correct en up to date"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Niet van toepassing"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "content-question2",
     "title": {
      "nl": "Het leermiddel bevat alle belangrijke concepten, modellen en vaardigheden die van toepassing zijn op mijn vak"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Niet van toepassing"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "content-question3",
     "title": {
      "nl": "De inhoud is afgestemd op de kennis, vaardigheden en het algemene niveau van de leerlingen."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Niet van toepassing"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "content-question4",
     "title": {
      "nl": "De inhoud is intercultureel deugdelijk en bevat geen racistische of oordelende elementen"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Niet van toepassing"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "content-question5",
     "title": {
      "nl": "De inhoud is ontwikkeld door goed gekwalificeerde personen met ver gaande academische kennis."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Niet van toepassing"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Vakinhoudelijke kwaliteit"
   },
   "description": {
    "nl": "Bron (vertaling van eerste vijf vragen):\nJung, I. (2016, 9 februari). A framework for assessing fitness for purpose in open educational resources. Geraadpleegd op 22 april 2019, van https://educationaltechnologyjournal.springeropen.com/articles/10.1186/s41239-016-0002-5"
   }
  },
  {
   "name": "quality",
   "elements": [
    {
     "type": "rating",
     "name": "quality-question1",
     "title": {
      "nl": "Ik kan bij het leermiddel de leerdoelen inzien"
     },
     "description": {
      "nl": "Als leraar wil ik makkelijker kunnen wisselen tussen (digitaal) lesmateriaal uit verschillende bronnen. Deze wil ik laten aansluiten op de leerlijn en de leerdoelen. \nVaak is dit aanvullend leermateriaal op de methode die we gebruiken in de klas. Ik moet me nu eerst verdiepen in al het lesmateriaal, voordat ik iets op elkaar kan laten aansluiten. Dit kost mij erg veel tijd.\nAls bij het leermiddel duidelijk staat aangegeven welke leerdoelen behandeld moeten worden, is het een stuk eenvoudiger en overzichtelijker om zelf materiaal uit te zoeken. Zo lukt het ook beter om het materiaal te combineren met de methode. Dan kan ik snel lessen voorbereiden die relevant zijn voor mijn groepen leerlingen. Op deze manier kan ik beter recht doen aan verschillen.\ntussen leerlingen."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "quality-question2",
     "title": {
      "nl": "Het leermiddel is adaptief"
     },
     "description": {
      "nl": "Mijn leerlingen werken soms met digitale leermiddelen die ‘adaptief’ zijn. Dit betekent dat de moeilijkheidsgraad van de opdrachten zich automatisch aanpast aan het niveau van de leerling. Zo krijgt bijvoorbeeld een leerling die in het begin veel vragen goed beantwoordt, moeilijkere vragen. De adaptieve leermiddelen die verkrijgbaar zijn, kunnen onderling verschillen op gebied van de mate van adaptiviteit.\n\nDe verschillende opgaven (van makkelijk naar moeilijk) worden automatisch aangepast via een bepaald algoritme. Dat gebeurt soms per losse opgave, of soms voor een groepje opgaven. Deze opgaven moeten heel goed getest zijn om over de mate van adaptiviteit uitspraken te kunnen doen. Daarom is het goed om te weten wat de leverancier bedoelt met adaptiviteit en hoe dat dan precies werkt."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "quality-question3",
     "title": {
      "nl": "Ik kan het digitale lesmateriaal zelf aanpassen en combineren met andere leermiddelen"
     },
     "description": {
      "nl": "Ik werk graag met eigen lesmateriaal. Soms kan ik een leerling of groepjes leerlingen verder op weg helpen met aangepast lesmateriaal, dat beter aansluit op hun niveau of hun vraag. Helaas sluit veel lesmateriaal – ook al is het kwalitatief goed – niet makkelijk aan op ander materiaal. Aanpassen is niet altijd eenvoudig.\nIk wil graag weten:\n• Heeft het materiaal een ‘modulaire opbouw’, zodat ik zelf specifieke delen kan (her) gebruiken in mijn lessen?\n• Kan ik onderdelen uit het materiaal zelf aanpassen om het beter geschikt te maken?"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "quality-question4",
     "title": {
      "nl": "Ik kan bij dit leermiddel snel de resultaten inzien van mijn leerlingen"
     },
     "description": {
      "nl": "Als leraar heb ik vaak al een goed beeld van de niveaus van leerlingen in de klas. Wanneer digitale leermiddelen direct resultaten terugkoppelen over hoe leerlingen bepaalde oefeningen hebben gemaakt, kan ik leerlingen van hetzelfde niveau nog specifieker clusteren. Ik kan dan sneller suggesties doen, materialen vinden en zorgen voor verdere verdieping of verbreding. Het is fijn als ik op basis van deze resultaten zelf materiaal kan klaarzetten voor de leerlingen. Dit moet dan wel aansluiten op de leerlijn en de leerdoelen. Het is nog mooier als er specifieke suggesties worden gedaan, zodat de leerling zelf kan kiezen op welk niveau hij aan de slag wil."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "quality-question5",
     "title": {
      "nl": "Inloggen is gemakkelijk en hoeft niet steeds opnieuw"
     },
     "description": {
      "nl": "Ict zou zorgen voor tijdsbesparing. Maar doordat ik steeds opnieuw bij verschillende leermiddelen moet inloggen, merk ik daar nog weinig van. Eén keer inloggen zou voor mij en mijn leerlingen veel tijd en irritatie schelen. Gelukkig is dit technisch steeds vaker mogelijk en kan ik hiernaar vragen bij mijn leverancier"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Erg ongemakkelijk"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Niet makkelijk"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Makkelijk"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Eenmalig en handig"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Erg handig inloggen, ook vanuit huis"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Kwaliteit van het leermiddel"
   },
   "description": {
    "nl": "Bron (herformuleren vragenkaarten):\nWelp, E. (2017, 23 oktober). Kiezen voor het juiste digitale leermiddel? Stel vragen. Geraadpleegd op 22 april 2019, van https://www.kennisnet.nl/artikel/kiezen-voor-het-juiste-digitale-leermiddel-stel-vragen/"
   }
  },
  {
   "name": "learningManagementSystem",
   "elements": [
    {
     "type": "rating",
     "name": "learningManagementSystem-question1",
     "title": {
      "nl": "Ik kan handig werken vanuit mijn studiewijzer met dit leermiddel"
     },
     "description": {
      "nl": "Op school werken we met een elektronische leeromgeving om huiswerk door te geven en lessen in te plannen. Tevens maken we zelf vaak lesmateriaal en willen dit verspreiden. Om deze materialen klaar te zetten, moet ik inloggen op verschillende programma’s. Ook kan ik geen links opnemen in de studiewijzer en verwijzen naar een extra opdracht.\n\nHet zou fijn zijn als deze systemen beter op elkaar aansluiten, zodat je vanuit onze studiewijzer direct naar het lesmateriaal – dat voor een leerling is klaargezet – kan doorklikken. Daarom ben ik benieuwd op welke manier ik vanuit mijn studiewijzer makkelijker kan werken met andere leermiddelen. Dit scheelt veel tijd en bespaart een hoop ergernis bij mijzelf en de leerlingen."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "learningManagementSystem-question2",
     "title": {
      "nl": "De resultaten van mijn leerlingen worden ook uitgewisseld met mijn LAS/ LVS"
     },
     "description": {
      "nl": "Als leraar vind ik het belangrijk om de vorderingen van leerlingen te kunnen zien in de methode-dashboards. Het kost mij nu alleen veel tijd om steeds in elk individueel systeem te kijken. Ik zie dit graag op één plek terug. Een overkoepelend overzicht zou heel fijn zijn. Voor detailinformatie kan ik dan kijken in het dashboard van de methode.\n\nHet moet dus mogelijk zijn om gegevens tussen verschillende systemen uit te wisselen. Zo wil ik de resultaten van mijn leerlingen vanuit digitaal materiaal ook terugzien in mijn LAS en/of LVS, inclusief toetsresultaten. Op die manier is het overzicht compleet."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "learningManagementSystem-question3",
     "title": {
      "nl": "Het lesmateriaal is beschikbaar via de ELO"
     },
     "description": {
      "nl": "In mijn klas werken de leerlingen digitaal in een eigen leeromgeving. Hier vinden zij onder andere lessen die ze maken en ik kan als leraar de voortgang inzichtelijk maken.\nIn mijn school wordt gebruik gemaakt van verschillende leermiddelen. Niet alles is geschikt om in of via deze leeromgeving te gebruiken. Ik wil graag weten welke leermiddelen gebruikt kunnen worden in mijn leer- of werkomgeving en op welke manier dit het beste kan."
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    }
   ],
   "questionTitleLocation": "top",
   "title": {
    "nl": "Integratie met Educatieve Leeromgeving ELO"
   },
   "description": {
    "nl": "Bron (herformuleren vragenkaarten):\nWelp, E. (2017, 23 oktober). Kiezen voor het juiste digitale leermiddel? Stel vragen. Geraadpleegd op 22 april 2019, van https://www.kennisnet.nl/artikel/kiezen-voor-het-juiste-digitale-leermiddel-stel-vragen/"
   }
  },
  {
   "name": "frequencyNecessity",
   "elements": [
    {
     "type": "rating",
     "name": "frequencyNecessity-question1",
     "title": {
      "nl": "Dit leermiddel is essentieel voor mijn vak"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "Nee"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "Oneens"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "Eens"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "Meer eens"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "Helemaal mee eens"
       }
      }
     ]
    },
    {
     "type": "rating",
     "name": "frequencyNecessity-question2",
     "title": {
      "nl": "Ik gebruik dit leermiddel"
     },
     "isRequired": true,
     "rateValues": [
      {
       "value": "0",
       "text": {
        "nl": "+/- eens per jaar"
       }
      },
      {
       "value": "0.25",
       "text": {
        "nl": "+/- eens per kwartaal"
       }
      },
      {
       "value": "0.5",
       "text": {
        "nl": "+/- maandelijks"
       }
      },
      {
       "value": "0.75",
       "text": {
        "nl": "+/- wekelijks"
       }
      },
      {
       "value": "1",
       "text": {
        "nl": "dagelijks"
       }
      }
     ]
    }
   ],
   "title": {
    "nl": "Noodzaak en frequentie"
   }
  },
  {
   "name": "privacy",
   "elements": [
    {
     "type": "boolean",
     "name": "privacy-question1",
     "title": {
      "nl": "De leverancier heeft het privacyconvenant ondertekend"
     },
     "defaultValue": "true"
    }
   ],
   "title": {
    "nl": "Privacy"
   },
   "description": {
    "nl": "Door het gebruik van digitale materialen wordt er ook steeds meer persoonlijke informatie van leerlingen opgeslagen. Dit is handig, want met deze informatie kunnen we de voortgang van individuele leerlingen bijhouden. Maar deze persoonsgegevens en leerresultaten zijn ook privacygevoelig en moeten niet voor iedereen zichtbaar zijn of makkelijk te hacken. Schoolbesturen, vertegenwoordigd door de PO-Raad en de VO-raad, hebben daarom afspraken gemaakt met leveranciers van digitale leermiddelen over een goede omgang met leerlinggegevens. Deze afspraken zijn vastgelegd in het privacyconvenant voor digitale leermiddelen. Elke leverancier zou dit convenant moeten ondertekenen. De leverancier informeert het schoolbestuur in een privacybijsluiter over alle privacyaspecten van het product.\nBron (herformuleren vragenkaarten):\nWelp, E. (2017, 23 oktober). Kiezen voor het juiste digitale leermiddel? Stel vragen. Geraadpleegd op 22 april 2019, van https://www.kennisnet.nl/artikel/kiezen-voor-het-juiste-digitale-leermiddel-stel-vragen/"
   }
  }
 ],
 "showTitle": false,
 "showProgressBar": "bottom"
}

module.exports = survey;