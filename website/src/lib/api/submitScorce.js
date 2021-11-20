import axios from "axios";
import { userURL } from "../modeData";

export default async ({ diffID, score, pass }) => {
    return new Promise((res) => {
        fetch("https://" + userURL + "/sessions/whoami", {
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
                            "/api/i/score/submit",
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
