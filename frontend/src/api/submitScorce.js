import axios from "axios";

export default async ({ diffID, score, pass }) => {
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
                    console.log("Score Not Saved As Player Not Logged In");
                    res();
                }

                res(
                    axios.post("https://api.fnfcentral.com/p/score/submit", {
                        userID,
                        diffID,
                        score,
                        pass,
                    })
                );
            });
    });
};
