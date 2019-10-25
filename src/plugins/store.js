import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        activeNavId: 1,
        activeMenuId: 1,
        navs: [],
        menus: [],
        nickname: 'Roger'
    },
    mutations: {
        loadNav(state, data) {
            state.navs = data.navs
        },
        loadMenu(state, data) {
            state.menus = data.menus
        },
        activeNav(state, data) {
            state.activeNavId = data.id;
        },
        activeMenu(state, data) {
            state.activeMenuId = data.id;
        }
    }
});
export default store;