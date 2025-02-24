const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./temperature.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const temperatureProto = grpc.loadPackageDefinition(packageDefinition).temperature;

// Implement the gRPC service
function recordTemperature(call, callback) {
    let total = 0;
    let count = 0;

    call.on("data", (request) => {
        console.log(`Received Temperature: ${request.value}`);
        total += request.value;
        count += 1;
    });

    call.on("end", () => {
        const average = count > 0 ? total / count : 0;
        callback(null, { average });
    });
}

// Start the gRPC server
function main() {
    const server = new grpc.Server();
    server.addService(temperatureProto.TemperatureService.service, { RecordTemperature: recordTemperature });
    server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
        console.log("Server is running on port 50051...");
    });
}

main();
