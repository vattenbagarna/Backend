/*
* Objects
* Router for getting all static objects from the database
*/

// Load dependencies
const express = require("express");
const router = new express.Router();
const dbHandler = require('../src/dbWrapper.js');
const objectInfo = require('../src/getObjectInformation.js');


// get house types
router.get("/all", async (req, res) => {
    // TODO: GET THE ACTUAL DATA FROM THE CORRECT DATABASE
    let data = await dbHandler.dbConnectPipe(objectInfo.getPeople);

    res.json(data);
});

// get data for a specific house
router.get("/type/:objectType", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.getObjectsByType, [req.params.objectType]);

    res.json(data);
});

module.exports = router;
