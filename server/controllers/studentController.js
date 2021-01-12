const express = require("express");

exports.studentRegister = (req, res, next) => {
    
    res.send({
        name: req.body.name,
        age: req.body.age,
        program: req.body.program,
        level: req.body.level
    })
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

exports.updateStudent = (req, res,next) => {

    const id = req.params.id;
    res.send(`update on student with id ${id} is successful`)
}

exports.deleteStudent = (req, res,next) => {

    const id = req.params.id;
    res.send(`Student with id ${id} has been deleted successfully`)
}

