var express = require('express');
var friendsjson = require('./friends.json')
var router = express.Router();


/* GET friends listing. */
router.get('/', function(req, res, next) {
  res.json(friendsjson.friends);
});

router.get('/:id', function(req, res, next) {
  let idtoser = req.params.id;
  let friend = friendsjson.friends.filter((frnd)=>{
    return frnd.id == idtoser
  });
  res.json(friend);
});

module.exports = router;