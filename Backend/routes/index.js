var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// var usersRouter = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('route to index');
});

//authentication for users
router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});
//craeting users
router.post('/register', function(req, res, next) {
  
});


module.exports = router;
