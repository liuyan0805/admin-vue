import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login' // @是src路径的别名，webpack配置的
import Home from '@/components/home/home' // @是src路径的别名，webpack配置的

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ]
})

// 1. 添加路由拦截器(导航钩子、守卫)
// 接下来所有的视图导航都必须过这道关卡
// 一旦进入这道关卡，则直接放行通过
// to 我要去哪里
// from 我从哪里来的
// next 用来放行的
router.beforeEach((to, from, next) => { // 1.添加全局路由导航守卫
// 2.
// 拿到当前请求的视图路径标识
// 2.1如果是登录组件，则直接放行通过
// 2.2 如果是非登录组件，则检查Token令牌
//    2.2.1 有令牌就过去
//    2.2.2 无令牌，则让其去登录

  if (to.name === 'login') { // 2. 如果是访问登录组件，则让其通过
    next()
  } else {
  // 检查登录状态令牌
    const token = window.localStorage.getItem('admin-token')
    if (!token) { // 2.2.1 无令牌，则让其登陆去
      next({
        name: 'login'
      })
    } else { // 2.2.2 有令牌就允许通过
      next()
    }
  }
})

export default router
