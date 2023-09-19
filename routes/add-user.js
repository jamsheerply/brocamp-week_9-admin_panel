var express = require('express');
var router = express.Router();

/* GET add-user. */
router.get('/', function(req, res, next) {
  res.render('add-user');
});

module.exports = router;