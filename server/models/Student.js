const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: [String,  "name must be string" ],
        required: true,
    },
    email: {
        type: String,
        unique: true, 
        required: [true, "email is required"],
        lowercase: [true, "email must be in lowercase"]
    },
    age: Number,
    indexNo: String,
    program: String,
    level: String,
    password: {
        type: String, 
        minlength: [6, "password must be atleast six characters long"]
    }
    
})

const Student = mongoose.model("student", studentSchema);

module.exports = Student;