// Include server config
const serverConf = require("./config/serverParameters.js");

// Adding node module dependencies
const express = require("express");

// Including js files
const mainRouter = require("./router/main-router.js");
const getObjectsRouter = require('./router/objects.js');
const logger = require("./middleware/log.js");

// Setting upp express
const app = express();

// Insert middlewares
app.use(logger.logToConsole);

// Global headers
// Set headers that apply to all routes here
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

// Mount routers
app.use("/obj/", getObjectsRouter);
app.use("/", mainRouter);

// Startup function
const readyServer = () => {
    console.info(`Server started on port ${serverConf.port}`);
};

// Start server
app.listen(serverConf.port, readyServer);
