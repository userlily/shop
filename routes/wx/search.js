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
    var name=  req.query.name.trim();
    if(name==""){
        return  res.json({})
    }
    var like= "%" +name + "%"
    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM goods where name like ?",like,function (error, results, fields) {

            connection.release();
            if(error) console.log(error);
            var results30={};
            if(results.length>30){

                for(var i=0;i<30;i++){
                    results30[i]=results[i];
                }
            }else {
                results30=results;
            }
            res.json(results30)
        });
    });

});
module.exports = router;
