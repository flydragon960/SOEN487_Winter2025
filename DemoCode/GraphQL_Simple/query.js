//get book by id, can be used for both db and no db 

import fetch from 'node-fetch';

const query = `
  query {
    book(id: "1") {
      title
      author
    }
  }
`;

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query }),
})
  .then((response) => response.json())
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch((error) => console.error('Error:', error));
