const mongoose = require("mongoose")


const cupboardSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    no_of_shelves: String,
    shelves: [String],
    reference: {
        type: Boolean,
        default: false
    }
})

const Cupboard = mongoose.model("Cupboard", cupboardSchema);

module.exports = Cupboard;