const NODE_TLS_REJECT_UNAUTHORIZED = '0';
const sendgridAPIKey = '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';
const sGmail = require('@sendgrid/mail');

sGmail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sGmail.send({
        to: email,
        from: 'dyogita04@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. let me know how you get along with the app`,
        html : '<h1>Happy Learning:-)</h1>'
    })
}

const sendCancelationEmail = (email,name)=>{
    sGmail.send({
        to : email,
        from :'dyogita04@gmail.com',
        subject : 'Sorry to see you go',
        text : `Goodbye ${name}. Hope to see you soon!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};