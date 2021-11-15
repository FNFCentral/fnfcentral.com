import cookie from "cookie";

/** @type {import('@sveltejs/kit').RequestHandler} */
export default async (request) => {
    const body = request.body || {};

    const userID = body.userID || request.query.get("userID");

    const response = await fetch(`http://kratos:4433/sessions/whoami`, {
        method: "GET",
        headers: {
            cookie:
                "ory_kratos_session=" +
                    cookie.parse(request.headers.cookie || "")[
                        "ory_kratos_session"
                    ] || "",
        },
    });

    if (!response.ok) {
        console.warn("Someone is trying to impersonate: " + userID);
        return false;
    }

    const responseJSON = await response.json();

    if (responseJSON.identity.id !== userID) {
        console.warn(
            "Someone is trying to impersonate: " +
                userID +
                " ID: " +
                responseJSON.identity.id
        );
        return false;
    }

    return true;
};
