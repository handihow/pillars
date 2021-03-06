var express = require("express");
var router = express.Router({mergeParams: true});
var config = require("../../config/config");
var HardwareBudget = require('../../models/hardwareBudget');
var mongoose = require("mongoose");
var School = require("../../models/school");
var score = require("../../config/score");
var hardwareScore = require("../../config/hardware/score");


router.get('/', function(req, res){
	var schoolId = req.query.schoolId;
	HardwareBudget.find({school: mongoose.Types.ObjectId(schoolId)}, async function(err, budgetLines){
		if(err || !budgetLines || budgetLines.length === 0){
			var firstTimeBudgetLines = await createHardwareBudget(schoolId);
			res.json({
				data: firstTimeBudgetLines
			})
		} else {
			res.json({
				data: budgetLines
			});
		}
	})
})

router.get('/overview', function(req, res){
	var organisationId = req.query.organisationId;
	School.find({organisation: mongoose.Types.ObjectId(organisationId)}, function(err, schools){
		if(err || !schools || schools.length === 0){
			res.json({
				error: 'Geen scholen gevonden'
			})
		} else {
			HardwareBudget.find({school: {$in : schools.map(s => s._id)}})
			.populate('school').exec(function(err, budgetLines){
				if(err){
					res.json({
						error: err && err.message ? err.message : "Er ging iets mis..."
					});
				} else {
					res.json({
						data: budgetLines
					});
				}
			})
		}
	})
})

function createHardwareBudget(schoolId, trackedHardware, result){
	return new Promise(function(resolve, reject){
		School.findById(schoolId).populate("hardware").populate("standard").exec(function(err, school){
		    if(err || !school) {
		      	resolve([])
		    } else {
		      	let trackedHardware = hardwareScore.calculateHardwareStatus(school);
		      	var result = score.calculate(school, [], true);
		      	const newBudgetLines = [];
		      	var missingComputers = result.hardware.missingComputers [4];
				var missingLaptops = result.hardware.missingLaptops[4];
				var missingDigitalSchoolbords = result.hardware.missingDigitalSchoolbords[4];
				var newLaptops = Math.max(missingComputers, missingLaptops);
				
				console.log(missingDigitalSchoolbords);
				console.log(newLaptops);

				//calculate the advised quantities per year
				var quotientDigitalSchoolbords = Math.floor(missingDigitalSchoolbords/5);
				var remainderDigitalSchoolbords = missingDigitalSchoolbords % 5;

				console.log(quotientDigitalSchoolbords);
				console.log(remainderDigitalSchoolbords);

				var quotientLaptops = Math.floor(newLaptops/5);
				var remainderLaptops = newLaptops % 5;

				console.log(quotientLaptops);
				console.log(remainderLaptops);

				trackedHardware.forEach(hardware => {
					var newBudgetLine = {
						type: hardware.singular,
						price: hardware.defaultPrice,
						school: schoolId
					};
					[0,1,2,3,4].forEach(index => {
						var year = (new Date().getFullYear() + index).toString();
						var advisedQuantity = 0;
						if(hardware.singular === 'Digitaal schoolbord'){
							advisedQuantity = quotientDigitalSchoolbords;
							if(index === 0){
								advisedQuantity += remainderDigitalSchoolbords;
							}
							console.log('digitaal schoolbord');
							console.log(year);
							console.log(advisedQuantity);
						} else if(hardware.singular === 'Laptop'){
							advisedQuantity = quotientLaptops;
							if(index === 0){
								advisedQuantity += remainderLaptops;
							}
							console.log('laptop');
							console.log(year);
							console.log(advisedQuantity);
						}
						newBudgetLine[year] = advisedQuantity;
					});
					newBudgetLines.push(newBudgetLine);
				});
				HardwareBudget.insertMany(newBudgetLines)
				    .then(function (docs) {
				        resolve(docs);
				    })
				    .catch(function (err) {
				        resolve([]);
				    });       
		    }
		  });
	});
}

router.post("/", function(req, res){
	var dataArray = Object.keys(req.body.data).map(function(key){return {...req.body.data[key], id: key}});
	var results = [];
	var error;
	if(req.body.action === 'remove'){
		deleteRecords(req, res, dataArray, error);
	} else if (req.body.action === 'edit') {
		updateRecords(req, res, dataArray, results, error);
	} else {
		var newRecords = Object.keys(req.body.data).map(function(key){ return {...req.body.data[key], school: req.body.schoolId}});
		//adding hardware budget lines
		HardwareBudget.insertMany(newRecords)
				    .then(function (docs) {
				        res.json({
							data: docs,
						});
				    })
				    .catch(function(error){
				    	res.json({
							data: [],
							error: error && error.message ? error.message : 'Er ging iets mis...'
						});
				    })
	}
});

//UPDATE
async function updateRecords(req, res, dataArray, results, error){	
	for (var i = dataArray.length - 1; i >= 0; i--) {
		var result = await updateRecord(dataArray[i]);
		results.push(result);
	}
	res.json({
		data: results,
		error: error && error.message ? error.message : ''
	});	
}

function updateRecord(record){
	return new Promise(function(resolve, reject){
		try{
			HardwareBudget.findOneAndUpdate({_id: mongoose.Types.ObjectId(record.id) }, record, {returnOriginal : false})
			.populate('school').exec(function(err, doc){
				if(err || !doc){
					resolve('Probleem bij updaten van record');
				} else {
					resolve(doc);
				}
			});
		} catch(e){
			resolve(e.message ? e.message : JSON.stringify(e))
		}
		
	})
}

//DELETE
async function deleteRecords(req, res, dataArray, error){
	HardwareBudget.deleteMany({_id: {$in : dataArray.map(d => mongoose.Types.ObjectId(d.id))}}, function(err){
		res.json({
			error: err ? err.message : ''
		});	
	});
};

module.exports = router;
