
var helpers = {};

helpers.validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

helpers.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

helpers.registerUser = function (username, school, organisation, role, password, firstName, lastName){
  var User = require("../../models/user");
  return new Promise(resolve => {
      try{
      	var newUser = new User({username: username, role: role ? role : 'suser', firstName: firstName ? firstName : null, lastName: lastName ? lastName : null});
      } catch(e){
      	resolve(true);
      }
      var generatedPassword = Math.random().toString(36).substr(2, 8);
      User.register(newUser, password ? password : generatedPassword, function(err, user){
        if(err){
          return resolve(true);
        }
        if(school){
           user.school = school._id;
           user.organisation = school.organisation;
           user.save();
           //add user to school users
           school.users.push(user);
           school.save(function(err, school){
              if(err){
                return resolve(true);
              }
              resolve(false);
           });
        } else if(organisation){
          user.organisation = organisation._id;
          user.save();
          resolve(false);
        }
       
      });  
  });
}

module.exports = helpers;