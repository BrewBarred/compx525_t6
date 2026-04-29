// stores authentication details separate from public classes for later encryption
module.exports = {
  // database ip address
  HOST: "10.69.69.11",
  // the port number that mysql is listening on (default=3306)
  PORT: 40022,
  // the database to connect to
  DB: "public",
  // mysql public account name
  USER: "guest",
  // mysql password
  PASSWORD: "password",
  // enable multiple statements to run books.sql on sql2
  MULTIPLE_STATEMENTS: true
};