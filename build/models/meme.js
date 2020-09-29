"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var memeSchema = new Schema({
    userId: String,
    title: String,
    content: { data: Buffer, contentType: String },
});
var Meme = mongoose.model("Meme", memeSchema);
module.exports = Meme;
