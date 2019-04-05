/*
* Database queries to retrive, modify, delete and create projects
*
*
*
*/
const mongoID = require("mongodb").ObjectID;

/**
  * Get all project info for user
  *
  * @param {Array} [0] = UserId
  * @returns {JSON} mongodb response
  *
  */
const getProjects = async (db, params) => {
    //Select database
    let dbo = db.db("test");
    //find all projects

    let projects = await dbo.collection('Projects').find({"creatorID": {"$in": [params[0]]}},
        {projection: {"data": 0}});

    return projects;
};

/**
  * Get specific project for user
  *
  * @param {Array} [0] = ProjectId, [1] = UserId
  * @returns {JSON} mongodb response
  *
  */
const getProject = async (db, params) => {
    let dbo = db.db("test");
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[0]);

    if (check != undefined) {return check;}

    let project = await dbo.collection('Projects').find({"_id": mongoID(params[0]),
        "creatorID": {"$in": [params[1]]}});

    return project;
};

/**
  * Get data from specific project for user
  *
  * @param {Array} [0] = ProjectId, [1] = UserId
  * @returns {JSON} mongodb response
  *
  */
const getProjectData = async (db, params) => {
    let dbo = db.db("test");
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[0]);

    if (check != undefined) {return check;}

    let project = await dbo.collection('Projects').find({"_id": mongoID(params[0]),
        "creatorID": {"$in": [params[1]]}}, {projection: {"data": 1}});

    return project;
};

/**
  * Get basic info from specific project for user
  *
  * @param {Array} [0] = ProjectId, [1] = UserId
  * @returns {JSON} mongodb response
  *
  */
const getProjectInfo = async (db, params) => {
    let dbo = db.db("test");
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[0]);

    if (check != undefined) {return check;}

    let project = await dbo.collection('Projects').find({"_id": mongoID(params[0]),
        "creatorID": {"$in": [params[1]]}}, {projection: {"data": 0}});

    return project;
};

/**
  * Insert new project for user
  *
  * @param {Array} [0] = JSON POST request, [1] = UserId
  * @returns {JSON} mongodb response
  *
  */
const insertProject = async (db, params) => {
    let dbo = db.db("test");

    let dict = params[0];

    if ("name" in dict && "version" in dict) {
        await dbo.collection('Projects').insertOne({"name": dict["name"],
            "version": dict["version"], "creatorID": [params[1]], "data": []});
    }
    let projects = await dbo.collection('Projects').find({}, {projection: {"data": 0}});

    return projects;
};

/**
  * Delete project for user
  *
  * @param {Array} [0] = ProjectId, [1] = UserId
  * @returns {JSON} mongodb response
  *
  */
const deleteProject = async (db, params) => {
    let dbo = db.db("test");
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[0]);

    if (check != undefined) {return check;}

    await dbo.collection('Projects').deleteOne({"_id": mongoID(params[0]),
        "creatorID": {"$in": [params[1]]}});
    let project = await dbo.collection('Projects').find({}, {projection: {"data": 0}});

    return project;
};

/**
  * Update basic info for specific project
  *
  * @param {Array} [0] = JSON POST request, [1] = ProjectId, [2] = UserId
  * @returns {JSON} mongodb response
  *
  */
const updateProject = async (db, params) => {
    let dbo = db.db("test");
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[1]);

    if (check != undefined) {return check;}

    let dict = params[0];

    if ("name" in dict && "version" in dict) {
        await dbo.collection('Projects').updateOne({"_id": mongoID(params[1]),
            "creatorID": {"$in": [params[2]]}}, {"$set": {"name": dict["name"],
            "version": dict["version"]}});
    }
    let project = await dbo.collection('Projects').find({"creatorID": {"$in": [params[2]]}},
        {projection: {"data": 0}});

    return project;
};

/**
  * Update data for specific project
  *
  * @param {Array} [0] = JSON POST request, [1] = ProjectId, [2] = UserId
  * @returns {JSON} mongodb response
  *
  */
const updateProjectData = async (db, params) => {
    let dbo = db.db("test");
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[1]);

    if (check != undefined) {return check;}

    await dbo.collection('Projects').updateOne({"_id": mongoID(params[1]),
        "creatorID": {"$in": [params[2]]}}, {"$set": {"data": params[0]}});
    let project = await dbo.collection('Projects').find({"creatorID": {"$in": [params[2]]}});

    return project;
};

/**
  * Check if string is valid mongoId
  *
  * @param {Array} [0] = JSON POST request, [1] = ProjectId, [2] = UserId
  * @returns {JSON} undefined if not, empty request if yes
  *
  */
const checkInvalidID = async (db, id) => {
    let dbo = db.db("test");

    if (!mongoID.isValid(id)) {
        //TODO: change to something not retarded
        return await dbo.collection('Projects').find({"ap0sdo": "rivshnokdvskoie"});
    }
    return undefined;
};

//Export modules
module.exports = {
    getProjects,
    getProject,
    getProjectData,
    getProjectInfo,
    insertProject,
    deleteProject,
    updateProject,
    updateProjectData
};
