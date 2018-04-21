var score = {};

//checks computers per student criteria
score.computersPerStudent = function(school){
      var result = {goedeComputers: 0, computersPerStudent: 0};
      var countGoodComputers = 0;
      school.hardware.forEach(function(hardware){
        if(school.normering.hardwareTypesCountedAsComputer.includes(hardware.type) && 
          ( hardware.werkgeheugen >= school.normering.minRAM || hardware.jaarIngebruikname >= school.normering.minYear)) {
            if(hardware.type=="Multipoint computer") {
              countGoodComputers = countGoodComputers + hardware.aantalWerkplekkenMultipoint; 
            } else {
              countGoodComputers++;
            }
          }
      });
      result.goedeComputers = countGoodComputers;
      var normComputers = school.aantalLeerlingen * school.normering.computersPerLeerling;
      if(countGoodComputers >= normComputers) {
          result.computersPerStudent = school.normering.maxScoreComputersPerLeerling;
          
      } else {
          result.computersPerStudent = school.normering.maxScoreComputersPerLeerling * countGoodComputers / normComputers;
          
      }
      return result;
};

//checks digitale schoolborden per lokaal criteria
score.digitalBordsPerClassroom = function(school){
    var result = {goedeDigitaleSchoolborden: 0, digitalBordsPerClassroom: 0};
    var countGoodDigibord = 0;
    school.hardware.forEach(function(hardware){
        if(hardware.type==="Digitaal schoolbord" && ((hardware.isTouchscreenDigibord || 0) >= (school.normering.isTouchscreenDigibord || 0))) {
            countGoodDigibord ++;
          }
    });
    result.goedeDigitaleSchoolborden = countGoodDigibord;
    var normDigibord = school.aantalKlaslokalen * school.normering.digibordenPerKlaslokaal;
    if(countGoodDigibord > normDigibord){
          result.digitalBordsPerClassroom = school.normering.maxScoreDigibordenPerKlaslokaal;
    } else {
          result.digitalBordsPerClassroom = school.normering.maxScoreDigibordenPerKlaslokaal * countGoodDigibord / normDigibord;
          
    }
    return result;
};

//checks the network criterium
score.network = function(school){
    var result = 0;
    if(school.heeftGoedBedraadNetwerk && school.heeftGoedWirelessNetwerk){
        result = school.normering.maxScoreNetwerk;
    }
    return result;
};

//checks portable computers per school criterium
score.portableComputersPerSchool = function(school){
    var result = {goedeLaptops: 0, portableComputersPerSchool: 0};
    var countGoodPortableComputers = 0;
    school.hardware.forEach(function(hardware){
        if(school.normering.hardwareTypesCountedAsPortableComputer.includes(hardware.type) && 
          ( hardware.werkgeheugen >= school.normering.minRAM || hardware.jaarIngebruikname >= school.normering.minYear)) {
              countGoodPortableComputers++;
          }
    });
    result.goedeLaptops = countGoodPortableComputers;
    var normPortableComputers = school.normering.portableComputersPerSchool;
    if(countGoodPortableComputers >= normPortableComputers){
        result.portableComputersPerSchool = school.normering.maxScorePortableComputersPerSchool;
    } else {
        result.portableComputersPerSchool = school.normering.maxScorePortableComputersPerSchool * countGoodPortableComputers / normPortableComputers;
    }
    return result;
};

//checks software criteria
score.software = function(school, vak){
    var result = 0;
    var groupedSoftware = new Set();
    //first, combine all the software from the course
    school.software.forEach(function(software, i){

        //check if the software is for this course and quality is sufficient
        if(software.vak === vak && software.kwaliteit.length >= school.normering[vak].kwaliteiten) {    
                //if so, add to the group of software (values are unique because of the use of SET)
                school.software[i].groep.forEach(function(groep){
                    groupedSoftware.add(groep);
                });
                school.software[i].functie.forEach(function(functie){
                    groupedSoftware.add(functie);
                });
        }
    });
    var groupCriterium = false;
    var functionCriterium = false;
    // check if the software has all required groups 
    var count = 0;
    school.normering[vak].groepen.forEach(function(groep,i,arr){
        if(groupedSoftware.has(groep)){
            count++;
        }
        if(count === arr.length) {
            groupCriterium = true;
        }
    });
    //check if the software has all functions
    var count2 = 0;
    school.normering[vak].functies.forEach(function(functie,i,arr){
        if(groupedSoftware.has(functie)){
            count2++;
        }
        if(count2 === arr.length) {
            functionCriterium = true;
        }
    });
    //if both criteria are met, give the maximum points
    if(groupCriterium && functionCriterium) {
            result = school.normering[vak].maxScore;
        }
    return result;
};

