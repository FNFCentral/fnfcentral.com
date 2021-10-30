const jwt = require("jsonwebtoken");

const createToken = (authLevel) => {
    return jwt.sign({ authLevel }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

const verifyToken = (token, authLevel = 0) => {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (authLevel < decoded.authLevel) throw new Error();
};

module.exports = { createToken, verifyToken };
