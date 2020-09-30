import mongoose from "mongoose";

const memeSchema = new mongoose.Schema({
  userId: String, // Author of the meme
  title: String,
  content: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Meme", memeSchema);
// const Meme = mongoose.model("Meme", memeSchema); // Why doesnt it work?
// module.exports = Meme;
