const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var email = {};

email.cc = function(email, name, subject, html){
    const msg = {
      to: email,
      cc: "info@pillars.school",
      from: 'notifications@pillars.school',
      subject: subject,
      html: html,
    };
    return sgMail.send(msg);
};

email.nocc = function(email, name, subject, html){
    const msg = {
      to: email,
      from: 'notifications@pillars.school',
      subject: subject,
      html: html,
    };
    return sgMail.send(msg);
}; 

module.exports = email;