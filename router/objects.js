/*
* Objects
* Router for getting all static objects from the database
*/

// Load dependencies
const express       = require("express");
const router        = new express.Router();
const dbHandler     = require('../src/dbWrapper.js');
const objectInfo    = require('../src/getObjectInformation.js');
const validate      = require('../middleware/validateInput.js');
const jwtAuth       = require('../src/jwtAuthentication.js');


// get all objects
router.get("/all", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.getAllObjects);

    res.json(data);
});

// get data for a specific object
router.get("/type/:objectType", validate.filter, async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.getObjectsByType,
        [req.params.objectType]);

    res.json(data);
});

// get your created objects
router.get("/created", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(objectInfo.getCreatedObjects,
        [user._id]);

    res.json(data);
});

// get specific object with id
router.get("/id/:objectId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.getObjectById,
        [req.params.objectId]);

    res.json(data);
});

// delete project by id
router.get("/delete/:objectId", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(objectInfo.deleteObjects,
        [req.params.objectId, user._id]);

    res.json(data);
});

// insert new object
router.post("/insert", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(objectInfo.insertObject,
        [req.body, user._id]);

    res.json(data);
});

// update object with id
router.post("/update/:objectId", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(objectInfo.updateObjects,
        [req.body, req.params.objectId, user._id]);

    res.json(data);
});

router.post("/disable/:objectId", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(objectInfo.setObjectDisabled,
        [req.body, req.params.objectId, user._id]);

    res.json(data);
});

//list all categories
router.get("/categories", async (req, res) => {
    let data = await dbHandler.dbSimpleStatement(objectInfo.listCategories);

    res.json(data);
});

//get icons for category by name
router.get("/categories/icon/type/:category", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.getCategoryIcon,
        [req.params.category]);

    res.json(data);
});

//get all icons for categories
router.get("/categories/icon/all", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.getAllCategoryIcons);

    res.json(data);
});

//insert a new icon for a category
router.post("/categories/icon/insert", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(objectInfo.insertCategoryIcon,
        [req.body]);

    res.json(data);
});

module.exports = router;
