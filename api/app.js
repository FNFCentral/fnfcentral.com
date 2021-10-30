const express = require("express");
const cookieParser = require("cookie-parser");

const v0 = require("./v0");
const p = require("./p");
const a = require("./a");

const app = express();
const port = 80;

app.use(cookieParser());
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Methods", "GET, POST");

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Accept,Authorization,Content-Type,Cookie"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
});

app.get("/", (req, res) => {
    res.send({ currentVersion: 0, experimentalVersion: 0, minVersion: 0 });
});

app.use("/v0", v0);
app.use("/p", p);
app.use("/a", a);

app.listen(port, () => {
    console.log(`API online`);
});
