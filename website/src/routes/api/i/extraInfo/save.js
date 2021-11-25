import userAuth from "../../_userAuth";
import prisma from "../../_database";

import { extraInfoChangesProcessed } from "../../_metrics";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const authResponse = await userAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    extraInfoChangesProcessed.inc();

    const body = request.body;

    // Verify The New Value Is Okay
    const extraInfo = await prisma.extraInfo.findUnique({
        where: { extraInfoID: body.extraInfoID },
    });

    const type = extraInfo.valueType;

    switch (type) {
        case "BOOL":
            if (typeof body.value !== "boolean") {
                console.log(
                    `User ${body.userID} was entering a bad value for Extra Info ${body.extraInfoID}`
                );
                return { status: 400 };
            }
            break;
        case "NUMBER":
            if (typeof body.value !== "number") {
                console.log(
                    `User ${body.userID} was entering a bad value for Extra Info ${body.extraInfoID}`
                );
                return { status: 400 };
            }
            break;
        case "String":
        default:
            break;
    }

    // Saves The New Value
    try {
        const userExtraInfo = await prisma.userExtraInfo.findFirst({
            where: { extraInfoID: body.extraInfoID, userID: body.userID },
        });

        const newUserExtraInfo = await prisma.userExtraInfo.update({
            where: { userExtraInfoID: userExtraInfo.userExtraInfoID },
            data: { value: body.value.toString() },
        });

        console.log(
            `Update ${body.extraInfoID} for user ${body.userID} to ${newUserExtraInfo.value}`
        );

        return { body: { userExtraInfo: newUserExtraInfo } };
    } catch {
        const userExtraInfo = await prisma.userExtraInfo.create({
            data: {
                userID: body.userID,
                extraInfoID: body.extraInfoID,
                value: body.value.toString(),
            },
        });

        console.log(
            `Created ${body.extraInfoID} for user ${body.userID} to ${userExtraInfo.value}`
        );

        return { body: { userExtraInfo: userExtraInfo } };
    }
};
