const { Router } = require("@awaitjs/express");
const router = Router();

const prisma = require("../database");

router.postAsync("/submit", async (req, res) => {
    const body = req.body;

    const score = await prisma.score.create({
        data: {
            userID: body.userID,
            modID: body.modID,
            songID: body.songID,
            diffID: body.diffID,
            score: body.score,
            pass: body.pass || true,
        },
    });

    res.send({ scoreID: score.scoreID });
});

module.exports = router;
