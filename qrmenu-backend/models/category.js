const mongoose = require("mongoose")

// creating model

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' }],



})


const category = mongoose.model("category", categorySchema)

module.exports = category