//checks deskundigheid criterium beoordeelde deskundigheid
score.beoordeeldeDeskundigheid = function(school){
    var result = 0;
    if(school.deskLeerkrachten>=school.normering.minBeoordeeldeDeskundigheid){
        result = school.normering.maxScoreBeoordeeldeDeskundigheid;
    }
    return result;
};

//checks deskundigheid criterium gemiddelde effectiviteit
score.gemiddeldeEffectiviteit = function(school){
    var result = 0;
    if(school.deskEffectiviteit>=school.normering.gemEffectiviteitDigitaleLeermiddelen){
        result = school.normering.maxScoreGemEffectiviteitDigitaleLeermiddelen;
    }
    return result;
};

//checks deskundigheid criterium ondersteuning nodig
score.ondersteuningNodig = function(school){
    var result = 0;
    if((school.deskOndersteuning === true ? 1 : 0)<=(school.normering.ondersteuningNodig=== true ? 1 : 0)){
        result = school.normering.maxScoreOndersteuningNodig;
    }
    return result;
};

//checks the resulting average score from tests
score.averageTestResult = function(school, subject){
    var total = 0;
    var count = 0;
    var result = 0;
    school.tests.forEach(function(test){
        if(test.subject === subject){
            total = total + test.result;
            count ++;
        }
    });
    if(count > 0){
        result = total / count;
    }
    return result;
};

//checks the score for organisation
score.organisation = function(school, functie){
    var result = 0;
    //bereken het normale aantal uren
    var aantalUren = school.normering[functie].normjaartaakuren;
    //bereken het aantal extra uren
    var extraUren = 0;
    if(school.aantalLeerlingen>200) {
        extraUren = school.normering[functie].extraUren * Math.ceil((school.aantalLeerlingen - 200) / 100);
    }
    if(school[functie]>=(aantalUren+extraUren)){ 
        result = school.normering[functie].maxScore;
    } else {
        result = school[functie] * school.normering[functie].maxScore / (aantalUren + extraUren);
    }
    return result;
};

