import adminAuth from "../../_adminAuth";
import prisma from "../../_database";

import generateModData from "../../_generateModData";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const put = async (request) => {
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
                where: { diffID: diff.diffID || -1 },
                update: {
                    name: diff.name,
                    internalNumber: diff.internalNumber,
                },
                create: {
                    name: diff.name,
                    internalNumber: diff.internalNumber,
                },
            });
        });

        const diffsCreate = [];

        song.diffs.forEach((diff) => {
            diffsCreate.push({
                name: diff.name,
                internalNumber: diff.internalNumber,
            });
        });

        songs.push({
            where: { songID: song.songID || -1 },
            update: {
                name: song.name,
                internalName: song.internalName,
                iconCID: song.iconCID,
                diffs: { upsert: diffs },
            },
            create: {
                name: song.name,
                internalName: song.internalName,
                iconCID: song.iconCID,
                diffs: { createMany: { data: diffsCreate } },
            },
        });
    });

    const extraInfos = [];

    body.extraInfos.forEach((extraInfo) => {
        extraInfos.push({
            where: { extraInfoID: extraInfo.extraInfoID || -1 },
            update: {
                internalName: extraInfo.internalName,
                valueType: extraInfo.valueType,
            },
            create: {
                internalName: extraInfo.internalName,
                valueType: extraInfo.valueType,
            },
        });
    });

    const settings = [];

    body.settings.forEach((setting) => {
        settings.push({
            where: { settingID: setting.settingID || -1 },
            update: {
                name: setting.name,
                internalName: setting.internalName,
            },
            create: {
                name: setting.name,
                internalName: setting.internalName,
            },
        });
    });

    const globalSettingMaps = [];

    body.globalSettingMaps.forEach((globalSettingMap) => {
        globalSettingMaps.push({
            where: {
                globalSettingMapID: globalSettingMap.globalSettingMapID || -1,
            },
            update: {
                globalSettingID: globalSettingMap.globalSettingID,
                internalName: globalSettingMap.internalName,
            },
            create: {
                globalSettingID: globalSettingMap.globalSettingID,
                internalName: globalSettingMap.internalName,
            },
        });
    });

    const modData = {
        modID: body.modID,
        name: body.name,
        cid: body.cid,
        songs: { upsert: songs },
        extraInfos: { upsert: extraInfos },
        settings: {
            upsert: settings,
        },
        globalSettingMaps: {
            upsert: globalSettingMaps,
        },
    };

    const mod = await prisma.mod.upsert({
        where: { modID: body.oldModID },
        update: modData,
        create: generateModData(body),
    });

    return { body: { mod } };
};
