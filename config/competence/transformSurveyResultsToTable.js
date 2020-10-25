const transformResults = function(surveyResults){
  const results = [];
  surveyResults.forEach(function(r) {
  	if(!r.user || !r.questionScores){
  		console.log(r._id);
  		return
  	};
    const {questionScores = {}} = r;
    Object.keys(r.questionScores).forEach(function(key){
      questionScores[key] = r.questionScores[key];
    });
    let createdAt = '-'
    try {
       const created = new Date(r.createdAt);
       const year = created.getFullYear();
       const month = ('0' + (created.getMonth()+1)).slice(-2);
       const day = ('0' + created.getDate()).slice(-2);
       createdAt = year + month + day;
    } catch(e) {
      console.err(e);
    }
    const {_id : id,
      	   survey: surveyId,
      	   user: 
        		{
        			firstName, 
        			lastName, 
        			username : email, 
        			job, 
        			dateOfBirth, 
        			gender, 
        			publicProfile, 
        			isTeacher, 
        			gradeLevelGroup, 
        			organisation: 
        				{name: orgName} = {name: '-'},
        		  school,
              _id: userId
        		} = {}
      	  } = r;
    const result = {
      ...questionScores,
      result: r.result,
      date: createdAt,
      firstName: firstName,
      lastName: lastName,
      email: email,
      job: job,
      age: dateOfBirth ? ~~((Date.now() - new Date(dateOfBirth)) / (31557600000)) : '-',
      gender: gender,
      gradeLevel: gradeLevelGroup,
      isTeacher: isTeacher ? 'onderwijzend' : 'ondersteunend of -',
      organisation: orgName,
      school: school && school[0] ? school[0].name : '-',
      city: school && school[0] ? school[0].city : '-',
      link: publicProfile ? '<a href="/survey/' + id + '/result" target=_blank>Inzending</a>' : 'Geen inzage',
      chart: publicProfile ? '<a href="/survey/' + surveyId + '/' + userId + '" target=_blank>Grafiek</a>' : 'Geen inzage'
    }
    results.push(result);
  });
  return results;
}


module.exports = transformResults;