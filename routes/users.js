var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: It should respond with a resource, thats it
*/
router.get('/', function(req, res, next) {
  res.json({'msg':'respond with a resource'});
});

module.exports = router;
