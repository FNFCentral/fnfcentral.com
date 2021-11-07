const { Router } = require("@awaitjs/express");
const router = Router();

const auth = require("./auth");
const prisma = require("../database");

router.use(auth.middleware);

router.getAsync("/all", async (req, res) => {
    const mods = await prisma.mod.findMany({});

    res.send({ mods });
});

router.getAsync("/allData", async (req, res) => {
    const mods = await prisma.mod.findMany({
        include: { songs: { include: { diffs: true } }, extraInfos: true },
    });

    res.send({ mods });
});

router.postAsync("/create", async (req, res) => {
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
            internalName: song.internalName,
            iconCID: song.iconCID,
            diffs: { createMany: { data: diffs } },
        });
    });

    const extraInfos = [];

    req.body.extraInfo.forEach((extraInfo) => {
        extraInfos.push({
            internalName: extraInfo.internalName,
            valueType: extraInfo.valueType,
        });
    });

    const mod = await prisma.mod.create({
        data: {
            modID: body.modID,
            name: body.name,
            cid: body.cid,
            songs: { create: songs },
            extraInfos: { createMany: { data: extraInfos } },
        },
    });

    res.send({ mod });
});

module.exports = router;
