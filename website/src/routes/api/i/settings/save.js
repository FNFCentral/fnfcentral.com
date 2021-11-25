import userAuth from "../../_userAuth";
import prisma from "../../_database";
import { settingChangesProcessed } from "../../_metrics";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const authResponse = await userAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    settingChangesProcessed.inc();

    const body = request.body;

    if (body.global) {
        try {
            const userGlobalSetting = await prisma.userGlobalSetting.findFirst({
                where: {
                    globalSettingID: body.globalSettingID,
                    userID: body.userID,
                },
            });

            const newUserSetting = await prisma.userGlobalSetting.update({
                where: {
                    userSettingsID: userGlobalSetting.userGlobalSettingID,
                },
                data: { value: body.value.toString() },
            });

            console.log(
                `Update ${body.globalSettingID} for user ${body.userID} to ${newUserSetting.value}`
            );

            return { body: { userSetting: newUserSetting } };
        } catch {
            const userGlobalSetting = await prisma.userGlobalSetting.create({
                data: {
                    userID: body.userID,
                    globalSettingID: body.globalSettingID,
                    value: body.value.toString(),
                },
            });

            console.log(
                `Created ${body.globalSettingID} for user ${body.userID} to ${userGlobalSetting.value}`
            );

            return { body: { userSetting: userGlobalSetting } };
        }
    } else {
        try {
            const userSetting = await prisma.userSetting.findFirst({
                where: {
                    settingID: body.settingID,
                    userID: body.userID,
                },
            });

            const newUserSetting = await prisma.userExtraInfo.update({
                where: { userSettingsID: userSetting.userSettingsID },
                data: { value: body.value.toString() },
            });

            console.log(
                `Update ${body.settingID} for user ${body.userID} to ${newUserSetting.value}`
            );

            return { body: { userSetting: newUserSetting } };
        } catch {
            const userSetting = await prisma.userSetting.create({
                data: {
                    userID: body.userID,
                    settingID: body.settingID,
                    value: body.value.toString(),
                },
            });

            console.log(
                `Created ${body.settingID} for user ${body.userID} to ${userSetting.value}`
            );

            return { body: { userSetting: userSetting } };
        }
    }
};
