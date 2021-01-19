const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    isbn: {
        type: String
    },
    category: {
        type: String
    },
    info: {
        type: String
    },
    imgUrl: {
        type: String
        },
    pages: {
        type: Number
    }

})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;