const { Router } = require("@awaitjs/express");
const router = Router();

const prisma = require("../database");
const auth = require("./auth");

router.use(auth.middleware);

router.getAsync("/load/mod", async (req, res) => {
    const query = req.query;

    const userExtraInfos = await prisma.userExtraInfo.findMany({
        where: {
            userID: query.userID,
            extraInfo: { modID: query.modID },
        },
        include: {
            extraInfo: true,
        },
    });

    res.send({
        userExtraInfos: userExtraInfos,
    });
});

router.getAsync("/load/value", async (req, res) => {
    const query = req.query;

    const userExtraInfo = await prisma.userExtraInfo.findFirst({
        where: { userID: query.userID, extraInfoID: Number(query.extraInfoID) },
    });

    res.send({
        userExtraInfoID: userExtraInfo.userExtraInfoID,
        value: userExtraInfo.value,
    });
});

router.postAsync("/save", async (req, res) => {
    const body = req.body;

    // Verify The New Value Is Okay
    const extraInfo = await prisma.extraInfo.findUnique({
        where: { extraInfoID: body.extraInfoID },
    });

    const type = extraInfo.valueType;

    switch (type) {
        case "BOOL":
            if (!typeof body.value === "boolean") {
                res.sendStatus(400);
                throw new Error(
                    `User ${body.userID} was entering a bad value for Extra Info ${body.extraInfoID}`
                );
            }
            break;
        case "NUMBER":
            if (!typeof body.value === "number") {
                res.sendStatus(400);
                throw new Error(
                    `User ${body.userID} was entering a bad value for Extra Info ${body.extraInfoID}`
                );
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
        res.send({ userExtraInfo: newUserExtraInfo });
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
        res.send({ userExtraInfo: userExtraInfo });
    }

    res.sendStatus(500);
});

module.exports = router;
