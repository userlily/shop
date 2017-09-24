var express = require('express');
var router = express.Router();
var login= require("./login");
var aa= require("./aa")
var tuijian= require("./tuijian")
var search= require("./search")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'wx' });
});
router.use('/login',login)
router.use('/aa',aa)
router.use('/tuijian',tuijian)
router.use('/search',search)

module.exports = router;
