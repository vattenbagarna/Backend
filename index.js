// Include server config
const serverConf = require("./config/serverParameters.js");

// Adding node module dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Including js files
const mainRouter = require("./router/main-router.js");
const getObjectsRouter = require('./router/objects.js');
const getProjectsRouter = require('./router/projects.js');
const logger = require("./middleware/log.js");

// Setting upp express
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(logger.logToConsole);
app.use("/proj/", getProjectsRouter);
app.use("/obj/", getObjectsRouter);
app.use("/", mainRouter);

// Startup function
const readyServer = () => {
    console.info(`Server started on port ${serverConf.port}`);
};

// Start Server
app.listen(serverConf.port, readyServer);
