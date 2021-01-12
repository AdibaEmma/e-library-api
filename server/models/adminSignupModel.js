const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    admin_name: {
        type: String,
        required: true
    },
    admin_email: {
        type: String,
        required: true
    },
    admin_password: {
        type: String,
        required: true
    }
})

const Admin =  mongoose.model("Admin", adminSchema);

module.exports = Admin;