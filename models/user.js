const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: String,
  password: String,
  nickname: String,
  email: String,
});

const User = mongoose.model("User", userSchema); // Dlaczego z takim exportem nie widzi funkcji Authorfind({})????????

module.exports = User;
