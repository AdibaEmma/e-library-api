const express = require("express");

exports.get_students = (req, res, next) => {
    res.send("Hello Student");
}

exports.register = (req, res, next) => {
    res.send("Student Register Page");
}

exports.login = (req, res, next) => {
    res.send("Student Login Page");
}