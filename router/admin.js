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

const checkAdmin = (req, res, next) => {
    let user = jwtAuth.verify(req.query.token);

    if (user == false) {
        res.json({
            "error": true,
            "info": "token failed to validate"
        });
        return false;
    }

    if (user.isAdmin == false) {
        res.json({
            "error": true,
            "info": "user is not admin"
        });
        return false;
    }
    next();
    return true;
};

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

router.post("/createaccount", checkAdmin, urlencodedParser, async (req, res) => {
    let tryCreateAccount = await dbHandler.dbSimpleStatement(
        loginHandler.adminCreateAccountForUser,
        [{
            "username": req.body.username,
            "isAdmin": req.body.admin
        }]
    );

    if (tryCreateAccount == true) {
        res.json({"info": "User successfully crated!", "error": false});
    } else {
        res.json({"info": "failed to create user!", "error": true});
    }
});

module.exports = router;
