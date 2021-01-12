const express = require("express");
const router = express.Router();


let admin = require("../controllers/adminController")


router.get("/", admin.get_all)
router.post("/register" , admin.register)
router.post("/api/login", admin.login)


module.exports = router;

