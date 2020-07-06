var express = require("express");
var router = express.Router();
var config = require("../../config/config");

//UPDATE
router.put("/", async function(req, res){
	var collectionId = req.body.collectionId;
	var dataArray = Object.keys(req.body.data).map(function(key){return {...req.body.data[key], id: key}});
	var collectionName = require(`../../models/${collectionId}`)
	var results = [];
	var error;
	for (var i = dataArray.length - 1; i >= 0; i--) {
		try{
			var result = await collectionName.findByIdAndUpdate(dataArray[i].id, dataArray[i]);
			results.push(result);
		} catch(e) {
			error = e;
		}
	}
	if(error){
		res.json({
			data: results,
			error: error
		});	
	} else {
		res.json({
			data: results
		});	
	}
});

//DELETE
router.delete("/", async function(req, res){
	var collectionId = req.body.collectionId;
	var dataArray = Object.keys(req.body.data).map(function(key){return {...req.body.data[key], id: key}});
	var collectionName = require(`../../models/${collectionId}`)
	var error = "";
	for (var i = dataArray.length - 1; i >= 0; i--) {
		try{
			await collectionName.findByIdAndRemove(dataArray[i].id);
		} catch(e) {
			error = e;
		}
	}
	res.json({
		error: error
	});	
	
});

module.exports = router;