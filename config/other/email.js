const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var email = {};

email.cc = function(email, name, subject, html){
    const msg = {
      to: email,
      cc: "info@pillars.school",
      from: 'Pillars - voor optimale ict-resultaten <notifications@pillars.school>',
      subject: subject,
      html: html,
    };
    return sgMail.send(msg);
};

email.nocc = function(email, name, subject, html){
    const msg = {
      to: email,
      from: 'Pillars - voor optimale ict-resultaten <notifications@pillars.school>',
      subject: subject,
      html: html,
    };
    return sgMail.send(msg);
}; 

email.invite = function(emails, subject, html){
  const msg = {
    to: emails,
    from: 'Pillars - voor optimale ict-resultaten <notifications@pillars.school>',
    templateId: 'd-171972866e6348c5910fdbb3dca8f3ea',
    dynamic_template_data: {
      emailBody: html,
      subject: subject
    },
    subject: subject
  };
  return sgMail.send(msg);
}

email.podd = function(toEmails, subject, data){
  const to = toEmails.length === 1 ? toEmails[0] : toEmails;
  console.log(to);
  const msg = {
    to: to,
    from: 'Pillars - voor optimale ict-resultaten <notifications@pillars.school>',
    templateId: 'd-5835ff6b1a354f57a291198edf91f6d9',
    dynamic_template_data: data,
    subject: subject
  };
  return sgMail.send(msg);
}

module.exports = email;