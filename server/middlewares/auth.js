require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");


exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(403)
    } else {
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) return res.sendStatus(401)

            req.user = user;

        })

        next()
    }



}