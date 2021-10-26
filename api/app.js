const express = require("express");

const v0 = require("./v0");
const p = require("./p");

const app = express();
const port = 80;

app.get("/", (req, res) => {
    res.send({ currentVersion: 0, experimentalVersion: 0, minVersion: 0 });
});

app.use("/v0", v0);
app.use("/p", p);

app.listen(port, () => {
    console.log(`API online`);
});
