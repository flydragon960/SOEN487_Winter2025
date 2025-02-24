// Express Proxy: proxy.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS package
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


// Load the protobuf file
const packageDefinition = protoLoader.loadSync('greet.proto', {});
const greetProto = grpc.loadPackageDefinition(packageDefinition).greet;


const client = new greetProto.Greeter('localhost:50051', grpc.credentials.createInsecure());
const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.post('/api/greet', (req, res) => {
    console.log('Request:', req.body);
    client.SayHello({ name: req.body.name }, (error, response) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.json(response);
        }
    });
});

app.listen(3001, () => {
    console.log('Express proxy running at http://localhost:3001');
});