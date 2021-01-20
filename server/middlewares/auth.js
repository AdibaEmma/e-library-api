require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_KEY, (err, authData) => {
        if (err) return res.status(403).json({
            res: "unauthenticated",
            message: "token is invalid"
        });

        req.user = authData;

        next()
    })

}
