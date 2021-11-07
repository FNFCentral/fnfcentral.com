const { Router } = require("@awaitjs/express");
const router = Router();

const prisma = require("../database");

router.getAsync("/allData", async (req, res) => {
    const query = req.query;

    const mod = await prisma.mod.findUnique({
        where: {
            modID: query.modID,
        },
        include: { songs: { include: { diffs: true } }, extraInfos: true },
    });

    res.send({ mod });
});

module.exports = router;
