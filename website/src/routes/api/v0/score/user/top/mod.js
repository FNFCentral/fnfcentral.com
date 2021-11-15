import prisma from "../../../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const query = request.query;

    const scores = await prisma.score.findMany({
        distinct: ["diffID"],
        where: {
            userID: query.get("userID"),
            pass: true,
            diff: {
                song: {
                    modID: query.get("modID"),
                },
            },
        },
    });

    return { body: { scores } };
};
