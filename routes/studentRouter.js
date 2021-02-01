const express = require("express");
const router = express.Router();

const student = require("../controllers/studentController");
const {index, show, create, studentLogin, update, Delete} = student

router.get("/students", index);
router.get("/students/:id", show)
router.post("/students", create);
router.post("/students/login", studentLogin);
router.put("/students/:id", update);
router.delete("/students/:id", Delete);

module.exports = router;