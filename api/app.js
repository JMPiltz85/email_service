const express = require('express');  // creates the backend server.
const cors = require('cors'); //allows cross-origin requests from your React frontend.
const { sendEmail } = require('./mailer');

const app = express();

//NOTE: Specifies Which URLs to allow cross-origin requests from. 
//      Will need to update once hosting website properly
const allowedOrigins = [
  'http://localhost:3000'
];

app.use(cors({
    origin: allowedOrigins,
    methods: 'POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
//app.options('*', cors()); // allow preflight for all routes

app.use(express.json());  //middleware that handles incoming requests with JSON payloads

//POST request
app.post('/api/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to) {
        return res.status(400).json({ error: 'Missing To field' });
    }

    if (!subject) {
        return res.status(400).json({ error: 'Missing Subject field' });
    }

    if (!text) {
        return res.status(400).json({ error: 'Missing Text field' });
    }

    try{
        await sendEmail(to, subject, text);
        res.status(200).json({ success: true });
    }

    catch(err){
        console.error('Error sending email:', {
            message: err.message,
            stack: err.stack,
        });
        res.status(500).json({ 
            error: 'Failed to send email. Please try again later.',
            // details: err.message,
        });
    }

});

module.exports = app;