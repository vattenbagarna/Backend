// Include server config
const serverConf = require("./config/serverParameters.js");

// Adding node module dependencies
const express = require("express");
const crypto = require("crypto");

// Including js files
const mailman               = require('./src/smtpMailman.js');
const mainRouter            = require("./router/main-router.js");
const getObjectsRouter      = require('./router/objects.js');
const accountRouter         = require('./router/login.js');
const adminRouter           = require('./router/admin.js');
const logger                = require("./middleware/log.js");
const tokenValidation       = require("./middleware/authValidator.js");

// Setting upp express
const app = express();

// Startup function
const readyServer = () => {
    //generate jwt signing secret (this should only run once at startup)
    global.jwtSecret = crypto.randomBytes(512).toString('base64');

    //Verify that we can send out emails, without it the system breaks
    mailman.testSmtpConnection();

    //inform the system that we are ready
    console.info(`Server started on port ${serverConf.port}`);
};


// Insert middlewares
app.use(logger.logToConsole);

// Global headers
// Set headers that apply to all routes here
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

// Mount unauthenticated routes
// WARNING: All routes mounted here will be completely OPEN FOR ANYONE
app.use("/", mainRouter);
app.use("/acc/", accountRouter);

// Use token validation
app.use(tokenValidation.checkToken);

// Mount authenticated routes
// NOTICE: All routes mounted here will require a access token
app.use("/obj/", getObjectsRouter);
app.use("/admin/", adminRouter);

// Start server
app.listen(serverConf.port, readyServer);
