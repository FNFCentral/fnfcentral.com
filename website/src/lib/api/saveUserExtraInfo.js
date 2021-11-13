import axios from "axios";

import getCurUser from "./getCurUser";

export default async ({ extraInfoID, value }) => {
    const userID = (await getCurUser()).id;

    if (!userID) {
        console.warn("User Extra Info Not Saved As Player Not Logged In");
    } else {
        return (
            await axios.post(
                "https://api.fnfcentral.com/i/extraInfo/save",
                {
                    extraInfoID,
                    userID,
                    value,
                },
                { withCredentials: true }
            )
        ).data.userExtraInfo;
    }
};
