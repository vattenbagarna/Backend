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
router.get("/housetypes", async (req, res) => {
    // TODO: GET THE ACTUAL DATA FROM THE CORRECT DATABASE
    let data = await dbHandler.dbConnectPipe(objectInfo.getPeople);

    res.json(data);
});

// get data for a specific house
router.get("/house/:houseType", (req, res) => {
    res.json({"error": `unable to fetch data about ${req.params.houseType}`});
});

module.exports = router;
