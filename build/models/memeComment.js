"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var memeCommentSchema = new Schema({
    userId: String,
    memeId: String,
    content: String,
});
var MemeComment = mongoose.model("MemeComment", memeCommentSchema);
module.exports = MemeComment;
