/*
* Login.js
* Router for handling accounts and login
*/

const express = require("express");
const router = new express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const dbHandler = require('../src/dbWrapper.js');
const loginHandler = require('../src/loginHandler.js');

//signup route,
//takes a POST request with x-www-form-urlencoded data to create a new user
router.post("/signup", urlencodedParser, async (req, res) => {
    let tryCreateAccount = await dbHandler.dbSimpleStatement(
        loginHandler.insertUserInDatabase,
        [loginHandler.createNewUser(
            req.body.username, req.body.password, req.body.admin
        )]
    );

    if (tryCreateAccount == true) {
        res.json({"info": "User successfully crated!", "error": false});
    } else {
        res.json({"info": "failed to create user!", "error": true});
    }
});

//Login route
//Takes a POST request with x-www-form-urlencoded data to try and authenticate the user
router.post("/login", urlencodedParser, async (req, res) => {
    let loginStatus = await dbHandler.dbSimpleStatement(
        loginHandler.verifyUserLogin,
        [{
            "username": req.body.username,
            "password": req.body.password
        }]
    );

    if (loginStatus) {
        res.json({"info": "User login successfull", "error": false});
    } else {
        res.json({"info": "User login failed", "error": true});
    }
});

router.post("/changepassword", urlencodedParser, async (req, res) => {
    let pwChange = await dbHandler.dbSimpleStatement(
        loginHandler.changePassword, [{
            "username": req.body.username,
            "password": req.body.password,
            "newPassword": req.body.newPassword,
            "confirmNewPassword": req.body.confirmNewPassword
        }]
    );

    if (pwChange) {
        res.json({"info": "Password has been changed.", "error": false});
    } else {
        res.json({"info": "Failed to change password", "error": true});
    }
});

module.exports = router;
