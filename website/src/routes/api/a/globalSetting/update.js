import adminAuth from "../../_adminAuth";
import prisma from "../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const put = async (request) => {
    const authResponse = await adminAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    const body = request.body;

    const globalSetting = await prisma.globalSetting.upsert({
        where: { globalSettingID: body.globalSettingID || -1 },
        update: { name: body.name },
        create: { name: body.name },
    });

    return { body: { globalSetting } };
};
