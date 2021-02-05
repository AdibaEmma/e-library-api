const express = require("express");
const cupboard = require("../controllers/cupboardController")
const authenticate = require("../middlewares/auth")

const router = express.Router();
const {index, show, create, update, Delete} = cupboard

router.get("/cupboards", authenticate, index)
router.get("/cupboards/:id", authenticate, show)
router.post("/cupboards", authenticate, create)
router.put("/cupboards/:id", authenticate, update)
router.delete("/cupboard/:id", authenticate, Delete)

module.exports = router;