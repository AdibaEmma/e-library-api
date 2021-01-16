const express = require("express");
const router = express.Router();

const Student = require("../controllers/studentController");

router.get("/students", Student.getStudents);
router.post("/students/register", Student.studentRegister);
router.post("/students/login", Student.studentLogin);
router.put("/students/:id", Student.updateStudent);
router.delete("/students/:id", Student.deleteStudent);

module.exports = router;