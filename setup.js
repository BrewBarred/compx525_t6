// import our database connection file
const db = require("./app/models/db");
const fs = require("fs");

// read the books.sql file from the project root
const sql = fs.readFileSync("./books.sql", "utf8");

// if the books database already contains data
db.query("SELECT COUNT(*) AS count FROM books", (err, result) => {
  // just run the sql file if checking table is rejected (e.g., no table created)
  if (err) {
    console.log("No existing data found, importing books.sql...");
    runSQL();
    console.log(`Successfully initialized database with : ${result[0].total_books} rows!`);
    return;
  }

  const count = result[0].count;
  // if there is no data in the table, import the sql file
  if (count === 0) {
    console.log("Table is empty, importing books.sql...");
    runSQL();

  // if there is already data, check if it matches books.sql  
  } else {
    console.log(`Found ${count} existing books, checking for differences...`);
    // get all existing books from the database
    db.query("SELECT * FROM books", (err, existingBooks) => {
      if (err) { console.log("Error reading existing data:", err); process.exit(); }

      // Count how many INSERT statements are in books.sql
      const insertCount = (sql.match(/INSERT INTO/g) || []).length;

      // If the counts match, assume data is the same
      if (existingBooks.length === insertCount) {
        console.log("Data already imported, nothing to do!");
        process.exit();
      } else {
        // Counts differ so wipe and re-import
        console.log("Data is different, replacing with books.sql...");
        db.query("DELETE FROM books", (err) => {
          if (err) { console.log("Error clearing table:", err); process.exit(); }
          runSQL();
        });
      }
    });
  }
});

// Function to run the SQL file against the database
function runSQL() {
  db.query(sql, (err, result) => {
    if (err) { console.log("Error importing books.sql:", err); }
    else { console.log("books.sql imported successfully!"); }
    process.exit();
  });
}