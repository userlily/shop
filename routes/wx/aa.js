var express = require('express');
var router = express.Router();
var redis=require("../../util/redis")
var config = require("../../config.json")

/**
 * 微信小程序登录
 * @param  code
 *
 *
 */
router.get('/', function(req, res, next) {
    var session=req.query.session
    redis.getWX(session,res,function(obj){
        console.log(obj.id)
        console.log(obj.wxsession)
        res.json({"aa":"yes","vv":"sss"})
    })
});
module.exports = router;
