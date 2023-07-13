const mongoose = require("mongoose")

// creating model

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String
    }


})


const subcategory = mongoose.model("subcategory", subcategorySchema)

module.exports = subcategory