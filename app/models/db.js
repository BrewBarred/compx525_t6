// import mysql to communicate with mysql db server
const mysql = require("mysql");
// keeps private details separate for later encoding
const dbConfig = require("../config/db.config.js");
// setup the connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,         // the ip address of the mysql database server
  port: dbConfig.PORT,         // the port of the mysql database server
  user: dbConfig.USER,         // the users login name
  password: dbConfig.PASSWORD, // the users password
  database: dbConfig.DB        // the name of the database to use
});

// try open a connection to the database
connection.connect(error => {
  if (error) 
    // throw an error if the connection fails
    throw error;
  // else return a success message
  console.log("Successfully connected to the database.");
});

// creates a connection module to neatly duplicate this connection in other classes
module.exports = connection;