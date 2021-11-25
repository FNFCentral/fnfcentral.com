import { register } from "./api/_metrics";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
    return {
        headers: {
            "content-type": register.contentType,
        },
        body: await register.metrics(),
    };
};
