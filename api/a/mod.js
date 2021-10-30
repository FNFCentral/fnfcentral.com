const { Router } = require("@awaitjs/express");
const router = Router();

const auth = require("./auth");
const prisma = require("../database");

router.getAsync("/all", async (req, res) => {
    auth.verifyToken(req.cookies.admin_jwt);

    const body = req.body;

    const mods = await prisma.score.findUnique({
        where: {
            scoreID: body.scoreID,
        },
    });

    res.send({ mods });
});

module.exports = router;
