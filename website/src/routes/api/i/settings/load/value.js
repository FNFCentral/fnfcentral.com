import userAuth from "../../../_userAuth";
import prisma from "../../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const authResponse = await userAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    const query = request.query;

    if (query.get("global")) {
        const userGlobalSetting = await prisma.userGlobalSetting.findFirst({
            where: {
                userID: query.get("userID"),
                globalSettingID: Number(query.get("globalSettingID")),
            },
        });

        return {
            body: {
                userGlobalSettingID: userGlobalSetting.userGlobalSettingID,
                value: userGlobalSetting.value,
            },
        };
    } else {
        const userSetting = await prisma.userSetting.findFirst({
            where: {
                userID: query.get("userID"),
                settingID: Number(query.get("settingID")),
            },
        });

        return {
            body: {
                userSettingID: userSetting.userSettingID,
                value: userSetting.value,
            },
        };
    }
};
