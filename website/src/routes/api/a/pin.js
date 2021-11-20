import adminAuth from "../_adminAuth";
import { pinCID } from "../_cluster";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const auth = await adminAuth(request);

    if (!auth) {
        return { status: 401 };
    }

    await pinCID(request.body.cid);

    return { status: 200 };
};
