var express = require('express');
var router = express.Router();

const user =require("../controller/usersController")

/* GET sign-up page. */
router.get('/', function(req, res, next) {
  res.render('sign-up');
});
router.post("/",user.insertUser)

module.exports = router;