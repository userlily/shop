var express = require('express');
var router = express.Router();
var pool = require("../../util/mysqlConnectionPool")

/**
 * 微信小程序登录
 * @param  code
 *
 *
 */
router.get('/', function(req, res, next) {

    var id= req.query.id;
    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM cgoods where cid =? ",id,function (error, results, fields) {
            connection.release();
            if(error) console.log(error);
            res.json(results)
        });
    });

});
module.exports = router;
