const nodemailer = require('nodemailer'); //sends emails through Gmail's SMTP.

// Create a transport for Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: process.env.GMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

async function sendEmail(to, subject, text) {

  return transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        text,
  });

}

module.exports = { sendEmail };