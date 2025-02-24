const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf file
const packageDefinition = protoLoader.loadSync('greet2.proto', {});
const greetProto = grpc.loadPackageDefinition(packageDefinition).greet;

// Implement the SayHello RPC method
function sayHello(call, callback) {
    const { name, age } = call.request;
    callback(null, { 
        message: `Hello, ${name}! You are ${age} years old.`,
        additionalMessages: [`Welcome, ${name}!`, `Have a great day!`],
    });
}

// Implement the SayGoodbye RPC method
function sayGoodbye(call, callback) {
    console.log("Received request:", call.request); // Debug log
    const { name } = call.request;
    console.log("Received name:", name); // Debug log
    //const response = { farewell_message: `Goodbye, ${name}! See you soon.` };
    //console.log("Sending response for SayGoodbye:", response); // Debug log
    callback(null, {message: `Goodbye, ${name}! See you soon.`});
}

// Start the gRPC server
function main() {
    const server = new grpc.Server();
    server.addService(greetProto.Greeter.service, { SayHello: sayHello, SayGoodbye: sayGoodbye });
    const address = '0.0.0.0:50051';
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Server running at ${address}`);
    });
}

main();
