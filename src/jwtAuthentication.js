const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign(user, global.jwtSecret);
};

const verify = (token) => {
    let verifiedToken = jwt.verify(token, global.jwtSecret, (err, decoded) => {
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
