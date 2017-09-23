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
    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM goods where tuijian= true and updown =true ", function (error, results, fields) {

            if (error) console.log(error) ;

            var  tuijianresless10={};

            if(results.length>9){

                for(var i=0;i<9;i++){
                    tuijianresless10[i]=results[i];
                }
            }else {
                tuijianresless10=results;
            }

            connection.query("SELECT * FROM goods where  updown =true ORDER BY sales DESC ", function (error, results, fields) {
                // Handle error after the release.
                if (error) console.log(error) ;
                connection.release();
                var  salesresless10={};
                if(results.length>9){

                    for(var i=0;i<9;i++){
                        salesresless10[i]=results[i];
                    }
                }else {
                    salesresless10=results;
                }

                res.json({tuijian:tuijianresless10,sales:salesresless10})

            })

        });
    });

});
module.exports = router;
