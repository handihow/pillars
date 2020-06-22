var express = require("express");
var router = express.Router();
var Survey = require("../../models/survey");

//SET CHART ELEMENT VISIBILITY TO SURVEY
router.post("/:sid", function(req, res){
	Survey.findByIdAndUpdate(req.params.sid, {
		$set: {
            chartElementVisibility: req.body.chartElementVisibility
        }
	}, function(err, survey){
		if(err){
			res.json({success: false, message: err.message});
		} else {
			res.json({success: true, message: null});
		}
	});
});

module.exports = router;