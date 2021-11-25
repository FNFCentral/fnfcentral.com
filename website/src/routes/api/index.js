/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
    return {
        body: {
            version: {
                currentVersion: 0,
                experimentalVersion: 0,
                minVersion: 0,
            },
            mode: {
                local: process.env["LOCAL"] ? true : false,
                canary: process.env["CANARY"] ? true : false,
            },
        },
    };
};
