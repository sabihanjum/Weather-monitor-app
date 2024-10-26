# weather-app
 Real-Time Data Processing System for Weather Monitoring with Rollups and Aggregates

       # Weather Monitoring App

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Design](#system-design)
- [Build Instructions](#build-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Database Setup](#database-setup)
- [Dependencies](#dependencies)
- [Future Improvements](#future-improvements)

---

## Project Overview
The **Weather Monitoring App** is a web application that provides real-time weather data for various cities by integrating with the OpenWeatherMap API. It displays weather parameters such as temperature, humidity, and wind speed, and stores the data in a MySQL database for future use. The app is designed for mobile and desktop, ensuring responsiveness and a user-friendly experience.

## Features
- Real-time weather data for any city using the OpenWeatherMap API.
- Displays key weather parameters such as:
  - Temperature (in Celsius)
  - Feels Like Temperature
  - Weather Condition (e.g., Rain, Clear)
  - Humidity and Wind Speed
- Stores weather data in a MySQL database for historical tracking and rollup aggregation.
- Responsive UI optimized for both mobile and desktop devices.
- Animated UI interactions for better user experience.
  
## Technologies Used
- **Frontend**: React, Bootstrap, CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL, Sequelize ORM
- **API**: OpenWeatherMap API
- **Version Control**: Git and GitHub

---

## System Design

1. **Frontend (React)**:
   - The React frontend handles user input (city name) and displays weather data. 
   - It sends a GET request to the OpenWeatherMap API and displays the data.
   - It also sends the weather data to the backend for storage in the database.

2. **Backend (Node.js/Express)**:
   - The backend is an API server built with Node.js and Express.
   - It connects to a MySQL database using Sequelize ORM.
   - It stores and retrieves weather data based on city names.

3. **Database (MySQL)**:
   - The database stores weather summaries for multiple cities.
   - Sequelize handles the database schema and ORM operations.
   - Tables include: `WeatherSummaries` to store city weather data (e.g., temperature, humidity, etc.).

---

## Build Instructions

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v16 or higher)
- **MySQL** (v5.7 or higher)
- **Git** (for cloning the repository)

### Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/weather-monitoring-app.git
   cd weather-monitoring-app/backend

Install backend dependencies:
    npm install

Create .env file in the backend directory and provide API Key, SQL credentials  there:
CREATE DATABASE and table.
Run the backend: Start the backend server:
    node server.js
    The server should be running on http://localhost:3001.

Frontend Setup
    cd ../frontend
    Install frontend dependencies:
    npm install axios bootstrap react-bootstrap

Run the frontend: Start the frontend server:

npm start
The frontend should be running on http://localhost:3000.


1. Start the MySQL server.
2. Start the backend server:
3. Start the frontend server:
4. Access the app:
Navigate to http://localhost:3000 in your web browser to access the weather monitoring app.
