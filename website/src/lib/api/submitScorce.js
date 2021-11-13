import axios from "axios";

export default async ({ diffID, score, pass }) => {
    return new Promise((res) => {
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
                    console.warn("Score Not Saved As Player Not Logged In");
                    res();
                } else {
                    res(
                        axios.post(
                            "https://api.fnfcentral.com/i/score/submit",
                            {
                                userID,
                                diffID,
                                score,
                                pass,
                            },
                            { withCredentials: true }
                        )
                    );
                }
            });
    });
};