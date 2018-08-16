var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../models/school");
var middleware = require("../middleware");
var json2csv = require("json2csv");
var global = require("../models/global");
var score = require("../models/score");

//SHOW ROUTE INVOER OVERVIEW SCHOLEN
router.get("/scholen", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}},
        function(err, scholen){
            if(err || !scholen) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.render("overview/scholen", {scholen: scholen});         
            }
        });
});

//SHOW ROUTE HARDWARE OVERVIEW SCHOLEN
router.get("/hardware", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}})
    .populate("hardware")
    .populate("normering")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        scholen.forEach(function(school){
            school.hardware.forEach(function(hardware){
              if(school.normering){
                if(school.normering.hardwareTypesCountedAsComputer.includes(hardware.type) && hardware.werkgeheugen < school.normering.minRAM){
                    hardware.isVerouderd = true;
                    hardware.waarschuwing = "Te weinig werkgeheugen";
                } else if(!school.normering.hardwareTypesCountedAsComputer.includes(hardware.type) && hardware.jaarIngebruikname < school.normering.minYear) {
                    hardware.isVerouderd = true;
                    hardware.waarschuwing = "Apparaat is te oud";
                }
            }
        });
        });
        res.render("overview/hardware", {scholen: scholen});         
    }
});
});

//DOWNLOAD ROUTE HARDWARE OVERVIEW SCHOLEN
router.get("/hardware/download", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}})
    .populate("hardware")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var hardwareList = [];
        scholen.forEach(function(school){
            school.hardware.forEach(function(hardware){
                hardware.school = school.instellingsnaam;
                hardwareList.push(hardware);
            });
        });
        var fields = ['school', 'type', 'naam', 'merk', 'model', 'serialTag', 
        'processor', 'werkgeheugen', 'jaarIngebruikname','aantalWerkplekkenMultipoint',
        'isTouchscreenDigibord', 'schermgrootteDigibord'];
        var fieldNames = ['School', 'Type', 'Naam', 'Merk', 'Model', 'Serial/Tag', 
        'Processor', 'Werkgeheugen (GB)', 'Jaar ingebruikname', 'Aantal werkplekken (Multipoint)',
        'is Touchscreen', 'Schermgrootte'];
        json2csv({ data: hardwareList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.setHeader('Hardware-download', 'attachment; filename=hardware.csv');
                res.set('Content-Type', 'text/csv');
                res.status(200).send(csv);
            }
        });
    }
});
});

//SHOW ROUTE SOFTWARE OVERVIEW SCHOLEN
router.get("/software", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}})
    .populate("software")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        res.render("overview/software", {scholen: scholen});         
    }
});
});

//DOWNLOAD ROUTE SOFTWARE OVERVIEW SCHOLEN
router.get("/software/download", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}})
    .populate("software")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var softwareList = [];
        scholen.forEach(function(school){
            school.software.forEach(function(software){
                var newSoftware = {};
                newSoftware.school = school.instellingsnaam;
                newSoftware.vak = software.vak;
                newSoftware.naam = software.naam;
                software.functie.forEach(function(functie){
                    newSoftware[functie] = "Ja";
                });
                software.groep.forEach(function(groep){
                    newSoftware[groep] = "Ja"; 
                });
                software.kwaliteit.forEach(function(kwaliteit){
                    newSoftware[kwaliteit] = "Ja";
                });
                newSoftware.effectiviteit = software.effectiviteit;
                softwareList.push(newSoftware);
            });
        });
        var fields = ['school', 'vak', 'naam'];
        var fieldNames = ['School', 'Vak', 'Naam'];
        global.softwareFuncties.forEach(function(functie){
         fields.push(functie);
         fieldNames.push(functie);
     });
        for (var i=1; i<=8; i++) {
            var groep = "Groep " + i;
            fields.push(groep);
            fieldNames.push(groep);
        }
        global.softwareKwaliteiten.forEach(function(kwaliteit){
         fields.push(kwaliteit);
         fieldNames.push(kwaliteit);
     });
        fields.push('effectiviteit');
        fieldNames.push('Effectiviteit');
        json2csv({ data: softwareList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.setHeader('Software-download', 'attachment; filename=software.csv');
                res.set('Content-Type', 'text/csv');
                res.status(200).send(csv);
            }
        });
    }
});
});

//SHOW ROUTE TEST RESULTATEN SCHOLEN
router.get("/tests", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}})
    .populate("tests")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        res.render("overview/tests", {scholen: scholen});         
    }
});
});

//DOWNLOAD ROUTE TEST OVERVIEW SCHOLEN
router.get("/tests/download", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}})
    .populate("tests")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var testList = [];
        scholen.forEach(function(school){
            school.tests.forEach(function(test){
                test.school = school.instellingsnaam;
                testList.push(test);
            });
        });
        var fields = ['school', 'subject', 'result','username'];
        var fieldNames = ['School', 'Onderdeel', 'Resultaat', 'Gebruiker'];
        json2csv({ data: testList, fields: fields, fieldNames: fieldNames }, function(err, csv) {
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.setHeader('Test-download', 'attachment; filename=tests.csv');
                res.set('Content-Type', 'text/csv');
                res.status(200).send(csv);
            }
        });
    }
});
});

//SHOW ROUTE TEST RESULTATEN SCHOLEN
router.get("/pillars", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}})
    .populate("hardware")
    .populate("software")
    .populate("tests")
    .populate("normering")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var results = [];
        scholen.forEach(function(school){
            var result = score.calculate(school);
            results.push(result);
        });
        res.render("overview/pillars", {scholen: scholen, results: results});   
    }
});
});

//SHOW ROUTE TEST RESULTATEN SCHOLEN
router.get("/pillars/api", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}})
    .populate("hardware")
    .populate("software")
    .populate("tests")
    .populate("normering")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var results = [];
        scholen.forEach(function(school){
            var result = score.calculate(school);
            results.push(result);
        });
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(results));
    }
});
});

//DOWNLOAD ROUTE TEST RESULTATEN SCHOLEN
router.get("/pillars/download", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {instellingsnaam: 1}})
    .populate("hardware")
    .populate("software")
    .populate("tests")
    .populate("normering")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var results = [];
        scholen.forEach(function(school){
            var result = score.calculate(school);
            result.school = school.instellingsnaam;
            results.push(result);
        });
        var fields = ['school', 'totaal[hardware]', 'totaal[software]','totaal[deskundigheid]', 'totaal[organisatie]'];
        var fieldNames = ['School', 'Hardware', 'Digitale Leermiddelen', 'Deskundigheid', 'Organisatie'];
        json2csv({ data: results, fields: fields, fieldNames: fieldNames }, function(err, csv) {
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.setHeader('Pillars-download', 'attachment; filename=pillars.csv');
                res.set('Content-Type', 'text/csv');
                res.status(200).send(csv);
            }
        });
    }
});
});

module.exports = router;