const express = require("express");
const router = express.Router();


let books = require("../controllers/booksController")


router.get("/books", authenticate, books.fetch_books)
router.post("/books/add", authenticate , books.add_book)
router.put("/books/:id/edit", authenticate, books.update_book)


module.exports = router;