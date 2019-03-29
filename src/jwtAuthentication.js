const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign(user, "YourSecretGoesHere");
};

const verify = (token) => {
    let verifiedToken = jwt.verify(token, "YourSecretGoesHere", (err, decoded) => {
        if (err == null) {
            return decoded;
        }
        return false;
    });

    return verifiedToken;
};

module.exports = {
    createToken,
    verify
};
