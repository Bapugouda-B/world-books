import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./favbook.css";
import { BsFillHeartFill, BsPencil } from "react-icons/bs";
import { GiBookshelf } from "react-icons/gi";


export default function Favbooklist() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    fetchFavoriteBooks();
  }, []);

  const fetchFavoriteBooks = () => {
    axios
      .get("https://book-api-omega.vercel.app//api/books/favoritebooks")
      .then((response) => {
        const booksWithEdit = response.data.map((book) => ({
          ...book,
          edit: false,
        }));
        setFavoriteBooks(booksWithEdit);
      })
      .catch((error) => {
        console.error("Failed to fetch favorite books:", error);
      });
  };
  

  const handleRemoveFavorite = (id) => {
    axios
      .delete(`https://book-api-omega.vercel.app//api/books/favoritebooks/${id}`)
      .then((response) => {
        // Book successfully removed from the server, update the favorite books state
        const updatedBooks = favoriteBooks.filter((book) => book._id !== id);
        setFavoriteBooks(updatedBooks);
      })
      .catch((error) => {
        console.error("Failed to remove book from favorites:", error);
      });
  };

  const handleEdit = (id) => {
    setFavoriteBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((book) => {
        if (book._id === id) {
          return {
            ...book,
            edit: !book.edit,
          };
        } else {
          return {
            ...book,
            edit: false,
          };
        }
      });
      return updatedBooks;
    });
  };
  
  
 
  const handleSave = (id) => {
    // Find the book in the favoriteBooks state by ID
    const bookIndex = favoriteBooks.findIndex((book) => book._id === id);
    const book = favoriteBooks[bookIndex];
  
    // Extract the fields to update from the book object
    const { title, author, amount } = book;
  
    // Send the updated fields to the server
    axios
      .put(`https://book-api-omega.vercel.app//api/books/favoritebooks/${id}`, { title, author, amount })
      .then((response) => {
        // Book successfully updated on the server, update the favorite books state
        const updatedBooks = [...favoriteBooks];
        updatedBooks[bookIndex] = response.data;
        setFavoriteBooks(updatedBooks);
      })
      .catch((error) => {
        console.error("Failed to update book:", error);
      });
  };
  
  

  const handleInputChange = (id, e) => {
    // Find the book in the favoriteBooks state by ID
    const bookIndex = favoriteBooks.findIndex((book) => book._id === id);
    const updatedBook = { ...favoriteBooks[bookIndex], [e.target.name]: e.target.value };
  
    setFavoriteBooks((prevBooks) => {
      const updatedBooks = [...prevBooks];
      updatedBooks[bookIndex] = updatedBook;
      return updatedBooks;
    });
  };
  
  return (
    <div className="books-container">
      <div className="site-logo" style={{marginBottom:"25px"}}>
          <GiBookshelf className="book-icon" />
          <div className="logo">
            <h2>World Books</h2>
            <small>Online Book Store Website</small>
          </div>
        </div>
      <div className="fav-books">
        <Link to="/">
          <button className="fav-books-button">Home</button>
        </Link>
        <span>{favoriteBooks.length}</span>
        <button className="fav-books-button">Favorite Books</button>
      </div>
      <div className="book-list">
        {favoriteBooks.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="book-image">
              <img src={book.thumbnail} alt="Book Thumbnail" />
            </div>
            <div className="book-content">
              {book.edit ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={(e) => handleInputChange(book._id, e)}
                  />
                  <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={(e) => handleInputChange(book._id, e)}
                  />
                  <input
                    type="text"
                    name="amount"
                    value={book.amount}
                    onChange={(e) => handleInputChange(book._id, e)}
                  />
                  <button className="addfav-icon" style={{border:"none", color:"white"}} onClick={() => handleSave(book._id)}>Save</button>
                </>
              ) : (
                <>
                  <BsPencil className="edit" onClick={() => handleEdit(book._id)} />
                  <div>
                    <span>Title:</span>
                    <h4>{book.title}</h4>
                  </div>
                  <div>
                    <span>Author:</span>
                    <p>{book.author}</p>
                  </div>
                  <div>
                    <small>₹{book.amount}</small>
                  </div>
                  <div
                    className="addfav-icon"
                    onClick={() => handleRemoveFavorite(book._id)}
                  >
                    <small>Remove Favorite</small>
                    <BsFillHeartFill className="heart-icon" />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
