// ============================================================
// TEST SUITE - tests all CRUD functions in books.model.js
// Run with: node test.js
// ============================================================

// import the database connection and model
const db = require("./app/models/db");
const Book = require("./app/models/books.model");

// track the id of the book we create so we can cross-reference it between tests
let bookId;

// helper function to handle logging neatly
const log = (test, err, result) => {
    if (err) {
        console.log('Fail [${test}]:', err);
    } else {
        console.log('Pass [${test}]', result);
    }
};

//
//  TEST 1: Create a new book
//
const createANewBook = () => {
    console.log("\n--- Test 1: Create a new book ---");

    // define a test book to insert
    const testBook = new Book({
        title: "The tales of the test title",
        author: "Test, The Third",
        genre: "Genre Shree",
        price: "9.69",
        stock: "420"
    });

    Book.create(testBook, (err, result) => {
        log("Create", err, result);
        
        // update the class test book for cross-referencing between test functions
        bookId = result.id;
        console.log('Created book with ID: ${testBookId}')

        // call next test here to chain tests
    });
}
