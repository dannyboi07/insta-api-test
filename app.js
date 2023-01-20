const express = require("express");
const app = express();
const config = require("./config");

let codes = {};

app.get("/ping", async (req, res, next) => {
    console.log("ping received", req.url);
    res.json({ message: "pong" }).end();
});

app.get("/auth/window", async (req, res, next) => {
    const redirectUrl = `https://api.instagram.com/oauth/authorize?client_id=594479062689164&redirect_uri=${config.HOST}/auth/code/&scope=user_profile,user_media&response_type=code`;

    res.redirect(redirectUrl);
});

app.get("/auth/code", async (req, res, next) => {
    const urlQueryParams = req.query ?? {};
    codes = {
        ...codes,
        ...urlQueryParams,
    };

    res.json({ message: "parsed code" });
});

app.get("/auth/all_codes/:pw", async (req, res, next) => {
    const isAuth = req.params.pw == config.PW;

    if (!isAuth) return res.status(401).json({ message: "Not authorized" });
    res.json({ data: codes }).end();
});

module.exports = app;
