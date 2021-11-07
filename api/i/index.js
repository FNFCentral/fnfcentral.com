const express = require("express");

const extraInfo = require("./extraInfo");
const score = require("./score");

const router = express.Router();

router.use("/extraInfo", extraInfo);
router.use("/score", score);

module.exports = router;
