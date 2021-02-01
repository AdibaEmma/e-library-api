const express = require("express");
const router = express.Router();


const admin = require("../controllers/adminController")
const {index, show, create, login, update, Delete} = admin

router.get("/admins", index)
router.get("/admins/:id", show)
router.post("/admins/" , create)
router.post("/admins/login", login)
router.put("/admins/:id", update)
router.delete("/adimns/:id", Delete)


module.exports = router;

