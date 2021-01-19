require("dotenv").config();
const express = require("express");
require("../app");
const mongoose = require("mongoose");
const dbConnection = require("../db/connect");
const Book = require("../models/Book");

exports.fetch_books = async (req, res, next) => {
    try {
        await Book.find({}).exec()
            .then(books => {
                if (books.length >= 1) {

                    foundBooks = JSON.stringify(books)
                    res.status(302).send(200, foundBooks)
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

exports.add_book = async (req, res, next) => {
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

exports.update_book = async (req, res, next) => {
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
            message: `sorry,book with id: ${err.value._id} cannot be find in our database`
        })
    }
}