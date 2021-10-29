const { Router } = require("@awaitjs/express");
const router = Router();

const prisma = require("../database");

router.getAsync("/byID", async (req, res) => {
    const body = req.body;

    const score = await prisma.score.findUnique({
        where: {
            scoreID: body.scoreID,
        },
    });

    res.send({ score: score });
});

router.getAsync("/user/top/mod", async (req, res) => {
    const body = req.body;

    const scores = await prisma.score.findMany({
        distinct: ["songID", "diffID"],
        orderBy: {
            score: "desc",
        },
        where: {
            userID: body.userID,
            modID: body.modID,
            pass: true,
        },
    });

    res.send({ scores: scores });
});

module.exports = router;
