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
        activeMenuId: 0,
        activeFavId: 'all',
        selectedFavId: 0,
        navs: [],
        menus: [],
        user: {
            nickname: '',
            avatar: ''
        },
        showResumeForm: false,
        showRecordList: false,
        showFavAdder: false,
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
            educations: [],
            works: [],
            createdBy: sessionStorage.getItem('uid') || 0
        }
    },
    mutations: {
        loadNav(state, data) {
            state.navs = data.navs
        },
        loadMenu(state, data) {
            state.menus = data
        },
        loadUser(state, data) {
            state.user = data;
        },
        activeNav(state, data) {
            state.activeNavId = data.id;
        },
        activeMenu(state, data) {
            state.activeMenuId = data.id;
        },
        activeFav(state, data) {
            state.activeFavId = data;
        },
        selectFavItem(state, data) {
            state.selectedFavId = data;
        },
        toggleResumeForm(state, flag) {
            state.showResumeForm = flag;
        },
        toggleRecordList(state, flag) {
            state.showRecordList = flag;
        },
        toggleFavAdder(state, flag) {
            state.showFavAdder = flag;
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
                filename: "",
                educations: [
                    {
                        school: '',
                        degree: '',
                        major: '',
                        isunified: '是',
                        endtime: ''
                    }
                ],
                works: [
                    {
                        company: '',
                        job: '',
                        department: '',
                        salary: '',
                        starttime: '',
                        endtime: '',
                        description: ''
                    }
                ]
            }
        },
        editResume(state, data) {
            state.resumeFormData = data;
        }
    }
});
export default store;