const express = require("express");


exports.register = (req, res, next) => {
    res.send("Register")
}

exports.login = (req, res, next) => {
    res.send("Login")
}

exports.get_all = (req, res, next) => {
    res.json({"Admins":
        [
            {"name": "Adiba Emma",
            "age": 26,
            "occuption": "Software Engineer"
            },
            {"name": "Aweperi Emma",
            "age": 30,
            "occuption": "UI/UX Designer"
            }
        ]
    })
}

