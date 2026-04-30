module.exports = app => {
  // import the books controller so we can call its functions
  const books = require("../controllers/books.controller");

  // TODO: complete the code as per the instructions given README.md
  module.exports = app => {
    // add a new books object to the database
    app.post("/books", books.create);

    // retrieve every book from the database
    app.get("/books", books.findAll);

    // get books by name
    app.get("/books/title/:title", books.findByName);

    // get books by id
    app.get("/books/:id", books.findOne);

    // put books by id
    app.put("/books/:id", books.update);

    // delete book by id
    app.delete("/books/:id", books.delete);

    // delete every book from the database
    app.delete("/books", books.deleteAll);
  };
}