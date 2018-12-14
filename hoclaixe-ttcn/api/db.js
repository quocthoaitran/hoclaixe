'use strict';

var mysql = require("mysql");
var db = mysql.createConnection({
    host:  process.env.DB_HOST || 'db4free.net',
    user:  process.env.DB_USER || 'quocthoaitran',
    password: process.env.DB_PASS || '123456789',
    database: process.env.DB_NAME || 'hoclaixe'
});

module.exports = db;