

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

/**
  * Get all Objects that are requesting approvement
  * 
  * 
  */
const getRequestApproveObjects = async (db, params) => {
    //Select database
    let dbo = db.db(dbconfig.connection.database);
    //find all objects, this is known as a cursor
    let objects = await dbo.collection('Objects').find({"requestApprove": "1"}); 

    return objects;
};


/**
  * Approve object that are requesting approvement
  * 
  * 
  */
const setObjectRequest = async (db, params) => {

    let acceptRequest = params[0]['requestApprove'];

    if (acceptRequest !== "1" && acceptRequest !== "0") {
        return {"error": true, "info": "Required parameters not set"};
    }
	
    let dbo = db.db(dbconfig.connection.database);
    //Update values
    await dbo.collection('Objects').updateOne({"_id": mongoID(params[1])}, 
		{"$set": {"requestApprove": "0", "approved": acceptRequest}});

    //Get updated object
    let objects = await dbo.collection('Objects').find({"_id": mongoID(params[1])});

    return objects;
};

module.exports = {
    getAllProjects,
	getRequestApproveObjects,
	setObjectRequest
}
