const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memeCommentSchema = new Schema({
  userId: String, // Author of the comment
  memeId: String, // Meme commented
  content: String,
});

const MemeComment = mongoose.model("MemeComment", memeCommentSchema);
module.exports = MemeComment;
