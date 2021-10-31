import axios from "axios";

export default async ({ userID, modID }) => {
    const topScores = axios.get(
        "https://api.fnfcentral.com/v0/score/user/top/mod",
        {
            params: { userID, modID },
        }
    );

    console.log("Got Top Scores: " + topScores);

    return topScores.data.scores;
};
