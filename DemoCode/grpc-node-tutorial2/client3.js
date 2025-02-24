const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf file
const packageDefinition = protoLoader.loadSync('greet2.proto', {});
const greetProto = grpc.loadPackageDefinition(packageDefinition).greet;

// Create a client that connects to the gRPC server
const client = new greetProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

// Call the SayHello method
client.SayHello({ name: 'Alice', age: 30 }, (err, response) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('SayHello Response:', response);
        console.log('SayHello Response:', response.message);
        console.log('SayHello Response:', response.additionalMessages);
    }
});

// Call the SayGoodbye method
client.SayGoodbye({ name: 'Alice' }, (err, response) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('SayGoodbye Response:', response);
        console.log('Server Response: ', response.message);
      
    }
});
