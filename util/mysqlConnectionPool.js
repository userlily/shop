/**
 * Created by lili on 2017/7/19.
 * 数据库连接池
 */


var mysql = require('mysql'); //获取mysql模块
var config = require('../config.json');

    var pool  = mysql.createPool({
            connectionLimit : config.mysqlDb.connectionLimit,
            host            : config.mysqlDb.host,
            user            : config.mysqlDb.user,
            password        : config.mysqlDb.password,
            database        : config.mysqlDb.database
    });


module.exports = pool;