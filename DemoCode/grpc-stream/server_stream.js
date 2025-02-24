const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf file
const packageDefinition = protoLoader.loadSync('greet_streaming.proto', {});
const greetProto = grpc.loadPackageDefinition(packageDefinition).greet;

// Implement the streaming method
function greetManyTimes(call) {
    const { name } = call.request;
    
    let count = 0;
    const interval = setInterval(() => {
        count++;
        call.write({ message: `Hello ${name}, message ${count}` });

        if (count === 5) {
            clearInterval(interval);
            call.end(); // End the stream after sending 5 messages
        }
    }, 1000); // Send a message every second
}

// Start the gRPC server
function main() {
    const server = new grpc.Server();
    server.addService(greetProto.Greeter.service, { GreetManyTimes: greetManyTimes });
    const address = '0.0.0.0:50051';
    
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Server running at ${address}`);
    
    });
}

main();
