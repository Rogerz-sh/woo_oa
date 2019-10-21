import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import Vuex from 'vuex'

Vue.config.productionTip = false
import ajax from './plugins/ajax'   // 引用axios并绑定到Vue.prototype.$http上
import globalComponents from './plugins/globalComponents' // 引用常用的组件
import router from './router/index'   // 引用路由
import session from './utils/session'
import store from './plugins/store'

Vue.use(VueRouter)
Vue.use(ajax)
Vue.use(globalComponents)
Vue.use(session)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
