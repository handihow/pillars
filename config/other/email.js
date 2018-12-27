var mailjet = require ('node-mailjet')
.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

var email = {};

email.cc = function(email, name, subject, html){
    var request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
        {
            "From": {
                "Email": "notifications@pillars.school",
                "Name": "Pillars"
            },
            "To": [
            {
                "Email": email,
                "Name": name,
            }
            ],
            "Cc": [
            {
              "Email": "info@pillars.school",
              "Name": "Pillars admin"
          }
          ],
          "Subject": subject,
          "HTMLPart": html
      }
      ]
  });
    return request;
};

email.nocc = function(email, name, subject, html){
    var request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
        {
            "From": {
                "Email": "notifications@pillars.school",
                "Name": "Pillars"
            },
            "To": [
            {
                "Email": email,
                "Name": name,
            }
            ],
            "Subject": subject,
            "HTMLPart": html
        }
        ]
    });
    return request;
}; 

module.exports = email;