const express = require("express");
const router = express.Router();


let admin = require("../controllers/adminController")


router.get("/admins", admin.get_all)
router.post("/admins/register" , admin.register)
router.post("/admins/login", admin.login)


module.exports = router;

