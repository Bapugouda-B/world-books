const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const booksRoute = require("./routes/BooksRoute.js");

const app = express();

app.use(
  cors({
    origin: ["https://world-books.vercel.app"],

    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true,
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

const port = 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
