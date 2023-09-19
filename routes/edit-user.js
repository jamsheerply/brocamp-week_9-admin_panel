var express = require('express');
var router = express.Router();

/* GET edit-user page. */
router.get('/', function(req, res, next) {
  res.render('edit-user');
});

module.exports = router;