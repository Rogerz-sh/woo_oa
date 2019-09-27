import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'

const routes = [
    { path: '/', component: Login },
    // { path: '/person/list', component: 'PersonList' },
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router