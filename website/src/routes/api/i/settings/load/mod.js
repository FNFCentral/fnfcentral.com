import userAuth from "../../../_userAuth";
import prisma from "../../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const authResponse = await userAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    const query = request.query;

    const userSetting = await prisma.userSetting.findMany({
        where: {
            userID: query.get("userID"),
            setting: { modID: query.get("modID") },
        },
        include: {
            setting: true,
        },
    });

    const globalSettingIDs = [];

    const idToInternalName = {};

    const globalSettingMaps = await prisma.globalSettingMap.findMany({
        where: {
            modID: query.get("modID"),
        },
    });

    globalSettingMaps.forEach((globalSettingMap) => {
        globalSettingIDs.push(globalSettingMap.globalSettingID);
        idToInternalName[globalSettingMap.globalSettingID] =
            globalSettingMap.internalName;
    });

    const rawGlobalUserSettings = await prisma.userGlobalSetting.findMany({
        where: {
            userID: query.get("userID"),
            globalSettingID: { in: globalSettingIDs },
        },
        distinct: ["globalSettingID"],
    });

    const globalUserSettings = [];

    rawGlobalUserSettings.forEach((rawGlobalUserSetting) => {
        globalUserSettings.push({
            internalName:
                idToInternalName[rawGlobalUserSetting.globalSettingID],
            globalSettingID: rawGlobalUserSetting.globalSettingID,
            value: rawGlobalUserSetting.value,
        });
    });

    return {
        body: {
            userSettings: userSetting,
            globalUserSettings: globalUserSettings,
        },
    };
};
