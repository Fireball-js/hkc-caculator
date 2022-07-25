import axios from "axios"
import { defineStore } from "pinia"

export const useStore = defineStore("main", {
    state: () => ({
        // 顶部navbar索引
        navbarActiveIndex: "0",
        // 侧边navbar索引
        subnavIndex: "0",
        // 数据列表
        caculatorDataList: [],
        refreshList: false,
        // 数据文件内部数据
        caculatorDataDetail: []
    }),
    getters: {
        // 处理list：时间戳转时间
        dataList (state) {
            let _list = state.caculatorDataList
            _list.forEach(i => {
                let year = new Date(i.time).getFullYear()
                let mon = new Date(i.time).getMonth() + 1
                let day = new Date(i.time).getDate()
                i.time = `${year}-${mon}-${day}`
            });
            return _list
        },
        // 处理详细数据，数据单元加键
        dataDetail (state) {
            let _tem = state.caculatorDataDetail.map(_detail => {
                if (_detail != undefined) {
                    // 处理数据加键
                    var _data = _detail[1].map((i) => {
                        let _arr = {}
                        for (let j = 0; j < i.length; j++) {
                            _arr[j] = i[j]
                        }
                        return _arr
                    })
                    var subTitle = _data.splice(0, 1)
                    var data = _data.splice(1)
                    var title = _detail[0]
                }
                return [title, subTitle, data]
            })
            return _tem
        }
    },
    actions: {
        navbarMenuChange (_inx) {
            this.navbarActiveIndex = _inx
        },
        requestDataList (_d) {
            // 请求数据统一格式
            var dataListCondition = []
            _d[1].value.forEach(i => {
                _d[2].value.forEach(j => {
                    let _dataItem = {
                        eqName: i,
                        prName: j
                    }
                    dataListCondition.push(_dataItem)
                })
            })
            const queryList = {
                "timeBefore": _d[0].value[0],
                "timeAfter": _d[0].value[1],
                "condition": dataListCondition
            }
            // 按格式发送请求数据
            axios.post("http://localhost:8082/data/datalist", queryList).then(res => {
                let _t = setTimeout(() => {
                    this.caculatorDataList = res.data
                    this.refreshList = true
                    clearTimeout(_t)
                }, 1000);
            })

        },
        dataDetailQuery (_list) {
            axios.post("http://localhost:8082/data/datadetail", { "dataList": _list })
                .then(res => {
                    // 处理数据
                    this.caculatorDataDetail = res.data.map((i) => {
                        // 目前不需要其余sheet的数据，可修改
                        return [i.title, i.data[0].data]
                    })
                    //切换侧栏路由
                    this.subnavIndex = "2"
                })
        }

    }
})