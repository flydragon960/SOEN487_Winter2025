// Import the required modules
import express from 'express';
const app = express();
const port = 3000;

// Function to convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

function convertKelvinToCelsius(degree ) {
    return degree - 273.15;
}

// Endpoint to convert Fahrenheit to Celsius
app.get('/convert/fahrenheit-to-celsius', (req, res) => {
    const fahrenheit = parseFloat(req.query.fahrenheit);
    if (isNaN(fahrenheit)) {
        return res.status(400).json({ error: 'Invalid Fahrenheit value' });
    }
    const celsius = fahrenheitToCelsius(fahrenheit);
    res.json({ fahrenheit, celsius });
});

// Endpoint to convert Celsius to Fahrenheit
app.get('/convert/celsius-to-fahrenheit', (req, res) => {
    const celsius = parseFloat(req.query.celsius);
    if (isNaN(celsius)) {
        return res.status(400).json({ error: 'Invalid Celsius value' });
    }
    const fahrenheit = celsiusToFahrenheit(celsius);
    res.json({ celsius, fahrenheit });
});

// Endpoint to convert Kelvin to Celsius
app.get('/convert/kelvin-to-celsius', (req, res) => {
    const degree = parseFloat(req.query.degree);
    if (isNaN(degree)) {
        return res.status(400).json({ error: 'Invalid Kelvin value' });
    }
    const celsius = convertKelvinToCelsius(degree);
    res.json({ kelvin: degree, celsius });
});

// Start the server
app.listen(port, () => {
    console.log(`Temperature conversion service running at http://localhost:${port}`);
});


//in browser, go to http://localhost:3000/convert/fahrenheit-to-celsius?fahrenheit=100
//should see {"fahrenheit":100,"celsius":37.77777777777778}
//in browser, go to http://localhost:3000/convert/celsius-to-fahrenheit?celsius=0
//should see {"celsius":0,"fahrenheit":32}
//in browser, go to http://localhost:3000/convert/fahrenheit-to-celsius?fahrenheit=abc
//should see {"error":"Invalid Fahrenheit value"}
//in browser, go to http://localhost:3000/convert/celsius-to-fahrenheit?celsius=xyz
//should see {"error":"Invalid Celsius value"}