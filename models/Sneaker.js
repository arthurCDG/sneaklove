const { model, Schema } = require("mongoose");

const sneakerSchema = new Schema({
    name: String,
    ref: { type: String, unique: true },
    size: Number,
    description: String,
    price: Number,
    category: { type: [String], enum: ["men", "women", "kids"] },
    id_tags: { type: [Schema.Types.ObjectId], ref: "tags" },
})

module.exports = model("sneakers", sneakerSchema)