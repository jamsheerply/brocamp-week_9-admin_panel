var express = require('express');
var router = express.Router();
const user =require("../controller/usersController")

/* GET add-user. */
router.get('/', function(req, res, next) {
  res.render('add-user');
});
router.post("/",user.insertUser)

module.exports = router;