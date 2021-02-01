require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("../db/connect");
const Cupboard = require("../models/Cupboard");

// Fetch cupboards
exports.index = async (req, res, next) => {
    try {
        await Cupboard.find({}).exec()
        .then(cupboards => {
            if (cupboards.length >=1) {
                res.status(302).json({
                    res: "found",
                    cupboards
                })
            } else {
                res.status(404).json({
                    res: "not found"
                })
            }
        })
    } catch (err) {
        res.status(500).json({
            res: "error",
            error: err.message
        })
    }
}

// Get one cupboard
exports.show = async (req, res, next) => {
    try {
        await Cupboard.findById({_id: req.params.id}).exec()
            .then(cupboard => {
                if(cupboard) {
                res.status(302).json({
                    res: "found",
                    cupboard
                })
                } else {
                    res.status(404).json({
                        res: "not found",
                        message: `no cupboard with id:${req.params.id} in our database`
                    })
                }
            })
    } catch (err) {
        res.status(500).json({
            res: "error",
            error: err.message
        })
    }
}