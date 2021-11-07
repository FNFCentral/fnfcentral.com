const { Router } = require("@awaitjs/express");
const router = Router();

const prisma = require("../database");

router.getAsync("/byID", async (req, res) => {
    const query = req.query;

    const score = await prisma.score.findUnique({
        where: {
            scoreID: query.scoreID,
        },
        include: {
            diff: { include: { song: { include: { mod: true } } } },
        },
    });

    res.send({ score });
});

router.getAsync("/user/top/mod", async (req, res) => {
    const query = req.query;

    const scores = await prisma.score.findMany({
        distinct: ["diffID"],
        where: {
            userID: query.userID,
            pass: true,
            diff: {
                song: {
                    modID: query.modID,
                },
            },
        },
    });

    res.send({ scores: scores });
});

module.exports = router;
