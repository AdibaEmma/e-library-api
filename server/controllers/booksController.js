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
                    res.status(302).send(foundBooks)
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