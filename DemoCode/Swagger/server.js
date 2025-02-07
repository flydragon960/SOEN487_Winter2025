const express = require("express");
const { specs, swaggerUi } = require("./swagger");

const userRoutes = require("./routes/user"); // Import routes



const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(userRoutes); // Register routes

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Swagger Docs available at http://localhost:3000/api-docs");
});
