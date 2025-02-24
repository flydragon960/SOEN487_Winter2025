const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf file
const packageDefinition = protoLoader.loadSync('greet.proto', {});
const greetProto = grpc.loadPackageDefinition(packageDefinition).greet;

// Create a client that connects to the server
const client = new greetProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

// Call the SayHello method
client.SayHello({ name: 'Alice' }, (err, response) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Server Response:', response.message);
    }
});
