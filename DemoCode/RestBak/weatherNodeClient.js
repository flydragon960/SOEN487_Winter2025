//this is a node service that queries a third party API

import axios from 'axios';

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city, country, apiKey) {
    try {
        // Construct the API URL
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}`;

        // Make the GET request
        const response = await axios.get(url);

        // Log the response data
        console.log('Weather Data:', response.data);
    } catch (error) {
        // Handle errors
        console.error('Error fetching weather data:', error.message);
    }
}

// Example usage
const city = 'Montreal'; // Replace with your desired city
const country = 'Canada'; // Replace with your desired country
const apiKey = 'b1052408d573cc1769737c73e6a17cea'; // Replace with your OpenWeatherMap API key

fetchWeatherData(city, country, apiKey);