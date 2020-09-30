const memeCommentSchema = new mongoose.Schema({
  userId: String, // Author of the comment
  memeId: String, // Meme commented
  content: String,
});

module.exports = mongoose.model("MemeComment", memeCommentSchema);
