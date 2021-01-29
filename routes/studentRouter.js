const express = require("express");
const router = express.Router();

const Student = require("../controllers/studentController");

router.get("/students", Student.getStudents);
router.get("/students/:id", Student.getStudent)
router.post("/students/register", Student.studentRegister);
router.post("/students/login", Student.studentLogin);
router.put("/students/:id/update", Student.updateStudent);
router.delete("/students/:id/delete", Student.deleteStudent);

module.exports = router;