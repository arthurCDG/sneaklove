const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("users", userSchema)