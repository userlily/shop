var express = require('express');
var router = express.Router();
var pool = require("../../util/mysqlConnectionPool")

router.get('/', function(req, res, next) {

});


/*admin  增删改查*/
router.get('/addadmin', function(req, res, next) {
    res.render("admin/user/addadmin")
});
router.post('/addadmin', function(req, res, next) {

    var name= req.body.name.trim();
    var password =req.body.password.trim();
    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query('SELECT * FROM `admin` where `name`=?',[name], function (error, results, fields) {
            if(results.length>=1){
                connection.release();
                if (error) console.log(error) ;
                return  res.redirect("/admin/user/addadmin")
            }
            connection.query('INSERT INTO admin SET ?', {name: name,password:password}, function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) console.log(error) ;
                res.redirect("/admin/user/addadmin")
                // Don't use the connection here, it has been returned to the pool.
            });

        })

    });





});
router.get('/adminlist', function(req, res, next) {

    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM admin", function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) console.log(error) ;
            // Don't use the connection here, it has been returned to the pool.
            return  res.render("admin/user/adminlist",{data:results})
        });
    });

});
router.get('/dele', function(req, res, next) {

    if(req.query.id!=1){
        pool.getConnection(function(err, connection) {

            // Use the connection
            connection.query('DELETE FROM admin WHERE id = ? ',req.query.id , function (error, results, fields) {
                if (error) console.log(error) ;
                connection.release();
                res.redirect("/admin/user/adminlist")
            })
        });
    }else{
        res.redirect("/admin/user/adminlist")
    }


});
router.get('/updata', function(req, res, next) {
    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM admin where id=?",req.query.id ,function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) console.log(error) ;
            // Don't use the connection here, it has been returned to the pool.
            return  res.render("admin/user/adminupdata",{data:results})
        });
    });


});
router.post('/updata', function(req, res, next) {


        pool.getConnection(function(err, connection) {

            connection.query('SELECT * FROM `admin` where `name`=?', [req.body.name], function (error, results, fields) {
                if (results.length >= 1) {
                    connection.release();
                    if (error) console.log(error);
                    return res.redirect("/admin/user/adminlist")
                }
                connection.query('UPDATE admin SET name= ? ,password= ? where id= ?', [req.body.name, req.body.password, req.query.id], function (error, results, fields) {
                    if (error) throw error;
                    connection.release();
                    console.log('changed ' + results.changedRows + ' rows');
                    res.redirect("/admin/user/adminlist")
                })
            })
        })


});

//没有审查
/*role  增删改查*/
router.get('/addrole', function(req, res, next) {

    res.render("admin/user/addrole")
});
router.post('/addrole', function(req, res, next) {


    var name= req.body.name;

    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query('INSERT INTO role SET ?', {name: name}, function (error, results, fields) {
            // And done with the connection.
            connection.release();
            // Handle error after the release.
            if (error) console.log(error);
            res.redirect("/admin/user/addrole")
            // Don't use the connection here, it has been returned to the pool.
        });
    });





});
router.get('/rolelist', function(req, res, next) {

    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM role", function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.render("admin/user/rolelist",{data:results})
        });
    });

});
router.get('/roledele', function(req, res, next) {


        pool.getConnection(function(err, connection) {

            // Use the connection
            connection.query('DELETE FROM role WHERE id = ? ',req.query.id , function (error, results, fields) {
                if (error) console.log(error)
                connection.release();
                res.redirect("/admin/user/rolelist")
            })
        });

});
router.get('/roleupdata', function(req, res, next) {
    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM role where id=?",req.query.id ,function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.render("admin/user/roleupdata",{data:results})
        });
    });


});
router.post('/roleupdata', function(req, res, next) {


    pool.getConnection(function(err, connection) {

        connection.query('UPDATE role SET name= ?  where id= ?', [req.body.name,req.query.id],function (error, results, fields) {
            if (error) throw error;
            console.log('changed ' + results.changedRows + ' rows');
            res.redirect("/admin/user/rolelist")
        })

    });

});
router.get('/adminaddrole', function(req, res, next) {


    var  adminid= req.query.id;
    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM role",function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.render("admin/user/adminaddrole",{data:results,id:adminid})
        });
    });


});
router.post('/adminaddrole', function(req, res, next) {


    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query('UPDATE admin SET rid=? where id= ?', [req.body.roleid ,req.query.id],function (error, results, fields) {
            if (error) throw error;
            console.log('changed ' + results.changedRows + ' rows');
            res.redirect("/admin/user/adminlist")
        })

    });


});

//没有审查
/*roleurl  增删改查*/
router.get('/roleaddurl', function(req, res, next) {


    var  roleid= req.query.id;
    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query("SELECT * FROM url",function (error, results, fields) {
            // And done with the connection.     归还连接
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
            return  res.render("admin/user/roleaddurl",{data:results,id:roleid})
        });
    });


});
router.post('/roleaddurl', function(req, res, next) {


    console.log(req.query.id )
    console.log(req.body.ulrs )
    pool.getConnection(function(err, connection) {

        connection.query('DELETE FROM roleurl WHERE rid = ? ',req.query.id , function (error, results, fields) {
            if (error) throw error;


            for(var i=0 ;i<req.body.ulrs.length;i++){
                connection.query('INSERT INTO roleurl SET ?', {rid: req.query.id,uid:req.body.ulrs[i]}, function (error, results, fields) {
                    if (error) throw error;
                    // Don't use the connection here, it has been returned to the pool.
                });
            }


            connection.release();

           return  res.redirect("/admin/user/rolelist")




        })

    });


});





module.exports = router;