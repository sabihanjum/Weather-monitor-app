// App.js
import React, { useState } from 'react';
import { Card, Form, Button, Row, Col,  Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';


const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1a0f2db65fea57800eb865e5e42a1c5a`);
            setWeatherData(response.data);

            // Send weather data to backend
            await axios.post('http://localhost:3001/weather', response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
      <Container className="mt-5">
      <Row className="justify-content-center">
      <Col xs={12} sm={12} md={12} lg={12}>
              <Card className="weather-card">
                  <Card.Body>
                      <Card.Title className="text-center">Weather Monitoring App</Card.Title>
                      <Form onSubmit={handleSubmit}>
                          <Form.Group controlId="city">
                              <Form.Label>Enter City Name</Form.Label>
                              <Form.Control
                                  type="text"
                                  placeholder="Enter city"
                                  value={city}
                                  onChange={handleInputChange}
                              />
                          </Form.Group>
                          <Button variant="primary" type="submit" className="w-100 mt-3">
                              Get Weather
                          </Button>
                      </Form>
                      {weatherData && (
                          <div className="weather-info mt-4">
                              <p><strong>City:</strong> {weatherData.name}</p>
                              <p><strong>Temperature:</strong> {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                              <p><strong>Feels Like:</strong> {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
                              <p><strong>Main:</strong> {weatherData.weather[0].main}</p>
                              <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                              <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                          </div>
                      )}
                  </Card.Body>
              </Card>
          </Col>
      </Row>
  </Container>
    );
};

export default App;
