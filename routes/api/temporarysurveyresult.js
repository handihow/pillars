var express = require("express");
var router = express.Router({mergeParams: true});
var TemporarySurveyResult = require("../../models/temporarySurveyResult");

//Get 
router.get("/:tsid", function(req, res){
	var params = req.params.tsid.split("_");
	var surveyId = params[0];
	var userId = params[1];
	TemporarySurveyResult.findOne({user: userId, survey: surveyId}, function(err, tsi){
		if(err){
			res.json({success: false, message: err.message});
		} else if(!tsi){
			//nothing to send
			res.json({success: true, data: null});
		} else {
			//sending record
			res.json({success: true, data: tsi});
		}
	});
});

//Post
router.post("/:tsid", function(req, res){
	var params = req.params.tsid.split("_");
	var surveyId = params[0];
	var userId = params[1];
	TemporarySurveyResult.findOne({user: userId, survey: surveyId}, function(err, tsi){
		if(err){
			res.json({success: false, message: err.message});
		} else if(!tsi){
			//create a new record
			TemporarySurveyResult.create({
				user: userId,
				survey: surveyId,
				...req.body
			}, function(err, ctsi){
				if(err){
					res.json({success: false, message: err.message});
				} else {
					res.json({success: true});	
				}
			})
			
		} else {
			tsi.updateOne(req.body, function(err, utsi){
				if(err){
					res.json({success: false, message: err.message});
				} else {
					//update existing record
					res.json({success: true});
				}
			})
		}
	});
});


//Delete
router.delete("/:tsid", function(req, res){
	var params = req.params.tsid.split("_");
	var surveyId = params[0];
	var userId = params[1];
	TemporarySurveyResult.findOne({user: userId, survey: surveyId}, function(err, tsi){
		if(err || !tsi){
			res.json({success: false, message: err.message});
		} else {
			tsi.delete(function(err){
				if(err){
					res.json({success: false, message: err.message});
				} else {
					//deleted existing record
					res.json({success: true});
				}
			})
		}
	});
});



module.exports = router;