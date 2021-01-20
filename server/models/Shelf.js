const mongoose = require("mongoose")


const shelfSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    no_of_books: String,
    books_category: String
})

const Shelf = mongoose.model("Shelf", shelfSchema);

module.exports = Shelf;