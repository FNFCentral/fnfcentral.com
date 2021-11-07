import axios from "axios";

import getCurUser from "./getCurUser";

export default async ({ modID }) => {
    const userID = (await getCurUser()).id;

    if (!userID) {
        console.warn("User Extra Info Not Loaded As Player Not Logged In");
        return [];
    } else {
        return (
            await axios.get("https://api.fnfcentral.com/i/extraInfo/load/mod", {
                params: { userID, modID },
                withCredentials: true,
            })
        ).data.userExtraInfos;
    }
};
