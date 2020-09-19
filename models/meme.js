const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memeSchema = new Schema({
  userId: String, // Author of the meme
  title: String,
  content: { data: Buffer, contentType: String },
});

const Meme = mongoose.model("Meme", memeSchema);
module.exports = Meme;
