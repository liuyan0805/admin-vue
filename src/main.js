// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './assets/css/style.css'
import httpPlugin from '@/assets/js/http'

Vue.use(ElementUI)

// 加载httpPlugin 插件 (封装自axios)
// 我们在该插件中为vue原型对象扩展了一个成员$http
// 然后我们就可以在任何组件通过使用this.$http来发起请求了

// 给vue 原型添加成员，最好给成员加$前缀
// 为什么?
// 因为一旦组件内部有同名的http就访问不到原型中的http了
// 为啥？ 原型链：先在自己身上找，找到就用，找不到就跑原型链
// 所以我们建议一个约定：
// 组件实例数据不要起特殊的成员名，例如不要以$开头
// 目的是为了避免和原型成员冲突

Vue.use(httpPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
