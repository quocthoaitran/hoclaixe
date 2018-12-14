const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const database = require('./api/db');


require('dotenv').load();

app.set('views', './views');
app.set('view engine', 'ejs');

const port = process.env.PORT | 3000;

app.use(bodyPaser({extended: true}));

app.use(bodyPaser.urlencoded({extended: true}));
app.use(session({secret: "mysecret"}))
app.use(bodyPaser.json());
app.use(passport.initialize());
app.use(passport.session())

let routes = require("./api/routes");
routes(app);

app.get('/', (req, res) => res.render('index'));

app.route('/login').get((req, res) => res.render('login'))
    .post(passport.authenticate('local', {failureRedirect: '/login',
                                        successRedirect: '/home'}));
app.get('/home', (req, res) => {
    if(req.isAuthenticated()){
        res.render('home');
    }else{
        res.redirect('/login');
    }
})

passport.use(new localStrategy(
    (username, password, done) => {
        database.query('SELECT * FROM user', (err, db) => {
            if(err) throw err;
            //const db = JSON.parse(data);
            const userRecord = db.find(user => user.userDB == username);
            if(userRecord && userRecord.passDB == password){
               return done(null, userRecord);
           }else{
              return done(null, false);
        }
        })
        
    }
))

passport.serializeUser((user, done) => {
    done(null, user.userDB)
})

passport.deserializeUser((name, done) => {
    database.query('SELECT * FROM user', (err, db) => {
        if(err) throw err;
        const userRecord = db.find(user => user.userDB == name);
        if(userRecord){
           return done(null, userRecord);
         }else{
            return done(null, false);
         }
    })
})

app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + 'not found'});
})

app.listen(port, function () {
    console.log('Server is listening on port: ' + port);
});

// module.exports = app;