

const mongoID = require("mongodb").ObjectID;
const dbconfig = require('../config/dbConfig.js');


/**
* getAllProjects gets all the projects for the admin
* @param {object} db database object from dbWrapper
* @param {array} params,no parameters in this case
*/
const getAllProjects = async (db, params=[]) => {
    //Select database
    let dbo = db.db(dbconfig.connection.database);
    //find all projects
    let projects = await dbo.collection('Projects').find();

    //return projects
    return projects;
};

module.exports = {
    getAllProjects
}
