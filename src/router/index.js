import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'
import Dashboard from '../pages/Dashboard.vue'
// import Resume from '../pages/Resume.vue'
import ResumeList from '../pages/resume/ResumeList.vue'
import ResumeFavorites from '../pages/resume/ResumeFavorites.vue'

const routes = [
    { path: '/', component: Login },
    {
        path: '/page', component: Main,
        children: [
            { 
                path: '/dashboard', 
                component: Dashboard 
            },
            {
                path: '/resume-list',
                component: ResumeList
            },
            {
                path: '/resume-favorites/:fid',
                component: ResumeFavorites,
                props: true
            }
        ]
    },
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router