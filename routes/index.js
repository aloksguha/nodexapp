var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple Container of Express',
  content: 'Container exposed port : 3000',
  api: ['/', '/users', '/friends'] });
});



module.exports = router;
