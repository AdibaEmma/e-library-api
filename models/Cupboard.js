const mongoose = require("mongoose")

const shelfSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    no_of_books: String,
})

const cupboardSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    shelves: [shelfSchema],
    reference: {
        type: Boolean,
        default: false
    }
})

const Cupboard = mongoose.model("Cupboard", cupboardSchema);

module.exports = Cupboard;