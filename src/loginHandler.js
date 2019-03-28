/*
* LoginHandler.js
* This contains all the functions to handle account events such as
* creating accounts, login, changing passwords, sending confirmation emails.
*/

//needs dbConfig to select database
const dbconfig = require('../config/dbConfig.js');
const crypto = require('crypto');

/**
* Salts and hashes a password.
* @param {string} passwd the unhashed password
* @return {object} Returns the hashed password and the salt that was generated
*/
const createNewPasswordHashSaltPair = (passwd) => {
    let hash = crypto.createHash('sha512');
    let salt = crypto.randomBytes(128).toString('base64');

    hash.update(passwd + salt);
    let saltedHashDigest = hash.digest('hex');

    return {
        "password": saltedHashDigest,
        "salt": salt
    };
};

/**
* Checks if a password matches the password hash from the userObject
* @param {string} plaintext the plaintext password the user tries to log in with
* @param {object} userObject a userObject containing at least password and salt
* @return {bool} Returns true if it matches, false if it doesn't
*/
const validatePassword = (plaintext, userObject) => {
    let hash = crypto.createHash('sha512');

    hash.update(plaintext + userObject.salt);
    let saltedHashFromPlaintext = hash.digest('hex');

    if (saltedHashFromPlaintext == userObject.password) {
        return true;
    }
    return false;
};

/**
* Creates a user object to match how it's stored in the database.
* @param {string} username the username or email the account is tied to
* @param {string} password the users password, will be ran through hashPasswordSecurly
* @param {bool} admin sets if the user should be admin, default false
*/
const createNewUser = (username, password, admin = false) => {
    let hashedPasswordAndSalt = createNewPasswordHashSaltPair(password);

    let userObject = {
        "username": username,
        "password": hashedPasswordAndSalt.password,
        "salt": hashedPasswordAndSalt.salt,
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

/**
* Check if the user login is correct
* @param {object} db Database object
* @param userAccount the user account that tries to login
* @return {bool} True if login is successfull, false if it fails
*/
const verifyUserLogin = async (db, userAccount) => {
    //Select database
    let dbo = db.db(dbconfig.connection.database);
    //Search for an existing user with that username
    let existingUser = await dbo.collection('Users').findOne({"username": userAccount[0].username});

    //If we don't find a user they can't log in.
    if (existingUser == null) {
        return false;
    }

    //Check if the user submitted password matches what is salted, hashed and stored in the database
    let passwordIsValid = validatePassword(userAccount[0].password, existingUser);

    if (passwordIsValid) {
        return true;
    }
    return false;
};

/**
* changePassword updates the new users password
* @param {object} db Database object
* @param {array} userChangePassword array conianing the userObject
* @return {bool} return true if password has been changed, false if it hasn't
*/
const changePassword = async (db, userChangePassword) => {
    //Select database
    let dbo = db.db(dbconfig.connection.database);
    //Search for an existing user with that username
    let existingUser = await dbo.collection('Users').findOne(
        {"username": userChangePassword[0].username}
    );

    //If we don't find a user they can't change their password
    if (existingUser == null) {
        return false;
    }

    //They have to enter their password again to change it
    let oldPasswordMatches = validatePassword(userChangePassword[0].password, existingUser);

    if (!oldPasswordMatches) {
        return false;
    }
    //New password must be written twice and match
    if (userChangePassword[0].newPassword != userChangePassword[0].confirmNewPassword) {
        return false;
    }

    //Create new hashed password and salt and update the database
    let newpw = await createNewPasswordHashSaltPair(userChangePassword[0].newPassword);
    let res = await dbo.collection('Users').updateOne(
        {"username": userChangePassword[0].username},
        {$set: {"password": newpw.password, "salt": newpw.salt }}
    );

    //Check to make sure it went ok and the database was updated
    if (res.result.ok == 1 && res.result.nModified == 1) {
        return true;
    }
    return false;
};

module.exports = {
    insertUserInDatabase,
    createNewUser,
    verifyUserLogin,
    changePassword
};
