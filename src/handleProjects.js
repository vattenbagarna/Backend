/*
* Database queries to retrive, modify, delete and create projects
*
*
*
*/
const mongoID = require("mongodb").ObjectID;
const dbconfig = require('../config/dbConfig.js');

/**
  * Get a predefined find project query where we see if a userId is
  * in the access value
  *
  * @param {String} UserId to find
  * @returns {JSON} JSON query
  *
  */
const findProjectQuery = (name) => {
    return {"access": { "$all": [{"$elemMatch": {"userID": name}}] }};
};

/**
  * Get a predefined find project query where we see if a userId is
  * in the access value and if the id matches
  *
  * @param {String} MongodbID to find
  * @param {String} UserId to find
  * @returns {JSON} JSON query
  *
  */
const findProjectQueryWithId = (id, name) => {
    return {"_id": mongoID(id), "access": { "$all": [{"$elemMatch": {"userID": name}}] }};
};

/**
  * Get all project info for user
  *
  * @param {Array} [0] = UserId
  * @returns {JSON} mongodb response
  *
  */
const getProjects = async (db, params) => {
    //Select database
    let dbo = db.db(dbconfig.connection.database);
    //find all projects

    let projects = await dbo.collection('Projects').find(findProjectQuery(params[0]),
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
    let dbo = db.db(dbconfig.connection.database);
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[0]);

    if (check != undefined) {return check;}

    let project = await dbo.collection('Projects').find(findProjectQueryWithId(params[0],
        params[1]));

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
    let dbo = db.db(dbconfig.connection.database);
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[0]);

    if (check != undefined) {return check;}

    let project = await dbo.collection('Projects').find(findProjectQueryWithId(params[0],
        params[1]), {projection: {"data": 1}});

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
    let dbo = db.db(dbconfig.connection.database);
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[0]);

    if (check != undefined) {return check;}

    let project = await dbo.collection('Projects').find(findProjectQueryWithId(params[0],
        params[1]), {projection: {"data": 0}});

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
    let dbo = db.db(dbconfig.connection.database);

    let dict = params[0];

    let creatorIDs = [{"userID": params[1], "permission": "w", "creator": 1}];

    if (dict["access"] != undefined) {
        for (let i = 0; i < dict["access"].length; i++) {
            dict["access"][i]["creator"] = 0;
            creatorIDs.push(dict["access"][i]);
        }
    }

    if ("name" in dict && "version" in dict) {
        await dbo.collection('Projects').insertOne({"name": dict["name"],
            "version": dict["version"], "access": creatorIDs, "data": []});
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
    let dbo = db.db(dbconfig.connection.database);
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[0]);

    if (check != undefined) {return check;}

    await dbo.collection('Projects').deleteOne(findProjectQueryWithId(params[0], params[1]));
    let project = await dbo.collection('Projects').find(findProjectQuery(params[1]),
        {projection: {"data": 0}});

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
    let dbo = db.db(dbconfig.connection.database);
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[1]);

    if (check != undefined) {return check;}

    let dict = params[0];

    await dbo.collection('Projects').updateOne(findProjectQueryWithId(params[1],
        params[2]), {"$set": dict});

    let project = await dbo.collection('Projects').find(findProjectQuery(params[2]),
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
    let dbo = db.db(dbconfig.connection.database);
    //Check for valid mongodb objectId
    let check = await checkInvalidID(db, params[1]);

    if (check != undefined) {return check;}

    await dbo.collection('Projects').updateOne(findProjectQueryWithId(params[1],
        params[2]), {"$set": {"data": params[0]}});
    let project = await dbo.collection('Projects').find(findProjectQuery(params[2]));

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
    let dbo = db.db(dbconfig.connection.database);

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
