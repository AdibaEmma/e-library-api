const express = require("express");
const books = require("../controllers/booksController")
const authenticate = require("../middlewares/auth")

const router = express.Router();


router.get("/books", authenticate, books.fetch_books)
router.get("/books/:id", authenticate, books.get_book)
router.post("/books/add", authenticate, books.add_book)
router.put("/books/:id/update", authenticate, books.update_book)
router.delete("/books/:id/delete", authenticate, books.delete_book)


module.exports = router;