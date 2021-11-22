import adminAuth from "../../_adminAuth";
import prisma from "../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const authResponse = await adminAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    const body = request.body;

    const globalSetting = await prisma.globalSetting.create({
        data: { name: body.name },
    });

    return { body: { globalSetting } };
};
