const express = require("express");

const app = express();
app.use(express.json());

const orders = [
    { id: 101, item: "Laptop", userId: 1 },
    { id: 102, item: "Phone", userId: 2 }
];

app.get("/orders", (req, res) => {
    res.json(orders);
});

const PORT = 4002;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
