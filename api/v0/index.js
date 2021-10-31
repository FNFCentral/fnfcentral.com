const express = require("express");

const mod = require("./mod");
const score = require("./score");

const router = express.Router();

router.use("/mod", mod);
router.use("/score", score);

module.exports = router;
