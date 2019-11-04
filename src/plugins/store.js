import Vue from 'vue'
import Vuex from 'vuex'
import location from '../data/location'

let location_data = { provinces: [], citys: [] };
location.province.forEach(v => {
    let province = { id: v.id, name: v.name };
    v.citys.forEach(c => {
        let city = location.citys[c]
        location_data.citys.push(city)
    });
    location_data.provinces.push(province);
})

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        activeNavId: 1,
        activeMenuId: 1,
        navs: [],
        menus: [],
        nickname: 'Roger',
        showResumeForm: false,
        formData: {
            location: location_data,
            job_type: [],
            degree: [
                "高中",
                "大专",
                "本科",
                "研究生",
                "硕士",
                "博士",
                "博士后"
            ]
        },
        resumeFormData: {
            id: 0,
            realname: "",
            sex: "",
            birthyear: "",
            province: "",
            city: "",
            mobile: "",
            email: "",
            industry: "",
            jobclass: "",
            company: "",
            job: "",
            experience: "",
            school: "",
            degree: "",
            filepath: "",
            filename: "",
            createdBy: sessionStorage.getItem('uid') || 0
        }
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
        },
        toggleResumeForm(state, flag) {
            state.showResumeForm = flag;
        },
        loadJobType(state, data) {
            state.formData.job_type = data;
        },
        addNewResume(state) {
            state.resumeFormData = {
                id: 0,
                realname: "",
                sex: "",
                birthyear: "",
                province: "",
                city: "",
                mobile: "",
                email: "",
                industry: "",
                jobclass: "",
                company: "",
                job: "",
                experience: "",
                school: "",
                degree: "",
                filepath: "",
                filename: ""
            }
        },
        editResume(state, data) {
            state.resumeFormData = data;
        }
    }
});
export default store;