// Include server config
const serverConf = require("./config/serverParameters.js");

// Adding node module dependencies
const express = require("express");

// Including js files
const mainRouter = require("./router/main-router.js");
const logger = require("./middleware/log.js");

// Setting upp express
const app = express();

app.use(logger.logToConsole);
app.use("/", mainRouter);

// Startup funciton
const readyServer = () => {
    console.info(`Server started on port ${serverConf.port}`);
};

// Start Server
app.listen(serverConf.port, readyServer);
