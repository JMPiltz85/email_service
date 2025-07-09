const express = require('express');  // creates the backend server.
const nodemailer = require('nodemailer'); //sends emails through Gmail's SMTP.
const cors = require('cors'); //allows cross-origin requests from your React frontend.

require('dotenv').config();  //manages environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  //middleware that handles incoming requests with JSON payloads

// Create a transport for Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

//POST request
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
            from: process.env.GMAIL_USER,
            to,
            subject,
            text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());  //returns response 500 (error)
        }
        res.status(200).send('Email sent: ' + info.response); // return response 200 (ok)
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});