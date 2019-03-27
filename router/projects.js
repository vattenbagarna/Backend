/*
* Objects
* Router for getting all static objects from the database
*/

// Load dependencies
const express = require("express");
const router = new express.Router();
const dbHandler = require('../src/dbWrapper.js');
const projectHandler = require('../src/handleProjects.js');


// get all projects
router.get("/all/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(projectHandler.getProjects, [req.params.userId]);

    res.json(data);
});

// get specific project
router.get("/id/:projectId/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(projectHandler.getProject, [req.params.projectId, req.params.userId]);

    res.json(data);
});

//get specific project data
router.get("/data/:projectId/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(projectHandler.getProjectData, [req.params.projectId, req.params.userId]);

    res.json(data);
});

//get specific project info
router.get("/info/:projectId/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(projectHandler.getProjectInfo, [req.params.projectId, req.params.userId]);

    res.json(data);
});

//insert new project
router.post("/insert/:userId", async (req, res) => {
    console.log("name: "+req.body.name + "\n" + "version" + req.body.version);
    let data = await dbHandler.dbConnectPipe(projectHandler.insertProject, [req.body, req.params.userId]);

    res.json(data);
});

//delete project
router.get("/delete/:projectId/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(projectHandler.deleteProject, [req.params.projectId, req.params.userId]);

    res.json(data);
});

//update project info
router.post("/update/info/:projectId/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(projectHandler.updateProject, [req.body, req.params.projectId, req.params.userId]);

    res.json(data);
});

//update project data
router.post("/update/data/:projectId/:userId", async (req, res) => {
    let data = await dbHandler.dbConnectPipe(projectHandler.updateProjectData, [req.body, req.params.projectId, req.params.userId]);

    res.json(data);
});

module.exports = router;
