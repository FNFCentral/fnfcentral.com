import getUserTopScores from "./getUserTopScores";
import getCurUser from "./getCurUser";

export default async ({ modID }) => {
    const userID = (await getCurUser()).id;

    if (!userID) {
        console.warn("Scores Not Loaded As Player Not Logged In");
        return [];
    } else {
        return getUserTopScores({ userID, modID });
    }
};
