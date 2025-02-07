import axios from 'axios';

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city, country, apiKey) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&APPID=${apiKey}`;
        const response = await axios.get(url);
        return response.data.main.temp; // Return temperature in fahrenheit
    } catch (error) {
        throw new Error(`Error fetching weather data: ${error.message}`);
    }
}

// Function to convert Kelvin to Celsius
async function convertKelvinToCelsius(degree ) {
    try {
        const baseURL = 'http://localhost:5010';
        const response = await axios.get(`${baseURL}/convert/kelvin-to-celsius`, {
            params: { degree }
        });
        return response.data.celsius; // Return converted temperature in Celsius
    } catch (error) {
        throw new Error(`Error converting Kelvin to Celsius: ${error.response?.data?.error || error.message}`);
    }
}

// Function to convert Fahrenheit to Celsius
async function convertFahrenheitToCelsius(fahrenheit) {
    try {
        const baseURL = 'http://localhost:5010';
        const response = await axios.get(`${baseURL}/convert/fahrenheit-to-celsius`, {
            params: { fahrenheit }
        });
        console.log(`Fahrenheit: ${fahrenheit}, Celsius: ${response.data.celsius}`);
        return response.data.celsius;
    } catch (error) {
        console.error(`Error converting Fahrenheit to Celsius: ${error.response?.data?.error || error.message}`);
    }
}

// Main Weather Service Function
async function getWeatherInCelsius(city, country) {
    try {
        const apiKey = 'b1052408d573cc1769737c73e6a17cea'; // Replace with your OpenWeatherMap API key
        // Step 1: Fetch temperature in Fahrenheit
        const tempInKelvin = await fetchWeatherData(city, country, apiKey);
        console.log(`temperature in Fahrenheit: ${tempInKelvin}`);
        // Step 2: Convert Fahrenheit to Celsius
        const tempInCelsius = await convertFahrenheitToCelsius(tempInKelvin);
        console.log(`temperature in celsuis: ${tempInCelsius}`);
        // Return the result
        console.log(`The temperature in ${city}, ${country} is ${tempInCelsius}°C.`);
        return tempInCelsius;
    } catch (error) {
        console.error(`Error in weather service: ${error.message}`);
    }
}

// Example usage
const city = 'Montreal'; // Replace with desired city
const country = 'Canada'; // Replace with desired country
const apiKey = 'b1052408d573cc1769737c73e6a17cea'; // Replace with your OpenWeatherMap API key

getWeatherInCelsius(city, country, apiKey);
