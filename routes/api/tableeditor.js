var express = require("express");
var router = express.Router();
var config = require("../../config/config");
var mongoose = require("mongoose");
var School = require('../../models/school');

router.post("/", function(req, res){
	var dataArray = Object.keys(req.body.data).map(function(key){return {...req.body.data[key], id: key}});
	var collectionName = require(`../../models/${req.body.collectionId}`)
	var results = [];
	var error;
	if(req.body.action === 'edit'){
		updateRecords(req, res, dataArray, collectionName, results, error);
	} else if(req.body.action === 'remove') {
		deleteRecords(req, res, dataArray, collectionName, error);
	} else {
		var newRecords;
		if(req.body.schoolId){
			newRecords = Object.keys(req.body.data).map(function(key){ return {school: req.body.schoolId, ...req.body.data[key]}});
		} else {
			newRecords = Object.keys(req.body.data).map(function(key){ return {...req.body.data[key]}});
		}
		collectionName.create(newRecords[0], function(err, record){
			if(err){
				res.json({
					data: [],
					error: error && error.message ? error.message : 'Er ging iets mis...'
				});
			} else {
				if(req.body.schoolId){
		    		School.findById(req.body.schoolId, function(err, school){
		    			if(err){
		    				res.json({
								data: [],
								error: error && error.message ? error.message : 'Er ging iets mis...'
							});
		    			} else {
				            school[req.body.collectionId].push(record._id);
				            //then save the school
				            school.save(function(err){
				              if(err){
				                res.json({
									data: [],
									error: error && error.message ? error.message : 'Er ging iets mis...'
								});
				              } else {
				                res.json({
									data: [record],
								});               
				              }
				            });
		    			}
		    		})
		    	} else {
		    		res.json({
						data: [record],
					});
		    	}

			}
		});
	}
})


//UPDATE
async function updateRecords(req, res, dataArray, collectionName, results, error){	
	for (var i = dataArray.length - 1; i >= 0; i--) {
		let record = dataArray[i];
		var result = await updateRecord(record, collectionName);
		results.push(result);
	}
	res.json({
		data: results,
		error: error && error.message ? error.message : ''
	});	
}

function updateRecord(record, collectionName){
	return new Promise(function(resolve, reject){
		try{
			collectionName.findOneAndUpdate({_id: mongoose.Types.ObjectId(record.id) }, record, {returnOriginal : false}, function(err, doc){
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
async function deleteRecords(req, res, dataArray, collectionName, error){
	collectionName.deleteMany({_id: {$in : dataArray.map(d => mongoose.Types.ObjectId(d.id))}}, function(err){
		res.json({
			error: err ? err.message : ''
		});	
	});
};

module.exports = router;