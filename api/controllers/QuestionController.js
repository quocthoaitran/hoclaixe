'use strict';

var util = require('util');
var mysql = require('mysql');
var db = require('../db');

var table = 'questions';

module.exports = {
    get: (req, res) => {
            let sql = `(SELECT * FROM question WHERE QUESTIONTYPE = "43" ORDER BY RAND() LIMIT 10) 
                        UNION 
                        (SELECT * FROM question WHERE QUESTIONTYPE = "48" ORDER BY RAND() LIMIT 5)
                        UNION
                        (SELECT * FROM question WHERE QUESTIONTYPE = "49" ORDER BY RAND() LIMIT 5)`;
        db.query(sql, (err, data) => {
            if(err) throw err;
            //res.render(data);
            res.json(data);
        });
    },
    getFull: (req, res) => {
        let sql = 'SELECT * FROM question';
        db.query(sql, (err, data) => {
            if(err) throw err;
            //res.render(data);
            //res.json(data);
            res.json(data)
        });
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM question WHERE id = ?';
        db.query(sql, [req.params.questionId], (err, response) => {
            if(err) throw err;
            res.json(response[0]);
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM question WHERE id = ?';
        db.query(sql, [req.params.questionId], (err, response) => {
            if(err) throw err;
            res.json({ message: 'Delete success!'});
        })
    }
}