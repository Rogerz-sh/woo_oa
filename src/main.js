import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

Vue.config.productionTip = false
import ajax from './plugins/ajax'   // 引用axios并绑定到Vue.prototype.$http上
import globalComponents from './plugins/globalComponents' // 引用常用的组件
import router from './router/index'   // 引用路由

Vue.use(VueRouter)
Vue.use(ajax)
Vue.use(globalComponents)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
