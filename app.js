const express = require('express');  // creates the backend server.
const cors = require('cors'); //allows cross-origin requests from your React frontend.
const { sendEmail } = require('./mailer');

require('dotenv').config();  //manages environment variables

const app = express();

app.use(cors());
app.use(express.json());  //middleware that handles incoming requests with JSON payloads


//POST request
app.post('/api/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try{
        await sendEmail(to, subject, text);
        res.status(200).json({ success: true });
        //res.status(200).send('Email sent out successfully'); // return response 200 (ok)
    }

    catch(err){
        console.error(err.toString()); //logs error 
        res.status(500).json({ error: 'Failed to send email' });
        
        // res.status(500).send(error.toString());  //returns response 500 (error)
    }

});

module.exports = app;