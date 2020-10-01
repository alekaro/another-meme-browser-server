import mongoose from "mongoose";
import commentSchema from "./comment";

const memeSchema = new mongoose.Schema({
  userId: String, // Author of the meme
  title: String,
  content: { data: Buffer, contentType: String },
  comment: [commentSchema],
});

module.exports = mongoose.model("Meme", memeSchema);
// const Meme = mongoose.model("Meme", memeSchema); // Why doesnt it work?
// module.exports = Meme;
