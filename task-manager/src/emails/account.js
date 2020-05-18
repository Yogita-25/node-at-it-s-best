const NODE_TLS_REJECT_UNAUTHORIZED='0';
const sendgridAPIKey = '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';
const sGmail = require('@sendgrid/mail');

sGmail.setApiKey(sendgridAPIKey);

sGmail.send({
    to : 'yogita.dhanwate@harbingergroup.com',
    from : 'dyogita04@gmail.com',
    subject : 'this is my first mail',
    text : 'I hope this get to you'
});