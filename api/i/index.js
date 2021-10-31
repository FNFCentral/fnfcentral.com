const express = require("express");

const score = require("./score");

const router = express.Router();

router.use("/score", score);

module.exports = router;
