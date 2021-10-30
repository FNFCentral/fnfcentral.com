const express = require("express"),
    passport = require("passport"),
    LdapStrategy = require("passport-ldapauth");

const mod = require("./mod");
const auth = require("./auth");

const router = express.Router();

// Auth
const OPTS = {
    server: {
        url: process.env.LDAP_URL,
        bindDN: process.env.LDAP_BIND_DN,
        bindCredentials: process.env.LDAP_BIND_PASS,
        searchBase: process.env.LDAP_SEARCH_BASE,
        searchFilter: process.env.LDAP_SEARCH_FILTER,
    },
};
passport.use(new LdapStrategy(OPTS));
router.use(passport.initialize());

router.use("/mod", mod);

router.post(
    "/login",
    passport.authenticate("ldapauth", { session: false }),
    (req, res) => {
        res.cookie("admin_jwt", auth.createToken(0), {
            expire: 3600000 + Date.now(),
            maxAge: 3600000,
            secure: true,
            httpOnly: true,
            sameSite: "lax",
        });
        res.send({ status: "ok" });
    }
);

router.get("/verify", (req, res) => {
    auth.verifyToken(req.cookies.admin_jwt);
    res.send({ status: "ok" });
});

module.exports = router;
