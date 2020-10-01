import mongoose from "mongoose";

const memeSchema = new mongoose.Schema({
  userId: String, // Author of the meme
  title: String,
  path: String, // path to content on server e.q. picture, GIF
  comments: [
    {
      userId: String,
      content: String,
    },
  ],
});

module.exports = mongoose.model("Meme", memeSchema);
