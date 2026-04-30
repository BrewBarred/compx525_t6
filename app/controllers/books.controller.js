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
    // otherwise send back the newly created book (includes its new ID)
    else res.send(data);
  });
};

// READ ALL - handles GET /books
exports.findAll = (req, res) => {
  Book.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Error retrieving books." });
    else res.send(data);
  });
};

// READ ONE - handles GET /books/:id
exports.findOne = (req, res) => {
  // req.params.id grabs the :id from the URL - e.g. GET /books/5 gives us req.params.id = 5
  Book.findById(req.params.id, (err, data) => {
    if (err) {
      // if the model returned "not_found", send a 404 (Not Found)
      if (err.kind === "not_found")
        res.status(404).send({ 
            message: `Book with id ${req.params.id} not found.` 
        });
      // any other error is a server problem, send 500
      else res.status(500).send({ 
        message: "Error retrieving book." 
    });
    } else res.send(data);
  });
};

// READ BY NAME - handles GET /books/title/:title
// req.params.title grabs the :title from the URL - e.g. GET /books/title/hobbit
exports.findByName = (req, res) => {
  Book.findByName(req.params.title, (err, data) => {
    if (err) res.status(500).send({ 
        message: err.message || "Error retrieving books." 
    });
    else res.send(data);
  });
};

// UPDATE - handles PUT /books/:id
// combines req.params.id (which book) and req.body (what to change it to)
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ 
        message: "Content cannot be empty." 
    });
    return;
  }

  Book.updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        res.status(404).send({ message: `Book with id ${req.params.id} not found.` });
      else res.status(500).send({ message: "Error updating book." });
    } else res.send(data);
  });
};

// DELETE ONE - handles DELETE /books/:id
exports.delete = (req, res) => {
  Book.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        res.status(404).send({ message: `Book with id ${req.params.id} not found.` });
      else res.status(500).send({ message: "Could not delete book." });
    } else res.send({ message: "Book deleted successfully." });
  });
};

// DELETE ALL - handles DELETE /books
// notice we send back a count of how many books were deleted using affectedRows
exports.deleteAll = (req, res) => {
  Book.removeAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Could not delete books." });
    else res.send({ message: `${data.affectedRows} books deleted successfully.` });
  });
};