

//DESCRIPTION FOR HOW I USE THE API FOR DATA RESPONSE

/* I handle API using axios as the engine for data fetching from API,
Also I have use try cache for error handling which will bring high user experience.*/


const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set 'views' directory
app.set('views', path.join(__dirname, 'views'));


// Set view engine to 'ejs'
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // Render the 'index' view and pass data
  res.render('index', { name: 'Express User' });
});

// Define a route that consumes a free API
app.post('/weather', async (req, res) => {

  try {

    console.log(req.body.city);

    const city = req.body.city;
    const country = req.body.country;
    // Replace 'https://api.example.com' with the actual API URL
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&country=${country}count=10&language=en&format=json`;
    
    // Make a GET request to the API
    const response = await axios.get(apiUrl);

    // Send the API response as JSON to the client
   // res.render('weather', { name: response.data });
   //const weather1 =  res.json(response.data);
   res.render('weather', { name: response.data });
   //console.log(weather1);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});