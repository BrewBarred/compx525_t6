# Ensure you are in the project folder: "Task6-Skeleton-Code" (Not all caps)
1. Run * setup.js * to ensure the database is reset and ready for a fresh set of queries

•	Create new books and save it back to the database. 
•	Get list of all books available in the database.
•	Get books by book ID.
•	Get books by book Name.
•	Update book information by book ID.
•	Delete book by book ID.
•	Delete all books from the database.

What you need to do:
# 1.	Download the skeleton code. In the terminal, run npm install to install all the required dependencies.
# 2.	Review server.js to understand how the Express web-server has been setup.
# 3.	In the config directory, copy db.config.js.in file to db.config.js, and replace the username, password and database entries with your own credentials.
# 4.	Ingest books.sql, into your MySQL instance, to create a books table with twenty rows inserted in the table.
5.	In the models directory, in the books.model.js file, expand upon the minimal constructor for books that is provided, and use the database connection to write CRUD functions:
You need to support the following functions (user query() method):
    # Create Books 
    * Retrieve All Books 
    * Retrieve Books by ID
    * Retrieve Books by Book Name
    * Update Books by ID
    * Delete Books by ID
    * Delete All Books
6.	In the routes directory, in a books.routes.js file, set all the endpoints.
7.	In controller folder, in books.controller.js file, write the controllers with CRUD functions.
8.	Test API using POSTMAN.

### What to Submit and How
All pertinent material you have developed for this assignment must be submitted electronically using Moodle and your COMPX575 repository.  The submitted files must be sufficient to recreate your app by running npm install followed by npm start. Do not include your node_modules directory, as this is not needed to reconstitute your project using npm install. Moreover, it could contain binaries files specific to the computer platform you developed the assignment on that are incompatible with the computer system used to test your submitted assignment solution. 
You may choose between submitting a ZIP file. Marks will be deducted for submitted assignments that do meet these requirements.


## Grading
This task is worth as much as 6% of your final grade and is marked out of 5.
* API meets functional requirements - 4 marks
* Set up Routes - 1 mark
* API testing using Postman - 1 mark

## Submission
On top of the commits to your Git repository, please upload your source files to moodle.
