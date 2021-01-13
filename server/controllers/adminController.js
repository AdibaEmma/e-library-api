require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dbConnection = require("../db/connect");
const Admin = require("../models/Admin");

// admin auth
const auth = require("../middlewares/auth")

exports.register = (req, res, next) => {
    try {
        Admin.find({})
        .exec()
        .then(admins => {
            if (admins.length >= 1) {
                let req_email = req.body.email;
                let new_email;
                admins.forEach(admin => {
                    if (admin.admin_email == req_email) {
                        new_email = req_email
                    }
                    return {
                        new_email
                    }
                })
                if (new_email === req_email) {
                    return res.status(409).json({
                        message: "admin email is already in use",
                        res: "unavailable"
                    })
                } else {
                    new_admin_signup()
                }
            } else {
                new_admin_signup()
            }
        })
    } catch(err) {
            console.log(err);
            res.status(500).json({
                "error": "an error occured, could not register admin"
            })
    }


    const new_admin_signup = () => {
            const {name, email, password} = req.body;

            bcrypt.hash(password, 10, function(err, hash) {
                // Store hash in your password DB.

                if(err) {
                    console.log(err);
                    res.status(500).json({
                        "error": "could not hash password"
                    })
                } else {
                    new Admin({
                        _id: new mongoose.Types.ObjectId,
                        admin_name: name,
                        admin_email: email,
                        admin_password: hash
                })
                    .save()
                    .then(result => {
                        if (result) {
                            const id = result._id; 
                            const maxAge = 1000 * 60 * 60;
                            const token = jwt.sign({id}, process.env.JWT_KEY, {
                                expiresIn: "1hr"
                            });
                            res.cookie("jwt", token, {httpOnly: true})
                            res.cookie("username", result.admin_email, {maxAge: maxAge * 24, httpOnly: true})
                            return res.status(200).json({
                                "message": "admin registeration successful",
                                "token": token,
                                "admin": result
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({
                            "error": "there was an error, could not register admin",
                            "res": err
                        })
                    })
                }
                
            });
            
    }
}

exports.login = (req, res, next) => {
    Admin.findOne({
            admin_email: req.body.email
        })
        .then(result => {
            if (result < 1) {
                res.status(422).json({
                    "error": "admin not found"
                })
            } else {
                res.status(200).json({
                    "message": "admin Found",
                    "res": result
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "error": "Admin not found",
            })
        })

}

exports.get_all = (req, res, next) => {
    Admin.find({})
    .exec()
    .then(admins => {
        foundAdmins = JSON.stringify(admins);

        res.status(200).send(foundAdmins)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            "error": "Error: cannot get admins"
        })
    })
}
