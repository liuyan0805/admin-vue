import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login' // @是src路径的别名，webpack配置的
import Home from '@/components/home/home' // @是src路径的别名，webpack配置的

Vue.use(Router)

export default new Router({
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
