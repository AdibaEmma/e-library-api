const express = require("express");
const router = express.Router();

const student = require("../controllers/studentController");

router.get("/students", student.index);
router.get("/students/:id", student.show)
router.post("/students/register", student.create);
router.post("/students/login", student.studentLogin);
router.put("/students/:id/update", student.update);
router.delete("/students/:id/delete", student.delete);

module.exports = router;