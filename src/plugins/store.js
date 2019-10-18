import Vuex from 'vuex'

export default {
    install(Vue) {
        Vue.use(Vuex)
        const store = new Vuex.Store({
            state: {
                menus: []
            },
            mutations: {
                loadMenu(state, data) {
                    state.menus = data.menus
                }
            }
        });
        Vue.prototype.$store = store
    }
}