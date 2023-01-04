// To not give away real credentials I built out this example file 
// to show how a database would connect to my REST API

const mysql = require('mysql');

const connection = mysql.createConnection({
    debug: false,
    host: '127.0.0.1',
    port: 0000,
    database: 'Database_Name',
    user: 'Username',
    password: 'password',
});

module.exports = connection;