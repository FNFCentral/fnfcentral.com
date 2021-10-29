import axios from "axios";

export default async ({ userID, modID }) => {
    console.log(
        axios.get("https://api.fnfcentral.com/v0/score/user/top/mod", {
            userID,
            modID,
        })
    );

    return (
        await axios.get("https://api.fnfcentral.com/v0/score/user/top/mod", {
            userID,
            modID,
        })
    ).data.scores;
};
