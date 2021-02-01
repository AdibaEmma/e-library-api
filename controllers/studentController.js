require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("../db/connect");
const Student = require("../models/Student");

// Fetch all students
exports.index = async (req, res, next) => {
    await Student.find({})
        .exec()
        .then(students => {
            if (students.length >= 1) {
                students = JSON.stringify(students)
                res.status(302).send(students)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "an errror occured, could not fetch students",
                res: err
            })
        })
}

// Get a single student
exports.show = async (req, res, next) => {
    try {
        await Student.findById({_id: req.params.id}).exec()
                .then(student => {
                    if(student) {
                        res.status(302).json({
                            message: "Found",
                            student
                        })
                    } 
                })
    } catch (err) {
        res.status(404).json({
            error: err.message
        })
    }
}


// Register Student
exports.create = async (req, res, next) => {

    try {
        await Student.find({})
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

    // Function for registering student if conditions are met
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
                                id,
                                name
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

// Student login
exports.studentLogin = async (req, res, next) => {
    await Student.findOne({
            indexNo: req.body.indexNo
        })
        .exec()
        .then(result => {
            if (result === null) {
                res.status(422).json({
                    res: "failed",
                    message: "invalid username"
                })
            } else {
                bcrypt.compare(req.body.password, result.password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: "an error occured"
                        })
                    } else if (isMatch === true) {
                        const {
                            _id: id,
                            indexNo: indexNo
                        } = result;
                        const token = jwt.sign({
                            id,
                            indexNo
                        }, process.env.JWT_KEY, {
                            expiresIn: "12h"
                        })
                        res.status(200).json({
                            res: "success",
                            message: "authentication successful",
                            token
                        })
                    } else {
                        res.status(400).json({
                            res: "failed",
                            message: "invalid password"
                        })
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "error": err
            })
        })

}


exports.update = async (req, res, next) => {
    let id = req.params.id
    await Student.findById({
            _id: id
        }).exec()
        .then(foundStudent => {
            if (req.body.password != null) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: "an error occured",
                            res: err
                        })
                    } else {
                        find_and_update(foundStudent,hash)
                        return res.status(200).json({
                            res: "updated",
                            message: "student details updated"
                        })
                    }


                })

            } else {
                find_and_update(foundStudent, foundStudent.password)
                return res.status(200).json({
                    res: "updated",
                    message: "student details updated"
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "an error occured",
                res: err
            })
        })

    // Function gets executed to update student details when all conditions are met
    find_and_update = (student, password) => {
        Student.findByIdAndUpdate({
                _id: id
            }, {
                name: req.body.name ? req.body.name : student.name,
                email: req.body.email ? req.body.email : student.email,
                age: req.body.age ? req.body.age : student.age,
                indexNo: req.body.indexNo ? req.body.indexNo : student.indexNo,
                program: req.body.program ? req.body.program : student.program,
                level: req.body.level ? req.body.level : student.level,
                password: password
            })
            .exec()
    }

}

exports.Delete = async (req, res, next) => {
    try {
        await Student.findByIdAndDelete({_id: req.params.id}).exec()

    return res.status(200).json({
        res: "deleted", message: "student account deleted!"
    })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "error has occured",
            res: err 
        })
    }
    
    
}