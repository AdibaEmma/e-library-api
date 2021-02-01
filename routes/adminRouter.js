const express = require("express");
const router = express.Router();


const admin = require("../controllers/adminController")
const {index, show, create, login} = admin

router.get("/admins", index)
router.get("/admins/:id", show)
router.post("/admins/register" , create)
router.post("/admins/login", login)


module.exports = router;

