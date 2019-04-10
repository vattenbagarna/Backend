/*
* user.js
* Router for handling user actions, such as getting user information
*/

const express               = require("express");
const router                = new express.Router();
const dbHandler             = require('../src/dbWrapper.js');
const userHandler           = require('../src/userHandler.js');

// GET /user/all shows all users in the system.
router.get("/all", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(userHandler.getAllUsers);
    let users = [];
    let user = {};

    //filter user data and only return id and username
    for (user in data) {
        users.push({
            "id": data[user]._id,
            "username": data[user].username
        });
    }
    res.json(users);
});

module.exports = router;
