import adminAuth from "../_adminAuth";
import { pinCID } from "../_cluster";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const auth = await adminAuth(request);

    if (!auth) {
        return { status: 401 };
    }

    if (Array.isArray(request.body.cid)) {
        await Promise.all(
            request.body.cid.map(async (cid) => {
                console.log("Pinning " + cid);
                await pinCID(cid);
            })
        );
    } else {
        console.log("Pinning " + request.body.cid);
        await pinCID(request.body.cid);
    }

    return { status: 200 };
};
