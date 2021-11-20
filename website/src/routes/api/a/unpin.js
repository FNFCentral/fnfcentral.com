import adminAuth from "../_adminAuth";
import { unpinCID } from "../_cluster";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const del = async (request) => {
    const auth = await adminAuth(request);

    if (!auth) {
        return { status: 401 };
    }

    await unpinCID(request.body.cid);

    return { status: 200 };
};