score.calculate = function(school) {
    //define the output variable "result" of the function
    var result = {
        school: school.instellingsnaam,
        totaal: {
            hardware:0,
            software:0,
            deskundigheid: 0,
            organisatie: 0
        },
        hardware: {
            goedeComputers: 0,
            computersPerStudent: 0,
            goedeDigitaleSchoolborden: 0,
            digitalBordsPerClassroom: 0,
            network: 0,
            goedeLaptops: 0,
            portableComputersPerSchool: 0
        },
        software: {
            "Rekenen": 0,
            "Technisch lezen": 0,
            "Begrijpend lezen": 0,
            "Spelling": 0,
            "Taal": 0,
            "Toetsenbordvaardigheid": 0,
            "Programmeren": 0,
            "Mediawijsheid": 0
        },
        deskundigheid: {
            beoordeeldeDeskundigheid: 0,
            gemiddeldeEffectiviteit: 0,
            ondersteuningNodig: 0,
            ictGeletterdheid: 0,
            pedagogischDidactisch: 0,
            werkenSchooltext: 0,
            persoonlijkeOntwikkeling: 0,
            instrumenteleVaardigheden: 0,
            informatieVaardigheden: 0,
            mediaVaardigheid: 0
        },
        organisatie: {
            organisatorischeOvereenstemming: 0,
            netwerkbeheer: 0,
            incidentmelder: 0,
            onderwijskundigICTer: 0,
            ictInkoper: 0
        },
        link: "#"
    };
    if(typeof(school.normering)==undefined || !school.normering){
        return result;
    }
    if(school.isToegevoegdHardware && school.isIngevuldAlgemeneInformatie) {
        //check computers per student
        result.hardware.computersPerStudent = score.computersPerStudent(school).computersPerStudent;
        result.hardware.goedeComputers = score.computersPerStudent(school).goedeComputers;
        //check digitale borden per lokaal
        result.hardware.goedeDigitaleSchoolborden = score.digitalBordsPerClassroom(school).goedeDigitaleSchoolborden;
        result.hardware.digitalBordsPerClassroom = score.digitalBordsPerClassroom(school).digitalBordsPerClassroom;
        //check network criteria
        result.hardware.network = score.network(school);
        //check portable computers per school criteria
        result.hardware.goedeLaptops = score.portableComputersPerSchool(school).goedeLaptops;
        result.hardware.portableComputersPerSchool = score.portableComputersPerSchool(school).portableComputersPerSchool;
        //end portable computers per school criteria
    }
    if(school.isToegevoegdSoftware){
        //PILLARS CHECK DIGITALE LEERMIDDELEN (SOFTWARE)
        Object.keys(result.software).forEach(function(vak){
            result.software[vak] = score.software(school,vak);
        });
    }
    if(school.isIngevuldDeskundigheid){
        //DESKUNDIGHEID
        //check beoordeelde deskundigheid
        result.deskundigheid.beoordeeldeDeskundigheid = score.beoordeeldeDeskundigheid(school);
        //check gemiddelde effectiviteit
        result.deskundigheid.gemiddeldeEffectiviteit = score.gemiddeldeEffectiviteit(school);
        //check ondersteuning nodig
        result.deskundigheid.ondersteuningNodig = score.ondersteuningNodig(school);
    }
    if(school.isToegevoegdMedewerker){
        //ICT Geletterdheid
        result.deskundigheid.ictGeletterheid = score.averageTestResult(school, "1 - ICT Geletterdheid") * school.normering.maxScoreICTGeletterdheid;
        //Pedagogisch Didactisch Handelen
        result.deskundigheid.pedagogischDidactisch = score.averageTestResult(school, "2 - Pedagogisch Didactisch Handelen") * school.normering.maxScorePedagogischDidactischHandelen;
        //Werken in de schoolcontext
        result.deskundigheid.werkenSchooltext = score.averageTestResult(school, "3 - Werken in de schoolcontext") * school.normering.maxScoreWerkenSchoolcontext;
        //Persoonlijke ontwikkeling
        result.deskundigheid.persoonlijkeOntwikkeling = score.averageTestResult(school, "4 - Persoonlijke Ontwikkeling") * school.normering.maxScorePersoonlijkeOntwikkeling;
        //instrumentele vaardigheden
        result.deskundigheid.instrumenteleVaardigheden = score.averageTestResult(school, "1 - Instrumentele vaardigheden") * school.normering.maxScoreInstrumenteleVaardigheden;
        //informatieVaardigheden
        result.deskundigheid.informatieVaardigheden = score.averageTestResult(school, "2 - Informatievaardigheden") * school.normering.maxScoreInformatieVaardigheden;
        //mediavaardigheid
        result.deskundigheid.mediaVaardigheid = score.averageTestResult(school, "3 - Mediavaardigheden") * school.normering.maxScoreMediavaardigheden;
    }
    if(school.isIngevuldOrganisatie){
        // ORGANISATIE
        //check if the organisatie heeft overeenstemming
        if(school.heeftOrganisatorischeOvereenstemming){
            result.organisatie.organisatorischeOvereenstemming = school.normering.maxScoreOvereenstemming;
        }
        //check if the school has good network control (3 x yes)
        if(school.heeftGoedeNetwerkAanpassing && school.heeftGoedeNetwerkProbleemOplossing && school.heeftGoedeIncidentMelding){
            result.organisatie.netwerkbeheer = school.normering.maxScoreNetwerkbeheer;
        }
        //ICT incidentmelder
        result.organisatie.incidentmelder = score.organisation(school, "ICT Incidentmelder");
        //Onderwijskundig ICT'er
        result.organisatie.onderwijskundigICTer = score.organisation(school, "Onderwijskundig ICTer");
        //ICT Inkoper
        result.organisatie.ictInkoper = score.organisation(school, "ICT Inkoper");
    }
    //CALCULATE TOTALS
    result.totaal.hardware = 
                                result.hardware.computersPerStudent +
                                result.hardware.digitalBordsPerClassroom +
                                result.hardware.network +
                                result.hardware.portableComputersPerSchool;

    Object.keys(result.software).forEach(function(score){
        result.totaal.software = result.totaal.software + result.software[score];
    });
    Object.keys(result.deskundigheid).forEach(function(score){
        result.totaal.deskundigheid = result.totaal.deskundigheid + result.deskundigheid[score];
    });
    Object.keys(result.organisatie).forEach(function(score){
        result.totaal.organisatie = result.totaal.organisatie + result.organisatie[score];
    });
    result.link = score.generateLink(school, result);
return result;
};

