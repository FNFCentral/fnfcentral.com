import { userURL } from "../modeData";

export default async () => {
    const response = await fetch("https://" + userURL + "/sessions/whoami", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            Accept: "application/json",
        },
        redirect: "manual",
        credentials: "include",
    });

    let responseJSON;

    if (!response.ok) {
        responseJSON = {};
    } else {
        responseJSON = await response.json();
    }

    console.log("Get Cur User Response: " + responseJSON);

    const userIdentity = responseJSON.identity;

    if (!userIdentity) {
        console.log("Player Is Not Logged In");
        return undefined;
    } else {
        return userIdentity;
    }
};
