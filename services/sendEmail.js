// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function sendEmail(name, email) {
  const msg = {
    to: email,
    from: 'you@yourdomain.com',
    templateId: process.env.SUBSCRIPTION_TEMPLATE_ID,
    dynamic_template_data: { name },
  };
  console.log('msg:', msg);
//   await sgMail.send(msg);
};
