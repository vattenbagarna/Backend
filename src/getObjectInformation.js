/*
 * Database queries to retrive object information
 * This contains the db commands that should be executed
 * from within the db wrapper.
 */

const dbconfig = require('../config/dbConfig.js');
const mongoID = require("mongodb").ObjectID;


/**
* Get all objects from the database
* @param {object} db This is the mongodb database object
*/
const getAllObjects = async (db) => {
    //Select database
    let dbo = db.db(dbconfig.connection.database);
    //find all objects, this is known as a cursor
    let objects = await dbo.collection('Objects').find({});

    //The data here is not the clean data but instead something that is called a cursor.
    //Parsing that will be taken care of in the dbWrapper
    return objects;
};

/**
* Find all items with matching category
* @param {object} db This is the mongodb database object
* @param {string} type category you want to find
*/
const getObjectsByType = async (db, type) => {
    let dbo = db.db(dbconfig.connection.database);
    let typeData = await dbo.collection('Objects').find({"Kategori": type[0]});

    return typeData;
};

/**
  * Get all objects user created
  *
  * @param {Array} [0] = UserId
  * @returns {JSON} Mongodb response
  */
const getCreatedObjects = async (db, params) => {
    let dbo = db.db(dbconfig.connection.database);
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
    let dbo = db.db(dbconfig.connection.database);

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
    let dbo = db.db(dbconfig.connection.database);

    //Check for invalid projectId
    let check = await checkInvalidID(db, params[0]);

    if (check != undefined) {return check;}

    await dbo.collection('Objects').deleteOne({"_id": mongoID(params[0]),
        "creatorID": {"$in": [params[1]]}});
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
    let dbo = db.db(dbconfig.connection.database);

    params[0]["creatorID"] = [params[1]];
    await dbo.collection('Objects').insertOne(params[0]);
    let object = await dbo.collection('Objects').find({"_id": params[0]._id});

    return object;
};

/**
  * Update object by Id
  *
  * @param {Array} [0] = JSON data of object, [1] = projectId, [2] = userId
  * @returns {JSON} Mongodb response
  */
const updateObjects = async (db, params) => {
    let dbo = db.db(dbconfig.connection.database);

    //Check for invalid projectId
    let check = await checkInvalidID(db, params[1]);

    if (check != undefined) {return check;}

    //Update values
    await dbo.collection('Objects').replaceOne({"_id": mongoID(params[1]),
        "creatorID": {"$in": [params[2]]}}, params[0]);

    //Get updated object
    let types = await dbo.collection('Objects').find({"_id": mongoID(params[1]),
        "creatorID": {"$in": [params[2]]}});

    return types;
};

/**
  * List unique categories in object collection
  *
  * @returns {Array} Mongodb response with an array
  */
const listCategories = async (db) => {
    let dbo = db.db(dbconfig.connection.database);

    let types = await dbo.collection('Objects').distinct("Kategori");

    return types;
};

/**
  * Get icon for category
  *
  * @param {Array} [0] = Category to find
  * @returns {JSON} Mongodb response with images
  */
const getCategoryIcon = async (db, params) => {
    let dbo = db.db(dbconfig.connection.database);

    let types = await dbo.collection('Icons').find({"Kategori": params[0]});

    return types;
};

/**
  * Get icon for all categories
  *
  * @returns {JSON} Mongodb response with images
  */
const getAllCategoryIcons = async (db) => {
    let dbo = db.db(dbconfig.connection.database);

    let types = await dbo.collection('Icons').find({});

    return types;
};

/**
  * Insert icon for category
  *
  * @param {Array} [0] = JSON object with Kategori and imgData
  * @returns {JSON} Mongodb response with images
  */
const insertCategoryIcon = async (db, params) => {
    let dbo = db.db(dbconfig.connection.database);

    let dict = params[0];
    //check if correct values is set

    if (dict['Kategori'] == undefined || dict['imgData'] == undefined) {
        return {"error": true, "info": "Kategori or imgData not set"};
    }

    let toInsert = {"Kategori": dict['Kategori'], "imgData": dict['imgData']};

    await dbo.collection('Icons').insertOne(toInsert);
    let types = await dbo.collection('Icons').find({"_id": toInsert._id},
        {projection: {"imgData": 0}});

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
    let dbo = db.db(dbconfig.connection.database);

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
    deleteObjects,
    insertObject,
    updateObjects,
    listCategories,
    getCategoryIcon,
    getAllCategoryIcons,
    insertCategoryIcon
};
