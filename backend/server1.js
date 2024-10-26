// server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const WeatherSummary = require('./models/WeatherSummary');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Nodemailer setup for email alerts
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
});

// Function to roll up daily weather data
async function rollUpWeatherData(data) {
    const date = new Date(data.dt * 1000).toISOString().split('T')[0]; // Convert Unix timestamp to date
    const temperature = data.main.temp - 273.15; // Convert Kelvin to Celsius

    const [summary, created] = await WeatherSummary.findOrCreate({
        where: { date },
        defaults: {
            averageTemperature: temperature,
            maximumTemperature: temperature,
            minimumTemperature: temperature,
            dominantWeather: data.weather[0].main,
        },
    });

    if (!created) {
        // Update existing summary
        summary.averageTemperature = (summary.averageTemperature + temperature) / 2; // Calculate average
        summary.maximumTemperature = Math.max(summary.maximumTemperature, temperature);
        summary.minimumTemperature = Math.min(summary.minimumTemperature, temperature);
        // Logic for determining dominant weather can be implemented here
        await summary.save();
    }
}

// Alerting logic
let lastTemperature = null;

// Function to send email alerts
async function sendAlertEmail(currentTemperature) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ALERT_EMAIL, // Recipient email for alerts
        subject: 'Temperature Alert!',
        text: `Alert: Temperature exceeded 35°C. Current temperature: ${currentTemperature}°C.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Alert email sent successfully.');
    } catch (error) {
        console.error('Error sending alert email:', error);
    }
}

// Function to check temperature alerts
async function checkTemperatureAlerts(data) {
    const temperature = data.main.temp - 273.15; // Convert Kelvin to Celsius

    // Check if the temperature exceeds the threshold
    if (lastTemperature !== null && temperature > 35 && lastTemperature > 35) {
        console.log('Alert: Temperature exceeded 35°C for two consecutive updates.');
        await sendAlertEmail(temperature); // Send alert email
    }

    lastTemperature = temperature; // Update the last temperature
}

// Sample route to receive weather data
app.post('/weather', async (req, res) => {
    try {
        const data = req.body; // Assuming the weather data is sent in the body
        await rollUpWeatherData(data);
        await checkTemperatureAlerts(data);
        res.status(200).json({ message: 'Weather data processed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing weather data.' });
    }
});

// Route to get daily weather summaries
app.get('/weather/summaries', async (req, res) => {
    try {
        const summaries = await WeatherSummary.findAll();
        res.status(200).json(summaries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching weather summaries.' });
    }
});

// Start server
app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT}`);
    await sequelize.sync();
    console.log('Database connected and synced.');
});
