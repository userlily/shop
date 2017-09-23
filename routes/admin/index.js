
/*审计过了*/

const express = require('express');
const router = express.Router();
const pool = require("../../util/mysqlConnectionPool")
const async =require("async")
var session =require("express-session");



const user= require("./user")
const public= require("./public")
const  goods= require("./goods")

router.use(session({                //设置session中间件

    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 6000000
    }
}));
/**
 * @作者  lili
 * @time  2017-8-11
*  @描述    牛逼的权限控制
*/




router.use(function(req,res,next){

    let arr= req.session.role   //用户对应的权限数组
    let url =req.url    //这次请求的url
    let urlsub=req.url.split("/")     //把url进行分割


    if(url=="/"){ // 如果url是“/”就放行
        return next()
    }else {
        if(!req.session.adminID){  //如果用户没有登录就去登录页面
            return  res.render('admin/signin',{"mes":""});
        }
        if(req.session.adminID=="1"){  //如果用户是admin就这放行
            return next();
        }

        if(urlsub[1]=="public" && req.session.adminID){  // 如果url的第二位是"public" 公共的路径就放行
                return next();
        }

        for(let i=0 ;i<arr.length;i++){
            if(urlsub[1]==arr[i]){   // 如果url的第二位在 权限数组中就放行  做大模块判断

                for(let i=0 ;i<arr.length;i++){

                    if(url==arr[i]){   // 如果url在权限数组中就放行

                        return next()

                    }
                }
            }
        }
       return  res.redirect("/admin") //在大权限中 没有小的权限，去主页  。  不在大权限中，去主页
    }

});


router.get('/', function(req, res, next) {

    if(req.session.adminID){
        res.render('admin/index');
    }else {
        res.render('admin/signin',{"mes":""});
    }

});

router.post('/', function(req, res, next) {
    let name=req.body.name.trim();
    let password=req.body.password.trim();
    let role=[]
    pool.getConnection(function(err, connection) {

        // Use the connection
        connection.query('SELECT * FROM `admin` where `name`=?',[name], function (error, results, fields) {

            // Handle error after the release.
            if (error) console.log(error) ;
            // Don't use the connection here, it has been returned to the pool.

            if(results.length>=1){
                let id=results[0].id
                if(password==results[0].password){

                    connection.query("SELECT url.url FROM admin LEFT JOIN roleurl ON admin.rid= roleurl.rid  LEFT JOIN url ON roleurl.uid=url.id  WHERE admin.name= ?",[name], function (error, results, fields) {
                        // And done with the connection.     归还连接
                        connection.release();
                        // Handle error after the release.
                        if (error) console.log(error) ;
                        for(let i=0 ; i<results.length;i++){
                            role[i] = results[i].url
                        }
                        req.session.adminID=id;
                        req.session.role=role
                        return  res.redirect("/admin")
                    });

                }else{

                    return  res.render('admin/signin',{"mes":"密码不正确"});
                }

            }else{
                return  res.render('admin/signin',{"mes":"用户名不存在"});
            }


        });
    });
});



router.use("/user",user);
router.use("/public",public);
router.use("/goods",goods);




module.exports = router;
