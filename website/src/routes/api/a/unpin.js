import adminAuth from "../_adminAuth";
import { unpinCID } from "../_cluster";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const del = async (request) => {
    const auth = await adminAuth(request);

    if (!auth) {
        return { status: 401 };
    }

    if (Array.isArray(request.body.cid)) {
        await Promise.all(
            request.body.cid.map(async (cid) => {
                console.log("Unpinning " + cid);
                await unpinCID(cid);
            })
        );
    } else {
        console.log("Unpinning " + request.body.cid);
        await unpinCID(request.body.cid);
    }

    return { status: 200 };
};
