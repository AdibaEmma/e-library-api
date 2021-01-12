const express = require("express");
const router = express.Router();
const Admin = require("../controllers/adminController")


router.get("/admin", Admin.get_all)
router.get("/admin/register" , Admin.register)
router.get("/admin/login", Admin.login)


module.exports = router;

