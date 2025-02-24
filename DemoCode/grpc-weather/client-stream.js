const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./temperature.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const temperatureProto = grpc.loadPackageDefinition(packageDefinition).temperature;

function sendTemperatureReadings() {
    const client = new temperatureProto.TemperatureService("localhost:50051", grpc.credentials.createInsecure());
    const call = client.RecordTemperature((error, response) => {
        if (error) {
            console.error("Error:", error.message);
        } else {
            console.log(`Average Temperature: ${response.average.toFixed(2)}`);
        }
    });

    const temperatures = [20.5, 22.0, 23.7, 21.4, 24.3];

    temperatures.forEach(temp => {
        console.log(`Sending Temperature: ${temp}`);
        call.write({ value: temp });
    });

    call.end();
}

sendTemperatureReadings();
