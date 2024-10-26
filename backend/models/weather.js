const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Weather = sequelize.define('Weather', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  feels_like: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  main: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  humidity: { // New field for humidity
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  wind_speed: { // New field for wind speed
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Weather;
