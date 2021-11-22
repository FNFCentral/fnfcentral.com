import adminAuth from "../../_adminAuth";
import prisma from "../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const authResponse = await adminAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    const body = request.body;

    const songs = [];

    body.songs.forEach((song) => {
        const diffs = [];

        song.diffs.forEach((diff) => {
            diffs.push({
                name: diff.name,
                internalNumber: diff.internalNumber,
            });
        });

        songs.push({
            name: song.name,
            internalName: song.internalName,
            iconCID: song.iconCID,
            diffs: { createMany: { data: diffs } },
        });
    });

    const extraInfos = [];

    body.extraInfo.forEach((extraInfo) => {
        extraInfos.push({
            internalName: extraInfo.internalName,
            valueType: extraInfo.valueType,
        });
    });

    const settings = [];

    body.settings.forEach((setting) => {
        settings.push({
            name: setting.name,
            internalName: setting.internalName,
        });
    });

    const globalSettingMaps = [];

    body.globalSettings.forEach((globalSetting) => {
        globalSettingMaps.push({
            globalSettingID: globalSetting.globalSettingID,
            internalName: globalSetting.internalName,
        });
    });

    const mod = await prisma.mod.create({
        data: {
            modID: body.modID,
            name: body.name,
            cid: body.cid,
            songs: { create: songs },
            extraInfos: { createMany: { data: extraInfos } },
            settings: { createMany: { data: settings } },
            globalSettingMaps: { createMany: { data: globalSettingMaps } },
        },
    });

    return { body: { mod } };
};
