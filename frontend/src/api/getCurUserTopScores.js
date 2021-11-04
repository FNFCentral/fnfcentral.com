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
                    return { identity: {} };
                }

                return initResponse.json();
            })
            .then((initResponseJSON) => {
                const userID = initResponseJSON.identity.id;

                if (!userID) {
                    console.log("Scores Not Loaded As Player Not Logged In");
                    res([]);
                } else {
                    res(getUserTopScores({ userID, modID }));
                }
            });
    });
};
