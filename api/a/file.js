const { Router } = require("@awaitjs/express");
const router = Router();

const fileUpload = require("express-fileupload");

const auth = require("./auth");
const cluster = require("../cluster");

router.use(auth.middleware);
router.use(fileUpload());

router.postAsync("/upload", async (req, res) => {
    const file = req.files.file;

    console.log("Uploaded: " + file.name);

    const cid = await cluster.addFile(file.data);

    res.send({ cid });
});

router.postAsync("/uploadDir", async (req, res) => {
    const zip = req.files.zip;

    console.log("Uploaded: " + zip.name);

    const cid = await cluster.addDir(zip.data);

    res.send({ cid });
});

module.exports = router;
