export default [
    //用户登录
    {
        path: '/',
        name: 'Login',
        component: () => import('@/pages/loginModule/login/login.vue'),
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
    }
]