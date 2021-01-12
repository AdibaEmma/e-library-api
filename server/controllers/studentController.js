const express = require("express");

exports.studentRegister = (req, res, next) => {
    res.send("registered");
}

exports.studentLogin = (req, res, next) => {
    res.send("logged-in successfully");
}

exports.getStudents = (req, res, next) => {
    res.json({"Students":
        [
            {"name": "Adiba Emma",
            "age": 22,
            "program": "Petroleum",
            "level": 200
            },
            {"name": "Aweperi Emma",
            "age": 19,
            "program": "UI/UX Designer",
            "level": 300
            }
        ]
    })
}

