require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");


exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(' ')[1]

    if (token == null) return res.sendStatus(403)

    jwt.verify(token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            return res.sendStatus(401)
        } else {
            res.status(200).json({
                res: "authenticated"
            })

            req.user = authData;
        }
        

    })

    next()


}