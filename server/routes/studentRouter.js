const express = require("express");
const router = express.Router;

const Student = require("./router/studentRouter");

router.get("/students", Student.get_all);
router.post("/students/register", Student.register);
router.post("/students/login", Student.login);

module.exports = router;