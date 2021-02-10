require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("../db/connect");
const Cupboard = require("../models/Cupboard");


// Fetch all cupboards
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

//add new cupboard
exports.create = async (req, res, next) => {
    const {name, no_of_shelves, reference} = req.body
    try {
        await Cupboard.find({name: name}).exec()
        .then(cupboards => {
            if(cupboards.length >= 1) {
                res.status(403).json({
                    res: "unacceptable",
                    message: `cupboard with name = ${req.body.name} already exists`
                })
            } else {
                new Cupboard({
                    _id: new mongoose.Types.ObjectId,
                    name: name,
                    shelves: shelves,
                    reference: reference
                })
                .save()
                .then(result => {
                    if (result) {
                        res.status(201).json({
                            res: "created",
                            message: "added new cupboard",
                            cupboard: result
                        })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            res: "error",
            error: err.message
        })
    }
}

exports.update = async (req, res, next) => {
    const {name, no_of_shelves, reference} = req.body
    try {
        await Cupboard.findById({_id: req.params.id}).exec()
            .then(result => {
                if(result.length == 1) {
                    Cupboard.findByIdAndUpdate(
                        {_id: req.params.id},
                        {
                            name: name,
                            shelves: shelves,
                            reference: reference
                        }
                        ).exec()
                    res.status(202).json({
                        res: "updated",
                        message: `${name} cupboard has been updated`
                    })
                } 

                res.status(409).json({
                    res: "error",
                    message: "could not update cupboard"
                })
            })
    } catch (err) {
        res.status(500).json({
            res: "error",
            error: err.message
        })
    }
}

exports.Delete = async (req, res, next) => {
    try {
        await Cupboard.findByIdAndDelete({_id: req.params.id}).exec()
        return res.status(200).json({
            res: "deleted",
            message: "entry has been deleted"
        })
    } catch (err) {
        res.status(500).json({
            res: "error",
            error: err.message
        })
    }
}