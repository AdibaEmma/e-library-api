require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("../db/connect");
const Student = require("../models/Student");

exports.studentRegister = (req, res, next) => {
    
    try {
        Student.find({})
            .exec()
            .then(students => {
                if (students.length >= 1) {
                    let req_email = req.body.email;
                    let new_email;
                    students.forEach(student => {
                        if (student.email == req_email) {
                            new_email = req_email
                        }
                        return {
                            new_email
                        }
                    })
                    if (new_email === req_email) {
                        return res.status(409).json({
                            message: `user with email: ${new_email} already registered`,
                            res: "unavailable"
                        })
                    } else {
                        new_student_signup()
                    }
                } else {
                    new_student_signup()
                }
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "error": "an error occured, could not register student"
        })
    }


    const new_student_signup = () => {
        const {
            name,
            email,
            age,
            indexNo,
            program,
            level,
            password
        } = req.body;

        bcrypt.hash(password, 10, function (err, hash) {
            // Store hash in your password DB.

            if (err) {
                console.log(err);
                res.status(500).json({
                    "error": "could not hash password"
                })
            } else {
                new Student({
                        _id: new mongoose.Types.ObjectId,
                        name: name,
                        email: email,
                        age: age,
                        indexNo: indexNo,
                        program: program,
                        level: level,
                        password: hash
                    })
                    .save()
                    .then(result => {

                        if (result) {
                            const {
                                _id: id,
                                name: name
                            } = result;

                            const maxAge = 1000 * 60 * 60;

                            const token = jwt.sign({
                                id, name
                            }, process.env.JWT_KEY, {
                                expiresIn: "12h"
                            });

                            res.cookie("jwt", token, {
                                httpOnly: true
                            })

                            res.cookie("username", result.email, {
                                maxAge: maxAge * 24,
                                httpOnly: true
                            })

                            return res.status(201).json({
                                res: "success",
                                message: "registeration successful",
                                token: token,
                                student: result
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({
                            "error": "there was an error, could not register student",
                            "res": err
                        })
                    })
            }

        });

    }
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

