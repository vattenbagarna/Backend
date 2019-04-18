/*
* Login.js
* Router for handling accounts and login
*/

const express               = require("express");
const router                = new express.Router();
const bodyParser            = require("body-parser");
const urlencodedParser      = bodyParser.urlencoded({ extended: false });
const dbHandler             = require('../src/dbWrapper.js');
const loginHandler          = require('../src/loginHandler.js');

//signup route,
//takes a POST request with x-www-form-urlencoded data to create a new user
router.post("/signup", urlencodedParser, async (req, res) => {
    let tryCreateAccount = await dbHandler.dbSimpleStatement(
        loginHandler.insertUserInDatabase,
        [await loginHandler.createNewUser(
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

    //Return error status, info to the user and if successfull an API token
    if (loginStatus.error == false) {
        res.cookie("token", loginStatus.token, { maxAge: 9000000, httpOnly: false });
        res.json({
            "info": "User login successfull",
            "error": false
        });
    } else {
        res.json({"info": "User login failed", "error": true});
    }
});

//Change password route
//Takes a POST request with x-www-form-urlencoded data,
//validates current password and changes it to the new one
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

//Request a reset token to be set for the user
//Takes a POST request with  x-www-form-urlencoded data, sets a reset token in the database
router.post("/requestreset", urlencodedParser, async (req, res) => {
    await dbHandler.dbSimpleStatement(
        loginHandler.setOneTimeKey, [{
            "username": req.body.username,
        }]
    );

    return res.json({
        "info": "If the user exists, a temporary token has been created." +
        "You should recive an email shortly.",
        "error": false
    });
});

//Sets a new password with a one time key confirmation
//Takes a POST request with  x-www-form-urlencoded data and sets a new password
router.post("/passwordreset", urlencodedParser, async (req, res) => {
    let passwordReset = await dbHandler.dbSimpleStatement(
        loginHandler.verifyOneTimeKeyAndSetPassword, [{
            "username": req.body.username,
            "oneTimeKey": req.body.oneTimeKey,
            "newPassword": req.body.newPassword,
            "confirmNewPassword": req.body.confirmNewPassword
        }]
    );

    if (passwordReset) {
        res.json({"info": "Your password has been updated", "error": false});
    } else {
        res.json({"info": "Failed to change password", "error": true});
    }
});

module.exports = router;
