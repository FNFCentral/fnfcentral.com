import userAuth from "../../../_userAuth";
import prisma from "../../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const authResponse = await userAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    const query = request.query;

    const userExtraInfos = await prisma.userExtraInfo.findMany({
        where: {
            userID: query.get("userID"),
            extraInfo: { modID: query.get("modID") },
        },
        include: {
            extraInfo: true,
        },
    });

    return {
        body: {
            userExtraInfos: userExtraInfos,
        },
    };
};
