console.log("Attempting to connect to the DB...");
// import mysql to communicate with mysql db server
const mysql = require("mysql2");
// keeps private details separate for later encoding
const dbConfig = require("../config/db.config.js");
// setup the connection to the database
const connection = mysql.createConnection({
  // the ip address of the mysql database server
  host: dbConfig.HOST,
  // the port of the mysql database server
  port: dbConfig.PORT,
  // the name of the database to use
  database: dbConfig.DB,
  // the users login name
  user: dbConfig.USER,
  // the users password
  password: dbConfig.PASSWORD,
  // enable multiple statments so we can setup the books table quickly
  multipleStatements: true
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
console.log("Successfully connected to the DB!");