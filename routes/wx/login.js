var express = require('express');
var router = express.Router();
var https=require("https")
var redis=require("../../util/redis")
var config = require("../../config.json")
var pool = require("../../util/mysqlConnectionPool")


/**
 * 微信小程序登录
 * @param  code
 *
 *
 */
router.get('/', function(req, res, next) {

    var js_code= req.query.code;  //微信code登录凭证
    var appid=config.wx.appid;   //小程序appid
    var secret=config.wx.secret;  // 小程序秘钥
    var ress=res;  //保存res
    // url 拼接
    var url="https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+js_code+"&grant_type=authorization_code";

    var session=null; //返回值的默认初始状态
    https.get(url, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            session= redis.setSession(parsedData)
            ress.json({"session":session})
            if(parsedData.openid){

                pool.getConnection(function(err, connection) {

                    // Use the connection
                    connection.query("SELECT * FROM user where openid= ? ",parsedData.openid, function (error, results, fields) {
                        // And done with the connection.     归还连接

                        // Handle error after the release.
                        if (error) console.log(error) ;
                        if(results.length==0){
                            connection.query("insert into user set ?",{openid:parsedData.openid}, function (error, results, fields) {
                                // And done with the connection.     归还连接
                                connection.release();
                                // Handle error after the release.
                                if (error) console.log(error);
                            });

                        }else {
                            connection.release();
                        }


                    });
                });
            }

        } catch (e) {
             console.error(e.message);
             ress.json({"session":session})
         }
});
}).on('error', (e) => {
        console.error(`错误: ${e.message}`);
        ress.json({"session":session})
});

});


module.exports = router;
