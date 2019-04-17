/*
* admin.js
* Router for handling admin actions, it is important that only admins can preform these actions
*/

const express               = require("express");
const router                = new express.Router();
const bodyParser            = require("body-parser");
const urlencodedParser      = bodyParser.urlencoded({ extended: false });
const dbHandler             = require('../src/dbWrapper.js');
const loginHandler          = require('../src/loginHandler.js');
const jwtAuth               = require('../src/jwtAuthentication.js');

/**
* checkAdmin is a middleware function to check that the token belongs to an admin
* @param {object} req express http request object
* @param {object} res express response object
* @param {object} next continues the express stack
*/
const checkAdmin = (req, res, next) => {
    let user = jwtAuth.verify(req.query.token);

    if (user == false) {
        res.json({
            "error": true,
            "info": "token failed to validate"
        });
        return false;
    }

    if (user.isAdmin == false || user.isAdmin == null || user.isAdmin == undefined) {
        res.json({
            "error": true,
            "info": "user is not admin"
        });
        return false;
    }
    next();
    return true;
};

// GET /user shows user data from the token.
router.get("/user", checkAdmin, async (req, res) => {
    let user = jwtAuth.verify(req.query.token);

    res.json({
        "user": {
            "id": user._id,
            "username": user.username,
            "isAdmin": user.isAdmin
        }
    });
});

// Creates a new account for a new user
//Takes a POST request with  x-www-form-urlencoded with an email for the new user
router.post("/createaccount", checkAdmin, urlencodedParser, async (req, res) => {
    let tryCreateAccount = await dbHandler.dbSimpleStatement(
        loginHandler.adminCreateAccountForUser,
        [{
            "username": req.body.username,
            "isAdmin": req.body.isAdmin
        }]
    );

    if (tryCreateAccount.error == false) {
        res.json({"info": "User successfully crated!", "error": false});
    } else {
        if (tryCreateAccount.info == undefined) {
            tryCreateAccount.info = "Failed to create user!";
        }
        res.json(tryCreateAccount);
        // res.json({"info": "failed to create user!", "error": true});
    }
});

module.exports = router;
