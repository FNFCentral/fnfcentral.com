export default async () => {
    const response = await fetch(
        "https://user.fnfcentral.com/sessions/whoami",
        {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                Accept: "application/json",
            },
            redirect: "manual",
            credentials: "include",
        }
    );

    let responseJSON;

    if (!response.ok) {
        responseJSON = {};
    } else {
        responseJSON = await response.json();
    }

    console.log("Get Sur User Response: " + responseJSON);

    const userIdentity = responseJSON.identity;

    if (!userIdentity) {
        console.log("Player Is Not Logged In");
        return undefined;
    } else {
        return userIdentity;
    }
};
