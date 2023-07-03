const FavoriteBook = require("../model/bookModel.js");

// GET METHOD: get all 'FavBooks' data from MongoDB server
exports.getFavBooks = async (req, res) => {
  try {
    const favoriteBooks = await FavoriteBook.find();
    res.status(200).json(favoriteBooks);
  } catch (error) {
    console.error("Error fetching favorite books:", error);
    res.status(500).json({ error: "Failed to fetch favorite books" });
  }
};

// POST Method
exports.postFavBooks = async (req, res) => {
  try {
    // Create a new book document using your Book model
    const newFavBook = new FavoriteBook({
      title: req.body.title,
      author: req.body.author,
      thumbnail: req.body.thumbnail,
      amount: req.body.amount,
    });

    // Save the new book to the MongoDB server
    const savedBook = await newFavBook.save();
    res.status(201).json({ msg: "Book saved successfully" });
  } catch (error) {
    console.error("Error adding book to favorites:", error);
    res.status(500).json({ error: "Failed to add book to favorites" });
  }
};

// PUT route to update a favorite book
exports.updateFavBooks = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookData = req.body;

    // Find the book by ID and update its fields
    const updatedBook = await FavoriteBook.findByIdAndUpdate(
      bookId,
      bookData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating favorite book:", error);
    res.status(500).json({ error: "Failed to update favorite book" });
  }
};


// DELETE route to remove a favorite book
exports.deleteFavBooks = async (req, res) => {
  try {

    // Find the book by ID and remove it
    await FavoriteBook.findByIdAndRemove(req.params.id);

    res.status(200).json({ msg: "Book removed successfully" });
  } catch (error) {
    console.error("Error removing favorite book:", error);
    res.status(500).json({ error: "Failed to remove favorite book" });
  }
};