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
        [loginHandler.createUser(
            req.body.username, req.body.password, req.body.admin
        )]
    );

    console.log("TCA:", tryCreateAccount);

    if (tryCreateAccount == true) {
        res.json({"info": "User successfully crated!"});
    } else {
        res.json({"info": "failed to create user!", "error": true});
    }
});

module.exports = router;