score.generateLink = function (school, result){
    var link = "https://docs.google.com/forms/d/e/1FAIpQLScLmHY0sOJmHPE-O0pcLiR2QMxzCCDIE4kmMBJcgL33GzG6sA/viewform?usp=pp_url";
    //add school name
    link = link + "&entry.953788525=" + school.instellingsnaam;
    //add streetname
    link = link + "&entry.1741489727=" + school.straatnaam;
    //add postal code
    link = link + "&entry.175180849=" + school.postcode;
    //add plaatsnaam
    link = link + "&entry.2084187720=" + school.plaatsnaam;
    //add aantal leerlingen
    link = link + "&entry.1408877389=" + school.aantalLeerlingen;
    //add klaslokalen
    link = link + "&entry.567949032=" + school.aantalKlaslokalen;
    //add score hardware
    link = link + "&entry.1443199867=" + Math.round(result.totaal.hardware * 100)/100;
    //add score digitale leermiddelen
    link = link + "&entry.333564130=" + Math.round(result.totaal.software * 100)/100;
    //add score deskundigheid
    link = link + "&entry.1156000193=" + Math.round(result.totaal.deskundigheid *100)/100;
    //add score organisatie
    link = link + "&entry.1792957960=" + Math.round(result.totaal.organisatie *100)/100;
    //add aantal goede computers
    link = link + "&entry.1168798708=" + result.hardware.goedeComputers;
    //add computers per leerling
    link = link + "&entry.576878619=" + Math.round(result.hardware.computersPerStudent * 1000)/10;
    //add norm computers per leerling
    link = link + "&entry.1112676173=" + Math.round(school.normering.computersPerLeerling * 1000)/10;
    //add maximum points computers
    link = link + "&entry.806407324=" + Math.round(school.normering.maxScoreComputersPerLeerling * 10)/10;
    //add points for computers per student
    link = link + "&entry.826280419=" + Math.round(result.hardware.computersPerStudent * 10)/10;
    //add digital schoolbords
    link = link + "&entry.1922550124=" + result.hardware.goedeDigitaleSchoolborden;
    //add normering digitale schoolborden
    link = link + "&entry.859087552=" + Math.round(school.normering.digibordenPerKlaslokaal * 1000)/10;
    //add maximum punten digitale schoolborden
    link = link + "&entry.1703122271=" + school.normering.maxScoreDigibordenPerKlaslokaal;
    //add behaalde punten digitale schoolborden
    link = link + "&entry.132617233=" + Math.round(result.hardware.digitalBordsPerClassroom *10)/10;
    //goed functionerend netwerk
    //WEET IK NIET
    //norm goed functionerend netwerk
    link = link + "&entry.1658184490=Goed zowel bedraad als wireless";
    //add maximale punten netwerk
    link = link + "&entry.304334536=" + school.normering.maxScoreNetwerk;
    // add behaalde punten netwerk
    link = link +"&entry.269571127=" + result.hardware.network;
    // add aantal goede laptops
    link = link + "&entry.1782504718=" + result.hardware.goedeLaptops;
    // add norm aantal goede laptops
    link = link + "&entry.53666413=" + school.normering.portableComputersPerSchool;
    // add maximum punten laptops
    link = link + "&entry.583038646=" + school.normering.maxScorePortableComputersPerSchool;
    // add behaalde punten laptops
    link = link + "&entry.957149065=" + result.hardware.portableComputersPerSchool;
    // add commentaar en aanbevelingen hardware
    //LEEG
    // add norm rekenen
    link = link + "&entry.981434836=Software aanwezig voor: " + school.normering["Rekenen"].groepen;
    // add maximum punten rekenen
    link = link + "&entry.2102353953=" + school.normering["Rekenen"].maxScore;
    // add behaalde punten rekenen
    link = link + "&entry.1814421759=" + result.software["Rekenen"];
    // add norm technisch lezen
    link = link + "&entry.256813647=Software aanwezig voor: " + school.normering["Technisch lezen"].groepen;
    // add maximum punten technisch lezen 
    link = link + "&entry.1471802274=" + school.normering["Technisch lezen"].maxScore;
    // add behaalde punten technisch lezen
    link = link + "&entry.919185926=" + result.software["Technisch lezen"];
    // add norm begrijpend lezen
    link = link + "&entry.746014799=Software aanwezig voor: " + school.normering["Begrijpend lezen"].groepen;
    // add maximum punten begrijpend lezen
    link = link + "&entry.1332213780=" + school.normering["Begrijpend lezen"].maxScore;
    // add behaalde punten begrijpend lezen
    link = link + "&entry.1808518925=" + result.software["Begrijpend lezen"];
    // add norm spelling
    link = link + "&entry.236935133=Software aanwezig voor: " + school.normering["Spelling"].groepen;
    // add maximum punten spelling
    link = link + "&entry.855895981=" + school.normering["Spelling"].maxScore;
    // add behaalde punten spelling
    link = link + "&entry.1580913399=" + result.software["Spelling"];
    // add norm taal
    link = link + "&entry.852030879=Software aanwezig voor: " + school.normering["Taal"].groepen;
    // add maximum punten taal
    link = link + "&entry.172236022=" + school.normering["Taal"].maxScore;
    // add behaalde punten taal
    link = link + "&entry.495845556=" + result.software["Taal"];
    // add norm toetsenbordvaardigheid
    link = link + "&entry.515611439=Software aanwezig voor: " + school.normering["Toetsenbordvaardigheid"].groepen;
    // add maximum punten toetsenbordvaardigheid
    link = link + "&entry.1072111236=" + school.normering["Toetsenbordvaardigheid"].maxScore;
    // add behaalde punten toetsenbordvaardigheid
    link = link + "&entry.610536905=" + result.software["Toetsenbordvaardigheid"];
    // add norm programmeren
    link = link + "&entry.358140914=Software aanwezig voor: " + school.normering["Programmeren"].groepen;
    // add maximum punten programmeren
    link = link + "&entry.1496499995=" + school.normering["Programmeren"].maxScore;
    // add behaalde punten programmeren
    link = link + "&entry.213984396=" + result.software["Programmeren"];
    // add norm mediawijsheid
    link = link + "&entry.1996120361=Software aanwezig voor: " + school.normering["Mediawijsheid"].groepen;
    // add maximum punten mediawijsheid
    link = link + "&entry.1636856887=" + school.normering["Mediawijsheid"].maxScore;
    // add behaalde punten mediawijsheid
    link = link + "&entry.250864707=" + result.software["Mediawijsheid"];
    // Commentaar digitale leermiddelen overgeslagen
    // add norm beoordeelde deskundigheid
    link = link + "&entry.1795064360=" + school.normering.minBeoordeeldeDeskundigheid;
    // add maximumscore beoordeelde deskundigheid
    link = link + "&entry.1881446672=" + school.normering.maxScoreBeoordeeldeDeskundigheid;
    // add behaalde punten beoordeelde deskundigheid
    link = link + "&entry.1465039664=" + Math.round(result.deskundigheid.beoordeeldeDeskundigheid*100)/100;
    // add norm ondersteuning nodig
    link = link + "&entry.150943780=" + school.normering.ondersteuningNodig;
    // add maximum punten ondersteuning nodig
    link = link + "&entry.189457267=" + school.normering.maxScoreOndersteuningNodig;
    // add behaalde punten ondersteuning nodig
    link = link + "&entry.1473449186=" + Math.round(result.deskundigheid.ondersteuningNodig*100)/100;
    // add norm gemiddelde effectiviteit
    link = link + "&entry.1693589537=" + school.normering.gemEffectiviteitDigitaleLeermiddelen;
    // add maximum punten gemiddelde effectiviteit
    link = link + "&entry.881247456=" + school.normering.maxScoreGemEffectiviteitDigitaleLeermiddelen;
    // add behaalde punten gemiddelde effectiviteit
    link = link + "&entry.957904447=" + Math.round(result.deskundigheid.gemiddeldeEffectiviteit*100)/100;
    // add maximum punten ict geletterdheid
    link = link + "&entry.1758323592=" + school.normering.maxScoreICTGeletterdheid;
    // add behaalde punten ict geletterdheid
    link = link + "&entry.1619556793=" + Math.round(result.deskundigheid.ictGeletterdheid*100)/100;
    // add maximum punten pedagogisch didactisch handelen
    link = link + "&entry.1451364700=" + school.normering.maxScorePedagogischDidactischHandelen;
    // add behaalde punten pedagogisch didactisch handelen
    link = link + "&entry.1859745088=" + Math.round(result.deskundigheid.pedagogischDidactisch*100)/100;
    // add maximum punten werken in schoolcontext
    link = link + "&entry.1351167981=" + school.normering.maxScoreWerkenSchoolcontext;
    // add behaalde punten werken in schoolcontext
    link = link + "&entry.139397010=" + Math.round(result.deskundigheid.werkenSchooltext*100)/100;
    // add maximum punten persoonlijke ontwikkeling
    link = link + "&entry.1425717852=" + school.normering.maxScorePersoonlijkeOntwikkeling;
    // add behaalde punten persoonlijke ontwikkeling
    link = link + "&entry.245857129=" + Math.round(result.deskundigheid.persoonlijkeOntwikkeling*100)/100;
    // add norm overeenstemming
    link = link + "&entry.1609604763=Er is overeenstemming";
    // add maximum punten overeenstemming
    link = link + "&entry.104211716=" + school.normering.maxScoreOvereenstemming;
    // add behaalde punten overeenstemming
    link = link + "&entry.1010607763=" + Math.round(result.organisatie.organisatorischeOvereenstemming*100)/100;
    // add norm netwerkbeheerder
    link = link + "&entry.2043717862=Drie vragen netwerkbeheer positief beantwoord";
    // add maximum punten netwerkbeheerder
    link = link + "&entry.1293847054=" + school.normering.maxScoreNetwerkbeheer;
    // add behaalde punten netwerkbeheer
    link = link + "&entry.574310292=" + Math.round(result.organisatie.netwerkbeheer*100)/100;
    // add norm ict incidentmelder
    link = link + "&entry.144283806=standaard: " + school.normering["ICT Incidentmelder"].normjaartaakuren 
                            + " extra: " + school.normering["ICT Incidentmelder"].extraUren;
    // add maximum punten ICT incidentmelder
    link = link + "&entry.186744948=" + school.normering["ICT Incidentmelder"].maxScore;
    // add behaalde punten ICT Incidentmelder
    link = link + "&entry.554137846=" + Math.round(result.organisatie.incidentmelder * 100)/100;
    // add norm onderwijskundig ICT'er
    link = link + "&entry.1499110767=standaard:" + school.normering["Onderwijskundig ICTer"].normjaartaakuren
                            + " extra: " + school.normering["Onderwijskundig ICTer"].extraUren;
    // add maximum punten onderwijskundig ICT'er
    link = link + "&entry.921727624=" + school.normering["Onderwijskundig ICTer"].maxScore;
    // add behaalde punten onderwijskundig ICT'er
    link = link + "&entry.1105626580=" + Math.round(result.organisatie.onderwijskundigICTer *100)/100;
    // add norm ICT inkoper
    link = link + "&entry.1266514313=standaard:" + school.normering["ICT Inkoper"].normjaartaakuren
                            + " extra: " + school.normering["ICT Inkoper"].extraUren;
    // add maximum punten ICT inkoper
    link = link + "&entry.1686565580=" + school.normering["ICT Inkoper"].maxScore;
    // add behaalde punten ICT inkoper
    link = link + "&entry.414594386=" + Math.round(result.organisatie.ictInkoper*100)/100;
    //vervang de spaties met +
    return link.split(' ').join('+');
}

module.exports = score;