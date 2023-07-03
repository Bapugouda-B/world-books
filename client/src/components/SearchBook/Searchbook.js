import React, { useState, useEffect, useCallback } from "react";
import "./search.css";
import axios from "axios";
import { GiBookshelf } from "react-icons/gi";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import Booklist from "../Books/Booklist.js";

export default function Searchbook() {
  const [search, setSearch] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBook = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=6&key=AIzaSyCU81wFtgBQZi6Mh0R6NHJcMerIbKfpGUQ
        `
      );
      setBookData(response.data.items);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [search, startIndex]);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=programming&startIndex=0&maxResults=6&key=AIzaSyCU81wFtgBQZi6Mh0R6NHJcMerIbKfpGUQ
          `
        );
        setBookData(response.data.items);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchInitialBooks();
  }, []);

  useEffect(() => {
    if (search !== "") {
      searchBook();
    }
  }, [search, searchBook]);

  const handlePrevious = () => {
    if (startIndex >= 6) {
      setStartIndex(startIndex - 6);
    }
  };

  const handleNext = () => {
    setStartIndex(startIndex + 6);
  };

  return (
    <div className="search-container">
      <div className="search-content">
        <div className="site-logo">
          <GiBookshelf className="book-icon" />
          <div className="logo">
            <h2>World Books</h2>
            <small>Online Book Store Website</small>
          </div>
        </div>
        <div className="search-book">
          <BsSearch className="icon-search" />
          <input
            type="text"
            placeholder="Find your books here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchBook();
              }
            }}
          />
        </div>
      </div>
      {loading ? (
        <div style={{ marginTop: "10px", color: "blue", fontWeight: "600" }}>
          Loading...
        </div>
      ) : (
        <Booklist books={bookData} />
      )}

      {search !== "" && (
        <div className="pagination">
          <button className="pagination-button" onClick={handlePrevious}>
            <RiArrowLeftSLine className="pagination-icon" />
            Previous
          </button>
          <button className="pagination-button" onClick={handleNext}>
            Next
            <RiArrowRightSLine className="pagination-icon" />
          </button>
        </div>
      )}
    </div>
  );
}
