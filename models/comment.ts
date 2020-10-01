import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: String, // Author of the comment
  memeId: String, // Meme commented
  content: String,
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
// async await ma promise'y
// co to są promise'y
