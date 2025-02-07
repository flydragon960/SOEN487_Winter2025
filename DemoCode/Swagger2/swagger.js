const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Agency API",
      version: "1.0.0",
      description: "API documentation for a travel assistant app",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to API routes
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
