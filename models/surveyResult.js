var mongoose = require("mongoose");
var Survey = require("./survey");
var Statistic = require("./statistic");
var School = require("./school");

var surveyResultSchema = mongoose.Schema ( 
    {
        survey: {                                 
              type: mongoose.Schema.Types.ObjectId,
              ref: "Survey"
          },
        result: {type: {}, required: true},
        score: Number,
        isCompetenceSurvey: Boolean,
        competenceStandardKey: String,
        competenceStandardTitle: String,
        user: {                                 
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
        },
    }, { usePushEach: true, timestamps: true }
);

surveyResultSchema.pre('save', function(next) {
  if(this.isCompetenceSurvey){
    var result = this.result;
    var score = calculateSurveyScore(result);
    this.score = score;
    next();
  } else {
    next();
  }
});

function calculateSurveyScore(result){
  var totalScore = 0;
  var totalQuestions = 0;
  var isValidScore = true;
  Object.keys(result).forEach(function(value){
    var answer = result[value];
    if(typeof answer == 'boolean'){
      totalScore += answer ? 1 : 0;
    } else if (typeof answer == 'number'){
      totalScore += answer / 5;
    } else {
      isValidScore = false;
    }
    totalQuestions += 1;
  });
  if(isValidScore){
    return totalScore / totalQuestions;
  } else {
    return 0;
  }
}

surveyResultSchema.post('save', function(surveyResult, next) {
  if(surveyResult.score && surveyResult.competenceStandardKey){
    Statistic.findOne({"competenceStandardKey": surveyResult.competenceStandardKey, "isGlobalStatistic": true}, function(err, statistic){
      if(err){
        next(new Error({message: 'Something went wrong'}));
      }
      if(!statistic){
        //create
        Statistic.create({
          competenceStandardKey: surveyResult.competenceStandardKey,
          competenceStandardTitle: surveyResult.competenceStandardTitle,
          results: [surveyResult.score],
          isGlobalStatistic: true,
          isOrganisationStatistic: false,
          isSchoolStatistic: false,
        }, function(err, statistic){
          if(err){
            next(new Error({message: 'Error saving the global statistics'}));
          } else {
            next();
          }
        });
      } else {
        //update
        statistic.results.push(surveyResult.score);
        statistic.save(function(err, statistic){
          if(err){
            next(new Error({message: 'Error updating the global statistics'}));
          } else {
            next();
          }
        });
      }
    });
  } else {
    next();
  }
});

surveyResultSchema.post('save', function(surveyResult, next) {
  if(surveyResult.score && surveyResult.competenceStandardKey){
    Survey.findById(surveyResult.survey, function(err, survey){
      if(err || ! survey){
        next(new Error('Survey not found or something went wrong'));
      } else {
        Statistic.findOne({
          "competenceStandardKey": survey.competenceStandardKey, 
          "organisation": survey.organisation
        }, function(err, statistic){
          if(err){
            return console.log(err);
          }
          if(!statistic){
            //create
            Statistic.create({
              competenceStandardKey: survey.competenceStandardKey,
              competenceStandardTitle: survey.competenceStandardTitle,
              organisation: survey.organisation,
              results: [surveyResult.score],
              isGlobalStatistic: false
            }, function(err, statistic){
              if(err){
                next(new Error('Something went wrong saving organisation statistics'));
              } else {
                next();
              }
            });
          } else {
            //update
            statistic.results.push(surveyResult.score);
            statistic.save(function(err, statistic){
              if(err){
                next(new Error('Something went wrong'));
              } else {
                next();
              }
            });
          }
        });
      }
    });
  } else {
    next();
  }
});

surveyResultSchema.post('save', function(surveyResult, next) {
  if(surveyResult.score && surveyResult.competenceStandardKey){
    Survey.findById(surveyResult.survey, function(err, survey){
      if(err || ! survey){
        next(new Error('Survey not found or something went wrong'));
      } else {
        School.findOne({"users": surveyResult.user}, function(err, school) {
          if(err) {
            next(new Error('Error finding school in database'));
          } else if(!school){
            next();
          } else {
              Statistic.findOne({
                  "competenceStandardKey": survey.competenceStandardKey, 
                  "school": school
                }, function(err, statistic){
                  if(err){
                    next(new Error('Error finding statistics in database'));
                  } else if(!statistic){
                    //create
                    Statistic.create({
                      competenceStandardKey: survey.competenceStandardKey,
                      competenceStandardTitle: survey.competenceStandardTitle,
                      school: school,
                      results: [surveyResult.score],
                      isGlobalStatistic: false
                    }, function(err, statistic){
                      if(err){
                        next(new Error('Error saving school statistics in database'));
                      } else {
                        next();
                      }
                    });
                  } else {
                    //update
                    statistic.results.push(surveyResult.score);
                    statistic.save(function(err, statistic){
                      if(err){
                        next(new Error('Error saving school statistics in database'));
                      } else {
                        next();
                      }
                    });
                  }
                });
            }
          });
      }
    });
  } else {
    next();
  }
});


module.exports = mongoose.model("SurveyResult", surveyResultSchema);