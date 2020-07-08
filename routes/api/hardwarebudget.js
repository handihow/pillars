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
			console.log('no budget lines found');
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

function createHardwareBudget(schoolId, trackedHardware, result){
	return new Promise(function(resolve, reject){
		School.findById(schoolId).populate("hardware").populate("standard").exec(function(err, school){
		    if(err || !school) {
		      	resolve([])
		    } else {
		      	let trackedHardware = hardwareScore.calculateHardwareStatus(school);
		      	var result = score.calculate(school, [], true);
		      	const newBudgetLines = [];
				trackedHardware.forEach(hardware => {
					var newBudgetLine = {
						type: hardware.singular,
						price: hardware.defaultPrice,
						school: schoolId
					};
					[0,1,2,3,4].forEach(index => {
						var year = (new Date().getFullYear() + index).toString();
						var missingComputers; var missingDigitalSchoolbords; var missingLaptops
						if(index === 0){
							missingComputers = result.hardware.missingComputers[index];
							missingDigitalSchoolbords = result.hardware.missingDigitalSchoolbords[index];
							missingLaptops = result.hardware.missingLaptops[index];	
						} else {
							missingComputers = result.hardware.missingComputers[index] - result.hardware.missingComputers[index - 1];
							missingDigitalSchoolbords = result.hardware.missingDigitalSchoolbords[index] - result.hardware.missingDigitalSchoolbords[index - 1];
							missingLaptops = result.hardware.missingLaptops[index] - result.hardware.missingLaptops[index - 1];
						}
						var newLaptops = Math.max(missingComputers, missingLaptops);
						
						var advisedQuantity = 0;
						if(hardware.singular === 'Digitaal schoolbord'){
							advisedQuantity = missingDigitalSchoolbords;
						} else if(hardware.singular === 'Laptop'){
							advisedQuantity = newLaptops;
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
			HardwareBudget.findOneAndUpdate({_id: mongoose.Types.ObjectId(record.id) }, record, {returnOriginal : false}, function(err, doc){
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
