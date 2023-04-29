import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '3701c28b1ac01a9e76bb88a56ee8201b';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="weather-app-container">
      <h1 className="weather-app-heading">Weather App</h1>
      <form onSubmit={handleSubmit} className="weather-app-form">
        <label className="weather-app-label">
          Enter City Name:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="weather-app-input" />
        </label>
        <button type="submit" className="weather-app-button">Get Weather</button>
      </form>
      {weatherData && (
        <div className="weather-app-data">
          <h2 className="weather-app-data-heading">Weather for {weatherData.name}</h2>
          <p className="weather-app-data-text">Temperature: {weatherData.main.temp}°C</p>
          <p className="weather-app-data-text">Feels Like: {weatherData.main.feels_like}°C</p>
          <p className="weather-app-data-text">Humidity: {weatherData.main.humidity}%</p>
          <p className="weather-app-data-text">Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
