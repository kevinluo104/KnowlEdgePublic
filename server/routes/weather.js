var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/', async (req, res) => {
  console.log("WEAATERRR");
    const { lat, lon } = req.query;
    const apiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
    try {
      const response = await axios.get(apiUrl);
      const weatherData = {
        temperature: response.data.main.temp,
        icon: response.data.weather[0].icon,
      };
      res.json(weatherData); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });

module.exports = router;