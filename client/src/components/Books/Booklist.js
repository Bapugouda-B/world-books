import React, { useState } from "react";
import "./booklist.css";
import axios from "axios";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Booklist({ books }) {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  if (!books || !Array.isArray(books)) {
    return null;
  }

  const handleAddToFavorites = (book) => {
    const { volumeInfo } = book;
    const { title, authors } = volumeInfo;

    const newBook = {
      title: title || "",
      author: authors ? authors.join(", ") : "",
      thumbnail: volumeInfo.imageLinks?.smallThumbnail || "",
      amount: book.saleInfo?.listPrice?.amount || "",
    };

    // Check if the book is already in the favorite books list
    const isBookInFavorites = favoriteBooks.some(
      (favoriteBook) => favoriteBook.title === newBook.title
    );

    if (isBookInFavorites) {
      toast.warning("Book is already in favorites!", {
        autoClose: 1000, // 1 seconds
      });
    } else {
      setFavoriteBooks([...favoriteBooks, newBook]);
      // Make the API call to add the book to favorites
      axios
        .post("/api/books/favoritebooks", newBook)
        .then((response) => {
          toast.success("Book added to favorites!", {
            autoClose: 1000,
          });
        })
        .catch((error) => {
          console.error("Failed to add book to favorites:", error);
          toast.error("Failed to add book to favorites.", {
            autoClose: 1000,
          });
        });
    }
  };

  return (
    <div className="books-container">
      <div className="fav-books">
        <button
          style={{ backgroundColor: "green", color: "white" }}
          className="fav-books-button"
        >
          Home
        </button>
        <Link to="/favoritebooks">
          <button className="fav-books-button">Check Favorite Books</button>
        </Link>
      </div>
      <div className="book-list">
        {books.map((item) => {
          let thumbnail =
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail;
          let amount =
            item.saleInfo.listPrice && item.saleInfo.listPrice.amount;

          return (
            <div className="book-card" key={item.id}>
              <div className="book-image">
                <img src={thumbnail} alt="Book Thumbnail" />
              </div>
              <div className="book-content">
                <div>
                  <span>Title:</span>
                  <h4>{item.volumeInfo.title}</h4>
                </div>
                <div>
                  <span>Author:</span>
                  <p>{item.volumeInfo.authors}</p>
                </div>
                <div>
                  {amount ? <small>₹{amount}</small> : <small>Free</small>}
                </div>
                <div
                  className="addfav-icon"
                  onClick={() => handleAddToFavorites(item)}
                >
                  <small>Add To Favorite</small>
                  <BsFillHeartFill className="heart-icon" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer
        closeOnClick
        style={{
          fontSize: "12px",
          width: "250px",
        }}
      />
    </div>
  );
}
