import cookie from "cookie";
import { verifyCredentials, createToken } from "../_adminAuth";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const authResponse = await verifyCredentials(request);

    if (!authResponse) {
        return { status: 401 };
    }

    return {
        headers: {
            "set-cookie": cookie.serialize("admin_jwt", createToken(), {
                expires: new Date(3600000 + Date.now()),
                maxAge: 3600000,
                secure: true,
                httpOnly: true,
                sameSite: "lax",
            }),
        },
    };
};
