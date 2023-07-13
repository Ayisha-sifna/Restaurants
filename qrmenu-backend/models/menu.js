const mongoose = require("mongoose")

// creating model

const menuchema = new mongoose.Schema({
    title: {
        type: String
    },
    detail: {
        type: String
    },
    price: {
        type: String
    },
    type: {
        type: String
    },
    // image:{}



})


const menu = mongoose.model("menu", menuSchema)

module.exports = menu