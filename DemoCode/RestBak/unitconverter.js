//const axios = require('axios');
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://unit-measurement-conversion.p.rapidapi.com/convert',
  params: {
    params: {
      type: 'weight',
      fromUnit: 'pound',
      toUnit: 'kilogram',
      fromValue: '200'
    },
  },
  headers: {
    'X-RapidAPI-Key': 'b03c3da6a6msh42c24597c1b5421p1078f3jsn162b153b89a9',
    'X-RapidAPI-Host': 'unit-measurement-conversion.p.rapidapi.com'
  }
};

/*params: {
    type: 'degree',
    fromUnit: 'fahrenheit',
    toUnit: 'celsius',
    fromValue: '100'
  },

  */

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}