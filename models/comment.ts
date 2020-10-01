import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: String, // Author of the comment
  memeId: String, // Meme commented
  content: String,
});

module.exports = mongoose.model("Comment", commentSchema);

// async await ma promise'y
// co to są promise'y
