import prisma from "../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const query = request.query;

    const score = await prisma.score.findUnique({
        where: {
            scoreID: query.get("scoreID"),
        },
        include: {
            diff: { include: { song: { include: { mod: true } } } },
        },
    });

    return { body: { score } };
};
