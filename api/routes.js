'use strict';
 module.exports = function(app) {
     var questionCtrl = require('./controllers/QuestionController');

     //todo list route
     app.route('/questions', (req, res) => {
         if(!req.isAuthenticated()){
            res.redirect('/login');
         }
     }).get(questionCtrl.get);
     app.route('/fullQuestions').get(questionCtrl.getFull);
     app.route('/questions/:questionId').get(questionCtrl.detail);
     app.route('/sign/:signCategory').get(questionCtrl.getSign);
 }