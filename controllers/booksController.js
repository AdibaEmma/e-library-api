require("dotenv").config();
const express = require("express");
require("../app");
const mongoose = require("mongoose");
const dbConnection = require("../db/connect");
const Book = require("../models/Book");

exports.index = async (req, res, next) => {
    try {
        await Book.find({}).exec()
            .then(books => {
                if (books.length >= 1) {

                    res.status(302).send({books})
                } else {
                    res.status(503).json({
                        res: "unavailable",
                        message: "no books found"
                    })
                }
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
}

exports.show = async (req, res, next) => {
    await Book.findById({_id: req.params.id})
    .exec()
    .then(book => {
        if(book != null) {
                res.status(302).send({
                    res: "found",
                    book
                })
        } else {
            res.status(400).json({
                res: "failed",
                message: `sorry,book with id: ${err.value._id} cannot be find in our database`
            })
        }
    })
}

exports.create = async (req, res, next) => {
    try {
        await Book.find({
                title: req.body.title
            }).exec()
            .then(docs => {
                if (docs.length < 1) {

                    new Book({
                            _id: new mongoose.Types.ObjectId,
                            title: req.body.title,
                            author: req.body.author,
                            isbn: req.body.isbn,
                            category: req.body.category,
                            info: req.body.info,
                            imgUrl: req.body.imgUrl,
                            pages: req.body.pages

                        })
                        .save()
                        .then(result => {
                            res.status(201).json({
                                res: "created",
                                message: "book added",
                                book: result
                            })
                        })


                } else {
                    res.status(406).json({
                        res: "unacceptable",
                        message: "book already exists"
                    })
                }
            })
    } catch (err) {
        res.status(500).json({
            res: "error",
            error: err
        })
    }
}

exports.update = async (req, res, next) => {
    id = req.params.id
    try {
        await Book.findById({
                _id: id
            }).exec()
            .then(book => {
                if (book != null) {

                    Book.findByIdAndUpdate({
                        _id: id
                    }, {
                        title: req.body.title ? req.body.title : book.title,
                        author: req.body.author ? req.body.author : book.author,
                        isbn: req.body.isbn ? req.body.isbn : book.isbn,
                        category: req.body.category ? req.body.category : book.category,
                        info: req.body.info ? req.body.info : book.info,
                        imgUrl: req.body.imgUrl ? req.body.imgUrl : book.imgUrl,
                        pages: req.body.pages ? req.body.pages : book.pages,

                    }).exec()

                    res.status(202).json({
                        res: "updated",
                        message: "book has been updated"
                    })
                } 

            })

    } catch (err) {
        res.status(400).json({
            res: "failed",
            message: `sorry,book with id: ${err.value._id} cannot be found in our database`
        })
    }
}


exports.Delete = async (req, res, next) => {
    try {
        await Book.findByIdAndDelete({_id: req.params.id}).exec()

    return res.status(200).json({
        res: "deleted", message: "book has been deleted!"
    })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "error has occured",
            res: err 
        })
    }
}