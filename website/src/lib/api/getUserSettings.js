import axios from "axios";

import getCurUser from "./getCurUser";

export default async ({ modID }) => {
    const userID = (await getCurUser()).id;

    if (!userID) {
        console.warn("User Settings Not Loaded As Player Not Logged In");
        return [];
    } else {
        const processed = [];

        const data = (
            await axios.get("/api/i/settings/load/mod", {
                params: { userID, modID },
                withCredentials: true,
            })
        ).data;

        data.userSettings.forEach((userSetting) => {
            processed.push({
                settingID: userSetting.settingID,
                value: userSetting.value,
                internalName: userSetting.setting.internalName,
                global: false,
            });
        });

        data.globalUserSettings.forEach((globalUserSetting) => {
            processed.push({
                settingID: globalUserSetting.globalSettingID,
                value: globalUserSetting.value,
                internalName: globalUserSetting.internalName,
                global: true,
            });
        });

        console.log("Processing Setting Data " + JSON.stringify(processed));

        return processed;
    }
};
