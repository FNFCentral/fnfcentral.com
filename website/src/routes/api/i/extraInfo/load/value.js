import userAuth from "../../../_userAuth";
import prisma from "../../../_database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
    const authResponse = await userAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    const query = request.query;

    const userExtraInfo = await prisma.userExtraInfo.findFirst({
        where: {
            userID: query.get("userID"),
            extraInfoID: Number(query.get("extraInfoID")),
        },
    });

    return {
        body: {
            userExtraInfoID: userExtraInfo.userExtraInfoID,
            value: userExtraInfo.value,
        },
    };
};
