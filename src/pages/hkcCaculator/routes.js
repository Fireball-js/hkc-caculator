export default [
    {
        path: '/hkccaculator',
        name: 'hkcCaculator',
        component: () => import('@/pages/hkcCaculator/hkcCaculator'),
        meta: {
            "title": "显示界面"
        },
        children: [
            {
                path: "datadetail",
                name: "datadetail",
                component: () => import("@/pages/hkcCaculator/caculatorDataDetail/CaculatorDataDetailList"),
                meta: {
                    "title": "数据详情页"
                }
            },
            {
                path: "datalist",
                name: "datalist",
                component: () => import("@/pages/hkcCaculator/caculatorDataList/CaculatorDataList"),
                meta: {
                    "title": "数据列表页"
                }
            },
            {
                path: "datacanvas",
                name: "datacanvas",
                component: () => import("@/pages/hkcCaculator/caculatorCanvas/CaculatorCanvasList"),
                meta: {
                    "title": "数据canvas绘图页",
                    "keepAlive": false
                }
            },
            {
                path: "datauserdefine",
                name: "datauserdefine",
                component: () => import("@/pages/hkcCaculator/caculatorDataUserDefine/CaculatorDataUserDefine"),
                meta: {
                    "title": "用户自定义"
                }
            },
        ]
    }
]