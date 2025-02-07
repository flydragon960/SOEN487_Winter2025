// Import the required modules
import express from 'express';
const app = express();
const port = 5010;

// Function to convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

// Endpoint to convert Fahrenheit to Celsius
app.get('/convert/fahrenheit-to-celsius', (req, res) => {
    const fahrenheit = parseFloat(req.query.fahrenheit);
    if (isNaN(fahrenheit)) {
        return res.status(400).json({ error: 'Invalid Fahrenheit value' });
    }
    const celsius = fahrenheitToCelsius(fahrenheit);
    res.json({ fahrenheit, celsius });

    //{ fahrenheit: 100, celsius: 37.77777777777778 }
});

// Endpoint to convert Celsius to Fahrenheit
app.get('/convert/celsius-to-fahrenheit', (req, res) => {
    const celsius = parseFloat(req.query.celsius);
    if (isNaN(celsius)) {
        return res.status(400).json({ error: 'Invalid Celsius value' });
    }
    const fahrenheit = celsiusToFahrenheit(celsius);
    res.json({ celsius, fahrenheit });
    //{ celsius: 0, fahrenheit: 32 }
});

// Start the server
app.listen(port, () => {
    console.log(`Temperature conversion service running at http://localhost:${port}`);
});


//in browser, go to http://localhost:5010/convert/fahrenheit-to-celsius?fahrenheit=100
//should see {"fahrenheit":100,"celsius":37.77777777777778}
//in browser, go to http://localhost:5010/convert/celsius-to-fahrenheit?celsius=0
//should see {"celsius":0,"fahrenheit":32}
//in browser, go to http://localhost:5010/convert/fahrenheit-to-celsius?fahrenheit=abc
//should see {"error":"Invalid Fahrenheit value"}
//in browser, go to http://localhost:5010/convert/celsius-to-fahrenheit?celsius=xyz
//should see {"error":"Invalid Celsius value"}