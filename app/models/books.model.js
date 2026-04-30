// connect to the mysql datbase
const db = require("./db");

// TODO: complete the code as per the instructions given README.md

// define what a book object
const Book = function(book) {
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
Book.create = (newBook, result) => {
  console.log("Inserting \"" + [newBook.title] + "\" into the book set");
  // setup a query to insert aa book into the book set
  db.query("INSERT INTO books SET ?", newBook, (err, res) => {
    // return early if an error occurs while performing the insertion
    if (err) {
      result(err, null);
      return;
    }
    // else insert the book into the database
    result(null, {id: res.insertId, ...newBook});
  });
};

// create a function which returns all books in the database
Book.getAll = (result) => {
  // setup a query to select all books from the database
  db.query("SELECT * FROM books", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    //else, return all books in the database
    result(null, res);
  });
};

// create a function to return any book in the database by ID
Book.findById = (id, result) => {
  db.query("SELECT * FROM books WHERE id = ?", [id], (err, res) => {
    // return early if there are any errors accessing the data
    if (err) {
      result(err, null);
      return;
    }

    // return the length of the array if it is valid
    if (res.length) {
      result(null, res[0]);
      return;
    }

    // else return an error msg if there is any errors finding the specific book
    result({ kind: "not_found" }, null);
  });
};

// create a function to find a book by its name
Book.findByName = (title, result) => {
  // create a query to find books by their book title (uses LIKE to return things containing the string and to use vars e.g., title)
  db.query("SELECT * FROM books WHERE title LIKE ?", [`%${title}%`], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    // return the response
    result(null, res);
  });
};

// create a function to update a book's details by ID
Book.updateById = (id, book, result) => {
  // create a query to update the properties of a book
  db.query(
    "UPDATE books SET title=?, author=?, genre=?, price=?, stock=? WHERE id=?",
    [book.title, book.author, book.genre, book.price, book.stock, id],
    (err, res) => {
      // check for error response
      if (err) {
        // return early on errors
        result(err, null);
        return;
      }

      // if nothing was updated, return a custom error
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      // else, return the id and unpacked book properties
      result(null, { id: id, ...book });
    }
  );
};

// create a function to delete a book by id
Book.remove = (id, result) => {
  // create a query to delete a book by id
  db.query("DELETE FROM books WHERE id = ?", [id], (err, res) => {
    // if error response is returned
    if (err) {
      // throw an error and return early
      result(err, null);
      return;
    }

    // if the response shows no updated rows
    if (res.affectedRows == 0) {
      // throw a different error and return early
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};


module.exports = Book;