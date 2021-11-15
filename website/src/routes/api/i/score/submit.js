import userAuth from "../../_userAuth";
import prisma from "../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const authResponse = await userAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    const body = request.body;

    const score = await prisma.score.create({
        data: {
            userID: body.userID,
            diffID: body.diffID,
            score: body.score,
            pass: body.pass || true,
        },
    });

    return { body: { scoreID: score.scoreID } };
};
