const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    admin_name: {
        type: String,
        required: [true, "Admin name is required"]
    },
    admin_email: {
        type: String,
        unique: true,
        required: [true, "Admin email is required"]
    },
    admin_password: {
        type: String,
        required: true
    }
})

const Admin =  mongoose.model("Admin", adminSchema);

module.exports = Admin;