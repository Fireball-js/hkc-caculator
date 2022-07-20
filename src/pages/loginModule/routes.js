export default [
    //用户登录
    {
        path: '/',
        name: 'Login',
        component: () => import('@/pages/loginModule/login.vue'),
        meta: {
            "title": "用户登录"
        }
    },
    //用户注册
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/loginModule/register/register.vue'),
        meta: {
            "title": "用户注册"
        }
    },
    //用户权限管理
    {
        path: '/authority',
        name: 'authority',
        component: () => import('@/pages/loginModule/authority/authority.vue'),
        meta: {
            "title": "用户权限管理"
        }
    },
    //用户登录跳转信息提示
    {
        path: '/info',
        name: 'info',
        component: () => import('@/pages/loginModule/info/info.vue'),
        meta: {
            "title": "用户登录跳转"
        }
    }
]