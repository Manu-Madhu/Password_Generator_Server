const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrpt = require('bcryptjs');
const dotEnv = require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/generate-password', (req, res) => {
    console.log(req.body)
    try {
        const { length, uppercase, lowercase, numbers, specialChars } = req.body;
        let characters = '';

        if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) characters += '0123456789';
        if (specialChars) characters += '!@#$%^&*()-_+=~';

        if (!characters) {
            return res.status(400).json({ error: 'Please select at least one character type.' });
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        res.status(200).json({ password });


    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error")
    }
})


app.listen(PORT, () => {
    console.log(`port Listening http://localhost:${PORT}`)
})