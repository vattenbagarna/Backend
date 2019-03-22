/*
* Database queries to retrive object information
* This contains the db commands that should be executed
* from within the db wrapper.
*/

const dbconfig = require('../config/dbConfig.js');


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
    let typeData = await dbo.collection('Objects').find({"Kategori": type});

    return typeData;
};

module.exports = {
    getAllObjects,
    getObjectsByType
};
