const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    label: String
})

module.exports = mongoose.model("tags", tagSchema)