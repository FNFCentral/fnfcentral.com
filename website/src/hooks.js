/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ request, resolve }) => {
    const response = await resolve(request);

    if (request.path.startsWith("/api")) {
        response.headers["Access-Control-Allow-Origin"] =
            request.headers["origin"] || "*";
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
        response.headers["Access-Control-Allow-Headers"] =
            "Accept, Authorization, Content-Type, Cookie";
        response.headers["Access-Control-Allow-Credentials"] = true;

        if (response.status == 404) {
            response.body = "{}";
        }
    }

    return response;
};
