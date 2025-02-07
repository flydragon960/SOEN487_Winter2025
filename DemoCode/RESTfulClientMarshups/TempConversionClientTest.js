// Import the required modules
import axios from 'axios';

// Base URL of the Temperature Conversion Service
const baseURL = 'http://localhost:5010';

// Function to convert Fahrenheit to Celsius
async function convertFahrenheitToCelsius(fahrenheit) {
    try {
        const response = await axios.get(`${baseURL}/convert/fahrenheit-to-celsius`, {
            params: { fahrenheit }
        });
        console.log(`Fahrenheit: ${fahrenheit}, Celsius: ${response.data.celsius}`);
    } catch (error) {
        console.error(`Error converting Fahrenheit to Celsius: ${error.response?.data?.error || error.message}`);
    }
}

// Function to convert Celsius to Fahrenheit
async function convertCelsiusToFahrenheit(celsius) {
    try {
        const response = await axios.get(`${baseURL}/convert/celsius-to-fahrenheit`, {
            params: { celsius }
        });
        console.log(`Celsius: ${celsius}, Fahrenheit: ${response.data.fahrenheit}`);
    } catch (error) {
        console.error(`Error converting Celsius to Fahrenheit: ${error.response?.data?.error || error.message}`);
    }
}

// Example usage
(async () => {
    await convertFahrenheitToCelsius(100); // Should log: Fahrenheit: 100, Celsius: 37.777...
    await convertCelsiusToFahrenheit(0);  // Should log: Celsius: 0, Fahrenheit: 32
})();
