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

  };
}