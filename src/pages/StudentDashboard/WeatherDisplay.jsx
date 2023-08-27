import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const WeatherDisplay = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    console.log("HEREE");
    axios
      .get(`http://localhost:3005/weather`)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [latitude, longitude]);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const { temperature, icon } = weatherData;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div>
      <img src={weatherIconUrl} alt="Weather Icon" />
      <p>{temperature}°C</p>
    </div>
  );
};

export default WeatherDisplay;