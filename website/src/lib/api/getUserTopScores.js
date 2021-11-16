import axios from "axios";

export default async ({ userID, modID }) => {
    const topScores = await axios.get("/api/v0/score/user/top/mod", {
        params: { userID, modID },
        withCredentials: true,
    });

    console.log("Got Top Scores: " + topScores);

    return topScores.data.scores;
};
