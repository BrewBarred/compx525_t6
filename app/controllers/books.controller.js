// import the Book model so we can call its database functions
const Book = require("../models/books.model");

// CREATE - handles POST /books
// req.body contains the data sent by the user in the request body (e.g. from Postman)
exports.create = (req, res) => {
  // if the request body is empty, reject it immediately with a 400 (Bad Request)
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty." });
    return;
  }

  // create a new Book object using the data from the request body
  const book = new Book(req.body);

  // call the model's create function, passing in the new book
  Book.create(book, (err, data) => {
    // if something went wrong, send a 500 (Internal Server Error)
    if (err) res.status(500).send({ 
        message: err.message || "Error creating book." 
    });
    // Otherwise send back the newly created book (includes its new ID)
    else res.send(data);
  });
};