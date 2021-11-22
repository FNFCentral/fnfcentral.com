import axios from "axios";

import getCurUser from "./getCurUser";

export default async ({ settingID, global, value }) => {
    const userID = (await getCurUser()).id;

    if (!userID) {
        console.warn("User Setting Not Saved As Player Not Logged In");
    } else {
        let body = {};

        if (global) {
            body = {
                global: true,
                globalSettingID: settingID,
                userID: userID,
                value: value,
            };
        } else {
            body = {
                global: false,
                settingID: settingID,
                userID: userID,
                value: value,
            };
        }
        return (
            await axios.post("/api/i/settings/save", body, {
                withCredentials: true,
            })
        ).data.userSetting;
    }
};
