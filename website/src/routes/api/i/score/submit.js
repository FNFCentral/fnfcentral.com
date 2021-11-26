import userAuth from "../../_userAuth";
import prisma from "../../_database";
import _verifyScore from "./_verifyScore";
import { scoresProcessed } from "../../_metrics";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const authResponse = await userAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    scoresProcessed.inc();

    const body = request.body;

    // Verify Score
    if (!(await _verifyScore(body.diffID, body.userID, body.score))) {
        return { status: 400, body: {} };
    }

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
