var express = require('express');
var router = express.Router();
var wx= require("./wx/index")
var admin= require("./admin/index")
const pool = require("../util/mysqlConnectionPool")

/*递归*/

router.use(function(req,res,next){
    var id=4;
    let arr1=[id];
    pool.getConnection(function(err, connection) {

        let arr=[id];
        function digui(a) {
            // Use the connection
            for(let i=0 ;i<a.length;i++){
                connection.query("SELECT * FROM cgoods where cid=?", a[i], function (error, results, fields) {
                    // Handle error after the release.
                    if (error) console.log(error) ;
                    // Don't use the connection here, it has been returned to the pool.
                    let arr=[];
                    for(let i=0 ;i<results.length;i++){
                        arr[i]=results[i].id
                        arr1.push(results[i].id)
                    }
                    if(results.length==0){
                        return
                    }
                    digui(arr);
                });


            }
        }
        digui(arr);
        setTimeout(function(){
            console.log(arr1)
            let sql = "SELECT * FROM goods where cid in (" ;
            for (let i=0;i<arr1.length;i++){
               sql=sql+arr1[i]+","
            }
            sql=sql.substring(0,sql.length-1) +" )"

            connection.query(sql,function (error, results, fields) {

                connection.release();
                if(error) console.log(error)
                //这里写代码
                console.log(results.length)
                next()

            })
            console.log(arr1)
        },100 )
    });

});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/wx',wx)
router.use('/admin',admin)

module.exports = router;
