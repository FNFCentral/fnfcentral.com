import adminAuth from "../_adminAuth";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const auth = await adminAuth(request);

    if (!auth) {
        return { status: 401 };
    }

    return { status: 200 };
};
