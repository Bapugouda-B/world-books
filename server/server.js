const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const booksRoute = require("./routes/BooksRoute.js");

const app = express();

app.use(
  cors({
    origin: "https://bapu-books-site.vercel.app"
  })
);

// Middleware
app.use(express.json());

//connect to mongodb server
const url =
  "mongodb+srv://bapu:6FPOIjFtiEFcG7rh@books.1hmytti.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb server started"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/books", booksRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});


//--------------------CORS Handling--------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://bapu-books-site.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


const port = 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
