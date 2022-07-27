const express = require("express")
const fs = require("fs");
const router = express()
const xlsx = require("node-xlsx")
const bodyParser = require("body-parser")

/***** bodyparser中间件设置，用于接收body*/
var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

//用于读取存储的数据并按前端的请求进行数据交互
// 本地数据汇总
function readFileInfo () {
    // 本地数据读取设置
    var _path = "./hkcdatabase/" + "false-data"
    var _result = fs.readdirSync(_path)
    // 汇总数据
    const hkcDataList = []
    _result.forEach(i => {
        let _d = xlsx.parse(_path + "/" + i)
        let _obj = {}
        let _detail = _d[0].data[0]
        //时间格式转换
        let reg = /^(\d{4})(\d{2})(\d{2})$/;
        _detail[3] = _detail[3].toString().replace(reg, "$1-$2-$3");

        _obj["fileName"] = i
        _obj["time"] = new Date(_detail[3]).getTime()
        _obj["eqName"] = _detail[1]
        _obj["prName"] = _detail[2]
        hkcDataList.push(_obj)
    })
    return hkcDataList
}
// let _list = readFileInfo()
// console.log(_list);
// console.log(typeof _list);
//条件筛选
function conditionCheck (timeBefore, timeAfter, _condition) {
    let _list = readFileInfo()
    let dataList = []
    _list.forEach(i => {
        // i的样式
        // {
        //     fileName: 'false-data-4.xlsx',
        //     time: 1646611200000,
        //     eqName: 'ads01',
        //     prName: '430fd'
        //  },
        if (timeBefore < i.time && timeAfter > i.time) {
            if (_condition.eqName == i.eqName && _condition.prName == i.prName) {
                dataList.push(i)
            }
        }
    })
    return dataList
}
//单个数据内容
function readSingleFile (_dirname) {
    let _d = xlsx.parse("./hkcdatabase/false-data/" + _dirname)
    return _d
}

//*********************数据入口**************************
//数据表单
router.post("/datalist", jsonParser, (req, res) => {
    console.log("on serve");
    let _d = req.body
    let dataList = []
    //****************
    //数据格式：{
    //   timeBefore: 1656604800000,
    //   timeAfter: 1656691199000,
    //   condition: [
    //     { eqName: 'ttp01', prName: '238fd' },
    //     { eqName: 'ttp01', prName: '238hd' },
    //     { eqName: 'ttp02', prName: '238fd' },
    //     { eqName: 'ttp02', prName: '238hd' }
    //   ]
    // }
    //****************
    _d.condition.forEach(item => {
        item = conditionCheck(_d.timeBefore, _d.timeAfter, item)
        if (item != []) {
            dataList = [...dataList, ...item]
        }
    })
    res.send(dataList)
})
//单个详细数据
router.post("/datadetail", jsonParser, (req, res) => {
    let _result = []
    let dataList = req.body.dataList
    _result = dataList.map((i) => {
        // console.log(i);
        return { "title": i, "data": readSingleFile(i) }
    })
    // console.log(_result);
    res.send(_result)
})
module.exports = { router }