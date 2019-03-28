const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign(user, "YourSecretGoesHere");
};

const verify = (token) => {
    jwt.verify(token, "YourSecretGoesHere", (err, decoded)=>{
        if (err != undefined) {
            return decoded;
        }
        return false;
    });
};

module.exports = {
    createToken,
    verify
};
