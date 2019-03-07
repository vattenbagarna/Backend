/*
* Database queries to retrive object information
* This contains the db commands that should be executed
* from within the db wrapper.
*/

// TODO: CHANGE THIS IN FAVOUR OF THE ACTUAL DATA
const getPeople = async (db) => {
    //Select database
    let dbo = db.db("mydb");
    //find people, this is known as a cursor
    let people = await dbo.collection('people').find({});

    //The data here is not the clean data but instead something that is called a cursor.
    //Parsing that will be taken care of in the dbWrapper
    return people;
};

// TODO: CHANGE THIS IN FAVOUR OF THE ACTUAL DATA
const getObjectsByType = async (db, type) => {
    let dbo = db.db("mydb");
    let typeData = await dbo.collection('people').find({"address.city": type});

    return typeData;
};

module.exports = {
    getPeople,
    getObjectsByType
};
