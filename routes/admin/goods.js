var express = require('express');
var router = express.Router();
var pool = require("../../util/mysqlConnectionPool")
var upload=require("../../util/upload")




router.get('/cgoods', function(req, res, next) {

    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM cgoods where cid=0", function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.render("admin/goods/cgoods",{data:results})
        });
    });


});
router.post('/ccgoods', function(req, res, next) {

   let id =req.body.id;

    pool.getConnection(function(err, connection) {


        connection.query("SELECT * FROM cgoods where cid=?",id, function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.json(results)
        });
    });


});
router.post('/addcgoods', function(req, res, next) {

    let name =req.body.name;
    let cid =req.query.pid;

    pool.getConnection(function(err, connection) {


        connection.query("insert into cgoods set ?",{cid:cid,cname:name}, function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.redirect("/admin/goods/cgoods")
        });
    });


});
router.get('/delecgoods', function(req, res, next) {


    let id= req.query.id


    pool.getConnection(function(err, connection) {



        connection.query("SELECT * FROM cgoods where cid=?",id, function (error, results, fields) {

            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
           if(results==0){
               connection.query("DELETE FROM cgoods WHERE id = ? ",id, function (error, results, fields) {
                   // And done with the connection.     归还连接
                   connection.release();
                   // Handle error after the release.
                   if (error) {
                       console.log(error) ;
                       return  res.end("2")
                   }else{
                       return  res.end("1")
                   }

                   // Don't use the connection here, it has been returned to the pool.

               });
           }else{

               connection.release();
               return res.end("2")

           }




        });

    });


});




router.get('/addgoods', function(req, res, next) {


    let cid =req.query.cid;

    res.render("admin/goods/addgoods" ,{cid:cid})


});

router.post('/addgoods',upload.array('img',5)  ,function(req, res, next) {


    let   cid =  req.body.cid;
    let   name = req.body.name||""
    let   price = req.body.price||0;
    let   imgs=req.session.imgs||[];
    let   kucun=req.body.kucun||0;
    let   miaoshu =req.body.miaoshu||""
    let   color =req.body.color||""
    let   shuxing =req.body.shuxing||""


    if( typeof  color !="string"){
        let sum = "";
        for(let i=0;i<color.length;i++){
            if(i==color.length-1){
                sum =sum+ color[i];
            }else{
                sum =sum+ color[i]+"##";
            }


        }
        color=sum;
    }
    if( typeof  shuxing !="string"){
        let sum = "";

        for(let i=0;i<shuxing.length;i++){

            if(i==color.length-1){
                sum =sum+ shuxing[i];
            }else{
                sum =sum+ shuxing[i]+"##";
            }
        }
        shuxing=sum;
    }

        console.log(typeof shuxing)
        console.log(cid)
        console.log(name)
        console.log(price)
        console.log(imgs)
        console.log(kucun)
        console.log(miaoshu)
        console.log(color)
        console.log(shuxing)

    req.session.imgs=undefined;
    pool.getConnection(function(err, connection) {

        connection.query("insert into goods set ?",{cid:cid,name:name,price:price,img1:imgs[0],img2:imgs[1],img3:imgs[2],img4:imgs[3],img5:imgs[4],miaoshu:miaoshu,kucun:kucun,shuxing1:color,shuxing2:shuxing}, function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) console.log(error);
            // Don't use the connection here, it has been returned to the pool.
            return  res.redirect("/admin/goods/goodslist")
        });
    });





});

router.get('/goodslist', function(req, res, next) {


    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM cgoods where cid=0", function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.render("admin/goods/goodslist",{data:results})
        });
    });


});

router.post('/goodslist', function(req, res, next) {



    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM goods where cid= ?", req.body.id,function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.json(results)
        });
    });


});

router.get('/delegoods', function(req, res, next) {


    let id = req.query.id


    pool.getConnection(function (err, connection) {


        connection.query("DELETE FROM goods WHERE id = ? ", id, function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
                res.redirect("/admin/goods/goodslist")

        });


    });

});

router.get('/goodsdetails', function(req, res, next) {


    let id = req.query.id
    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM goods where id= ?",id,function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.


            return  res.render("admin/goods/goodsdetails" ,{data:results})
        });
    });


});

router.post('/goodsupdata', function(req, res, next) {


    let   id =  req.body.id;
    let   name = req.body.name
    let   price = req.body.price

    pool.getConnection(function(err, connection) {

        connection.query('UPDATE goods SET name= ? ,price= ? where id= ?', [name,price,id],function (error, results, fields) {
            if (error) throw error;
            connection.release();

            res.redirect("/admin/goods/goodslist")
        })

    });


});


router.get('/goodsupdown', function(req, res, next) {


    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM cgoods where cid=0", function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.render("admin/goods/goodsupdown",{data:results})
        });
    });

});
router.get('/goodsup', function(req, res, next) {

    var id=req.query.id
    pool.getConnection(function(err, connection) {


        // Use the connection
        connection.query("UPDATE goods SET updown= true  where id= ?",id ,function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.redirect("/admin/goods/goodsupdown")
        });
    });

});
router.get('/goodsdown', function(req, res, next) {

    var id=req.query.id
    pool.getConnection(function(err, connection) {


        // Use the connection
        connection.query("UPDATE goods SET updown= false  where id= ?",id ,function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.redirect("/admin/goods/goodsupdown")
        });
    });

});





router.get('/goodstuijian', function(req, res, next) {

    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM cgoods where cid=0", function (error, results, fields) {
            // And done with the connection.     归还连接
            if (error) console.log(error) ;
            var results =results
            connection.query("SELECT * FROM goods where tuijian=1", function (error, ress, fields) {

                connection.release()
                return  res.render("admin/goods/goodstuijian",{data:results,tuijian:ress})

            })


        });
    });
});

router.get('/goodstuijiandel', function(req, res, next) {

    var id=req.query.id
    pool.getConnection(function(err, connection) {


        // Use the connection
        connection.query("UPDATE goods SET tuijian= false  where id= ?",id ,function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) console,log(error) ;
            // Don't use the connection here, it has been returned to the pool.
            return  res.redirect("/admin/goods/goodstuijian")
        });
    });

});

router.get('/goodstuijianadd', function(req, res, next) {

    var id=req.query.id
    pool.getConnection(function(err, connection) {


        // Use the connection
        connection.query("UPDATE goods SET tuijian= true  where id= ?",id ,function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) console,log(error) ;
            // Don't use the connection here, it has been returned to the pool.
            return  res.redirect("/admin/goods/goodstuijian")
        });
    });

});

module.exports = router;