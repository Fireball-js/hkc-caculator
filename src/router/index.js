import { createRouter, createWebHashHistory } from 'vue-router'
import loginPage from '../pages/loginModule/routes'
import caculator from '../pages/hkcCaculator/routes'

// 引入routes
const routes = [
  ...loginPage,
  ...caculator
]

// 创建白名单
const routerWhiteList = [
  /info/,//跳转登录通知
  /register/,//注册页面
  /authority/,//权限管理
]
function isRouterWhiteList (name) {
  let _judge = routerWhiteList.some((i) => {
    return name.match(i)
  })
  return _judge
}

// 创建router路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 全局守卫检定是否登陆
router.beforeEach((to, from, next) => {
  let _cookie = document.cookie.split(";")
    .map(i => {
      return i.split("=")
    })
  let ifToken = _cookie.some((i) => {
    return i.some(j => {
      return j.includes("token")
    })
  })
  // 判断是否在白名单中
  if (isRouterWhiteList(to.name)) {
    next()
  } else {
    // 判断是否是有token的
    if (ifToken) {
      next();
    } else {
      if (to.path == "/") {
        next();
      } else {
        next({ path: "/info" });
      }
    }
  }
})

export default router


