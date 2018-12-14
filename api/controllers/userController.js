'use strict'
const mysql = require('mysql');
const db = require('../db');
const util = require('util');

let sql = 'SELECT * FROM user';
db.query(sql, (err, data) => {
    if(err) throw err;
    module.exports = JSON.parse(data);
});