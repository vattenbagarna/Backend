/*
* Database functions
* Should be used instead of connecting to the database over
* and over again in other src files.
*/

/* Required dependencies */
const mongoClient = require('mongodb').MongoClient;
const dbConnConf = require('../config/dbConfig.js');

/*
* Connect
* Simple connect test, conntects to database.
*/
const connect = async () => {
    mongoClient.connect(
        "mongodb://" + dbConnConf.connection.username + ":" +  dbConnConf.connection.password +
        "@" + dbConnConf.connection.base_url + "/" + dbConnConf.connection.database,
        { useNewUrlParser: true },
        async (err, db) => {
            console.log("Connected");
            db.close();
        });
};

/*
* dbConnectPipe
* Takes a function as parameter and executes it against the database
* @param fExecute function - Executed against the database
*/
const dbConnectPipe = (fExecute, fParams = undefined) => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(
            "mongodb://" + dbConnConf.connection.username + ":" +  dbConnConf.connection.password +
            "@" + dbConnConf.connection.base_url + "/" + dbConnConf.connection.database,
            { useNewUrlParser: true },
            async (err, db) => {
                let res;

                if (fParams != undefined) {
                    //TODO: Ajust length of params to be dynamic
                    res = await fExecute(db, fParams[0]);
                } else {
                    res = await fExecute(db);
                }

                res.toArray((err, data) => {
                    err ? reject(err) : resolve(data);
                });
                db.close();
            }
        );
    });
};


module.exports = {
    connect,
    dbConnectPipe
};
