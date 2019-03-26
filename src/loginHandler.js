/*
* LoginHandler.js
* This contains all the functions to handle account events such as
* creating accounts, login, changing passwords, sending confirmation emails.
*/

//needs dbConfig to select database
const dbconfig = require('../config/dbConfig.js');

/**
* Salts and hashes a password.
* @param {string} passwd the unhashed password
* @return {string} Returns hashed and salted password
*/
const hashPasswordSecurly = (passwd) => {
    /* TODO: Write this function */
    return "secure" + passwd;
};

/**
* Creates a user object to match how it's stored in the database.
* @param {string} username the username or email the account is tied to
* @param {string} password the users password, will be ran through hashPasswordSecurly
* @param {bool} admin sets if the user should be admin, default false
*/
const createUser = (username, password, admin = false) => {
    let userObject = {
        "username": username,
        "password": hashPasswordSecurly(password),
        "isAdmin": admin
    };

    return userObject;
};

/**
* Inserts a user into the database
* @param {object} db database object from dbWrapper
* @param {json} userAccount a user account in json format, should be generated from createUser.
* @return {bool} specifies if the insert statement was successfull or not.
*/
const insertUserInDatabase = async (db, userAccount) => {
    //Select database
    let dbo = db.db(dbconfig.connection.database);
    //Search for an existing user with that username
    let existingUser = await dbo.collection('Users').findOne({"username": userAccount[0].username});

    console.log("EXTU:", existingUser);

    //If we find an existing user, return false - a new user was not created
    if (existingUser != null) {
        return false;
    }
    //We have no existing user with this name, insert the new one.
    let insertStatement = await dbo.collection('Users').insertOne(userAccount[0]);

    if (insertStatement.result.ok == 1) {
        return true;
    }
    return false;
};


module.exports = {
    insertUserInDatabase,
    createUser
};
