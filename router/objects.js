/*
* Objects
* Router for getting all static objects from the database
*/

// Load dependencies
const express = require("express");
const router = new express.Router();
const dbHandler = require('../src/dbWrapper.js');
const objectInfo = require('../src/getObjectInformation.js');


// get all houses
router.get("/all", async (req, res) => {
    // TODO: GET THE ACTUAL DATA FROM THE CORRECT DATABASE
    let data = await dbHandler.dbConnectPipe(objectInfo.getAllObjects);

    res.json(data);
});

// get object by category
router.get("/type/:objectType", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.getObjectsByType, [req.params.objectType]);

    res.json(data);
});

// get your created objects
router.get("/created/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.getCreatedObjects, [req.params.userId]);

    res.json(data);
});

// get specific object with id
router.get("/id/:objectId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.getObjectById, [req.params.objectId]);

    res.json(data);
});

// TODO: get all available categories?


// delete project by id
router.get("/delete/:objectId/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.deleteObjects, [req.params.objectId, req.params.userId]);

    res.json(data);
});

// insert new object
router.post("/insert/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.insertObject, [req.body, req.params.userId]);

    res.json(data);
});

// update object with id
router.post("/update/:objectId/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.updateObjects, [req.body, req.params.objectId, req.params.userId]);

    res.json(data);
});

module.exports = router;
