const express = require("express");
const { specs, swaggerUi } = require("./swagger");

const userRoutes = require("./routes/user"); // Import routes
const YAML = require("yamljs");
const cors = require("cors");


const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

app.use(userRoutes); // Register routes

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Swagger Docs available at http://localhost:3000/api-docs");
});
