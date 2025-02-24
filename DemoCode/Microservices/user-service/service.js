const express = require("express");

const app = express();
app.use(express.json());

//replace with database
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

app.get("/users", (req, res) => {
    res.json(users);
});

//more endpoints here
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.get("/users/:id/orders", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json({ id: 1, item: "Laptop", userId: user.id });
    } else {
        res.status(404).json({ error: "User not found" });
    }
}

const PORT = 4001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
