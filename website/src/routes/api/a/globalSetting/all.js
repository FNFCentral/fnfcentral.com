import adminAuth from "../../_adminAuth";
import prisma from "../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const auth = await adminAuth(request);

    if (!auth) {
        return { status: 401 };
    }

    const globalSettings = await prisma.globalSetting.findMany({});

    return { body: { globalSettings } };
};
