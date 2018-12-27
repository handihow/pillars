var express = require("express");
var router = express.Router({mergeParams: true});
var School = require("../../models/school");
var middleware = require("../../middleware");
var json2csv = require("json2csv");
var config = require("../../config/config");
var score = require("../../config/score");

//SHOW ROUTE INVOER OVERVIEW SCHOLEN
router.get("/schools", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {name: 1}},
        function(err, schools){
            if(err || !schools) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.render("overview/schools", {schools: schools});         
            }
        });
});

//SHOW ROUTE HARDWARE OVERVIEW SCHOLEN
router.get("/hardware", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {name: 1}})
    .populate("hardware")
    .populate("standard")
    .exec(function(err, schools){
      if(err || !schools) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        schools.forEach(function(school){
            school.hardware.forEach(function(hardware){
              if(school.standard){
                if(school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
                        hardware.memory < school.standard.hardware.computersPerStudent.minRAM){
                    hardware.isDepreciated = true;
                    hardware.warning = "Te weinig werkgeheugen";
                } else if(!school.standard.hardware.computersPerStudent.isComputer.includes(hardware.type) && 
                        hardware.deploymentYear >= (new Date()).getFullYear() - school.standard.hardware.computersPerStudent.maxYear) {
                    hardware.isDepreciated = true;
                    hardware.warning = "Apparaat is te oud";
                }
              }
            });
        });
        res.render("overview/hardware", {schools: schools});         
    }
});
});

//DOWNLOAD ROUTE HARDWARE OVERVIEW SCHOLEN
router.get("/hardware/download", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {name: 1}})
    .populate("hardware")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var hardwareList = [];
        scholen.forEach(function(school){
            school.hardware.forEach(function(hardware){
                hardware.school = school.name;
                hardwareList.push(hardware);
            });
        });
        var fields = ['school', 'type', 'name', 'brand', 'model', 'serialTag', 
        'processor', 'memory', 'deploymentYear','numberWorkPlacesMultipoint',
        'isTouchscreenDigibord', 'screensizeDigibord'];
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
        {sort: {name: 1}})
    .populate("software")
    .exec(function(err, schools){
      if(err || !schools) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        res.render("overview/software", {schools: schools});         
    }
});
});

//DOWNLOAD ROUTE SOFTWARE OVERVIEW SCHOLEN
router.get("/software/download", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {name: 1}})
    .populate("software")
    .exec(function(err, schools){
      if(err || !schools) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var softwareList = [];
        schools.forEach(function(school){
            school.software.forEach(function(software){
                var newSoftware = {};
                newSoftware.school = school.name;
                newSoftware.subject = software.subject;
                newSoftware.name = software.name;
                software.functionalities.forEach(function(functionality){
                    newSoftware[functionality] = "Ja";
                });
                software.gradeLevels.forEach(function(gradeLevel){
                    newSoftware[gradeLevel] = "Ja"; 
                });
                software.ratings.forEach(function(rating){
                    newSoftware[rating] = "Ja";
                });
                newSoftware.effectiveness = software.effectiveness;
                softwareList.push(newSoftware);
            });
        });
        var fields = ['school', 'subject', 'name'];
        var fieldNames = ['School', 'Vak', 'Naam'];
        config.software.functionality.forEach(function(functionality){
         fields.push(functionality);
         fieldNames.push(functionality);
     });
        for (var i=1; i<=8; i++) {
            var gradeLevel = "Groep " + i;
            fields.push(gradeLevel);
            fieldNames.push(gradeLevel);
        }
        config.software.ratings.forEach(function(rating){
         fields.push(rating);
         fieldNames.push(rating);
     });
        fields.push('effectiveness');
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
        {sort: {name: 1}})
    .populate("tests")
    .exec(function(err, schools){
      if(err || !schools) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        res.render("overview/tests", {schools: schools});         
    }
});
});

//DOWNLOAD ROUTE TEST OVERVIEW SCHOLEN
router.get("/tests/download", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {name: 1}})
    .populate("tests")
    .exec(function(err, schools){
      if(err || !schools) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var testList = [];
        schools.forEach(function(school){
            school.tests.forEach(function(test){
                test.school = school.name;
                test.result = Math.ceil(test.result*1000)/10;
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
        {sort: {name: 1}})
    .populate("hardware")
    .populate("software")
    .populate("tests")
    .populate("standard")
    .exec(function(err, schools){
      if(err || !schools) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var results = [];
        schools.forEach(function(school){
            var result = score.calculate(school);
            results.push(result);
        });
        res.locals.scripts.footer.chartjs = true;
        res.locals.scripts.footer.pillars = true;
        res.locals.scripts.footer.overview = true;
        res.render("overview/pillars", {schools: schools, results: results});   
    }
});
});

//SHOW ROUTE TEST RESULTATEN SCHOLEN
router.get("/pillars/api", middleware.isAuthenticatedBadmin, function(req, res){
    School.find(
        {"organisation": req.user.organisation}, 
        null,
        {sort: {name: 1}})
    .populate("hardware")
    .populate("software")
    .populate("tests")
    .populate("standard")
    .exec(function(err, schools){
      if(err || !schools) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var results = [];
        schools.forEach(function(school){
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
        {sort: {name: 1}})
    .populate("hardware")
    .populate("software")
    .populate("tests")
    .populate("standard")
    .exec(function(err, scholen){
      if(err || !scholen) {
        req.flash("error", err.message);
        res.redirect("back");
    } else {
        var results = [];
        scholen.forEach(function(school){
            var result = score.calculate(school);
            result.school = school.name;
            results.push(result);
        });
        var fields = ['school', 'total[hardware]', 'total[software]','total[competence]', 'total[management]'];
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