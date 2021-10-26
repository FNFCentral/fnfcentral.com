const express = require("express");
const router = express.Router();

router.get("/score", function (req, res) {
    res.send("Coming Soon");
});

module.exports = router;
