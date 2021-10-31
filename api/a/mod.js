const { Router } = require("@awaitjs/express");
const router = Router();

const auth = require("./auth");
const prisma = require("../database");

router.getAsync("/all", async (req, res) => {
    auth.verifyToken(req.cookies.admin_jwt);

    const mods = await prisma.mod.findMany({});

    res.send({ mods });
});

router.getAsync("/allData", async (req, res) => {
    auth.verifyToken(req.cookies.admin_jwt);

    const mods = await prisma.mod.findMany({
        include: { songs: { include: { diffs: true } } },
    });

    res.send({ mods });
});

router.postAsync("/create", async (req, res) => {
    auth.verifyToken(req.cookies.admin_jwt);

    const body = req.body;

    const songs = [];

    req.body.songs.forEach((song) => {
        const diffs = [];

        song.diffs.forEach((diff) => {
            diffs.push({
                name: diff.name,
                internalNumber: diff.internalNumber,
            });
        });

        songs.push({
            name: song.name,
            internalName: song.name,
            diffs: { createMany: { data: diffs } },
        });
    });

    const mod = await prisma.mod.create({
        data: {
            modID: body.modID,
            name: body.name,
            songs: { create: songs },
        },
    });

    res.send({ mod });
});

module.exports = router;
