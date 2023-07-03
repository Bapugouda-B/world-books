const mongoose = require("mongoose");

const favoriteBookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: String,
    unique: true,
    required: true,
  },
  thumbnail: String,
  amount: Number,
});

const FavoriteBook = mongoose.model("FavoriteBook", favoriteBookSchema);

module.exports = FavoriteBook;
