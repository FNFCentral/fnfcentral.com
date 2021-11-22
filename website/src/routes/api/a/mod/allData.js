import adminAuth from "../../_adminAuth";
import prisma from "../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const auth = await adminAuth(request);

    if (!auth) {
        return { status: 401 };
    }

    const mods = await prisma.mod.findMany({
        include: {
            songs: { include: { diffs: true } },
            extraInfos: true,
            settings: true,
            globalSettingMaps: true,
        },
    });

    return { body: { mods } };
};
