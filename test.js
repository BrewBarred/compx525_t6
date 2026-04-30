// ============================================================
// TEST SUITE - tests all CRUD functions in books.model.js
// Run with: node test.js
// ============================================================

// import the database connection and model
const db = require("./app/models/db");
// import the Book object we modelled in books.model.js
const Book = require("./app/models/books.model");

// track the id of the book we create so we can cross-reference it between tests
let book;

// helper function to handle logging neatly
const log = (test, err, result) => {
    if (err) {
        console.log(`Test failed! Error occurred while ${test}:`, err);
    } else {
        console.log(`Test passed! No errors occured while ${test}`, result);
    }
};

//
//  TEST 1: Create a new book
//
const testCreateANewBook = () => {
    console.log("\n--- Test 1: Create a new book ---");

    // define the properties for a book object
    const testBook = new Book({
        title: "The tales of the test tickle title",
        author: "Test, The Third",
        genre: "Genre Shree",
        price: "9.69",
        stock: "420"
    });

    // create a new book to test model.js functionality
    Book.create(testBook, (err, result) => {
        console.log("\n---Test 1: Create a new book", err, result);

        // update the class test book for cross-referencing between test functions
        book = result;
        log(`creating a new book with ID: ${book.id}`);
        // call get all books to chain test functions together
        testGetAll();
    });
}

///
/// Test 2: GET all books from the database
///
const testGetAll = () => {
    console.log("\n---Test 2: Get all books from the database ---");
    // fetch all books from the database
    Book.getAll((err, result) => {
        log("fetching all books in the database", err, `Found ${result ? result.length : 0} books`);
        // call next test to keep chaining
        testFindById();
    });
};

///
/// Test 3: GET book by book id (find the test book that we just created)
///
const testFindById = () => {
    console.log("\n--- Test 3: Find book by ID ---");

    Book.findById(book.id, (err, result) => {
        log("finding a book by its id", err, result);
        // call next test to keep chaining
        testFindByName();
    });
};

///
/// Test 4: GET book by book name
///
const testFindByName = () => {
    console.log("\n--- Test 4: Find book by name ---");

    Book.findByName("Test", (err, result) => {
        log("finding a book by its title", err, `Found ${result ? result.length : 0} books matching 'Test'`);
        // TODO chain next test
    });
}

// TODO: next test


// start test-chain when this class is called
testCreateANewBook();