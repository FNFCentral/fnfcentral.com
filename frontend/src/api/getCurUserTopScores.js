import getUserTopScores from "./getUserTopScores";

export default async ({ modID }) => {
    return new Promise((res, rej) => {
        fetch("https://user.fnfcentral.com/sessions/whoami", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                Accept: "application/json",
            },
            redirect: "manual",
            credentials: "include",
        })
            .then((initResponse) => {
                if (!initResponse.ok) {
                    throw new Error(initResponse.statusText);
                }

                return initResponse.json();
            })
            .then((initResponseJSON) => {
                const userID = initResponseJSON.identity.id;

                if (!userID) {
                    console.log("Scores Not Loaded As Player Not Logged In");
                    res([]);
                }

                res(getUserTopScores({ userID, modID }));
            });
    });
};
