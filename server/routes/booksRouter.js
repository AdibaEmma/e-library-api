const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth")

let books = require("../controllers/booksController")


router.get("/books", books.fetch_books)
router.post("/books/add", books.add_book)
// router.put("/books/:id/edit", authenticate, books.update_book)


module.exports = router;