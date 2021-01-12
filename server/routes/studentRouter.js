const express = require("express");
const router = express.Router();

const Student = require("../controllers/studentController");

router.get("/", Student.getStudents);
router.post("/register", Student.studentRegister);
router.post("/login", Student.studentLogin);

module.exports = router;