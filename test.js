// ============================================================
// TEST SUITE - tests all CRUD functions in books.model.js
// Run with: node test.js
// ============================================================

// import the database connection and model
const db = require("./app/models/db");
const Book = require("./app/models/books.model");
// define the properties for a book object
const testBook = new Book({
    title: "The tales of the test tickle title",
    author: "Test, The Third",
    genre: "Genre Shree",
    price: "9.69",
    stock: "420"
});

// track the id of the book we create so we can cross-reference it between tests
let bookId;

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

    Book.create(testBook, (err, result) => {
        console.log("\n---Test 1: Create a new book", err, result);

        // update the class test book for cross-referencing between test functions
        bookId = result.id;
        console.log(`creating a new book with ID: ${bookId}`);
        // call get all books to chain test functions together
        testGetAll();
    });
}

///
/// Test 2: GET all books from the database
///
const testGetAll = () => {
    console.log("\n---Test 2: Get all books from the database ---");

    Book.getAll((err, result) => {
        log("fetching all books in the database", err, `Found ${result ? result.length : 0} books`);
        // call next test to keep chaining
        testFindById();
    });
};

///
/// Test 3: GET book by bookId (find the test book that we just created)
///
const testFindById = () => {
    console.log("\n--- Test 3: Find book by ID ---");

    Book.findById(bookId, (err, result) => {
        log("finding a book by its bookID", err, result);
        // call next test to keep chaining
        testUpdateById();
    });
};

///
/// Test 4: Update a book by ID
///
const testUpdateById = (id, book, result) => {
    console.log("\n--- Test 4: Update a book by ID ---");

    // create a query to update a book
    db.query(
        // request to update
        "UPDATE books SET title=?, author=?, genre=?, price=?, stock=? WHERE id=?",
        // define the new values (taken from the passed book object)
        [book.title, book.author, book.genre, book.price, book.stock, id],
        // process the response
        (err, res) => {
            // if the response represents an error
            if (err) {
                // print error and return early
                result(err, null);
                return;
            }
            
            // else if the response says we updated 0 rows, we were unsuccessful
            if (res.affectedRows==0) {
                // return informative error message before returning
                result({ kind: "not_found" }, null);
                return;
            }         
            
            // else if we get here the update was successful, use the spread operator (...book) to unpack book properties
            result(null, { id: id, ...book });
        }
    )
}

// TODO: next test


// start test-chain when this class is called
testCreateANewBook();