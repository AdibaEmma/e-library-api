const express = require("express");
const router = express.Router();


let admin = require("../controllers/adminController")


router.get("/admins", admin.index)
router.get("/admins/:id", admin.show)
router.post("/admins/register" , admin.create)
router.post("/admins/login", admin.login)


module.exports = router;

