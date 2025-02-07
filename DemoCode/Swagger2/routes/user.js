const express = require("express");

const router = express.Router();


router.get("/userbyusername", (req, res) => {
    res.json([{
      "id": 10,
      "username": "theUser",
      "firstName": "John",
      "lastName": "James",
      "email": "john@email.com",
      "password": "12345",
      "phone": "12345",
      "userStatus": 1
    }]);
  });

  //export default router;

  module.exports = router;
