import { local, canary } from "$lib/modeData";

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
                local: local,
                canary: canary,
            },
        },
    };
};
