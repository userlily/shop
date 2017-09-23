var express = require('express');
var router = express.Router();

router.get('/signout', function(req, res, next) {
    req.session.adminID=undefined;
    res.render("admin/signin",{"mes":""})
});
router.get('/signout', function(req, res, next) {




});

module.exports = router;
