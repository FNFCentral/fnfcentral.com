import prisma from "../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const query = request.query;

    const mod = await prisma.mod.findUnique({
        where: {
            modID: query.get("modID"),
        },
        include: {
            songs: { include: { diffs: true } },
            extraInfos: true,
            settings: true,
            globalSettingMaps: { include: { globalSetting: true } },
        },
    });

    return { body: { mod } };
};
