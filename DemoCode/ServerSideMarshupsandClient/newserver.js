import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

// Enable CORS for all origins
app.use(cors());

const PORT = 3010; // You can change the port if needed

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city, country, apiKey) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&APPID=${apiKey}`;
        const response = await axios.get(url);
        return response.data.main.temp; // Return temperature in Fahrenheit
    } catch (error) {
        throw new Error(`Error fetching weather data: ${error.message}`);
    }
}

// Function to convert Fahrenheit to Celsius
async function convertFahrenheitToCelsius(fahrenheit) {
    try {
        const baseURL = 'http://localhost:5010';
        const response = await axios.get(`${baseURL}/convert/fahrenheit-to-celsius`, {
            params: { fahrenheit }
        });
        return response.data.celsius; // Return converted temperature in Celsius
    } catch (error) {
        throw new Error(`Error converting Fahrenheit to Celsius: ${error.response?.data?.error || error.message}`);
    }
}

// Main Weather Service Function
async function getWeatherInCelsius(city, country) {
    try {
        const apiKey = 'b1052408d573cc1769737c73e6a17cea'; // Replace with your OpenWeatherMap API key
        // Step 1: Fetch temperature in Fahrenheit
        const tempInFahrenheit = await fetchWeatherData(city, country, apiKey);

        // Step 2: Convert Fahrenheit to Celsius
        const tempInCelsius = await convertFahrenheitToCelsius(tempInFahrenheit);

        return tempInCelsius;
    } catch (error) {
        throw new Error(`Error in weather service: ${error.message}`);
    }
}

// Define the endpoint
app.get('/weather', async (req, res) => {
    const { city, country } = req.query;

    if (!city || !country) {
        return res.status(400).json({ error: 'City and country are required parameters' });
    }

    try {
        const temperatureInCelsius = await getWeatherInCelsius(city, country);
        res.json({ city, country, temperatureInCelsius });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Weather service is running on http://localhost:${PORT}`);
});
