const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("../db/connect");
const Admin = require("../models/adminModel");

exports.register = (req, res, next) => {
    new Admin({
        _id: new mongoose.Types.ObjectId,
        admin_name: req.body.name,
        admin_email: req.body.email,
        admin_password: req.body.password
    })
    .save((err, admin) => {
        if(err) {
            console.log(err);
        } else {
            res.send(admin)
        }
    })
}

exports.login = (req, res, next) => {
    Admin.findOne(admin_email = req.body.name, (err, foundAdmin) => {
        if(err) {
            console.log(err);
        } else {
            if(foundAdmin) {
                res.json({"message": "Log-In Successful"})
            }
        }
    })
    
}

exports.get_all = (req, res, next) => {
    res.json({
        "Admins": [{
                "name": "Adiba Emma",
                "age": 26,
                "occuption": "Software Engineer"
            },
            {
                "name": "Aweperi Emma",
                "age": 30,
                "occuption": "UI/UX Designer"
            }
        ]
    })
}