const mongoose = require("mongoose")

// creating model

const restSchema = new mongoose.Schema({
    restname: String,
    slug: String,
    subtitle: String,
    time: String,
    description: String,
    location: String,
    waiter: String,
    coverImage: String,
    restImage: String


})


const Restaurant = mongoose.model("Restaurant", restSchema)

module.exports = Restaurant