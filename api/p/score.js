const express = require("express");
const router = express.Router();

router.post("/submit", function (req, res) {
    res.send("Coming Soon");
});

module.exports = router;
