// 引入各个插件模块
const express = require("express")
const app = express()
const cors = require("cors")
const fs = require("fs")
const path = require('path');
const bodyParser = require("body-parser")
const xlsx = require("node-xlsx")
const jwt = require("jsonwebtoken")

//引入其他模块
const { router } = require("./fileread.js")

/***** bodyparser中间件设置，用于接收body*/
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/***** multer中间件设置，用于接收文件，第三行是名称，和前端发的要对上*/
var multer = require('multer')
var upload_middleware = multer({ dest: 'tmp/uploads/' })
var register_portrait = 'register-portrait';

/*****express 建立静态资源服务器************* */
app.use(express.static(__dirname + "/userdatabase"))

// 跨域中间件
app.use(cors())

/***********************用户接口***************************/
// 验证用户名重复返回头像
app.get("/username", (req, res) => {
    var userlist = fs.readdirSync("./userdatabase")
    let _u = req.query.username
    if (userlist.includes(_u)) {
        res.send({ status: 1, url: "http://localhost:8082/" + _u + "/portrait.png" })
    } else {
        res.send({ status: 0 })
    }
})

//用户注册 接收上传的头像
app.post("/userregister/portrait", upload_middleware.single(register_portrait), (req, res) => {
    //file存储了文件信息，body存储了表单信息
    //  图片信息转64位写入单独文件夹，文件夹是一个用户信息，此处可以用mysql保存
    //  现在暂时用文件，并且返回一个id，用于标志用户信息提交位置，
    //  若无id，则用户头像为默认，并且新建用户文件
    if (req.file != {}) {
        // 用户匹配头像与表单信息的id
        var _portrait_id = req.file.filename
        // 返回识别id
        res.send(_portrait_id)
    }
})

// 接收上传的用户信息
app.post("/userregister", jsonParser, (req, res) => {
    var fileName = req.body.username
    var userinfo = Buffer.from(JSON.stringify(req.body))
    var fileurl = './userdatabase/' + fileName
    var portraitUrl = "./tmp/uploads/" + req.body.userId
    console.log(typeof userinfo);
    //判断是否使用默认头像
    if (req.body.userId == 00000000) {
        portraitUrl = "./tmp/default"
    }
    // 用户头像二进制转为64位
    var _portrait_info = (function toBase64 (path) {
        let bitmap = fs.readFileSync(path)
        return new Buffer.from(bitmap).toString("base64")
    })(portraitUrl)

    //新建用户信息
    fs.mkdir(fileurl, () => {
        //用户头像写入
        fs.writeFile(fileurl + "/portrait.png", _portrait_info, "base64", function (err) {
            console.log(err);
        })
        //用户信息写入
        fs.writeFile(fileurl + "/userinfo.txt", userinfo, "utf-8", function (err) {
            console.log(err);
        })
    })
})

//用户登录 /
app.post("/login", jsonParser, (req, res) => {
    let userinfo = JSON.parse(fs.readFileSync("./userdatabase/" + req.body.username + "/userinfo.txt", "UTF-8"))

    if (userinfo.pass == req.body.password) {
        var token = jwt.sign({ "name": req.body.username }, "secret", { expiresIn: "1d" })
        res.send({ loginStatus: true, "token": token })
    } else {
        res.send({ loginStatus: false })

    }
})

/*****************************请求数据接口*******************************/
app.use("/data", router)

app.listen(8082, () => {
    console.log("serve run in 8082")
})