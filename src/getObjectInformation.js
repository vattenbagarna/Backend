/*
 * Database queries to retrive object information
 * This contains the db commands that should be executed
 * from within the db wrapper.
 */

// required to create mongodb id
const mongoID = require("mongodb").ObjectID;

/**
  * Get all objects
  *
  * @returns {JSON} Mongodb response
  */
const getAllObjects = async (db) => {
    //Select database
    let dbo = db.db("test");
    //find objects, this is known as a cursor
    let objects = await dbo.collection('Objects').find({});
    //The data here is not the clean data but instead something that is called a cursor.
    //Parsing that will be taken care of in the dbWrapper
    return objects;
};

/**
  * Get all objects by searching for category
  *
  * @param {Array} [0] = category to search for
  * @returns {JSON} Mongodb response
  */
const getObjectsByType = async (db, params) => {
    let dbo = db.db("test");

    let typeData = await dbo.collection('Objects').find({"Kategori": params[0]});

    return typeData;
};

/**
  * Get all objects user created
  *
  * @param {Array} [0] = UserId
  * @returns {JSON} Mongodb response
  */
const getCreatedObjects = async (db, params) => {
    let dbo = db.db("test");
    let types = await dbo.collection('Objects').find({"creatorID": {"$in": [params[0]]}});

    return types;
};

/**
  * Get object by ObjectId
  *
  * @param {Array} [0] = ObjectId
  * @returns {JSON} Mongodb response
  */
const getObjectById = async (db, params) => {
    let dbo = db.db("test");

    let check = await checkInvalidID(db, params[0]);
    if (check != undefined) {return check;}

    let types = await dbo.collection('Objects').find({"_id": mongoID(params[0])});

    return types;
};

/**
  * Delete object by id (only for creator of object)
  *
  * @param {Array} [0] = ObjectId, [1] = UserId
  * @returns {JSON} Mongodb response
  */
const deleteObjects = async (db, params) => {
    let dbo = db.db("test");

    //Check for invalid projectId
    let check = await checkInvalidID(db, params[0]);
    if (check != undefined) {return check;}

    await dbo.collection('Objects').deleteOne({"_id": mongoID(params[0]) ,"creatorID": {"$in": [params[1]]}});
    let types = await dbo.collection('Objects').find({"creatorID": {"$in": [params[1]]}});

    return types;
};

/**
  * Create new object
  *
  * @param {Array} [0] = JSON data of object, [1] = userId
  * @returns {JSON} Mongodb response
  */
const insertObject = async (db, params) => {
    let dbo = db.db("test");

    console.log("inserting");
    params[0]["creatorID"] = [params[1]];
    await dbo.collection('Objects').insertOne(params[0]);
    let object = await dbo.collection('Objects').find({"creatorID": {"$in": [params[1]]}});

    return object;
};

/**
  * Update object by Id
  *
  * @param {Array} [0] = JSON data of object, [1] = projectId, [2] = userId
  * @returns {JSON} Mongodb response
  */
const updateObjects = async (db, params) => {
    let dbo = db.db("test");

    //Check for invalid projectId
    let check = await checkInvalidID(db, params[1]);
    if (check != undefined) {return check;}

    await dbo.collection('Objects').updateOne({"_id": mongoID(params[1]) ,
        "creatorID": {"$in": [params[2]]}},
        {"$set": params[0]});
    let types = await dbo.collection('Objects').find({"creatorID": {"$in": [params[2]]}});

    return types;
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
        return await dbo.collection('Objects').find({"ap0sdo": "rivshnokdvskoie"});
    }
    return undefined;
};

//export modules
module.exports = {
    getAllObjects,
    getObjectsByType,
    getCreatedObjects,
    getObjectById,
    getObjectTypes,
    deleteObjects,
    insertObject,
    updateObjects
};
