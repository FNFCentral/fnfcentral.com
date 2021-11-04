const axios = require("axios");

const verifySession = async (cookieHeader, userID) => {
    const response = await axios.get("http://kratos:4433/sessions/whoami", {
        headers: {
            Cookie: cookieHeader,
        },
    });
    if (response.data.identity.id !== userID) throw new Error();
};

const middleware = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    } else {
        verifySession(req.headers["cookie"], req.body.userID)
            .then(() => next())
            .catch(() => {
                console.warn(
                    "Someone is trying to impersonate: " + req.body.userID
                );
                res.sendStatus(401);
            });
    }
};

module.exports = { middleware };
