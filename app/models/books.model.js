const db = require("./db");

// TODO: complete the code as per the instructions given README.md

console.log("Successfully connected to the DB!");

// define what a book object
const Project = function(book) {
  // the name of this book as it appears on the cover
  this.title = book.title;
  // the author of this book
  this.author = book.author;
  // the listed genre/category for this book
  this.genre = book.genre;
  // the cost of this book ($)
  this.price = book.price;
  // the quantity in stock for this book
  this.stock = book.stock;
};

// create a function which allows users to create a new book object


module.exports = Project;

// TEST - create a test book object and log it to the console. cmd: node "Task 6/app/models/books.model.js" 
const testBook = new Project({
  title: "Test Book",
  author: "Test Author",
  genre: "Test Genre",
  price: 9.99,
  stock: 5
});

console.log("Test book object:", testBook);