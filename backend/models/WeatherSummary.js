const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const WeatherSummary = sequelize.define('WeatherSummary', {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
    },
    averageTemperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    maximumTemperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    minimumTemperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dominantWeather: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    averageHumidity: { // New field for average humidity
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    averageWindSpeed: { // New field for average wind speed
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = WeatherSummary;
