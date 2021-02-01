const express = require("express");
const books = require("../controllers/booksController")
const authenticate = require("../middlewares/auth")

const router = express.Router();
const {index, show, create, update, Delete} = books

router.post("/books", authenticate, create)
router.get("/books", authenticate, index)
router.get("/books/:id", authenticate, show)
router.put("/books/:id", authenticate, update)
router.delete("/books/:id", authenticate, Delete)


module.exports = router;