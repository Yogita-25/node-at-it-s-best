var nodemailer = require("nodemailer");

const sendEmail = async (to, emailBody, emailSubject, htmlBody) => {
    var transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        tls: {
          ciphers:"SSLv3"
          },
          port : 587,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS 
        }
      });

    var mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: to,
        subject: emailSubject,
        text: emailBody,
        html : htmlBody || ""
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
         // console.log(error);
        } else {
          //console.log("Email sent: " + info.response);
        }
      }); 
};

module.exports = {
    sendEmail
};