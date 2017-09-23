
/**
 * Created by lili on 2017/7/21.
 * 文件上传
 */

var multer  = require('multer')
var path = require("path");


var storage = multer.diskStorage({
    destination: function (req, files, cb) {
        cb(null, path.join(__dirname, '../public/goodsimg/'))
    },
    filename: function (req, files, cb) {

                 if( !req.session.imgs){
                         req.session.imgs=[]
                  }
                var name= new Date().getTime()+ '.' + files.mimetype.substring(6);

                req.session.imgs.push(name)


             cb(null,name)
    }
});
var upload = multer({ storage: storage })


module.exports = upload;