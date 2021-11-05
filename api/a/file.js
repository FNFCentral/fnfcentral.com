const { Router } = require("@awaitjs/express");
const router = Router();

const fileUpload = require("express-fileupload");

const auth = require("./auth");
const cluster = require("../cluster");

router.use(auth.middleware);
router.use(fileUpload());

router.postAsync("/upload", async (req, res) => {
    const files = req.files;

    const fileCIDs = {};

    for (const file in files) {
        console.log("Uploaded: " + files[file].name);

        const cid = await cluster.addFile(files[file].data);

        fileCIDs[file] = cid;
    }

    res.send(fileCIDs);
});

router.postAsync("/uploadDir", async (req, res) => {
    const zip = req.files.zip;

    console.log("Uploaded: " + zip.name);

    const cid = await cluster.addDir(zip.data);

    res.send({ cid });
});

module.exports = router;
