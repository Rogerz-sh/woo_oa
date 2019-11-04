import Validation from './validation'
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
import MenuList from '../components/MenuList.vue'
import PageNav from '../components/PageNav.vue'
import ResumeForm from '../components/ResumeForm.vue'

const GlobalComponents = {
  install(Vue) {
    Vue.use(Validation)
    Vue.component(SideBar.name, SideBar)
    Vue.component(NavBar.name, NavBar)
    Vue.component(MenuList.name, MenuList)
    Vue.component(PageNav.name, PageNav)
    Vue.component(ResumeForm.name, ResumeForm)
  }
};

export default GlobalComponents;