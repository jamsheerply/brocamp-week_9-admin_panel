var express = require('express');
var router = express.Router();

/* GET admin-panel page. */
router.get('/', function(req, res, next) {
  res.render('admin-panel');
});

module.exports = router;