import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import cookie from "cookie";
import LdapAuth from "ldapauth-fork";

// LDAP Stuff
const OPTS = {
    url: process.env["LDAP_URL"],
    bindDN: process.env["LDAP_BIND_DN"],
    bindCredentials: process.env["LDAP_BIND_PASS"],
    searchBase: process.env["LDAP_SEARCH_BASE"],
    searchFilter: process.env["LDAP_SEARCH_FILTER"],
    reconnect: true,
};
const ldapAuth = new LdapAuth(OPTS);

/** @type {import('@sveltejs/kit').RequestHandler} */
export const verifyCredentials = async (request) => {
    return new Promise((res) => {
        ldapAuth.authenticate(
            request.body.username,
            request.body.password,
            (err, user) => {
                if (err) res();
                res(user);
            }
        );
    });
};

export const createToken = (authLevel = 0) => {
    return sign({ authLevel }, process.env["JWT_SECRET"], {
        expiresIn: "1h",
    });
};

export const verifyToken = (token, authLevel = 0) => {
    var decoded = verify(token, process.env["JWT_SECRET"]);

    if (authLevel < decoded.authLevel) throw new Error();
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export default async (request, authLevel = 0) => {
    try {
        verifyToken(
            cookie.parse(request.headers.cookie || "")["admin_jwt"] || "",
            authLevel
        );

        return true;
    } catch {
        return false;
    }
};
