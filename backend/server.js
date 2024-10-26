const express = require('express');
const cors = require('cors');
const axios = require('axios');
const sequelize = require('./db'); // Adjust the path as needed
const Weather = require('./models/weather'); // Adjust the path as needed
const WeatherSummary = require('./models/WeatherSummary'); // Adjust the path as needed

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Connect to the database
sequelize.sync()
    .then(() => {
        console.log('Database connected and synced.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Roll-up function for weather data
async function rollUpWeatherData(data) {
    const date = new Date(data.dt * 1000).toISOString().split('T')[0]; // Convert Unix timestamp to date
    const temperature = data.main.temp - 273.15; // Convert Kelvin to Celsius
    const humidity = data.main.humidity; // Get humidity
    const windSpeed = data.wind.speed; // Get wind speed

    const [summary, created] = await WeatherSummary.findOrCreate({
        where: { date },
        defaults: {
            averageTemperature: temperature,
            maximumTemperature: temperature,
            minimumTemperature: temperature,
            dominantWeather: data.weather[0].main,
            averageHumidity: humidity,
            averageWindSpeed: windSpeed,
        },
    });

    if (!created) {
        // Update existing summary
        summary.averageTemperature = (summary.averageTemperature + temperature) / 2;
        summary.maximumTemperature = Math.max(summary.maximumTemperature, temperature);
        summary.minimumTemperature = Math.min(summary.minimumTemperature, temperature);
        summary.dominantWeather = summary.dominantWeather; // Logic to determine dominant weather can be added
        summary.averageHumidity = (summary.averageHumidity + humidity) / 2; // Update average humidity
        summary.averageWindSpeed = (summary.averageWindSpeed + windSpeed) / 2; // Update average wind speed
        await summary.save();
    }
}

// Endpoint to handle weather data
app.post('/weather', async (req, res) => {
    try {
        const weatherData = req.body;

        // Save weather data to the database
        await Weather.create({
            city: weatherData.name,
            temperature: weatherData.main.temp - 273.15, // Convert to Celsius
            feels_like: weatherData.main.feels_like - 273.15, // Convert to Celsius
            main: weatherData.weather[0].main,
            humidity: weatherData.main.humidity,
            wind_speed: weatherData.wind.speed,
        });

        // Roll up weather data for summaries
        await rollUpWeatherData(weatherData);

        res.status(201).send('Weather data saved successfully.');
    } catch (error) {
        console.error('Error saving weather data:', error);
        res.status(500).send('Error saving weather data.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
