const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf file
const packageDefinition = protoLoader.loadSync('greet.proto', {});
const greetProto = grpc.loadPackageDefinition(packageDefinition).greet;

// Implement the SayHello RPC method
function sayHello(call, callback) {
    console.log(`Received: ${call.request.name}`);
    const replyMessage = `Hello, ${call.request.name}!`;
    callback(null, { message: replyMessage });
}

// Start the gRPC server
function main() {
    const server = new grpc.Server();
    server.addService(greetProto.Greeter.service, { SayHello: sayHello });
    const address = '0.0.0.0:50051';
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Server running at ${address}`);
    });
}

main();
