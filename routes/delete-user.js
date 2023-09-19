var express = require('express');
var router = express.Router();

/* GET delete-user page. */
router.get('/', function(req, res, next) {
  res.send("delete-user");
});

module.exports = router;