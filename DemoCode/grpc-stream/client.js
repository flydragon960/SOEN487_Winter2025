const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf file
const packageDefinition = protoLoader.loadSync('greet_streaming.proto', {});
const greetProto = grpc.loadPackageDefinition(packageDefinition).greet;

// Create a client
const client = new greetProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

// Call the streaming method
const call = client.GreetManyTimes({ name: 'Alice' });

call.on('data', (response) => {
    console.log('Received:', response.message);
});

call.on('end', () => {
    console.log('Stream ended.');
});

call.on('error', (err) => {
    console.error('Error:', err);
});
