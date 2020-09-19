const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Author", authorSchema);
// const Author = mongoose.model("Author", authorSchema); // Dlaczego z takim exportem nie widzi funkcji Authorfind({})????????

// module.exports = { Author };
