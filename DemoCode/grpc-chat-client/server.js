const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./chat.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const chatProto = grpc.loadPackageDefinition(packageDefinition).chat;

// Store connected clients
let clients = [];

function chatStream(call) {
    console.log("New client connected.");

    clients.push(call);

    call.on("data", (message) => {
        console.log(`${message.username}: ${message.message}`);

        // Broadcast the message to all clients
        clients.forEach(client => {
            client.write(message);
        });
    });

    call.on("end", () => {
        console.log("Client disconnected.");
        clients = clients.filter(client => client !== call);
        call.end();
    });

    call.on("error", (err) => {
        console.error("Error: ", err);
    });
}

// Start the gRPC server
function main() {
    const server = new grpc.Server();
    server.addService(chatProto.ChatService.service, { ChatStream: chatStream });
    server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
        console.log("Server is running on port 50051...");
    });
}

main();
