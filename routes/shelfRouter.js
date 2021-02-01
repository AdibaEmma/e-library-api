const express = require("express");
const shelf = require("../controllers/shelfController")
const authenticate = require("../middlewares/auth")

const router = express.Router();

router.get("/shelf", authenticate, shel.index)
router.get("/shelf/:id", authenticate, shelf.show)
router.post("/shelf/add")


