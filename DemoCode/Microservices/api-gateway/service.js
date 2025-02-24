const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Route requests to User Service
app.get("/users", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4001/users");
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "User Service not available" });
    }
});

// Route requests to Order Service
app.get("/orders", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4002/orders");
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Order Service not available" });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
