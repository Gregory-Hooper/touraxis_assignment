const mysql = require("mysql");
const dbConfig = require("../config/db_config.js");

//Create the database connection
const dbConnection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

// Open the MySQL connection
dbConnection.connect(error => {
    if (error) {
        console.error(error);
    }
    console.log("Successfully connected to the database.");
});

module.exports = dbConnection;
